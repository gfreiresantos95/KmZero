# 03 — Design System KmZero

> Design fundamentado no público, não em preferência estética.
> **Todo valor de contraste neste documento foi calculado, não estimado.** Fórmula WCAG 2.2, relação de luminância relativa.
> Código pronto: [`design/tokens.css`](design/tokens.css) · [`design/tailwind.config.js`](design/tailwind.config.js)

---

## 1. Quem usa isto

O design não começa numa paleta. Começa aqui:

| Fato | Consequência de design |
|---|---|
| Categorias oficiais até **80+** (14 faixas etárias, A–N) | Presbiopia é a norma, não a exceção. Base tipográfica de **18px**, não 16 |
| **8 categorias PCD** (O–V): cadeirante, deficiência visual com atleta-guia, surdoatleta, deficiência intelectual | Leitor de tela funcional, cor nunca como único portador de informação, linguagem simples |
| Uso principal: **celular, na rua, com sol, antes ou depois de correr 10 km** | Contraste alto, alvos grandes, nada de interação fina |
| Frequência de uso: **~5 vezes por ano** | Zero memória de interface pode ser exigida. Nada é "óbvio" para quem volta em 3 meses |
| O momento mais crítico dura **minutos** (abertura de vaga) e é **coletivo** | A ação principal precisa ser inconfundível e única na tela |
| Comunidade de **39 anos** | Reconhecer permanência é função, não enfeite |

**Uma frase que resolve 80% das decisões:** *se a tela não funciona para uma pessoa de 72 anos, com sol batendo, sem óculos de leitura, na calçada, ela não está pronta.*

### 1.1 O segundo público

O produto tem **dois lados**, e eles não usam a mesma coisa:

| | Participante | Organizador |
|---|---|---|
| Dispositivo | Celular, quase sempre | Desktop, quase sempre |
| Contexto | Na rua, em movimento, com pressa | Sentado, trabalhando |
| Frequência | ~5–10 vezes por ano | Semanal durante a operação do evento |
| Precisa de | Clareza e conforto | Clareza **e densidade** |
| Tolerância a complexidade | Zero | Alta — é ferramenta de trabalho |

**A marca é uma; a densidade não.** Mesmos tokens, mesma paleta, mesmas regras de acessibilidade — parâmetros diferentes de tipografia e alvo de toque. As especificações do console estão na §6-C, as da vitrine pública na §6-B.

O que **não** muda entre os lados: contraste, foco visível, navegação por teclado, alternativa textual de gráfico. Acessibilidade não é feature do lado atleta.

---

## 2. Os quatro princípios

Cada um amarrado a um achado do documento de descoberta.

### 1. Devolver dado é a função
> *Contra a §2.4.1 — "21 campos entram, zero saem"*

Toda tela responde à pergunta *"o que eu ganhei?"*. Nenhum formulário existe sem uma contrapartida visível. Se uma tela só pede, ela está errada.

**Na prática:** depois de qualquer envio de dado, o produto mostra imediatamente o que aquilo destravou. Confirmou presença? Mostra a etapa entrando no calendário e a projeção de pontos.

### 2. Um toque no momento crítico
> *Contra a §2.4.3 — CAPTCHA no exato momento de maior pressão*

Durante a janela de confirmação, existe **um** elemento dominante na tela e **uma** ação possível. Nada compete com ele. Zero CAPTCHA. Zero campo a preencher. Zero rolagem para encontrá-lo.

**Na prática:** o `ConfirmacaoCard` ocupa a primeira dobra, com no mínimo 96px de altura de área tocável, e todo o resto da interface reduz o próprio peso visual enquanto a janela está aberta.

### 3. Nunca esconder o estado
> *Contra a §2.4.4 — ausência de contador de vagas*

Vagas restantes, prazo, pendências, posição no processo — sempre visíveis, sempre atualizados, sempre em texto além da cor. O atleta nunca descobre algo tentando.

**Na prática:** `StatusInscricao` é persistente no topo, não um modal. O contador regressivo mostra tempo restante em palavras (*"faltam 2 dias e 4 horas"*), não só números.

### 4. Legível a 70 anos, com sol, na rua
> *Contra a §2.5 — `user-scalable=no` bloqueando zoom por pinça*

Contraste e tamanho são requisito verificado, não preferência. **O zoom por pinça é permitido — sempre.** É a regressão mais grave do sistema atual e não pode se repetir.

**Na prática:** `<meta name="viewport" content="width=device-width, initial-scale=1">` — sem `maximum-scale`, sem `user-scalable=no`. Isso é regra de lint, não de bom senso.

---

## 3. Tipografia

### 3.1 A decisão da base

**Base de 18px**, não os 16px convencionais. Uma escolha de 12,5% a mais que atende o público sem exigir que ninguém use recurso de acessibilidade.

O sistema atual resolve isso com botões A+/A− — paradigma de 2010. A tipografia deve ser confortável **antes** de qualquer ajuste. Os botões de ajuste continuam existindo, mas como refinamento, não como conserto.

### 3.2 Famílias

| Papel | Família | Por quê |
|---|---|---|
| Interface e texto | **Inter** (variável) | Alturas de x generosas, `1`/`l`/`I` distinguíveis, ótima em tamanhos pequenos, `font-variant-numeric: tabular-nums` |
| Números de destaque | **Inter** com `tabular-nums` + `feature-settings: 'ss01'` | Tempos e posições não podem dançar entre linhas na tabela de classificação |

Fonte autohospedada (subset latin + latin-ext) via Cloudflare Pages. **Sem Google Fonts** — uma requisição a menos, um risco de LGPD a menos, um ponto de falha a menos com conexão ruim no dia da prova.

### 3.3 Escala

