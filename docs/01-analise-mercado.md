# 01 — Análise de mercado

> Aprofunda a §3 do documento de descoberta (`analise-plataforma-pedestrianismo-santos.md`, v4).
> Dados verificados em **agosto/2026**. Todo número tem fonte ao lado.

---

## 1. O objetivo da plataforma, escrito de forma testável

Antes do mercado, a frase. Se ela estiver errada, o resto não importa.

> **KmZero é a plataforma onde o corredor brasileiro se inscreve em qualquer prova e onde fica, para sempre, o registro do que ele correu — e onde o organizador publica seu evento e enxerga o mercado em que está entrando.**

Um produto de dois lados, com uma vitrine pública comum:

| Lado | Entra por | Fica por |
|---|---|---|
| **Participante** | Descobrir e se inscrever numa prova | O histórico: todos os resultados, comparações entre as próprias provas e contra o campo, evolução ao longo dos anos |
| **Organizador** | Publicar e vender inscrição do evento | O **Mapa de Datas** e o painel de desempenho: em que dia marcar, como este evento foi contra o anterior |

### 1.1 A distinção que sustenta tudo

O mercado brasileiro vende a **transação**. O KmZero vende o **acúmulo** — e usa a transação para consegui-lo.

| O mercado brasileiro vende | O KmZero vende | Como consegue |
|---|---|---|
| A inscrição | O histórico de uma vida esportiva | Cobrando a inscrição |
| Um evento | Uma trajetória | Sendo o lugar onde a trajetória se registra |
| Relação que termina na largada | Relação que só faz sentido ao longo de anos | Uma conta, todos os eventos |

**Por que a inscrição precisa ser do produto, e não de terceiros.** Uma versão anterior deste documento recomendava começar como *companion* — agregar resultados públicos sem tocar na inscrição. Aquilo tinha uma falha estrutural que só fica evidente quando se escreve o objetivo completo:

> **Não se pode ser dono do histórico de um atleta sem ser dono do momento em que ele se identifica.**

Sem a inscrição, o KmZero depende para sempre de raspar PDFs de terceiros, fazer *matching* de atleta por aproximação de nome, e nunca tem identidade confirmada. Com a inscrição, o atleta se identifica uma vez e todo resultado subsequente é atribuído com certeza. **A inscrição não é a parte commodity que se disputa com os incumbentes — é o canal de aquisição do dado que é o produto.**

Isso reposiciona o modelo de receita inteiro. Ver §6.

### 1.2 Como saber se o objetivo está certo

Cinco afirmações falsificáveis. Se qualquer uma cair na Fase 0, o produto muda:

| # | Afirmação | Como testar | Falso se |
|---|---|---|---|
| H1 | Perder a janela de confirmação é dor real e frequente | Perguntar a 15–20 atletas do CSP | < 1/3 já perdeu uma etapa por isso |
| H2 | O atleta quer o próprio histórico e hoje improvisa para tê-lo | Perguntar onde guardam os tempos | Maioria responde "não guardo, não ligo" |
| H3 | O organizador apura pontuação de circuito à mão e isso dói | Entrevistar 3 organizadores de circuito | Já usam ferramenta que resolve |
| **H4** | **O organizador quer saber quantas provas concorrem na data que ele pensa em marcar** | Descrever o Mapa de Datas para 3 organizadores | Reação morna; já resolvem no WhatsApp entre colegas |
| **H5** | **O organizador troca de plataforma de inscrição por algo além de preço** | Perguntar por que usa a atual e o que o faria trocar | A resposta for só "taxa menor" |

H1 e H2 sustentam o lado do atleta. **H3, H4 e H5 sustentam a receita** — e nenhuma delas foi testada (ver §9).

**H5 é a mais perigosa do conjunto.** Se o organizador só troca por preço, o KmZero entra numa guerra de take rate contra empresas com dez anos de escala — e perde. O Mapa de Datas, o modo circuito e o histórico do atleta existem justamente para que a conversa não seja sobre preço.

---

## 2. Dimensionamento: TAM → SAM → SOM

O documento de descoberta não tem nenhum número de mercado. Ele conclui, na §8, que a "base de usuários pequena (~2.000/etapa)" é um risco de monetização. **Essa conclusão está subdimensionada** — ela mede o SOM e o confunde com o mercado.

### 2.1 TAM — o mercado brasileiro de corrida de rua

