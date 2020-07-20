
var facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '98888-1111', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
];

var schema = [
  ['endereço', 'cardinality', 'one'],
  ['telefone', 'cardinality', 'many']
];

// Função responsavel pela exclusao de um registro.
// Usado quando o atributo Added? = false
function excluiSeExiste(dados, linhaAExcluir) {

  return dados.filter((dado) => !((dado[0] === linhaAExcluir[0])&&(dado[1] === linhaAExcluir[1])&&(dado[2] === linhaAExcluir[2])))

}

// usado em 'one'. Exclui um atributo (se existe) quando a cardinalidade é 'one'
function excluiAtributo(dados, nome, atributo) {
  if (dados.length)
    return dados.filter((dado) => {
      return !((dado[0] === nome)&&(dado[1] === atributo))
    });

  return dados;
}

// Função usada para verificar se o dado não se repete. Caso não se repita. Retorna true permitindo assim
// adicionar um novo registro
function seNaoExiste(dados, dado) {

  for (let valor of dados) {
    if ((valor[0] === dado[0])&&(valor[1] === dado[1])&&(valor[2] === dado[2]))
      return false;
  }

  return true;

}

// Função principal de busca de dados dado os parametros
// entrada (dados, schema)
// dados -> Base de dados a ser buscada
// eschma -> Busca a relação e sua cardinalidade
function busca(dados, schema) {
  var dadoObtido = [];
  let i;

  for (let dado of dados) {
    if (dado[3]) { // Verifica se Added = true
        for (i = 0; i < 2; i++) {
          if (dado[1] === schema[i][0]) {
            if (schema[i][2] === 'one')
              dadoObtido = excluiAtributo(dadoObtido, dado[0], dado[1]);

            if (seNaoExiste(dadoObtido, dado))
              dadoObtido.push(dado);
          }
        }

    } else { 
      // Se added = false Busca os dados adicionados. Se o dado coincide com um dos valores guardado
      // na variavel dadoObtido este dado será excluido
      dadoObtido = excluiSeExiste(dadoObtido, dado);
    }
  }

  return dadoObtido;
}
console.log(busca(facts, schema));