Escala modular de razão 1,2 (terça menor) — conservadora de propósito: hierarquia clara sem saltos que desperdicem tela no celular.

| Token | rem | px (base 18) | Uso | Peso | Altura de linha |
|---|---|---|---|---|---|
| `--txt-3xs` | 0.694 | 12,5 | Rótulo de eixo de gráfico. **Único tamanho abaixo de 14px permitido**, e só para dado não essencial | 500 | 1.4 |
| `--txt-2xs` | 0.833 | 15 | Metadado, legenda | 500 | 1.45 |
| `--txt-xs` | 0.9 | 16,2 | Texto secundário | 400 | 1.5 |
| `--txt-base` | 1 | **18** | **Corpo de texto. O padrão.** | 400 | 1.6 |
| `--txt-lg` | 1.2 | 21,6 | Subtítulo, item de lista importante | 500 | 1.5 |
| `--txt-xl` | 1.44 | 25,9 | Título de seção | 600 | 1.35 |
| `--txt-2xl` | 1.728 | 31,1 | Título de página | 700 | 1.25 |
| `--txt-3xl` | 2.074 | 37,3 | Número-herói (pontos, tempo, distância) | 700 | 1.1 |
| `--txt-4xl` | 2.488 | 44,8 | Contador regressivo da janela | 800 | 1 |

### 3.4 Regras não negociáveis

- **Nunca abaixo de 15px** para texto lido. `--txt-3xs` só em rótulo de eixo
- **Medida de leitura** máxima de 66 caracteres (`max-inline-size: 66ch`)
- **Sem texto em maiúsculas** em blocos maiores que 3 palavras — caixa alta destrói o formato da palavra, que é o principal apoio de leitura de quem lê com dificuldade
- **Números sempre tabulares** em tabelas, tempos e classificações
- **Peso mínimo 400.** Nada de `font-weight: 300` — pesos leves somem com sol na tela

---

## 4. Cor

### 4.1 A paleta e o que ela significa

**Primária — Maré (teal profundo).** Santos é cidade litorânea e o azul-esverdeado profundo carrega três coisas ao mesmo tempo: água, credibilidade institucional (o KmZero vai sentar com secretarias) e legibilidade excelente sobre branco. Não é o azul genérico de dashboard.

**Acento — Largada (laranja queimado).** Reservado quase inteiramente para **ação e urgência**. É a cor do `ConfirmacaoCard`, do contador regressivo, do botão que não pode ser perdido. Usar laranja em qualquer outro lugar enfraquece o único lugar em que ele importa.

### 4.2 Modo claro — contrastes medidos

| Token | Hex | Sobre | Contraste | Nível | Uso |
|---|---|---|---|---|---|
| `--cor-fundo` | `#FFFFFF` | — | — | — | Fundo da página |
| `--cor-superficie` | `#F4F7F9` | — | — | — | Cards, painéis |
| `--cor-texto` | `#111820` | fundo | **17.87:1** | AAA | Texto principal |
| `--cor-texto` | `#111820` | superfície | **16.61:1** | AAA | Texto em card |
| `--cor-texto-suave` | `#4B5763` | fundo | **7.39:1** | AAA | Texto secundário |
| `--cor-texto-suave` | `#4B5763` | superfície | **6.87:1** | AA | Texto secundário em card |
| `--cor-texto-fraco` | `#68737F` | fundo | **4.83:1** | AA | Metadado, timestamp |
| `--cor-primaria-700` | `#0A4E5C` | fundo | **9.30:1** | AAA | Link, texto de marca |
| `--cor-primaria-600` | `#0C6070` | fundo | **7.19:1** | AAA | Fundo de botão primário |
| `--cor-primaria-500` | `#0E7A8C` | fundo | **5.02:1** | AA | Ícone, borda ativa |
| `--cor-acento-700` | `#9A3E00` | fundo | **6.86:1** | AA | Texto de urgência |
| `--cor-acento-600` | `#B84A00` | fundo | **5.23:1** | AA | Fundo de botão de ação crítica |
| `--cor-acento-500` | `#E05E00` | fundo | **3.64:1** | AA-large / UI | **Só decoração e texto ≥24px.** Nunca corpo de texto |
| `--cor-sucesso-700` | `#0E6B3A` | fundo | **6.60:1** | AA | Confirmado, concluído |
| `--cor-alerta-700` | `#8A5200` | fundo | **6.39:1** | AA | Pendência, atenção |
| `--cor-perigo-700` | `#A81E14` | fundo | **7.34:1** | AAA | Erro, prazo expirado |
| `--cor-favorito` | `#C2185B` | fundo | **5.87:1** | AA | Coração de favoritar — 5.46:1 sobre superfície |
| `--cor-borda` | `#DDE3E9` | fundo | 1.31:1 | decorativo | Divisórias sem função semântica |
| `--cor-borda-forte` | `#7B8794` | fundo | **3.66:1** | AA (UI 1.4.11) | **Borda de campo, checkbox, contorno de componente** |

**Branco sobre fundos coloridos** (texto de botão):

| Par | Contraste | Nível |
|---|---|---|
| `#FFFFFF` sobre `--cor-primaria-700` `#0A4E5C` | **9.30:1** | AAA |
| `#FFFFFF` sobre `--cor-primaria-600` `#0C6070` | **7.19:1** | AAA |
| `#FFFFFF` sobre `--cor-acento-700` `#9A3E00` | **6.86:1** | AA |
| `#FFFFFF` sobre `--cor-acento-600` `#B84A00` | **5.23:1** | AA |
| `#FFFFFF` sobre `--cor-sucesso-700` `#0E6B3A` | **6.60:1** | AA |
| `#FFFFFF` sobre `--cor-alerta-700` `#8A5200` | **6.39:1** | AA |
| `#FFFFFF` sobre `--cor-perigo-700` `#A81E14` | **7.34:1** | AAA |