| Métrica | Valor | Fonte |
|---|---|---|
| Movimentação do mercado | **~R$ 1,1 bilhão** (2025) | Conta Azul, agregando inscrições + assessorias + equipamentos + patrocínio |
| Corredores ativos | **~15 milhões** (+15% sobre 2024) | ISTOÉ / Corrida Pra Todos, 2026 |
| Provas oficiais realizadas | **2.827 (2024) → 5.241 (2025)**, +85% | Fitness Brasil, 2026 |
| Base de resultados analisada | 11,9 mi de resultados, 9.803 provas, 1.979 cidades, 27 estados | estudo divulgado em mar/2026 |
| Crescimento projetado 2026 | +15% orgânico (após +45% em 2024 e +25% em 2025) | Guia da Corrida |
| Composição | **51,8% mulheres** entre concluintes; faixa 20–24 anos cresceu +2.300% em 5/10 km | Corrida Pra Todos, 2026 |

Duas leituras importam mais que os números absolutos:

**A desaceleração é boa notícia.** +85% em provas num ano é bolha de oferta; +15% projetado para 2026 é maturidade. Mercado em maturação é mercado que passa a comprar **ferramenta de gestão** em vez de só surfar demanda. Foi exatamente nessa fase que o RunSignup cresceu nos EUA.

**5.241 provas com 9.803 eventos catalogados significa que o problema de dados já existe em escala.** Cada uma dessas provas gera resultado que hoje morre num PDF. É o mesmo vazio que o Athlinks preencheu nos EUA há mais de uma década.

### 2.2 SAM — circuitos por etapas com pontuação acumulada

Aqui está o recorte real do KmZero, e ele é verificável, não hipotético. Circuitos municipais **por etapas** confirmados para 2026:

| Cidade | Circuito | Formato | Plataforma atual |
|---|---|---|---|
| **Santos/SP** | Campeonato Santista de Pedestrianismo (39ª ed.) | 5 etapas, pontuação, bônus de assiduidade | Sistema próprio da Prefeitura |
| **Campinas/SP** | Circuito de Corridas dos Distritos | **6 etapas** por regiões da cidade | Minhas Inscrições |
| **Curitiba/PR** | Circuito Curitiba de Corridas de Rua | Múltiplas etapas (1ª em 22/03/2026) | Sistema da Prefeitura |
| **Passo Fundo/RS** | Circuito Municipal de Corrida de Rua | Etapas ao longo do ano | **Sympla** |
| **Rio de Janeiro/RJ** | Correndo pelo Rio | Etapas (2ª em 06/09/2026) | Diversas |
| **São Paulo/SP** | Circuito Popular de Corrida de Rua | Etapas | Minhas Inscrições |

**Passo Fundo usar Sympla para um circuito esportivo por etapas é o achado mais eloquente desta pesquisa.** Sympla é plataforma de ingresso genérica — não tem conceito de atleta, de categoria, de pontuação, de etapa. Que uma prefeitura escolha isso não significa que Sympla seja adequada; significa que **não existe alternativa adequada e conhecida**. É o vazio de mercado sendo preenchido com a ferramenta errada porque a certa não existe.

**Estimativa do SAM.** Não existe censo de circuitos municipais por etapas no Brasil. Método de estimativa, com as premissas expostas para serem contestadas:

- Premissa 1: 5.570 municípios brasileiros; assumindo que apenas municípios acima de 100 mil habitantes sustentam circuito municipal → **~320 municípios**
- Premissa 2: taxa de adoção de circuito por etapas entre eles, extrapolada da amostra (SP, Campinas, Curitiba, Santos, Passo Fundo, Rio confirmados) → estimativa conservadora de **15–25%** → **~50 a 80 circuitos municipais**
- Premissa 3: somar circuitos corporativos, de clubes, de assessorias e de federações estaduais, tipicamente 3–6 etapas → **+100 a 200**

→ **SAM ≈ 150 a 280 circuitos por etapas no Brasil.**

⚠️ **Esta é a estimativa mais frágil do documento.** É extrapolação de uma amostra de conveniência de seis casos, não pesquisa. Deve ser substituída por contagem real antes de qualquer decisão de investimento — o método está em §9.

### 2.3 SOM — o alcance realista

| Horizonte | Alcance | Base |
|---|---|---|
| **Ano 1 (CSP apenas)** | ~2.000 atletas/etapa; base viva estimada em 3.000–5.000 pessoas contando evasão e reentrada | 2.000 vagas na 1ª etapa + vagas remanescentes reabertas (332, 580, 678 em edições recentes) |
| **Ano 2 (Baixada Santista + 2–3 circuitos)** | 8.000–15.000 atletas | Expansão geográfica natural, mesmo ecossistema de assessorias |
| **Ano 3 (SaaS, 10–15 circuitos)** | 30.000–60.000 atletas | 10% de penetração no SAM estimado |

