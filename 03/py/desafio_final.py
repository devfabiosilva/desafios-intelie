# -*- coding: utf-8 -*-

facts = [
  ('gabriel', 'endereço', 'av rio branco, 109', True),
  ('joão', 'endereço', 'rua alice, 10', True),
  ('joão', 'endereço', 'rua bob, 88', True),
  ('joão', 'telefone', '234-5678', True),
  ('joão', 'telefone', '91234-5555', True),
  ('joão', 'telefone', '234-5678', False),
  ('gabriel', 'telefone', '98888-1111', True),
  ('gabriel', 'telefone', '56789-1010', True),
]

schema = [
    ('endereço', 'cardinality', 'one'),
    ('telefone', 'cardinality', 'many')
]
# Função responsavel pela exclusao de um registro.
# Usado quando o atributo Added? = false
def excluiSeExiste(dados, linhaAExcluir):
    return [dado for dado in dados if not ((dado[0] == linhaAExcluir[0]) and (dado[1] == linhaAExcluir[1]) and (dado[2] == linhaAExcluir[2]))]

# usado em 'one'. Exclui um atributo (se existe) quando a cardinalidade é 'one'
def excluiAtributo(dados, nome, atributo):
    if len(dados):
        return [dado for dado in dados if not ((dado[0] == nome) and (dado[1] == atributo))]
    return dados

# Função usada para verificar se o dado não se repete. Caso não se repita. Retorna true permitindo assim
# adicionar um novo registro
def seNaoExiste(dados, dado):
    for valor in dados:
        if ((valor[0] == dado[0]) and (valor[1] == dado[1]) and (valor[2] == dado[2])):
            return False
    return True

# Função principal de busca de dados dado os parametros
# entrada (dados, schema)
# dados -> Base de dados a ser buscada
# eschma -> Busca a relação e sua cardinalidade
def busca(dados, schema):
    dadoObtido = []
    for dado in dados:
        if (dado[3]): # Verifica se Added = true
            for i in range(2):
                if (dado[1] == schema[i][0]):
                    if (schema[i][2] == 'one'):
                        dadoObtido = excluiAtributo(dadoObtido, dado[0], dado[1])
                    
                    if (seNaoExiste(dadoObtido, dado)):
                        dadoObtido.append(dado)
        else:
            # Se added = false Busca os dados adicionados. Se o dado coincide com um dos valores guardado
            # na variavel dadoObtido este dado será excluido
            dadoObtido = excluiSeExiste(dadoObtido, dado)
    return dadoObtido

def main():
    print(busca(facts, schema))

if __name__ == "__main__":
    main()