**Chips e badges** (texto escuro sobre tinta clara):

| Chip | Texto / Fundo | Contraste |
|---|---|---|
| Primário | `#0A4E5C` / `#D6EEF3` | **7.70:1** AAA |
| Acento | `#9A3E00` / `#FFE7D6` | **5.76:1** AA |
| Sucesso | `#0E6B3A` / `#D6F2E1` | **5.54:1** AA |
| Perigo | `#A81E14` / `#FBE0DE` | **5.88:1** AA |
| Alerta | `#8A5200` / `#FBEDD0` | **5.51:1** AA |

### 4.3 Modo escuro — contrastes medidos

Não é inversão. Fundos dessaturados e cores de marca clareadas, porque cor saturada sobre preto vibra e cansa.

| Token | Hex | Sobre | Contraste | Nível |
|---|---|---|---|---|
| `--cor-fundo` | `#0B1117` | — | — | — |
| `--cor-superficie` | `#141C24` | — | — | — |
| `--cor-texto` | `#E8EDF2` | fundo | **16.11:1** | AAA |
| `--cor-texto` | `#E8EDF2` | superfície | **14.60:1** | AAA |
| `--cor-texto-suave` | `#A3B0BC` | fundo | **8.58:1** | AAA |
| `--cor-texto-suave` | `#A3B0BC` | superfície | **7.77:1** | AAA |
| `--cor-texto-fraco` | `#7E8B98` | fundo | **5.45:1** | AA |
| `--cor-primaria-300` | `#5BC5D8` | fundo | **9.42:1** | AAA |
| `--cor-primaria-300` | `#5BC5D8` | superfície | **8.53:1** | AAA |
| `--cor-acento-300` | `#FF9E5C` | fundo | **9.30:1** | AAA |
| `--cor-acento-300` | `#FF9E5C` | superfície | **8.43:1** | AAA |
| `--cor-sucesso-300` | `#4ED07E` | fundo | **9.62:1** | AAA |
| `--cor-alerta-300` | `#F2B33D` | fundo | **10.20:1** | AAA |
| `--cor-perigo-300` | `#FF8A80` | fundo | **8.31:1** | AAA |
| `--cor-favorito` | `#FF8FB1` | fundo | **8.87:1** | AAA |
| `--cor-borda` | `#232D37` | fundo | 1.42:1 | decorativo |
| `--cor-borda-forte` | `#5C6975` | fundo | **3.37:1** | AA (UI 1.4.11) |

Texto escuro sobre botões claros no modo escuro: `#0B1117` sobre `#5BC5D8` = **9.42:1** (AAA); sobre `#FF9E5C` = **9.30:1** (AAA).

**Por que `--cor-favorito` existe e não é uma cor de status:** favoritar não é sucesso, alerta nem erro — usar vermelho de perigo num coração diz "algo deu errado" quando o gesto é "quero este". O rosa fica fora das semânticas de propósito, e é a única cor do sistema que não carrega estado do sistema, e sim intenção da pessoa.

### 4.4 Paleta de dados — categórica

**Quatro séries. Não existe uma quinta.**

Esse número não é escolha estética: é o que sobrevive à verificação de daltonismo. A paleta foi validada em **todos os pares** (não só nos adjacentes), nas duas superfícies e nos dois modos. Tentativas com 5 e 6 séries reprovaram — verde colide com laranja na deuteranopia (ΔE 5.8), e dourado colide com verde (ΔE 1.9) e com vermelho (ΔE 1.3). Nenhuma reordenação salva.

| Slot | Claro | Escuro | Uso convencionado — **fixo** |
|---|---|---|---|
| 1 | `#0098B5` | `#1E9DB6` | **Você.** Sempre. Em qualquer gráfico |
| 2 | `#E06A00` | `#DC7020` | Comparação principal / rival |
| 3 | `#C43A7E` | `#D6427A` | Mediana ou média da categoria |
| 4 | `#5B5BD6` | `#7570E0` | Quarta série |

**Resultado da validação:**

| Verificação | Claro (sobre `#FFFFFF` e `#F4F7F9`) | Escuro (sobre `#0B1117` e `#141C24`) |
|---|---|---|
| Banda de luminosidade | ✅ todas em L 0.43–0.77 | ✅ todas em L 0.48–0.67 |
| Piso de croma | ✅ todas ≥ 0.1 | ✅ todas ≥ 0.1 |
| Separação para daltonismo | ✅ pior par **8.5** (deutan) / 9.3 (tritan) | ✅ pior par **9.4** (deutan) / 6.7 (tritan) |
| Piso de visão normal | ✅ pior par **18.4** | ✅ pior par **15.8** |
| Contraste vs superfície | ✅ todas ≥ 3:1 | ✅ todas ≥ 3:1 |

O modo escuro **não é inversão nem clareamento** da paleta clara: são passos próprios, mais escuros (banda L 0.48–0.67 contra 0.43–0.77). Marca clara demais sobre fundo escuro vibra e cansa.

**Regras:**

- **Ordem fixa, nunca ciclada.** A cor segue a entidade, nunca o ranking. Filtrar séries não repinta as que sobraram
- **Precisa de mais de 4 séries?** Vire small multiples, ou agregue o excedente em "Outros" em cinza neutro. **Nunca gere uma 5ª cor**
- **Legenda sempre presente** com 2+ séries, e rotulação direta nas 4. Identidade nunca é só cor
- **Cores de status** (sucesso/alerta/perigo) são reservadas — nunca viram "série 5"
- **Texto usa token de texto**, nunca a cor da série. A marca colorida ao lado é que carrega a identidade