A leitura correta da §8 do documento de descoberta, portanto: **2.000 atletas é o ponto de partida, não o teto.** O erro era medir o mercado pelo primeiro cliente.

---

## 3. Job to be done — os dois lados

### 3.1 O atleta

> *"Quando chega quarta-feira, **eu não quero depender da minha memória** para continuar no campeonato. E quando termino uma etapa, **quero saber se estou melhorando** — não só quanto tempo fiz."*

Decomposto:

| Job | Situação hoje | Evidência |
|---|---|---|
| **Não perder a vaga** | Janela qua 9h → dom 23h59; esqueceu, está fora. Único canal é e-mail, e o próprio sistema pede ao atleta que configure o antispam | Regulamento art. 9º/10º; §2.6 da descoberta |
| **Ver a própria evolução** | Impossível. 21 campos entram, zero saem | §2.4.1 da descoberta — confirmado por inspeção do DOM |
| **Saber onde estou no campeonato** | Apuração manual publicada fora do sistema | §2.6 |
| **Provar que corri** | Nada. Nem certificado, nem histórico | §2.6 |
| **Manter meus dados corretos** | Só e-mail e patrocinador editáveis. Contato de emergência é imutável — em prova de 10 km | §2.4.2 |

**O job emocional, que é o mais forte e o menos óbvio:** num campeonato de 39 anos, com numeral fixo e categorias que vão até 80+, o atleta de longa data **quer que sua permanência seja reconhecida**. Hoje ninguém sabe que ele está no 12º ano seguido. Nem ele consegue provar.

Isso é literalmente a mecânica do parkrun (milestone clubs) e é exatamente o que o regulamento do CSP já tenta fazer com o bônus de assiduidade — sem nunca mostrar ao atleta.

### 3.2 O organizador

> *"Eu não quero passar a semana seguinte à prova cruzando planilha de resultado com planilha de inscrição para descobrir quem pontuou."*

| Job | Situação hoje |
|---|---|
| **Escolher a data do evento sem colidir com outras provas** | Boca a boca, WhatsApp entre organizadores, varredura manual de calendários. **Nenhuma plataforma resolve** |
| **Vender inscrição e receber** | Plataforma de terceiros, com take rate e repasse fora do controle |
| **Saber se este evento foi melhor que o anterior** | Planilha, se alguém montar. Nenhum painel comparativo |
| **Apurar pontuação da etapa** (circuito) | Manual. O CSP tem descarte do pior resultado, bônus de assiduidade, pontuação independente entre geral e categoria, e quórum de equipe (5 masc. + 3 fem.) |
| **Saber quem confirmou presença** | Provavelmente uma query no banco; nenhuma visibilidade agregada |
| **Reduzir evasão** | Sem instrumento. Não há métrica de evasão por etapa |
| **Validar presencialmente** | Fila na SEMES, conferência de documento + latas de leite |
| **Publicar resultado** | Terceirizado à cronometragem + pastas do Google Drive |

Os **três primeiros** são os que valem dinheiro e são justamente os que nenhum incumbente atende bem. O primeiro — escolher a data — não é atendido por ninguém, e é a razão do Mapa de Datas (§5-B).

⚠️ **Esta seção é inferida, não pesquisada.** O documento de descoberta admite (§4.4) que o perfil de organizador é "o principal buraco". Continua sendo. Ver §9.

---

## 4. Matriz competitiva

Dois eixos que separam o mercado inteiro:

- **Horizontal:** o produto modela *evento avulso* ou *série/campeonato com pontuação acumulada*?
- **Vertical:** a relação com o atleta é *transacional* (acaba na largada) ou *persistente* (histórico vitalício)?

```
                          PERSISTENTE (histórico vitalício)
                                      ▲
                                      │
              Athlinks ●              │              ● parkrun
              (perfil, PRs,           │           (numeral permanente,
               percentil, rivais)     │            milestones, age grading)
                                      │
                                      │        ◆ KmZero
                                      │      (alvo: série + histórico
                                      │       + apuração automática)
   ───────────────────────────────────┼───────────────────────────────────▶
   EVENTO AVULSO                      │                    SÉRIE / CAMPEONATO
                                      │
        ● Ticket Sports               │              ● RunSignup
        ● Minhas Inscrições           │           (Series Scoring nativo,
        ● Doity   ● Sympla            │            matching automático,
        ● Ativo.com                   │            standings públicos)
                                      │
                          TRANSACIONAL (acaba na largada)
```

