
//sáb 11 jul 2020 16:52:07 -03
const readline = require('readline');
const CONSULTA_MOEDAS = require('./service');
const UTIL = require('./util');
const { exit } = require('process');

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DEBUG = false; // Ative para 'true' se vc deseja depurar o programa.

/**
 * função consultasObtidas()
 * 
 * Obtém as consultas obtidas do servidor do BC e formata para os valores da saída além de parametrizar
 * todas as moedas do tipo A para o tipo B para poder comparar o campo parametrizado.
 * 
 * Para mais detalhes sobre a classificação de moedas tipo A ou B: https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/aplicacao#!/recursos/CotacaoMoedaPeriodo#eyJmb3JtdWxhcmlvIjp7IiRmb3JtYXQiOiJqc29uIiwiJHRvcCI6bnVsbCwibW9lZGEiOiJKUFkiLCJkYXRhSW5pY2lhbCI6IjExLTI3LTIwMTciLCJkYXRhRmluYWxDb3RhY2FvIjoiMTEtMzAtMjAxNyIsIiRza2lwIjoxMDB9LCJwcm9wcmllZGFkZXMiOlswLDEsNF0sInBlc3F1aXNhZG8iOnRydWUsImFjdGl2ZVRhYiI6ImRhZG9zIiwiZ3JpZFN0YXRlIjp7AzADOlt7A0IDIgQwBCIsA0EDfSx7A0IDIgQxBCIsA0EDfSx7A0IDIgQ0BCIsA0EDfV0sAzEDOnt9LAMyAzpbXSwDMwM6e30sAzQDOnt9LAM1Azp7fX0sInBpdm90T3B0aW9ucyI6ewNhAzp7fSwDYgM6W10sA2MDOjUwMCwDZAM6W10sA2UDOltdLANmAzpbXSwDZwM6ImtleV9hX3RvX3oiLANoAzoia2V5X2FfdG9feiIsA2kDOnt9LANqAzp7fSwDawM6ODUsA2wDOmZhbHNlLANtAzp7fSwDbgM6e30sA28DOiJDb250YWdlbSIsA3ADOiJUYWJsZSJ9fQ==
 * // A = USD/[moeda]
 * // B = [moeda]/USD
 * 
 * Essa função executa:
 *  1- Faz o percuso de cada valores obtidos de cada moeda no dia da busca
 *  2- Parametriza todas as moedas do tipo A para o tipo B
 *  3- Salva em um JSON
 * 
 *  Retorno:
 *      No SUCESSO:
 *      {
 *          simbolo: <SIMBOLO_DA_MOEDA>
 *          nomeFormatado: <NOME_FORMATADO>
 *          dado: { paridade: <PARIDADE_MEDIA_CALCULADA_NO_CLIENTE_E_PARAMETRIZADA>, cotacao: <COTACAO_MEDIA_CALCULADA_NO_CLIENTE }
 *      }
 *      OU
 *          [] (Se não existem dados)
 *
 */
async function consultasObtidas(valor, dataDaConsulta) {
    let moedas = [];
    let moeda;
    let dado;
    let i;

    for (i=0; i<valor.length; i++) {
        if (valor[i].simbolo !== 'USD') {
            moeda = await CONSULTA_MOEDAS.consultaMoeda(valor[i].simbolo, dataDaConsulta);
            if (moeda.dado.length) {
                dado = UTIL.parametrizarTipoDeMoeda(UTIL.mediaDoDia(moeda.dado), valor[i].tipoMoeda);
                moedas.push({
                    simbolo: valor[i].simbolo,
                    nomeFormatado: valor[i].nomeFormatado,
                    dado: dado
                });
            }
        }
    }

    return moedas;
}

/**
 * Função consultar()
 * Função principal de consulta na qual o objetivo é:
 * 
 *  1- Fazer uma busca primária dos tipos de moeda disponível no site do Banco Central
 *  2- Obtém a cotação do Dolar. Pois os valores das moedas estão em Real e precisam ser convertidas para dólar
 *  3- Com os dados obtidos de 1, faz as buscas de todas as moedas disponívels na data da consulta
 *  
 *  Retorno:
 *      No SUCESSO:
 *          {
 *              error: 0,
 *              reason: "Sucesso",
 *              cotacaoDoDolar: <COTACAO_DO_DOLAR_NO_DIA_DA_CONSULTA_EM_REAL>,
 *              consulta: [
 *                  {
 *                      simbolo: <SIMBOLO_DA_MOEDA>,
 *                      nomeFormatado: <NOME_FORMATADO_DA_MOEDA>,
 *                      dado: { paridade: <PARIDADE_MEDIA_CALCULADA_NO_CLIENTE>, cotacao: <COTACAO_MEDIA_CALCULADA_NO_CLIENTE }
 *                  },
 *                  ...
 *              ]
 *          }
 * 
 *      No ERRO:
 *          {
 *              error:<ERRO> (Se error > 0 ==> Erro de servidor, se menor que zero, erro interno),
 *              reason: <RAZAO_DO_ERRO>
 *          }
 */