### 4.5 Rampa sequencial — magnitude

Para o **Mapa de Datas** (densidade de provas por dia) e heatmaps de participação. Uma matiz só, luminosidade monotônica.

| Passo | Claro | Escuro | Significado |
|---|---|---|---|
| 0 | `#E9EEF2` | `#1D2731` | Zero — **neutro, nunca a matiz** |
| 1 | `#66C0D3` | `#1E5966` | Menor |
| 2 | `#39A3BC` | `#217A8D` | |
| 3 | `#17859C` | `#249BB3` | |
| 4 | `#0A6577` | `#4FBDD1` | |
| 5 | `#064854` | `#8ADAE6` | Maior |

Validação: monotonicidade ✅ · gaps de L ✅ · extremo claro 2.09:1 vs branco ✅ · matiz única (dispersão 4°) ✅.

**Nunca arco-íris para magnitude.** E o zero recebe cinza neutro, não o passo mais claro da matiz — "nenhuma prova neste dia" é categoricamente diferente de "poucas provas".

### 4.6 As três regras de cor

1. **Cor nunca é o único portador de informação.** O CSP tem categorias oficiais de deficiência visual (P) — isso não é boa prática abstrata, é o público literal. Toda cor semântica vem acompanhada de ícone **e** texto. Status confirmado = verde **+** ✓ **+** a palavra "Confirmado"
2. **Laranja é sagrado.** Só ação crítica e urgência. Se aparecer em três lugares na mesma tela, dois estão errados
3. **Séries de gráfico são distinguíveis também em escala de cinza.** Testar convertendo para preto e branco; se duas séries somem, mudar forma do marcador ou estilo do traço

---

## 5. Espaçamento, alvo de toque e layout

### 5.1 Grade de 4px

| Token | Valor | Uso |
|---|---|---|
| `--esp-1` | 4px | Ajuste fino entre ícone e rótulo |
| `--esp-2` | 8px | Interno de chip |
| `--esp-3` | 12px | Entre elementos relacionados |
| `--esp-4` | 16px | Padrão interno de componente |
| `--esp-5` | 20px | Interno de card |
| `--esp-6` | 24px | Entre blocos |
| `--esp-8` | 32px | Entre seções |
| `--esp-12` | 48px | Entre grandes blocos |
| `--esp-16` | 64px | Respiro de topo/base de página |

### 5.2 Alvo de toque: 48×48px mínimo

WCAG 2.2 AA exige 24×24 (critério 2.5.8). **Este produto usa 48×48**, dobro do mínimo. Justificativa que não é generosidade gratuita:

- Público com tremor, artrite e dedo em movimento
- Uso literalmente enquanto se caminha, com o celular numa mão
- O momento crítico não admite errar o alvo

| Elemento | Mínimo |
|---|---|
| Botão primário | 56px de altura |
| Botão secundário / ícone | 48×48 |
| Item de lista tocável | 56px |
| Checkbox / radio (área tocável) | 48×48 (visual 24×24) |
| **`ConfirmacaoCard` — ação principal** | **96px de altura, largura total** |
| Espaço entre alvos adjacentes | 8px mínimo |

### 5.3 Layout

Mobile-first sem exceção. Breakpoints em `em` para respeitar o zoom do usuário:

| Nome | Valor | Alvo |
|---|---|---|
| `sm` | 30em (480px) | Celular grande |
| `md` | 48em (768px) | Tablet |
| `lg` | 64em (1024px) | Desktop |
| `xl` | 80em (1280px) | Desktop largo |

Largura máxima de conteúdo: `--largura-conteudo: 68rem`. Texto corrido: `66ch`.

### 5.4 Raio e elevação

| Token | Valor | Uso |
|---|---|---|
| `--raio-sm` | 6px | Chip, badge |
| `--raio-md` | 10px | Botão, campo |
| `--raio-lg` | 16px | Card |
| `--raio-xl` | 24px | `ConfirmacaoCard`, modal |
| `--raio-full` | 9999px | Avatar, numeral |

Elevação com moderação — **três níveis, não seis**. Sombra colorida (base do teal) em vez de preto puro, que suja o modo claro.

---

## 6. Biblioteca de componentes

### 6.1 `ConfirmacaoCard` — o componente mais importante do produto

Se só um componente for bem feito, é este. Cada janela de confirmação perdida é um atleta fora do campeonato.

**Anatomia:**
```
┌──────────────────────────────────────────────┐
│  ⏱  A JANELA ESTÁ ABERTA          ← rótulo   │  --txt-2xs, caixa alta OK (2 palavras)
│                                               │
│  3ª Etapa · Zona Noroeste                    │  --txt-lg, 500
│  Domingo, 13 de setembro                     │  --txt-base, texto-suave
│                                               │
│  Faltam 2 dias e 4 horas                     │  --txt-4xl, acento-700, aria-live
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │   CONFIRMAR MINHA PRESENÇA             │  │  96px, acento-600, branco 5.23:1
│  └────────────────────────────────────────┘  │
│                                               │
│  Se não confirmar até domingo 23h59,         │  --txt-xs, texto-suave
│  você fica fora desta etapa.                 │  ← consequência explícita, sem eufemismo
└──────────────────────────────────────────────┘
```

**Estados:**

| Estado | Aparência | Regra |
|---|---|---|
| `fechada-antes` | Superfície neutra, contagem para a abertura | Informativo, não acionável |
| `aberta` | Acento, no topo, dominante | **Todo o resto da UI baixa o peso visual** |
| `aberta-urgente` (< 6h) | Acento-700, contagem em horas e minutos, `aria-live="assertive"` | Uma única escalada de urgência — mais que isso vira ruído |
| `confirmada` | Sucesso-700, ✓, contagem substituída pela data confirmada | **Celebra**: "Você está dentro da 3ª etapa" |
| `perdida` | Perigo, com **caminho de volta explícito** | Nunca deixar sem saída: mostra o que fazer para reentrar |
| `carregando` | Skeleton, nunca spinner solto | Preserva altura — sem salto de layout |

