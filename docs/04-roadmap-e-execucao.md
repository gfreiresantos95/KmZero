# 04 — Roadmap e execução

> O que fazer, em que ordem, e como saber se deu certo.
> Data de referência: **agosto/2026**.

---

## 0. A decisão de caminho

> ⚠️ **Revisado.** A versão anterior deste documento recomendava começar como *companion* não-oficial: agregar resultados públicos, sem tocar na inscrição. Com o objetivo redefinido em `01` §1, essa opção deixou de fazer sentido — **não se pode ser dono do histórico do atleta sem ser dono do momento em que ele se identifica**.

**O caminho é a plataforma completa**, construída em camadas, com o CSP como caso semente e não como escopo total.

O que **não** mudou, e é o que torna isso viável:

- A arquitetura já era multi-tenant (`organizacao`) e já cobria os dois formatos (`edicao.modo`). Nada a refazer
- Enquanto só houver eventos gratuitos, o custo continua R$ 0 (`02` §10)
- O CSP continua sendo o melhor primeiro caso: comunidade densa, 39 anos de histórico, dor aguda e mensurável

**A ordem de construção segue um princípio:** entregar valor a um dos dois lados antes de precisar do outro. É como se escapa do problema de partida a frio.

```
Mapa de Datas  →  valor ao ORGANIZADOR sem nenhum evento na plataforma
Vitrine + perfil → valor ao ATLETA sem nenhum organizador migrado
Inscrição gratuita → primeiro evento real, sem risco financeiro
Inscrição paga     → receita
```

---

## Fase 0 — Validação

**Duração:** 2–4 semanas · **Custo:** R$ 0 · **Código escrito:** nenhum

### A regra que torna esta fase real

> **Se menos de 1/3 dos entrevistados já perdeu uma etapa por esquecer de confirmar, a hipótese central do lado atleta cai** e o produto precisa ser reposicionado antes de ser construído.

Escrever o critério de corte antes de coletar o dado é o que separa validação de busca por confirmação.

### 0.1 Roteiro — participante

15–20 corredores do CSP. **Não mostre o produto.** A hora em que você descreve a solução é a hora em que a entrevista deixa de valer.

**Abertura (5 min)**
1. Há quantos anos você corre o Campeonato Santista?
2. Me conta como foi a última etapa, do início ao fim. *(deixe falar; anote onde reclama sem ser perguntado)*

**Bloco 1 — H1: a janela de confirmação (10 min)**
3. Como você fica sabendo que precisa confirmar presença para a próxima etapa?
4. **Você já perdeu uma etapa por não ter confirmado a tempo?** *(a pergunta central)*
5. E alguém que você conhece? Quantas pessoas?
6. Quando perdeu, o que aconteceu depois? Você voltou? Como?
7. Você faz alguma coisa para não esquecer?

**Bloco 2 — H2: o histórico (10 min)**
8. Você sabe qual foi o seu tempo na última etapa? E na do ano passado?
9. **Onde você guarda os seus tempos?** *(planilha? print? Strava? cabeça? não guarda?)*
10. Você acompanha a classificação do campeonato durante o ano ou só no fim?
11. Se eu perguntasse quantas etapas você já correu na vida, você saberia?

**Bloco 3 — descoberta e inscrição (novo — 10 min)**
12. **Como você descobre provas para correr?**
13. **Em quantas plataformas diferentes você já se inscreveu?** Lembra de todas as senhas?
14. Quando você quer ver o resultado de uma prova antiga que correu, onde procura?
15. Você já perdeu inscrição de uma prova que queria porque não viu que abriu?
16. Quanto você costuma pagar de inscrição? Já achou a taxa de conveniência abusiva?

**Bloco 4 — sondagens (5 min)**
17. *(explicar age grading em uma frase)* Isso faria sentido pra você?
18. Você é de equipe? O que a equipe acompanha hoje?
19. Como você acessa o site da inscrição? *(celular? qual? alguém ajuda?)*
20. Se existisse um app que te avisasse quando abrissem as inscrições de provas que você marcou, você instalaria?

**Fechamento**
21. O que mais te irrita no processo todo?