### 4.1 Leitura do mapa

**O quadrante inferior-esquerdo está lotado e é onde o dinheiro atual está.** Ticket Sports (~1,3 mi de inscrições/ano), Minhas Inscrições (+15 anos), Doity (+4 mi de inscrições), Sympla. Todos competentes, todos transacionais, todos modelando evento.

**Os outros três quadrantes, no Brasil, estão vazios.** Não "pouco atendidos" — vazios. Não existe Athlinks brasileiro. Não existe RunSignup brasileiro. Não existe parkrun brasileiro com perfil digital.

**O KmZero ocupa o eixo inteiro, não um quadrante.** Ele entra pelo canto inferior-esquerdo — inscrição de evento avulso, onde os incumbentes estão — porque é ali que o atleta se identifica, e sobe na diagonal para o canto superior-direito, que é onde o valor mora e onde não há ninguém. É a posição do RunSignup somada à do Athlinks, que nos EUA são duas empresas.

**A ressalva honesta:** entrar pelo canto lotado significa competir de frente com Ticket Sports e Minhas Inscrições na camada onde eles são fortes, têm escala e podem baixar taxa. O produto não vence ali — ele **atravessa** ali. Se em 18 meses a única razão pela qual um organizador escolhe o KmZero for a taxa, a estratégia falhou e a hipótese H5 caiu.

### 4.2 Detalhamento

| Player | Onde está forte | Por que não resolve o caso CSP |
|---|---|---|
| **Ticket Sports** (+Webrun) | Maior do Brasil; app iOS/Android; área do participante; conteúdo editorial | Modela evento e venda de ingresso. Perfil do atleta é raso. Nada de pontuação acumulada |
| **Minhas Inscrições** | Escolhida pelo Circuito Popular de SP e por Campinas — **o concorrente mais próximo do território** | Também centrada em evento. **Precedente grave:** na migração do Circuito Popular, todos os atletas tiveram que recadastrar do zero — histórico descartado. Prova que histórico não é ativo para eles |
| **Doity** | Self-service, +60 mil eventos | Generalista acadêmico/corporativo. Nada esportivo |
| **Sympla** | Alcance, meios de pagamento | Zero conceito esportivo — e ainda assim é usada por circuito municipal (Passo Fundo). Sintoma do vazio |
| **Cronometradoras** (Runner Brasil, Chip Time, XCrono, Brasil Corrida, Running Tag) | Detêm o dado de resultado na fonte | Publicam lista estática por prova. Sem perfil persistente. **São fornecedor potencial, não concorrente** |
| **Apps de assessoria** (Clube da Corrida, Lap Run, Inthegra) | Já entregam gráficos, rankings, brasões, sync Garmin/Strava | Fechados na assessoria. **Sinal de mercado valioso:** provam que o corredor brasileiro já valoriza exatamente o que o KmZero quer entregar |
| **RunSignup** (EUA) | Series Scoring nativo, matching automático entre etapas, standings públicos | Não opera no Brasil, não fala português, não conhece PIX nem o formato municipal brasileiro |
| **Athlinks** (EUA) | Perfil do atleta, PRs, percentil, rivais, "claim" de resultados | Idem. Base de eventos americana |
| **parkrun** (global) | Numeral permanente, milestone clubs, age grading, filosofia de persistência | Não é plataforma vendável — é uma organização com formato próprio |

### 4.3 O que os incumbentes fariam se acordassem

Vale ser honesto sobre a defensabilidade. Ticket Sports ou Minhas Inscrições **poderiam** construir series scoring. O que os impede não é capacidade técnica:

1. **O modelo de receita deles não recompensa isso.** Ganham por transação de inscrição. Histórico do atleta não gera transação — gera custo de armazenamento
2. **O precedente do Circuito Popular mostra a prioridade real:** descartaram o histórico de todos os atletas numa migração. Não foi descuido, foi indiferença estrutural
3. **Circuito municipal gratuito é o pior cliente possível para eles** — volume de suporte alto, receita transacional zero

Isso é uma janela, não um fosso. Ela se fecha se o segmento ficar grande e visível. Ver §7.

---

## 5. As referências internacionais, e o que copiar de cada uma