**Regras invioláveis:**
- Uma ação. Nenhum campo. Nenhum CAPTCHA. Nenhum modal antes da ação
- Sempre na primeira dobra durante a janela
- Contagem regressiva **em palavras**, com o valor numérico como complemento — *"Faltam 2 dias e 4 horas"*, não `2d 04h 13m 22s`
- A consequência de não agir está escrita, sempre. O regulamento é duro; esconder isso não protege ninguém

### 6.2 `VagasCounter`

```
┌──────────────────────────────────────┐
│ 1.247 de 2.000 vagas                 │  --txt-xl, tabular
│ ████████████░░░░░░░░  62%            │  barra + número + texto
│ Atualizado agora                     │  --txt-2xs
└──────────────────────────────────────┘
```

- `aria-live="polite"`, atualização a cada 5 s **via SSE, não polling** (ver `02` §2.2)
- Número **e** barra **e** percentual — três codificações da mesma informação
- Estados: `abundante` (>50%, primária) · `escasso` (10–50%, alerta) · `critico` (<10%, perigo + `aria-live="assertive"`) · `esgotado` (com fila e posição visível)

### 6.3 `StatusInscricao`

Corrige a §2.4 da descoberta: *"o atleta não sabe em que estágio do processo de 2 fases ele está"*.

```
 ●━━━━━━━━●━━━━━━━━○
Pré-      Validado  Confirmado
inscrito  na SEMES  na 3ª etapa
   ✓         ✓         !
```

- Sempre visível no topo da área do atleta, **nunca em modal**
- Cada etapa: ícone + rótulo + estado textual
- Pendências mostram **o que fazer**, não só que existem: *"Leve 2 latas de leite em pó à SEMES até 12/09"*

### 6.4 Demais componentes

| Componente | Função | Nota de design |
|---|---|---|
| `ResultadoRow` | Uma linha de resultado: etapa, tempo, posição, pontos | Números tabulares; PB marcado com ícone **e** rótulo "Melhor tempo" |
| `EvolucaoChart` | Evolução de tempo/pace ao longo das etapas e anos | **Alternativa textual obrigatória** — tabela equivalente acessível por `<details>`. Sem alternativa textual, o gráfico não vai ao ar |
| `AgeGradeBadge` | Percentual de age grading | Sempre acompanhado de explicação em uma linha: *"Comparado ao recorde mundial da sua idade e sexo"*. Métrica abstrata precisa de legenda permanente |
| `ConquistaBadge` | Marcos (10/25/50/100 etapas, temporada completa) | Estilo de **selo bordado**, não de troféu de videogame. O público tem 39 anos de campeonato — o tom é medalha comemorativa, não gamificação infantil |
| `RankingTable` | Classificação geral / categoria / equipe | Linha do próprio atleta **fixa e destacada** ao rolar. Gap para o próximo em texto: *"12 pontos do 3º lugar"* |
| `PercursoComparativo` | O mesmo percurso ao longo dos anos | O CSP repete locais (Rebouças, Zona Noroeste, Gonzaga) — é o comparativo mais justo que existe |
| `NumeralCard` | Numeral, categoria, equipe, foto | O numeral é a identidade permanente (§9 da descoberta). Trata-se como carteirinha, não como campo de formulário |
| `ImpactoSocial` | Latas de leite doadas ao Fundo Social | Métrica que **nenhuma plataforma no mundo tem**. Merece destaque de primeira classe |

---

---

## 6-B. Superfície de descoberta (o participante antes do login)

A vitrine pública é a primeira coisa que qualquer pessoa vê. Ela precisa funcionar **sem login e sem JavaScript** (estático), porque é também a porta de entrada de busca orgânica.

### `EventoCard`

O componente mais repetido do produto. Aparece em listagem, busca, favoritos e resultados.