### 0.2 Roteiro — organizador ⭐

**Esta é a maior lacuna do projeto e é de onde vem toda a receita.** Não é "em paralelo" — é tão importante quanto o roteiro do participante.

Mínimo de 3 conversas, com perfis diferentes: **um circuito municipal** (SEMES ou equivalente), **um organizador privado de prova paga**, **um circuito corporativo ou de clube**.

**Contexto**
1. Quantos eventos você organiza por ano? Que tamanho?
2. Me descreve o que acontece desde a ideia do evento até a divulgação do resultado.

**Bloco A — H4: a escolha da data** *(a hipótese do Mapa de Datas)*
3. **Como você decide a data de um evento?**
4. Você já marcou uma prova e descobriu depois que tinha outra no mesmo dia, perto?
5. Quanto isso custou em inscritos, na sua estimativa?
6. Como você faz hoje para saber o que mais está marcado na região?
7. *(descrever o Mapa de Datas)* **Isso resolveria alguma coisa pra você?** *(observe a reação, não só a resposta)*

**Bloco B — H5: a troca de plataforma** *(a hipótese mais perigosa)*
8. Que plataforma você usa para inscrição? Por que essa?
9. Quanto ela cobra? Você acha justo?
10. **O que te faria trocar de plataforma?** *(pergunta aberta — deixe o silêncio trabalhar)*
11. Já trocou alguma vez? Por quê? O que deu trabalho na migração?
12. Quanto tempo leva entre a prova acabar e você receber o dinheiro? Isso é um problema?

**Bloco C — H3: apuração e dados** *(para quem organiza circuito)*
13. Como você apura a pontuação acumulada do circuito? Quem faz? Quanto tempo leva?
14. Já errou? O que aconteceu?
15. Você consegue dizer quantas pessoas que correram a 1ª etapa não voltaram na 2ª?
16. Você compara o desempenho de um evento com o do ano anterior? Como?

**Bloco D — negócio**
17. Você sabia da taxa nova de federação para 2026? Como isso afeta seu orçamento?
18. Se existisse uma ferramenta que resolvesse o que conversamos, quanto valeria por evento?

**A verificação que pode derrubar uma fonte de receita:** existe rubrica orçamentária pública para software de gestão esportiva? Portal da transparência de Santos, Campinas e Curitiba (premissa A2, `01` §6.3).

### 0.3 Levantamento de mercado, sem entrevista

| Tarefa | Por quê | Esforço |
|---|---|---|
| **Simular uma inscrição paga** em Ticket Sports, Minhas Inscrições e Sympla até ver a taxa no checkout | O take rate real define a economia unitária inteira | 1 hora |
| **Mapear fontes públicas de calendário** de uma região e comparar com o total real de provas | Define se o Mapa de Datas tem valor no dia 1 | 1 dia |
| **Confirmar a taxa de federação 2026** na fonte primária | Circula com distorção; não citar a organizador sem confirmar | 2 horas |
| **Varrer municípios > 100 mil hab.** atrás de circuitos por etapas | Substitui o SAM extrapolado por contagem real | 2–3 dias |

### Entregável

Um documento de uma página: hipóteses (H1–H5) confirmadas, refutadas, e a decisão de seguir ou reposicionar. Sem isso, não comece a Fase 1.

### 🔴 Item com prazo que não se repete

> **13/09/2026 — 3ª etapa do CSP.** A janela de confirmação abre na quarta anterior, às 9h. É a única oportunidade de observar o sistema atual **com a janela aberta**:
> - O botão "Desejo participar da próxima etapa" mostra prazo?
> - Há confirmação visual de sucesso?
> - Qual o formato do e-mail de confirmação? O link expira?
> - Aparece contador de vagas em algum momento?
>
> Perder esta janela custa meses. Somente leitura, como nas rodadas anteriores.

---

## Fase 1 — Mapa de Datas + vitrine pública

**Duração:** 4–6 semanas · **Custo:** R$ 0 · **Gatilho:** H4 confirmada na Fase 0

A fase que entrega valor aos **dois lados sem exigir que nenhum deles migre nada**.