| De onde | O que copiar | O que **não** copiar |
|---|---|---|
| **RunSignup** | Modelo de dados de série: regras de pontuação como configuração por edição; matching de atleta entre etapas com fila de revisão humana; standings públicos | A complexidade do produto inteiro — eles atendem 30 mil eventos |
| **Athlinks** | O dashboard: PRs por distância, percentil da categoria, histórico cronológico, sistema de rivais | O "claim" manual de resultado — no CSP o numeral já identifica |
| **parkrun** | **A filosofia**: recompensar persistência, não performance. Milestone clubs (5/10/25/50/100 etapas). Age grading. Numeral permanente | O modelo organizacional (voluntariado global) |
| **MyLaps / RaceResult** | Splits, resultado ao vivo ligado ao chip | Depende de integração com cronometragem — Fase 3 |

**O age grading merece destaque como decisão de produto, não só de feature.** O CSP tem categorias até 80+ e 14 faixas etárias. Um atleta de 68 anos que corre 3 minutos mais devagar que no ano passado pode estar, em age grading, *melhorando*. Sem essa métrica, o produto entrega uma mensagem de declínio ao público que mais precisa de permanência. **É a diferença entre um produto que o atleta de 70 anos abre e um que ele evita.**

---

## 5-B. O Mapa de Datas — o diferencial que ninguém tem

Merece seção própria porque é a única funcionalidade do produto **sem equivalente conhecido no mercado brasileiro**, e porque resolve o problema mais difícil de um produto de dois lados: o começo a frio.

### 5-B.1 O que é

Um calendário que mostra ao organizador **quantas provas estão marcadas em cada dia** na região dele — e nada além disso. Sem nome de evento, sem organizador, sem local exato. Só a contagem.

A restrição é deliberada e é o que torna a funcionalidade possível: nenhum organizador aceitaria expor o próprio calendário a concorrentes, mas todos querem saber se o domingo que estão pensando em usar já tem outras seis provas na cidade.

### 5-B.2 Por que resolve o começo a frio

O problema clássico de plataforma de dois lados: o organizador não entra porque não há atletas, e o atleta não entra porque não há eventos.

**O Mapa de Datas escapa disso porque não depende de ninguém ter migrado.** Calendário de prova é informação pública — está nos sites das federações, nos agregadores de calendário, nas próprias plataformas concorrentes, nos portais das prefeituras. Dá para popular o mapa por agregação de fontes públicas e **entregar valor ao organizador no dia 1, com zero eventos na plataforma**.

Isso inverte a ordem de aquisição:

```
Modelo convencional:   migre seu evento → depois talvez tenha valor
Com o Mapa de Datas:   tenha valor agora (de graça) → migre quando fizer sentido
```

E cria um volante: mais eventos na plataforma → mapa mais preciso → mais organizadores usam o mapa → mais eventos migram.

### 5-B.3 A ressalva

Dado agregado de fonte pública é defensável, mas com **contagem baixa a agregação vaza**: se o mapa diz "1 prova em Santos no dia 14" e o organizador conhece o mercado local, ele identificou o concorrente. A regra de agregação mínima (k-anonimato) é requisito de produto, não detalhe de implementação — está especificada em `02` §6-C.2.

---

## 6. Modelo de receita

> ⚠️ **Esta seção foi invertida em relação à versão anterior deste documento.** A versão anterior recomendava *não* perseguir taxa de conveniência cedo, por competir com os incumbentes na camada commodity. Com o objetivo redefinido na §1 — a plataforma faz a inscrição — a taxa deixa de ser uma escolha entre modelos e passa a ser **a consequência natural do produto**. A ressalva contra competir por preço permanece válida e está em §4.1.

### 6.1 Como os incumbentes ganham, e quanto

Taxa de conveniência sobre a inscrição. Referência observada no mercado brasileiro: **~8%** sobre o valor da inscrição, com variação por plataforma e por volume do organizador.

### 6.2 A economia unitária, e a alavanca que quase ninguém explora

Inscrição média de referência: **R$ 80**. Take rate: **8% → R$ 6,40 por inscrição.**

O custo variável é quase todo do meio de pagamento — e é aqui que está a decisão de negócio mais valiosa da seção:

| Meio | Taxa 2026 | Custo em R$ 80 | Margem bruta sobre R$ 6,40 |
|---|---|---|---|
| **PIX** | **0,10 – 0,22%** | **R$ 0,08 – 0,18** | **~97%** |
| Cartão de crédito | 3,99 – 5,49% | R$ 3,19 – 4,39 | ~40% |

