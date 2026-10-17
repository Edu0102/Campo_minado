# Campo Minado

Uma implementação web simples do jogo Campo Minado, desenvolvida com HTML, CSS e JavaScript puros.

## Como executar

Abra o arquivo `campominado.html` em um navegador.

## Estado atual

- Tabuleiro de 9 × 9 células.
- 9 minas distribuídas aleatoriamente a cada carregamento.
- Contagem de minas nas oito células vizinhas.
- Clique esquerdo revela uma célula.
- Células vazias revelam automaticamente as células vizinhas.
- Ao revelar uma mina, o jogo termina e todas as minas são reveladas.
- As células reveladas exibem números coloridos conforme a quantidade de minas adjacentes.
- Contagem visual de Flags

## Controles

| Ação               | Comando                               |
|                    |                                       |
| Revelar uma célula | Clique esquerdo                       |
| Marcar uma célula  | Clique direito *(em desenvolvimento)* |

## Estrutura do projeto

- `campominado.html` — estrutura da página.
- `campominado.css` — estilos do tabuleiro e das células.
- `campominado.js` — regras e interação do jogo.

## Coisas para implementar


- Botão de Reset
- painel de opções
- Escolha da dificuldade (seletor, com botão aplicar)
    - fácil 9 x 9 casas com 10 minas 
    - médio 16 x 16 casas com 40 minas
    - difícil 30 x 16 casas com 99 minas
    - custom 
    - verificador se ganhou 
- créditos