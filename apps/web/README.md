# apps/web — vitrine pública

Primeiro pedaço do KmZero no ar: uma vitrine de marketplace no molde do
Ticket Sports (faixa de busca no topo, grade de cartazes), com a busca
que é o diferencial — filtro por lugar, data, distância, tipo, preço,
situação da inscrição, dia e horário, acessibilidade e recursos da prova.

Cobre a tarefa **`H1`** e adianta o esqueleto de **`H2`**/**`H3`**
([`docs/05`](../../docs/05-backlog-de-execucao.md)).

## O que existe hoje

| Arquivo | Papel |
|---|---|
| `index.html` | Busca, grade de eventos com os 6 estados de inscrição, atalhos, os dois lados do produto, rodapé |
| `estilos/tokens.css` | **Cópia de `docs/design/tokens.css`.** Fonte de verdade das cores, tipografia e espaçamento |
| `estilos/material.css` | Camada de componentes Material 3 sobre os tokens do KmZero |
| `estilos/pagina.css` | Layout da página. Nenhum hex: só tokens e `color-mix` sobre eles |
| `js/filtros.js` | Busca, filtros, ordenação, chips de filtro ativo e sincronia com a URL |
| `js/tema.js` | Alternância claro/escuro. Progressive enhancement — o botão só aparece se houver JS |
| `favicon.svg` | Marca em letras, sem o círculo |

HTML e CSS puros, sem build.

## Camada Material 3

`material.css` traz os padrões do Material Design 3 — app bar, text field
com label flutuante, filter chip com check, state layer, elevação, botões
filled/tonal/outlined/text/icon, cards e banner — implementados sobre os
tokens do KmZero.

**Por que não o pacote `@material/web`:** ele exige bundler (só existe na
tarefa `C2`) e carrega Roboto + Material Symbols do Google Fonts, proibido
por `docs/03` §3.2. Os nomes de token são os mesmos do M3
(`--md-primary`, `--md-surface`, `--md-outline`…), então trocar esta folha
pelo pacote oficial depois é religar `--md-*` aos mesmos valores.

Onde o M3 e o design system discordam, o KmZero vence: alvo de 48px em vez
dos 40dp da especificação (§5.2), Inter/system-ui em vez de Roboto (§3.2),
e a paleta própria com contraste medido (§4).

## Estrutura da página

O índice existe para a pessoa **encontrar prova**, então a ordem é:

1. **Busca** — primeira coisa da página, com três provas de valor em uma
   linha logo abaixo
2. **Resultados** — atalhos de filtro, contagem, ordenação e a grade
3. **"A inscrição é a porta"** — a tese do produto em três linhas, depois
   dos resultados: quem veio procurar prova já encontrou; quem rolou até
   aqui quer saber por que este site
4. **Chamada do organizador** — cadastro com o que ele ganha (calendário
   da região, Mapa de Datas, publicação, pontuação de circuito)

A demonstração do **Mapa de Datas** saiu do índice: ela vende para o
organizador, não para o corredor, e o lugar dela é a página de
organizadores (trilha `F`/`M2`).

## Rodar localmente

```sh
npx serve apps/web          # ou
python -m http.server -d apps/web 4321
```

## Como a busca funciona

O `<form method="get">` é de verdade. Cada filtro tem `name`/`value` e
vira parâmetro de URL — `?uf=SP&dist=21&situacao=abertas` abre a página
com esses filtros já marcados, e a URL é reescrita a cada mudança, então
uma busca é compartilhável por link.

**Com JavaScript:** filtra e ordena na hora, sobre os cartões que já
estão no HTML. Dentro de um grupo a relação é **OU** (10 km *ou* 21 km);
entre grupos é **E**.

**Sem JavaScript:** o formulário envia normalmente e recarrega a página
com os filtros na query string. A filtragem no servidor é a tarefa `H3`
— até lá, sem JS a lista volta completa.

### Filtros disponíveis

| Grupo | Opções |
|---|---|
| Texto | Nome da prova, cidade ou estado — busca sem acento também acha |
| Onde | Estado |
| Quando | 7 dias, 30 dias, 3 meses, este ano, provas que já aconteceram |
| Distância | Kids, caminhada, 5, 10, 21, 42 km, ultra |
| Tipo e terreno | Circuito, corrida · rua, trail, pista |
| Preço | Gratuito, até R$ 60, R$ 60–120, acima de R$ 120 |
| Situação | Abertas, últimas inscrições, abrem em breve, esgotadas, encerradas, já aconteceram |
| Dia e horário | Sábado, domingo, manhã, tarde, noite |
| Acessibilidade | Cadeirante, com atleta-guia, surdoatleta, deficiência intelectual |
| A prova tem | Chip, percurso medido, kit, classificação por equipe, resultado no KmZero |

Os seis últimos ficam dobrados em **Mais filtros**, com um contador do
que está ligado ali dentro — filtro ativo escondido atrás de painel
fechado é como listagem curta vira mistério.

## O card de prova

Todos os cards têm **exatamente o mesmo desenho interno** — cartaz, título
(duas linhas reservadas), três linhas de metadado, preço e estado ocupam a
mesma altura em todos. Campo sem conteúdo fica vazio ocupando espaço, para a
vitrine ser uma grade regular.

| Estado | Cor |
|---|---|
| Inscrições abertas | Verde (sucesso) |
| Últimas inscrições | Amarelo (alerta) |
| Esgotado · Inscrições encerradas | Vermelho (perigo) |
| Inscrições em breve | Cinza (neutro) |
| Resultados no ar | Teal (primária) |

Cada um vem com cor **e** ícone **e** texto — cor nunca é o único portador
(`docs/03` §4.6).

**Número de vagas nunca aparece** — nem o total, nem quantas restam. É
premissa de produto (`docs/03` §6-B): contador de vagas cria expectativa que
o sistema pode não honrar e vira informação errada na tela do atleta. Ao lado
do preço vai uma informação complementar curta da inscrição — "lote único",
"as 5 etapas", "2 latas de leite em pó" — ou nada.

O coração de favoritar usa `--cor-favorito` (rosa), fora das semânticas de
status: favoritar é "amei", não erro.

## Dados de demonstração

As nove provas do HTML **são inventadas** e estão marcadas como
demonstração na própria página. Servem para mostrar a busca e os seis
estados de inscrição funcionando. Elas somem quando `H3` ligar a
listagem ao banco (`D4`).

## Sincronia dos tokens

`estilos/tokens.css` é **cópia byte a byte** de `docs/design/tokens.css`:

```sh
diff docs/design/tokens.css apps/web/estilos/tokens.css
```

Quando a tarefa `C4` integrar os tokens ao build, a cópia sai.

### Tokens locais desta folha

`pagina.css` declara tokens próprios — `--faixa-fundo`,
`--faixa-texto`, `--cartaz-a/b` — porque os tokens de marca **invertem**
entre claro e escuro (`--cor-primaria-900` é escuro no claro e claro no
escuro). A faixa de busca e os cartazes precisam ser escuros nos dois
modos: uma faixa clara e saturada no modo escuro vibra (`docs/03` §4.3).

## Pendências conhecidas

| Item | Estado | Onde entra |
|---|---|---|
| Fonte Inter autohospedada | ❌ — hoje cai no fallback `system-ui` | `docs/03` §3.2 proíbe Google Fonts; é download + `@font-face` |
| Listagem vinda do banco | ❌ | `H3`, depende de `D4` |
| Página do evento por `slug` | ❌ | `H4` — hoje o nome do cartão aponta para a própria lista |
| Favoritar de verdade | ❌ — o coração só alterna o estado visual | `H6`, depende de `G2` (conta) |
| Imagem do evento | ❌ — o cartaz é um gradiente com data e distância | Entra com `D4` + R2 |
| Cidade e raio em km na busca | ❌ — hoje o filtro de lugar para no estado | Precisa de geocodificação; avaliar em `H3` |
| Política de privacidade e termos | ❌ | `B7` |
| Deploy no Cloudflare Pages | ❌ | `C1`/`C3` |
| Página de organizadores | ❌ — os dois botões da chamada apontam para o rodapé | Trilha `M`; é onde o Mapa de Datas volta |

## Checklist de acessibilidade aplicado

Itens de `docs/03` §8 verificáveis nesta página:

- **1** — `<meta viewport>` sem `maximum-scale` nem `user-scalable=no`
- **3/4** — só cores dos tokens; bordas de campo em `--cor-borda-forte` (3.66:1)
- **5** — foco visível herdado de `tokens.css`; chip e campo têm anel
  próprio, porque o controle real fica invisível sob a superfície
- **7** — alvo mínimo de 48px em chip, botão, coração e navegação (o M3 pede 40dp; aqui vale a §5.2)
- **8** — cada estado de inscrição tem cor **e** ícone **e** texto; o chip
  marcado muda cor, peso **e** ganha o check do M3
- **10** — a contagem de resultados é `aria-live="polite"`
- **11** — um `<h1>`, hierarquia sem salto, tudo dentro de
  `header`/`main`/`footer`
- **12** — todo campo tem `<label>` visível: o label flutuante do M3 sobe,
  nunca some
- **16** — `prefers-reduced-motion` respeitado via `tokens.css`