> **Cada inscrição paga no PIX em vez de cartão vale mais que o dobro para o KmZero.**

Isso não é otimização de rodapé — é decisão de produto. Significa que PIX deve ser o meio **padrão e visualmente preferido** no checkout, com desconto explícito se necessário. Um desconto de 3% para pagamento em PIX ainda deixa margem melhor do que a venda no cartão, e o participante percebe como benefício.

**Cenário de referência (Ano 2):** 15 eventos pagos, média de 600 inscritos, ticket R$ 80, 70% em PIX →
receita bruta ≈ **R$ 57.600/ano**; custo de pagamento ≈ **R$ 12.400**; margem ≈ **R$ 45.200**.

Nada disso é dinheiro que resolve a vida de ninguém. Mas cobre a infraestrutura com folga de duas ordens de grandeza (ver `02` §10) e **paga o subsídio dos circuitos municipais gratuitos**, que é o ponto.

### 6.3 As quatro fontes, em ordem de prioridade

#### 1. Taxa de conveniência sobre eventos pagos — **a receita principal**

- ✅ Modelo comprovado e compreendido por todo organizador
- ✅ Escala com o uso, sem venda consultiva
- ✅ **Subsidia os eventos gratuitos**, que é o que torna o CSP e os circuitos municipais viáveis como clientes
- ❌ Competição direta com incumbentes de escala (ver §4.1 e a hipótese H5)

#### 2. SaaS por temporada para circuito gratuito — **onde há valor mas não há transação**

Para circuito municipal gratuito não há percentual a tirar de zero. Aqui o organizador paga pela apuração automática de pontuação, pelo painel de evasão e pelo Mapa de Datas.

| Premissa | Valor assumido | Como validar |
|---|---|---|
| A1. A apuração manual custa dias de trabalho | Verdadeiro | Entrevistar 3 organizadores |
| A2. Existe rubrica orçamentária para software esportivo | **Incerto — maior risco** | Portal da transparência de 3 prefeituras |
| A3. Preço aceitável | R$ 3.000–8.000/circuito/ano | Perguntar diretamente |
| A4. Ciclo de venda no setor público | 6–12 meses | Histórico de contratações |

💡 Se A2 for falsa, circuitos **corporativos e de clubes** têm a mesma dor sem a burocracia de licitação.

#### 3. Serviços do evento — margem incremental sem venda nova

Uma vez dentro do fluxo de inscrição: seguro do atleta, foto do evento, upsell de kit, antecipação de repasse ao organizador. Nada disso exige conquistar um cliente novo.

#### 4. Camada premium do atleta — **por último, e talvez nunca**

Retrospectiva, certificados, comparativos avançados.

- ❌ **Canibaliza o valor de rede.** O ativo é *todo mundo* ter perfil; cobrar do atleta reduz a base, e base pequena reduz o valor para o organizador
- ❌ Público 60+ de campeonato gratuito tem baixa propensão a assinatura
- Se vier, que seja apoio voluntário, nunca paywall de funcionalidade

### 6.4 O que muda na premissa de custo zero

**Nada, e vale explicar por quê.** Custo de gateway é **variável e proporcional à receita** — só existe quando entra dinheiro. A infraestrutura fixa continua em R$ 0 (`02` §10).

A única mudança real: no dia em que houver o primeiro evento **pago**, o plano Workers Paid (US$ 5/mês) passa a ser obrigatório — e US$ 5 contra a receita da primeira dezena de inscrições é irrelevante.

**O produto continua podendo existir indefinidamente sem receita nenhuma.** Enquanto só houver eventos gratuitos, não há gateway, não há custo. Isso preserva o que a premissa original protegia: nenhuma pressão para monetizar antes de ter valor.

### 6.5 Fato novo de mercado que afeta o organizador

A partir de 2026, organizadores de corrida de rua no Brasil passam a pagar **taxas de R$ 750 a R$ 4.500 por evento** às federações, proporcionais ao número de inscritos e à complexidade da prova. A cobrança é do promotor, não do atleta.

Duas leituras, e as duas importam:

- 🔴 **Aperta a margem do organizador** — o que reduz a disposição a pagar por software e endurece a negociação de take rate
- 🟢 **Cria obrigação nova de controle e comprovação** — número de inscritos, categorias, prestação de contas. Uma plataforma que já tem esse dado organizado resolve um problema que acabou de nascer

⚠️ **Verificar antes de usar como argumento comercial.** A informação circula com ruído (há inclusive checagens desmentindo versões distorcidas). Confirmar na fonte primária — federações estaduais e CBAt — antes de citar a qualquer organizador.