```
┌──────────────────────────────────────────────┐
│ [imagem 16:9]                          ♥     │  favoritar: alvo 48×48, canto
├──────────────────────────────────────────────┤
│ CIRCUITO · 5 ETAPAS          ← tipo, chip    │  --txt-2xs, chip primária
│ 40º Campeonato Santista                      │  --txt-lg, 600
│ de Pedestrianismo                            │
│                                               │
│ 📍 Santos, SP    📅 15 mar – 22 nov           │  --txt-xs, texto-suave
│ 🏃 10 km · 5 km                               │
│                                               │
│ Gratuito                    847 vagas         │  preço em --txt-lg 700
│ (2 latas de leite)          restantes         │  ou "A partir de R$ 80"
│                                               │
│ ┌──────────────────────────────────────────┐ │
│ │  INSCRIÇÕES ABREM EM 12 DIAS             │ │  estado, não botão morto
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

**Estados de inscrição** — cada um com cor **e** ícone **e** texto:

| Estado | Tratamento | Ação |
|---|---|---|
| `em_breve` | Neutro + data | ♥ Favoritar — *"avisamos quando abrir"* |
| `abertas` | **Verde** (sucesso) + ✓ + "Inscrições abertas" | Inscrever-se |
| `ultimas_vagas` (<10%) | **Amarelo** (alerta) + ⚠ + "Últimas inscrições" | Inscrever-se, com urgência |
| `esgotado` | **Vermelho** (perigo) + ✕ + "Esgotado" | ♥ Avisar se abrir vaga |
| `encerradas` | **Vermelho** (perigo) + ⏱ + "Inscrições encerradas" | Ver resultados |
| `realizado` | **Primária** (teal) + 🏆 + "Resultados no ar" | Ver resultados / meu resultado |

**Regras:**
- **Modo Circuito e Modo Prova usam o mesmo card**, diferenciados pelo chip de tipo. Duas aparências separadas quebrariam a leitura da vitrine
- Preço sempre visível na listagem, incluindo "Gratuito", e **sempre em uma linha só**: `Gratuito` · `R$ 60` · `R$ 90 – 120`. Descobrir o preço só no checkout é prática que o produto não adota
- **Nunca exibir número de vagas — nem o total, nem quantas restam.** É premissa de produto. Contador de vagas cria expectativa que o sistema pode não honrar (reserva vencida, importação atrasada, lote reaberto) e vira informação errada na tela do atleta. O lugar do número é o painel do organizador, não a vitrine. O estado `ultimas_vagas` avisa da urgência **sem quantificá-la**
- Ao lado do preço vai **uma informação complementar curta** da inscrição — "lote único", "as 5 etapas", "2 latas de leite em pó". Se não houver nenhuma, **o campo fica vazio mas mantém a altura**
- **Todos os cards têm exatamente o mesmo desenho interno.** Cartaz, título (duas linhas reservadas), três linhas de metadado, preço e estado ocupam a mesma altura em todos. Campo sem conteúdo permanece vazio ocupando espaço — a vitrine é uma grade regular, não um mosaico
- O rótulo de tipo é **"Corrida"** para prova de uma etapa e **"Circuito"** para as de várias. "Prova avulsa" é vocabulário interno e não aparece para o público
- O coração de favoritar é acionável **sem login** — pede a conta no momento do clique, não antes. Pedir cadastro para favoritar mata a conversão

### `FiltroBar`

Uma linha, acima da listagem, nesta ordem: **local → data → distância → tipo (circuito/prova) → preço**. No celular vira um botão "Filtrar" com folha inferior (bottom sheet). Filtros ativos aparecem como chips removíveis — o usuário nunca fica sem saber por que a lista está curta.

### `FavoritoToggle`

Pequeno, mas é o motor de retenção do lado participante: é o gatilho da notificação de abertura de inscrição.

- Estados: `inativo` · `ativo` · `carregando` · `deslogado` (abre login com a intenção preservada)
- Ao ativar pela primeira vez: microcopy explicando o benefício — *"Avisamos assim que as inscrições abrirem"* — e o pedido de permissão de push **aqui**, que é um momento de valor real

---

## 6-C. Console do organizador

Público completamente diferente: usa em desktop, no trabalho, com frequência semanal, e precisa de densidade de informação — o oposto do lado atleta. **O design system é o mesmo; a densidade não.**

| Parâmetro | Lado atleta | Console do organizador |
|---|---|---|
| Base tipográfica | 18px | **16px** — densidade importa mais que conforto de leitura ocasional |
| Alvo de toque | 48px | 40px (uso com mouse) |
| Densidade de tabela | Confortável | Compacta, com alternância de densidade |
| Prioridade | Clareza | Clareza **e** quantidade de informação por tela |

### `MapaDeDatas` — o componente que diferencia o produto

Calendário de densidade: quantas provas estão marcadas em cada dia. **Nunca mostra qual evento é qual** (ver `02` §7 para as regras de agregação que garantem isso).

```
        Março 2027
 D   S   T   Q   Q   S   S
                 1   2   3        ← contagem, não nome
 4   5   6   7   8   9  10
                        ███       ← 3 provas na região
11  12  13  14  15  16  17
                    ▓▓▓  ██
18  19  20  21  22  23  24
                        █████     ← 7 provas — evite este dia
25  26  27  28  29  30  31

 Provas na região no dia:
 ░ 0   ▒ 1-2   ▓ 3-4   █ 5-6   ██ 7+
```

**Especificação:**

- **Forma:** heatmap de calendário. Magnitude por dia → rampa sequencial (§4.5), matiz única
- **Zero recebe `--densidade-0`** (cinza neutro), não o passo mais claro. "Nenhuma prova" é categoricamente diferente de "poucas provas"
- **Escala em faixas, não contínua** — o organizador decide entre "tranquilo" e "lotado", não entre 4 e 5
- **Legenda sempre presente**, com os valores das faixas escritos
- **Número no dia, além da cor** — cor sozinha não informa (§4.6, regra 1)
- **Hover/toque:** tooltip com a contagem exata e o raio considerado. Nunca com nomes de eventos
- **Alternativa textual obrigatória:** tabela de datas × contagem em `<details>`
- **Filtro de raio** acima do calendário: cidade · região metropolitana · estado. Muda a agregação, e o raio ativo fica sempre visível

**Por que isso importa mais do que parece:** é a única funcionalidade do produto que tem valor para o organizador **antes** de ele migrar qualquer evento — e por isso é a porta de entrada do lado que paga a conta.

### `DashboardOrganizador`

Ordem de leitura: **o que aconteceu → como está indo → o que fazer agora.**

```
┌─ Faixa de indicadores ───────────────────────────────────┐
│  1.284        R$ 89.320      68%          12 dias        │
│  inscritos    arrecadado     das vagas    p/ o evento    │
│  ▲ 18% vs     ▲ 12% vs       ▬            ─              │
│  mesma etapa  evento ant.                                 │
└──────────────────────────────────────────────────────────┘

┌─ Inscrições ao longo do tempo ───────────────────────────┐
│  linha, 2px, com marcador nas viradas de lote            │
│  série 1 = este evento · série 2 = evento anterior       │
└──────────────────────────────────────────────────────────┘