| Entrega | Para quem | Por quê |
|---|---|---|
| **Mapa de Datas** com fontes públicas | Organizador | Único valor entregável antes de qualquer migração. É a porta de entrada do lado que paga |
| **Vitrine pública de eventos** — busca, filtros, `EventoCard` | Participante | Descoberta é o topo do funil e é conteúdo estático, ótimo para busca orgânica |
| **Favoritar + alerta de abertura** | Participante | O gancho de retenção, e o pretexto para instalar o PWA |
| **Página pública de resultados** por evento | Ambos | Tráfego orgânico: gente procura o próprio resultado |
| **Conta única** (magic link) | Ambos | Uma conta que serve para correr e para organizar (`02` §3.2.1) |

**Fora desta fase:** inscrição, pagamento, console do organizador, dashboard do atleta.

**O truque da fase:** o Mapa de Datas e a vitrine se alimentam das mesmas fontes públicas. Um trabalho de coleta, dois produtos.

---

## Fase 2 — O histórico do atleta

**Duração:** 6–10 semanas · **Custo:** R$ 0 · **Gatilho:** ≥ 500 contas criadas

Onde o produto deixa de ser um catálogo e vira o que o `01` §1 promete.

| Entrega | Nota |
|---|---|
| **ETL do histórico do CSP** — o máximo de edições anteriores | ⚠️ A tarefa de maior incerteza de prazo. Começar a investigar os arquivos ainda na Fase 0 |
| **Perfil do atleta** — histórico, PBs, distância acumulada | A inversão da assimetria "21 campos entram, zero saem" |
| **Comparações** — entre as próprias provas, contra o campo, por percurso | Explicitamente pedido: *"comparação dos resultados do usuário com os resultados gerais"* |
| **Age grading** | Sem isso o produto entrega mensagem de declínio ao público que vai a 80+ |
| **Classificação ao vivo do circuito** — com descarte e bônus aplicados | Hoje apurado à mão e publicado fora do sistema |
| **Alerta da janela de confirmação** — Web Push + e-mail | Ataca a evasão do CSP diretamente |
| **PWA instalável, offline-first** | Dia da prova, rede saturada |

**Critérios de saída:**

| Métrica | Meta |
|---|---|
| Edições históricas importadas | ≥ 3 |
| Taxa de matching automático | ≥ 85% |
| Atletas com perfil reivindicado | ≥ 300 |
| Lighthouse Acessibilidade | 100 |
| **Divergência entre a pontuação calculada e a oficial** | **0** ← inegociável. Errar a pontuação destrói a confiança de uma vez |

---

## Fase 3 — Inscrição gratuita e console do organizador

**Duração:** 8–12 semanas · **Custo:** R$ 0 (ainda sem gateway)

Deliberadamente antes do dinheiro: o fluxo de inscrição inteiro é validado com eventos **gratuitos**, onde um bug custa constrangimento e não estorno.

| Entrega |
|---|
| `ConstrutorEvento` — criar evento, categorias, percursos, vagas, regulamento |
| Inscrição em ≤ 3 toques, com reserva de vaga |
| **Motor de elegibilidade** — inscrição na etapa seguinte conforme o regulamento (`02` §6-D) |
| **Confirmação de presença 1 clique**, dentro do KmZero |
| Contador de vagas em tempo real com fila justa |
| `GestaoInscritos` — tabela, filtros, exportação, ações em lote |
| Check-in por QR (validação presencial, retirada de kit) |
| Termo de responsabilidade versionado com aceite auditável |
| Autonomia sobre os próprios dados, incluindo **contato de emergência** |
| Importação de resultados + apuração automática |
| **Dashboard do organizador** — indicadores, inscrições no tempo, comparativo entre eventos |

**Gatilho de custo:** primeiro uso de Durable Objects para o contador atômico → Workers Paid, US$ 5/mês (`02` §10).

### Como abordar a SEMES

A postura da §10 do documento de descoberta continua sendo o melhor conselho:

> Não *"o sistema de vocês é ruim"*, mas *"o que vocês construíram cuida da parte difícil — validade jurídica, controle de fraude, gestão de vagas. Falta a parte que devolve o dado para quem corre."*

