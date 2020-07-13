const axios = require('axios');
const { sendDefaultError, parametrizarTipoDeMoeda, mediaDoDia } = require('./util');

const BASE_URL = "https://olinda.bcb.gov.br";

const api = axios.create(
    {
        validateStatus: function(e) {
            return true;
        }
    }
);

/**
 * Funçãoo bc_api()
 * 
 * Recurso para busca.
 * 
 */
async function bc_api(resource, send, functionName) {

    let data;

    data = await api.get(`${BASE_URL}${resource}`, send);

    return new Promise((res, err) => {
       if (data.status!==200)
            return err({error: data.status, reason: "Erro", functionName: functionName});
        return res(data.data);
    })

}

//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda
/**
 * Função consultaTipoDisponivel()
 * 
 * Faz a consulta primária de moedas disponíveis
 */

async function consultaTipoDisponivel() {
    return await bc_api('/olinda/servico/PTAX/versao/v1/odata/Moedas?','$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda', 'consultaTipoDisponivel');
}

//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='JPY'&@dataInicial='11-27-2017'&@dataFinalCotacao='11-27-2017'&$top=10000&$format=json&$select=cotacaoVenda
//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='JPY'&@dataInicial='11-27-2017'&@dataFinalCotacao='11-27-2017'&$top=10000&$format=json&$select=cotacaoVenda

/**
 *  função cotacaoRealDolar()
 *  Os retornos dos valores de outras moedas estao em R$ e precisam ser convetidas para Dolar.
 * 
 *  Essa função retorna a cotação do Dolar no dia da consulta e a conversão é feita no cliente usado a 
 *  função exibirMenorCotacao()
 *
 */
async function cotacaoRealDolar(data_da_consulta) {
    let dado;

    dado = await consultaMoeda('USD', data_da_consulta);

    return new Promise((res, err) => { 
        (dado)?res(parametrizarTipoDeMoeda(mediaDoDia(dado.dado), 'A')):err(dado);
    });
}

/**
 * Função consultaMoeda()
 * 
 * Obtem a(s) consulta(s) da moeda em um determinado periodo. Neste caso em um dia.
 *      moeda: Simbolo da moeda. Ex.: CAD, EUR, etc
 *      data_da_consulta: Ex. '12-27-2017'
 * 
 */

async function consultaMoeda(moeda, data_de_consulta) {
    let dado;

    dado = await api.get(`${BASE_URL}/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${data_de_consulta}'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda`)

    return new Promise((res, err) => {
        if (dado.status!==200)
            return err({error: dado.status, functionName: "consultaMoeda"});

        return (dado.data.value.length)?res({error: 0, reason: "Sucesso", dado: dado.data.value}):err(sendDefaultError(-10, "Dados vazios"));
     })

}
//20100102
module.exports = {
    consultaTipoDisponivel,
    consultaMoeda,
    cotacaoRealDolar
}