┌─ Comparativo entre eventos ──┬─ Mapa de Datas ───────────┐
│  barras horizontais           │  densidade da região      │
│  ordenadas por participantes  │  próximos 90 dias         │
└───────────────────────────────┴───────────────────────────┘
```

**`IndicadorTile`** (a faixa de KPIs):
- Número-herói em `--txt-3xl`, tabular
- Rótulo abaixo em `--txt-2xs`, `--cor-texto-suave`
- Delta com **seta + valor + base de comparação explícita**. *"▲ 18% vs. mesma etapa do ano passado"* — delta sem base de comparação é ruído
- Delta neutro (`▬`) quando a variação é irrelevante; traço (`─`) quando não há base. **Nunca inventar comparação**
- Cor no delta segue status (sucesso/perigo), **acompanhada da seta** — nunca só cor

**`ComparativoEventos`** — responde à pergunta que o usuário formulou: *"o evento de julho teve mais participantes que o de março"*.
- **Barras horizontais**, ordenadas por magnitude, rótulos à esquerda em texto legível
- Rotulação direta do valor na ponta da barra — sem eixo X quando são poucas barras
- Uma única série. Comparar duas métricas de escalas diferentes → **dois gráficos**, nunca dois eixos Y

**Especificações válidas para todo gráfico do console:**
- Linha de 2px; marcadores ≥ 8px; pontas de barra arredondadas em 4px ancoradas na base
- Gap de 2px entre preenchimentos adjacentes
- Grade e eixos recessivos (`--cor-borda`), dado em primeiro plano
- **Camada de hover por padrão** — crosshair + tooltip em linha/área, tooltip por marca em barra/ponto/célula
- **Nunca dois eixos Y.** Duas medidas de escalas diferentes viram dois gráficos ou indexação a uma base comum

### `ConstrutorEvento`

Formulário longo — o oposto de tudo no lado atleta. Padrões:

- **Passos nomeados e salvos automaticamente**: Básico → Percursos e categorias → Lotes e preços → Cupons → Kit → Regulamento → Revisão
- **Rascunho sempre**, publicação explícita. Nada vai ao ar por acidente
- **Pré-visualização do `EventoCard`** em tempo real ao lado: o organizador vê exatamente como o atleta vai ver
- **Modo Circuito revela os campos extras** (etapas, tabela de pontuação, descarte, bônus, regras de elegibilidade) — sem isso, a complexidade do circuito polui quem só quer publicar uma prova avulsa
- Campos monetários com máscara BRL e resumo do repasse **antes** de publicar: *"Inscrição R$ 80 → você recebe R$ 73,44"*. Taxa escondida é a reclamação nº 1 do setor

### `GestaoInscritos`

Tabela densa com busca, filtro por categoria/lote/status, exportação CSV, e ações em lote. Linha do participante mostra: numeral, nome, categoria, lote, status de pagamento, check-in. Alternância de densidade (confortável/compacta) persistida por usuário.

---

## 7. Padrões de interação

### 7.1 Estados vazios — desenhar antes dos cheios

O dashboard de quem nunca correu é a primeira tela de todo mundo. Se ela for uma página em branco com "nenhum dado", o produto perde o usuário no primeiro contato.

| Contexto | O que mostrar |
|---|---|
| Atleta sem histórico | *"Este é o seu km zero."* + como é o campeonato + o que vai aparecer aqui depois da 1ª etapa |
| Sem resultado ainda | Contagem para a próxima etapa + o percurso + previsão baseada na categoria |
| Sem conquista | Os marcos disponíveis, com o mais próximo em destaque: *"Faltam 3 etapas para o selo de 10"* |
| Sem rivais | Sugestão automática de atletas da mesma categoria com tempo próximo |

### 7.2 Carregamento

**Skeleton com a forma real do conteúdo**, nunca spinner centralizado. O skeleton preserva a altura — layout que salta com público 60+ causa clique errado.

Ação otimista na confirmação de presença: o botão vira "Confirmado" imediatamente e reverte com mensagem clara se o servidor recusar. Naquele momento a percepção de velocidade é tudo.

### 7.3 Erro

Todo erro responde a três coisas: **o que aconteceu**, **por que**, **o que fazer agora**. Sem código de erro sem tradução, sem "algo deu errado".

```
❌  Não conseguimos confirmar sua presença
    A conexão caiu antes de salvar.
    [ Tentar de novo ]   A janela fecha domingo às 23h59.