**Leve dado, não opinião.** O relatório de evasão por etapa é informação que a SEMES não tem e que o KmZero já produz a partir de resultados públicos.

---

## Fase 4 — Pagamento e receita

**Duração:** 6–8 semanas · **Gatilho:** um evento gratuito completo operado de ponta a ponta sem incidente

| Entrega |
|---|
| Integração de gateway com **split nativo** |
| **PIX como meio padrão** — a decisão que dobra a margem (`01` §6.2) |
| Lotes, cupons, checkout com resumo de repasse transparente |
| Webhooks idempotentes + conciliação diária |
| Painel financeiro do organizador: vendido, repassado, a repassar |
| Fluxo de estorno e cancelamento |
| Emissão de nota da taxa de conveniência (via serviço, não construído) |

**Regra de lançamento:** o primeiro evento pago é **pequeno, local e de um organizador com quem exista relação pessoal**. Confiança é o gargalo real desta fase, não tecnologia — nenhum organizador entrega o dinheiro das inscrições a uma plataforma desconhecida (risco listado em `01` §7).

---

## Fase 5 — Expansão

**Gatilho:** três eventos pagos operados sem incidente financeiro.

Ordem de alvos: circuitos **corporativos e de clubes** (mesma dor, sem licitação) → circuitos municipais da Baixada Santista (proximidade e reputação local) → Campinas, Curitiba, Passo Fundo (`01` §2.2).

Também nesta fase: rivais, simulador de pontuação, retrospectiva anual compartilhável, conquistas e marcos, certificados, área do gestor de equipe, WhatsApp como canal (agora há receita para pagá-lo).

---

## Métricas de sucesso

### Lado participante

| Métrica | Definição | Fase 2 | Fase 4 |
|---|---|---|---|
| **Perfis reivindicados** | Contas que reconheceram o próprio histórico | 300 | 2.000 |
| **Taxa de confirmação assistida** | % de quem recebeu lembrete e confirmou na janela | ≥ 70% | ≥ 85% |
| **Retenção entre etapas** | % que participa da etapa N+1 tendo participado da N | Linha de base | +10 p.p. |
| **Adesão ao Web Push** | % de contas com push ativo | ≥ 25% | ≥ 40% |
| **Favoritos por conta** | Média de eventos favoritados | ≥ 2 | ≥ 4 |

### Lado organizador

| Métrica | Definição | Fase 1 | Fase 4 |
|---|---|---|---|
| **Organizadores usando o Mapa de Datas** | Contas de organizador ativas no mês | 10 | 50 |
| **Conversão mapa → evento publicado** | % que publica após usar o mapa | — | ≥ 15% |
| **Eventos publicados** | Total na plataforma | 0 | 15 |
| **Taxa de recompra** | % que publica um 2º evento | — | ≥ 60% |

### Negócio

| Métrica | Meta |
|---|---|
| Custo **fixo** de infraestrutura | R$ 0 enquanto só houver eventos gratuitos |
| Custo fixo por atleta ativo | < R$ 0,01/mês |
| **% de inscrições pagas via PIX** | ≥ 70% ← a métrica de margem (`01` §6.2) |
| Prazo médio de repasse ao organizador | ≤ 7 dias |

**A métrica que resume o produto inteiro:** *quantos atletas terminaram a temporada que teriam abandonado?* Só é mensurável comparando a evasão da 40ª edição com a linha de base histórica — motivo adicional para o ETL das edições anteriores.

⚠️ **Web Push abaixo de 25% após a primeira temporada derruba a estratégia de canal** (`02` §6.2) e antecipa o WhatsApp, com o custo que ele traz.

⚠️ **Conversão mapa → evento abaixo de 15% derruba a tese de aquisição** — significa que o Mapa de Datas é útil mas não move ninguém, e o produto volta a competir por preço (hipótese H5).

---

## Ações de marca — com prazo, porque expiram

