# KmZero — Documentação de produto

> **KmZero** é a plataforma onde o corredor brasileiro se inscreve em qualquer prova e onde fica, para sempre, o registro do que ele correu — e onde o organizador publica seu evento e enxerga o mercado em que está entrando.
>
> *De onde você partiu.*

---

## O produto, em uma tabela

| Lado | Entra por | Fica por |
|---|---|---|
| **Participante** | Descobrir e se inscrever numa prova — circuito ou avulsa | O histórico: resultados de tudo que correu, comparações entre as próprias provas e contra o campo, evolução ao longo dos anos |
| **Organizador** | Publicar e vender inscrição | O **Mapa de Datas** e o painel de desempenho: em que dia marcar, como este evento foi contra o anterior |

A tese que sustenta os dois lados: **não se pode ser dono do histórico de um atleta sem ser dono do momento em que ele se identifica.** A inscrição não é a parte commodity que se disputa com os incumbentes — é o canal de aquisição do dado que é o produto.

---

## Premissa que organiza tudo

**Custo fixo de infraestrutura R$ 0,00 até o produto gerar receita.**

Isso não é restrição de orçamento — é restrição de arquitetura. Ela elimina stacks inteiras (Vercel Hobby proíbe uso comercial; Supabase free pausa o banco após 7 dias de inatividade, e este produto fica semanas ocioso entre etapas).

Uma distinção que atravessa os documentos: **custo fixo** de infraestrutura precisa ser zero; **custo variável** de pagamento é proporcional à receita e não ameaça a premissa. Enquanto só houver eventos gratuitos — o caso do CSP — não há gateway e não há custo variável nenhum.

A régua usada em toda escolha técnica: *o que acontece com a conta se o número de atletas dobrar?* Se a resposta não for "nada", a escolha está errada para esta fase.

---

## Os documentos

| # | Documento | Responde |
|---|---|---|
| **01** | [Análise de mercado](01-analise-mercado.md) | Quanto vale este mercado, quem já está nele, como o KmZero se paga, e por que o Mapa de Datas resolve o problema de partida a frio |
| **02** | [Arquitetura e stack](02-arquitetura-e-stack.md) | Como o produto funciona por dentro, com quais ferramentas, a que custo, e qual número exato obriga a migrar para o pago |
| **03** | [Design system](03-design-system.md) | Como o produto se parece e por quê — os dois lados, o público (categorias oficiais até 80+, deficiência visual, intelectual e auditiva), e as paletas validadas |
| **04** | [Roadmap e execução](04-roadmap-e-execucao.md) | O que fazer, em que ordem, e como saber se deu certo |
| **05** | [Backlog de execução](05-backlog-de-execucao.md) | As 95 tarefas ordenadas por dependência: o que já pode ser feito hoje, o que está bloqueado e por quê, e qual cadeia decide a data de entrega |

**Código de design:** [`design/tokens.css`](design/tokens.css) · [`design/tailwind.config.js`](design/tailwind.config.js) — colável direto no projeto.

**Documento de origem:** a descoberta que deu origem a tudo isto está em `D:\Downloads\analise-plataforma-pedestrianismo-santos.md` (v4, ago/2026). Ele permanece como registro histórico; os documentos acima o referenciam por seção (§) e corrigem onde dados de 2026 mudaram a conclusão.

---

## As cinco hipóteses que decidem o produto

| # | Hipótese | Sustenta | Testada? |
|---|---|---|---|
| H1 | Perder a janela de confirmação é dor real e frequente | Lado atleta | ❌ |
| H2 | O atleta quer o próprio histórico e hoje improvisa para tê-lo | Lado atleta | ❌ |
| H3 | O organizador apura pontuação de circuito à mão e isso dói | Receita | ❌ |
| H4 | O organizador quer saber quantas provas concorrem na data que pensa em marcar | **Aquisição** | ❌ |
| H5 | O organizador troca de plataforma por algo **além de preço** | **Toda a estratégia** | ❌ |

**H5 é a mais perigosa.** Se organizador só troca por taxa menor, o KmZero entra numa guerra de preço contra empresas com dez anos de escala — e perde.

---

## Estado atual do projeto

| Item | Estado |
|---|---|
| Descoberta do problema (lado atleta) | ✅ Completa |
| Descoberta do organizador | ❌ **Não feita** — maior lacuna, e é de onde vem a receita |
| Análise de mercado | ✅ Este conjunto |
| Definição de marca | ✅ KmZero — pendente busca no INPI |
| Validação com usuários | ❌ Não iniciada |
| Código | ❌ Repositório vazio |
| Domínio / handles | ❌ Não registrados |
| CNPJ / conta PJ | ❌ Necessário antes da Fase 4 (pagamentos) |

---

## A próxima ação

**Fase 0 — Validação.** Antes de qualquer linha de código: 15–20 corredores do CSP **e no mínimo 3 organizadores**. Os dois roteiros prontos estão em [`04`](04-roadmap-e-execucao.md#fase-0--validação).

Critério de corte do lado atleta: se **menos de 1/3** dos entrevistados já perdeu uma etapa por esquecer de confirmar, a hipótese central cai e o produto precisa ser reposicionado antes de ser construído.

**Cinco coisas que dá para fazer hoje, sem código e sem depender de ninguém:**

1. Baixar o `Regulamento_39_CSP.pdf` e comparar as regras com a 37ª edição
2. Baixar uma planilha de resultado da Runner Brasil e ver o formato
3. Simular uma inscrição paga em Ticket Sports e Minhas Inscrições até ver a taxa no checkout
4. Registrar `kmzero.com.br` no registro.br
5. Marcar a primeira entrevista de organizador

**E uma com prazo que não se repete:** **13/09/2026**, 3ª etapa do CSP — a janela de confirmação abre na quarta anterior às 9h. É a única chance de observar o sistema oficial com a janela *aberta*.

---

## Como navegar

- Quer entender **se vale a pena**? → `01`
- Vai **construir**? → `02`, depois `03`
- Vai **desenhar telas**? → `03`
- Quer entender **a estratégia e as fases**? → `04`
- Quer saber **o que fazer segunda-feira**? → `05`