---

## 7. Riscos de mercado

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **A SEMES contrata Minhas Inscrições ou Ticket Sports antes de você chegar** | Média | Alto — o CSP vira cliente deles, e o precedente do Circuito Popular indica que o histórico seria descartado | Chegar antes com o Caminho A (companion). Ter o histórico já importado é uma vantagem que nenhuma contratação nova reproduz |
| **Incumbente lança series scoring** | Baixa no curto prazo, média em 2 anos | Alto | Defesa não é a feature, é o **histórico acumulado e a relação com a comunidade**. Correr para importar edições antigas |
| **Premissa A2 falsa: não há orçamento público para o software** | Média | Médio — derruba a fonte 2, não a receita principal | Pivotar para circuitos corporativos/clubes. Validar em Fase 0 |
| **H5 falsa: organizador só troca de plataforma por preço** | Média | **Alto** — vira guerra de take rate contra empresas de escala | Diferenciar por Mapa de Datas e modo circuito, não por taxa. Se em 18 meses o único argumento for preço, reposicionar |
| **Escala de confiança: organizador não entrega o dinheiro das inscrições a uma plataforma nova** | **Alta** | **Alto** — trava a receita principal | Repasse rápido e transparente, contrato claro, começar por eventos pequenos e locais onde há relação pessoal. É risco de reputação, não de produto |
| **Fraude e chargeback em inscrição paga** | Média | Médio | PIX como padrão reduz drasticamente (não tem chargeback). Antifraude do gateway no cartão |
| **Nova taxa de federação (R$ 750–4.500/evento) aperta a margem do organizador** | Confirmada para 2026 | Médio | Reduz disposição a pagar. Compensar posicionando o produto como quem organiza a comprovação exigida (§6.5) |
| **SEMES vê a iniciativa como concorrência** | Média | Médio | Aproximar cedo, posicionar como complemento. Oferecer o relatório de evasão — que é dado que eles não têm |
| **Dependência de dados de terceiros** (Runner Brasil, Google Drive) | Alta | Médio | Parser tolerante, guardar arquivo bruto, revisão manual (ver `02`) |
| **Marca bloqueada no INPI (classes 41/42)** | Média | Médio — custo de rebrand | Busca **antes** de qualquer material impresso. Alternativas em reserva: *Prova*, *Largada* |
| **Base pequena demais para ter valor de rede** | Baixa | Alto | 2.000 atletas num campeonato de 39 anos é comunidade densa, não base rala. Densidade importa mais que tamanho para rivais/rankings |
| **LGPD: CPF e laudos de PCD** | Média | Alto | Não coletar CPF na Fase 1. Ver checklist no `02` |

---

## 8. Por que agora

Quatro fatores que não estavam alinhados antes:

1. **Mercado maduro o suficiente para comprar ferramenta** — a desaceleração de +85% para +15% marca a passagem de "surfar demanda" para "gerir operação"
2. **O vazio é demonstrável, não teórico** — uma prefeitura usando Sympla para circuito por etapas prova que a alternativa certa não existe
3. **Custo de infraestrutura colapsou** — o que exigia servidor em 2015 hoje roda em free tier com uso comercial permitido (ver `02`). Um produto de nicho pode existir sem queimar caixa
4. **O CSP tem o ativo mais caro já construído**: 39 anos de histórico e identidade estável de atleta (numeral fixo + CPF). Nenhum concorrente pode comprar isso — só pode ignorá-lo, que é o que todos fazem

---

## 9. Lacunas conhecidas deste documento

Ditas explicitamente para não serem confundidas com conclusões.