function consultar(dataConsulta) {
    return new Promise((res, err) => {
        CONSULTA_MOEDAS.consultaTipoDisponivel().then(
            (moedas_disponiveis) => {
                let consultaObtidas = [];
                let numDeMoedasDisponiveis = 0;
                let consulta;

                console.log("Consultando moedas disponíveis ...");
            
                if (moedas_disponiveis.value) {
                    moedas_disponiveis.value.forEach((valor) => {
                        consultaObtidas.push(valor);
                        numDeMoedasDisponiveis++;
                    });

                    if (numDeMoedasDisponiveis) 
                        console.log(`Foram encontradas ${numDeMoedasDisponiveis} moedas para consulta`)
                    else {
                        err(UTIL.sendDefaultError(-21, "Nenhuma moeda disponível encontrada."));
                    }   

                    console.log(`Consultando cotação do dólar na data ${dataConsulta} ... Pode demorar um pouco. Aguarde ...`);

                    try {
                        consulta=UTIL.formatarDataBC(dataConsulta);

                        CONSULTA_MOEDAS.cotacaoRealDolar(consulta).then(
                            (d) => {
 
                                console.log(`Consultando moedas na data ${dataConsulta} ... Pode dermorar um pouco. Aguarde ...`);

                                consultasObtidas(consultaObtidas, consulta).then(
                                    (consultado) => {
                                        if (consultado.length)
                                            res({error: 0, reason: "Sucesso", cotacaoDoDolar: d.cotacao, consulta: consultado})
                                        else
                                            err(UTIL.sendDefaultError(-24, "Sem dados obtidos"))
                                    },
                                    (consulta_erro) => err(consulta_erro)
                                )

                            },
                            (e) => {
                                err(UTIL.sendDefaultError(-23, e));
                            }
                        );
                    } catch (e) {
                        console.log(e);
                        err(UTIL.sendDefaultError(-22, e));
                    }
                } else {
                    console.log({error: -5, reason: "Campo 'value' não encontrado"});
                    err(UTIL.sendDefaultError(-5, "Campo 'value' não encontrado"));
                }
            },
            (moedas_disponiveis_erro) => {
                console.log(moedas_disponiveis_erro);
                err(UTIL.sendDefaultError(-24, moedas_disponiveis_erro));
            }
        );
    });
}


/**
 * Função perguntaAsync
 * 
 * Função de entrada de texto no console que é passada para a função main()
 */
async function perguntaAsync(texto) {
    return new Promise((resolve, reject) => {
        terminal.question(`${texto}\n`, msg => {
            if (msg) {
                resolve(msg);
            } else
                reject("O campo não pode ser vazio!");
        });
    });
}

/**
 * Função main()
 * 
 * Ponto de entrada da execução 
 */
async function main() {
    let consulta;
    let resultado, resultadoDaConsulta;

    while (1) {
        try {
            consulta = await perguntaAsync("Pesquisa de menor cotação de moedas disponíveis para consulta no BC. Digite: YYYYMMDD ou digite 'q' para sair");
        } catch (e) {
            console.log("Erro de terminal");
            console.log(e);
            continue;
        }

        if (consulta === 'q') {
            console.log("Saindo ... Tenha um ótimo dia");
            break;
        }


        try {
            if (UTIL.entradaConsoleInvalida(consulta)) {
                console.log("Data inválida. Digite novamente uma data correta");
                continue;
            }
            console.log("Iniciando a consulta. Aguarde.");
        } catch (e) {
            console.log(e);
            console.log(`Erro de formato de dado de entrada '${consulta}'. Tente novamente ou digite 'q' para sair`);
            continue;
        }

        try {
            resultadoDaConsulta = await consultar(consulta);
            resultado = UTIL.exibirMenorCotacao(resultadoDaConsulta.consulta, resultadoDaConsulta.cotacaoDoDolar);
            if (resultado) {
                console.log("PESQUISA CONCLUÍDA")
                console.log(`Símbolo: ${resultado.simbolo}, País de origem: ${resultado.pais_de_origem}, Valor da moeda em Dólar: ${resultado.valor_da_moeda.toPrecision(5)}, Cotação do dólar (R$): ${resultadoDaConsulta.cotacaoDoDolar.toPrecision(5)}`);
            } else
                console.log(`Símbolo: x, País de origem: x, Valor da moeda em Dólar: x, Cotação do dólar (R$): x`);
      
            console.log("Faça uma nova consulta ou digite 'q' para sair");

        } catch (e) {
            if (DEBUG) {
                console.log("Erro");
                console.log(e)
            }
            if (e.error === -23 || e.error === -24) {
                console.log(`Símbolo: x, País de origem: x, Valor da moeda em Dólar: x, Cotação do dólar (R$): x`);
            } else
                console.log(e);
        }
    }

    exit(0);
}

main();