| # | Ação | Prazo | Por quê |
|---|---|---|---|
| 1 | **Busca de anterioridade no INPI** — classes NCL 9, 41, 42; termos "KM ZERO", "KMZERO", "KM 0" | **Antes de qualquer material impresso** | A empresa de engenharia de trânsito (`kmzero.eng.br`) preocupa: engenharia costuma ser registrada em 42, a mesma classe do SaaS |
| 2 | **Registrar `kmzero.com.br`** | Imediato | Baixo custo, impossível recuperar depois |
| 3 | **Registrar `km0.com.br`** (defensivo) | Imediato | Idem |
| 4 | **Handles `@kmzero`** — Instagram, WhatsApp Business, YouTube, TikTok, Strava, LinkedIn | Imediato | ⚠️ `@kmzero.runningclub` já existe — evitar handle confundível |
| 5 | **Reservar o nome nas lojas de app** | Antes da Fase 2 | Conta de desenvolvedor é barata e trava o nome |
| 6 | **Teste do telefone** — ditar "KmZero" para 3 pessoas acima de 60 | Junto da Fase 0 | Dispersão grande torna os domínios defensivos obrigatórios |
| 7 | **Teste dos dois lados** — *"meu histórico tá no KmZero"* / *"publiquei meu evento no KmZero"* | Junto da Fase 0 | Se uma soar estranha, o nome não sobrevive ao produto |
| 8 | **CNPJ e conta PJ** | **Antes da Fase 4** | Não se opera split de pagamento como pessoa física |

⛔ `kmzero.run` **já é do KM Zero Running Club**. Era o TLD mais bonito. Siga em frente.

**Plano B:** *Prova* e *Largada* seguem como alternativas (§9.10 da descoberta).

---

## Pontos em aberto herdados

| # | Pergunta | Como responder | Quando |
|---|---|---|---|
| 1 | Como é o painel "Inscrição" com a janela **aberta**? | Observação direta, somente leitura | **13/09/2026** — não se repete |
| 2 | Formato do e-mail de confirmação; o link expira? | Idem | 13/09/2026 |
| 3 | Existe perfil separado de gestor de equipe? | Falar com um gestor | Fase 0 |
| 4 | A pasta do Google Drive é canal oficial de validação? | Perguntar à SEMES | Fase 0 |
| 5 | O `Regulamento_39_CSP.pdf` mudou pontuação, bônus, descarte ou categorias? | Baixar e comparar com a 37ª | **Imediato** |
| 6 | Que formato têm os resultados da Runner Brasil? | Baixar uma etapa e inspecionar | **Imediato** |
| 7 | Existe rubrica orçamentária pública para software esportivo? | Portal da transparência | Fase 0 |
| 8 | Publicar perfil a partir de resultado público, antes do consentimento, é defensável? | Consulta jurídica | Antes da Fase 2 |
| 9 | Quem é o encarregado de dados (DPO)? | Definir | Antes do lançamento público |
| 10 | **Take rate real dos incumbentes** | Simular inscrição paga nas 3 principais | **Imediato** |
| 11 | **Que fontes públicas de calendário existem e qual a cobertura?** | Levantamento de uma região | Fase 0 — **bloqueia a Fase 1** |
| 12 | **Qual gateway aceita split para o volume inicial e com que taxa negociada?** | Conversa comercial com Pagar.me e Mercado Pago | Antes da Fase 4 |

**Os itens 5, 6 e 10 podem ser resolvidos hoje, sem depender de ninguém.** São os primeiros da lista.

---

## O primeiro dia

Se for para fazer uma coisa só na segunda-feira:

1. **Baixar `Regulamento_39_CSP.pdf`** e comparar as regras de pontuação com a 37ª edição (item 5)
2. **Baixar uma planilha de resultado da Runner Brasil** e ver com o que se está lidando (item 6)
3. **Simular uma inscrição paga** em Ticket Sports e Minhas Inscrições até ver a taxa (item 10)
4. **Registrar `kmzero.com.br`** — leva 10 minutos e para de correr risco
5. **Marcar a primeira entrevista de organizador** — a lacuna mais cara do projeto

Nada disso exige escrever código, e os cinco juntos reduzem mais incerteza do que qualquer semana de desenvolvimento faria agora.