```

### 7.4 Offline

O dia da prova acontece na rua, com rede saturada por milhares de pessoas no mesmo lugar.

| Recurso | Comportamento offline |
|---|---|
| Numeral, categoria, horário, local | **Cache permanente** — disponível sem rede |
| Mapa do percurso | Pré-cache na véspera |
| Histórico e resultados | Cache com atualização em background |
| Confirmação de presença | **Enfileira e envia ao reconectar**, com aviso honesto do estado pendente |

### 7.5 Movimento

Discreto e sempre respeitando `prefers-reduced-motion`. Durações: `--motion-rapido: 120ms` (feedback de toque), `--motion-padrao: 200ms` (transição), `--motion-lento: 320ms` (entrada de modal). Curva única: `cubic-bezier(0.2, 0, 0.2, 1)`.

Uma única exceção celebratória: conquista desbloqueada. Uma vez, curta, cancelável por `prefers-reduced-motion`.

---

## 8. Acessibilidade — checklist verificável

Não é seção decorativa: o público oficial inclui categorias de deficiência visual, intelectual e auditiva. **Cada item abaixo é verificável em revisão de PR.**

| # | Critério | Verificação |
|---|---|---|
| 1 | Zoom por pinça funciona | `<meta viewport>` sem `maximum-scale` nem `user-scalable=no`. **Regra de lint** |
| 2 | Zoom de 200% sem perda de conteúdo | Testar em 320px de largura com zoom 200% |
| 3 | Contraste de texto ≥ 4.5:1 | Valores da §4 — recalcular a cada mudança de token |
| 4 | Contraste de componente de UI ≥ 3:1 | `--cor-borda-forte` = 3.66:1 (claro) / 3.37:1 (escuro) |
| 5 | Foco visível sempre | Anel de 3px, offset 2px, cor primária. **Nunca `outline: none` sem substituto** |
| 6 | Navegação completa por teclado | Percorrer o fluxo de confirmação sem mouse |
| 7 | Alvo de toque ≥ 48×48 | Auditoria visual + teste automatizado |
| 8 | Cor não é o único portador | Todo estado tem ícone + texto |
| 9 | Gráfico com alternativa textual | Tabela equivalente em `<details>`. **Bloqueia merge se ausente** |
| 9b | Paleta categórica revalidada a cada mudança | Rodar o validador de CVD em **todos os pares**, nas duas superfícies. Nunca avaliar a olho |
| 9c | Nenhum gráfico com dois eixos Y | Duas medidas de escalas diferentes = dois gráficos |
| 9d | Legenda presente com 2+ séries | Identidade nunca é só cor |
| 10 | `aria-live` no contador de vagas e no regressivo | `polite`; `assertive` só em estado crítico |
| 11 | Landmarks e hierarquia de títulos | Um `<h1>` por página, sem pular níveis |
| 12 | Rótulo em todo campo | `<label>` visível — nunca só `placeholder` |
| 13 | Erro anunciado ao leitor de tela | `aria-describedby` + `role="alert"` |
| 14 | Linguagem simples | Ver §9 |
| 15 | Vídeo com legenda e Libras | Categoria de surdoatleta é oficial |
| 16 | `prefers-reduced-motion` respeitado | Todas as transições |
| 17 | Funciona sem JavaScript nas páginas públicas | Calendário, resultados e classificação são estáticos (Astro) |

---

## 9. Voz e tom

### 9.1 A posição

Derivada de *"de onde você partiu"* (§9.7 da descoberta): **celebrar persistência, não performance.**

Essa é a filosofia declarada do parkrun e — o que é notável — é o que o próprio regulamento do CSP já pratica com o bônus de assiduidade (+6 pontos por completar as 5 etapas). O regulamento entendeu isso há décadas. O software nunca mostrou.

| Escreva assim | Não assim |
|---|---|
| "Sua 7ª edição consecutiva" | "Ranking #342" |
| "Você já andou 312 km desde o seu km zero" | "Distância total: 312.4km" |
| "Faltam 3 etapas para o selo de 10" | "Progresso: 70%" |
| "Você melhorou 2 minutos no percurso Rebouças" | "Delta: -00:02:14" |
| "Se não confirmar até domingo, você fica fora desta etapa" | "Confirmação obrigatória conforme art. 9º" |

### 9.2 Linguagem simples é requisito, não estilo

O regulamento é documento jurídico. **A interface não pode ser.** Existe categoria oficial de deficiência intelectual (S) no campeonato.

- Frases curtas, uma ideia por frase
- Voz ativa, segunda pessoa ("você")
- Zero jargão sem explicação: *age grading*, *pace*, *tempo líquido* e *descarte* aparecem sempre com uma linha de definição na primeira ocorrência da tela
- Números por extenso quando ajudam: *"faltam 2 dias"*, não *"48h"*

### 9.3 O tom nos momentos difíceis

O regulamento é severo — perdeu a janela, está fora. O produto **não suaviza a regra nem culpa o atleta**:

> ❌ Errado: "Você perdeu o prazo."
> ❌ Errado também: "Ops! Parece que algo não deu certo 😅"
> ✅ Certo: "A janela da 3ª etapa fechou domingo às 23h59. Para voltar ao campeonato, você precisa refazer a inscrição e levar 2 latas de leite à SEMES. Veja como →"

---

## 10. Aplicação da marca

Conforme §9.5 da descoberta — três formas, funções distintas, sem improviso:

| Forma | Onde |
|---|---|
| **KmZero** | Nome escrito e falado: contratos, textos, lojas de app, imprensa, títulos de página |
| **km0** | Símbolo gráfico: logo, favicon, ícone do app, marca d'água. O zero é círculo — vira cronômetro, pórtico de largada, tapete de cronometragem |
| **kmzero** | Forma canônica: domínio, handle, e-mail, bundle ID, código |

**Regra prática:** o zero como algarismo só existe dentro do símbolo gráfico. Em texto corrido, sempre "KmZero".

**Endosso local:** `KmZero · Pedestrianismo Santos` — separador é o ponto médio (·), a marca vem primeiro, o campeonato é qualificador. Preserva o pertencimento local (sagrado num campeonato de 39 anos) sem fragmentar o produto.

**Assinatura:** *KmZero — de onde você partiu.*

**No Caminho A (companion não-oficial):** rodapé permanente e inequívoco — *"KmZero não é um serviço oficial da Prefeitura de Santos."* Sem brasão, sem logo institucional, sem imitação de identidade de governo.

---

## 11. Como usar isto

1. Importe [`design/tokens.css`](design/tokens.css) na raiz da aplicação
2. `tailwind.config.js` já consome os mesmos tokens — **uma fonte de verdade só**. Nunca escreva um hex direto num componente
3. Ao propor uma cor nova: calcule o contraste, registre na tabela da §4, só então use
4. Ao criar um componente: especifique os oito estados (padrão, hover, foco, ativo, desabilitado, carregando, erro, vazio) antes de escrever CSS
5. Rode o checklist da §8 em toda revisão de PR

**Se um token não existe para o que você precisa, provavelmente a necessidade está errada — verifique antes de criar.**