| Lacuna | Por que importa | Como fechar |
|---|---|---|
| 🔴 **O organizador nunca foi entrevistado** | É de onde vem a receita inteira. Toda a §3.2 é inferência, incluindo as hipóteses H4 e H5 | 3 entrevistas: SEMES, um circuito corporativo, um organizador privado de prova paga |
| 🔴 **H5 não testada: o que faz um organizador trocar de plataforma?** | É a hipótese que decide se o produto compete por valor ou por preço | Nas mesmas 3 entrevistas — pergunta direta |
| 🔴 **Take rate real dos incumbentes** (só temos a referência de ~8%) | Define o piso da negociação e a economia unitária da §6.2 | Simular uma inscrição paga em cada plataforma e ler a taxa no checkout |
| 🟡 **Premissa A2 (orçamento público) não verificada** | Se falsa, cai a fonte de receita 2 (não a principal) | Portal da transparência de Santos, Campinas e Curitiba |
| 🟡 **Cobertura de fontes públicas para o Mapa de Datas** | Define se ele tem valor no dia 1 ou não | Levantar quantas provas de uma região aparecem em fontes públicas vs. o total real |
| 🟡 **Taxa de federação 2026 — confirmar na fonte primária** | Circula com ruído e distorção. Não citar a organizador sem confirmar | Federações estaduais e CBAt |
| 🟡 **SAM extrapolado de 6 casos** | Número frágil, não usar para decisão de investimento | Varrer os ~320 municípios acima de 100 mil hab. procurando "circuito de corrida" no site oficial. Trabalho de 2–3 dias, viável |
| 🟡 **Nenhum atleta do CSP entrevistado ainda** | H1 e H2 continuam hipóteses | Fase 0 |

---

## Fontes

- [Corrida de rua no Brasil: mercado chega a R$ 1,1 bilhão — Conta Azul](https://contaazul.com/blog/crescimento-corrida-de-rua/)
- [Corridas de rua crescem 85% no Brasil e entram em nova fase de maturidade do mercado — Fitness Brasil](https://www.fitnessbrasil.com.br/newsfitbr/corridas-de-rua-crescem-85-no-brasil-e-entram-em-nova-fase-de-maturidade-do-mercado/)
- [Corrida de rua cresce no Brasil: já são 15 milhões de praticantes, a maioria mulheres — ISTOÉ](https://istoe.com.br/corrida-de-rua-15-milhoes-corredores-maioria-mulheres)
- [40 Estatísticas de Corrida no Brasil em 2026 — Corrida Pra Todos](https://corridapratodos.com.br/estatisticas-corrida-brasil/)
- [Crescimento do Mercado da Corrida de Rua em 2026 — Guia da Corrida](https://www.guiadacorrida.com.br/post/crescimento-mercado-corrida-2026)
- [Circuito Curitiba de Corridas de Rua 2026 — Prefeitura de Curitiba](https://www.curitiba.pr.gov.br/noticias/saiba-quais-sao-as-datas-das-provas-do-circuito-curitiba-de-corridas-de-rua-2026/81800)
- [Circuito de Corridas dos Distritos (Campinas) — Minhas Inscrições](https://minhasinscricoes.com.br/evento/circuitodecorridasdosdistritos)
- [2ª Etapa do Circuito Municipal de Corrida de Rua 2026, Passo Fundo — Sympla](https://www.sympla.com.br/evento/2a-etapa-do-circuito-municipal-de-corrida-de-rua-2026-volta-da-avenida-brasil/3454900)
- [Corridas de Rua — Secretaria Municipal de Esportes e Lazer, Prefeitura de São Paulo](https://prefeitura.sp.gov.br/web/esportes/w/corridas_de_rua/8722)
- [O que é taxa de serviço (conveniência/comodidade) — Ticket Sports](https://ajuda.ticketsports.com.br/hc/pt-br/articles/12461706802331-O-que-%C3%A9-taxa-de-servi%C3%A7o-conveni%C3%AAncia-comodidade)
- [Qual é a taxa de serviço da Atletis e como ela funciona](https://www.atletis.com.br/taxa-de-servico-da-atletis)
- [Quanto cobrar na inscrição de uma corrida de rua — Blog da Sympla](https://blog.sympla.com.br/blog-do-produtor/quanto-cobrar-na-inscricao-de-uma-corrida-de-rua/)
- [Gateways de Pagamento no Brasil: Comparativo 2026 — FWC](https://fwctecnologia.com/blog/post/gateways-pagamento-brasil-comparativo)
- [Gateway de pagamento para app: Pix, cartão, boleto e split — X-Apps](https://x-apps.com.br/pagamentos-no-app-escolher-gateway/)
- [Corridas de rua no Brasil poderão ter taxas entre R$ 750 e R$ 4,5 mil a partir de 2026](https://regisandrade.com.br/corridas-de-rua-no-brasil-poderao-ter-taxas-entre-r-750-e-r-45-mil-a-partir-de-2026/) — ⚠️ ver a ressalva da §6.5
- [Checagem: governo vai começar a taxar corridas de rua a partir de 2026? — Boatos.org](https://www.boatos.org/esporte/governo-vai-comecar-a-taxar-corridas-de-rua-no-brasil-a-partir-de-2026.html) — a versão distorcida da notícia acima
