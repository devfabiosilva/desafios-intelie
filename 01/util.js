/**
 * Função sendDefaultError()
 * Atribui um erro padrão (se ocorrer)
 */
function sendDefaultError(error, reason) {
    return {error, reason};
}

/**
 * Função verificarErro()
 * Subfunção da função mediaDoDia()
 */
function verificarErro(elemento, razao, indice) {
    if (!elemento)
        throw `É necessário: ${razao}`;
    
    if (isNaN(elemento))
        throw `Elemento '${razao}' no índice ${indice} deveria ser um número o que ele é: ${typeof elemento}`

    return elemento;

}

/**
 * Função mediaDoDia()
 * Obtem todas as 'paridadeCompra' e as 'paridadeCompra' e tambem as 'cotacaoCompra' e as 'cotacaoVenda'
 * no dia e obtem suas médias retornando apenas dois valores em JSON
 *  RETORNO:
 *      No SUCESSO:
 *          { paridade: media(paridadeCompra+paridadeVenda), cotacao: medoa(cotacaoCompra+cotacaoVenda) };
 *      No ERRO:
 *          throw <DESCRIÇAO_DADO_VAZIO>
 */
function mediaDoDia(dadoObtido) {

    let quantidade = 0;
    let paridadeCompra = 0.0;
    let paridadeVenda = 0.0;
    let cotacaoCompra = 0.0;
    let cotacaoVenda = 0.0;

    if (!dadoObtido.length)
        throw "Dado vazio ou indefinido";

    dadoObtido.forEach((elemento, index) => {

        paridadeCompra += verificarErro(elemento.paridadeCompra, "paridadeCompra", index),
        paridadeVenda += verificarErro(elemento.paridadeVenda, "paridadeVenda", index),
        cotacaoCompra += verificarErro(elemento.cotacaoCompra, "paridadeVenda", index),
        cotacaoVenda += verificarErro(elemento.cotacaoVenda, "paridadeVenda", index)
        quantidade++;

    });

    quantidade += quantidade;

    return { paridade: (paridadeCompra+paridadeVenda)/quantidade, cotacao: (cotacaoCompra+cotacaoVenda)/quantidade };

}

/**
 * Função parametrizarTipoDeMoeda()
 * Parametriza todas as moedas do tipo A para o tipo B.
 * 
 */
function parametrizarTipoDeMoeda(dadoObtido, tipoMoeda) {
    if (tipoMoeda === 'A')
        dadoObtido.paridade=(1/dadoObtido.paridade);
    
    return dadoObtido;

}

/**
 * Função dataInvalida()
 * Verifica se a data em string tem um formato válido
 * retorna true se a data é invalida
 * retorna false se a data é valida
 */
function dataInvalida(ano, mes, dia) {
    let a = parseInt(ano);
    let m = parseInt(mes)-1;
    let d = parseInt(dia);
    let dataDeTeste = new Date(a, m, d);
    return ((dataDeTeste.getFullYear() !== a)||(dataDeTeste.getMonth() !== m)||(dataDeTeste.getDate() !== d));
}

/**
 * Função formatarDataBC()
 * Formata o valor de entrada YYYYMMDD para MM-DD-YYYY para consulta da API do BC
 * Retorno:
 *      No SUCESSO:
 *          'MM-DD-YYYY'
 *      No ERRO:
 *          throw <DESCRICAO_DO_ERRO>
 */
function formatarDataBC(valor) {
    let ano, mes, dia, tmp;

    if (valor.length !== 8)
        throw "Digite somente YYYYMMDD";

    ano = valor.substr(0, 4);

    if (isNaN(ano))
        throw "Ano não é um número";

    mes = valor.substr(4, 2);

    if (isNaN(mes))
        throw "Mês não é um número";

    dia = valor.substr(6);

    if (isNaN(dia))
        throw "Dia não é um número";

    if (parseInt(dia)>31)
        throw "Dia inválido";

    tmp=parseInt(mes);

    if (tmp === 0 || tmp > 12)
        throw "Mês inválido";

    return `${mes}-${dia}-${ano}`

}
/**
 * Função nomeDoPaisDeOrigem(simbolo)
 * Retorna uma consulta mockada de alguns países dado simbolos conhecidos. 
 */
function nomeDoPaisDeOrigem(simbolo) {
    switch (simbolo) {
        case 'AUD':
            return "Austrália";
        case 'CAD':
            return "Canadá";
        case 'CHF':
            return "Suíça";
        case 'DKK':
            return "Dinamarca";
        case 'EUR':
            return "União Européia";
        case 'GBP':
            return "Inglaterra";
        case 'JPY':
            return "Japão";
        case 'NOK':
            return "Noruega";
        case 'SEK':
            return "Suécia";
        default:
            return "País desconhecido";
    }
}
/**
 *  
 *
 */
function exibirMenorCotacao(consulta, cotacaoDoDolar) {
    let tmp = Infinity;
    let index;

    if (consulta.length) {
        consulta.forEach((valor, idx) => {
            if (valor.dado.paridade<tmp) {
                tmp = valor.dado.paridade;
                index = idx;
            }
        });

        return {
            simbolo: consulta[index].simbolo,
            pais_de_origem: nomeDoPaisDeOrigem(consulta[index].simbolo),
            valor_da_moeda: (cotacaoDoDolar)?consulta[index].dado.cotacao/cotacaoDoDolar:NaN
        };
    }
    return null;
}

function entradaConsoleInvalida(valor) {
    //YYYYMMDD

    let a, m, d;

    if (valor.length !== 8)
        throw "Erro. Comprimento da data deve ser 8 YYYYMMDD";
    
    a = valor.substr(0, 4);
    if (isNaN(a))
        throw "Erro. O campo 'ANO' não é um número";

    m = valor.substr(4, 2);
    if (isNaN(m))
        throw "Erro. O campo 'MÊS' não é um número";
    
    d = valor.substr(6, 2);
    if (isNaN(d))
        throw "Erro. O campo 'DIA' não é um número";

    return dataInvalida(a, m, d);

}

module.exports = {
    mediaDoDia,
    parametrizarTipoDeMoeda,
    sendDefaultError,
    formatarDataBC,
    nomeDoPaisDeOrigem,
    dataInvalida,
    exibirMenorCotacao,
    entradaConsoleInvalida
}
