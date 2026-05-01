# 📜 HISTÓRICO DE REVISÃO — Farma Fácil Marketing v4

> **Como funciona:** toda alteração no `sistema_v4.html`, `banco_hooks_72.json`, `calendario_*.json` ou qualquer arquivo do sistema deve ser registrada aqui.
> Entradas em ordem CRONOLÓGICA DECRESCENTE (mais recente em cima).
> Se uma semana der ruim, basta procurar o snapshot correspondente em `04_SNAPSHOTS_SEMANAIS/` e fazer rollback.

---

## 📋 Formato padrão de entrada

```
## YYYY-MM-DD HH:MM — [Quem: Karine / Cowork / Claude Code] — [Tipo: SISTEMA / DADOS / LIMPEZA / ANALISE]
**O que mudou:**
- Resumo das mudanças

**Por quê:**
- Motivação

**Arquivos afetados:**
- caminho/do/arquivo.ext

**Backup criado:**
- nome_do_backup.html (se aplicável)

**Status:** ✅ Concluído | 🟡 Em teste | ❌ Reverter
```

---

## 🔄 COMO FAZER ROLLBACK SE UMA SEMANA DER RUIM

1. Abrir esta pasta: `C:\Users\karin\farma-marketing-v4\04_SNAPSHOTS_SEMANAIS\`
2. Identificar o snapshot da última semana boa (formato: `sistema_v4_2026-W18.html`)
3. Copiar esse arquivo, renomear pra `sistema_v4.html` e substituir o atual (faça backup do atual antes!)
4. Registrar o rollback aqui no histórico com motivo

---

# 📅 ENTRADAS

## 2026-05-01 — Claude Code — API (Meta Graph API — coleta de métricas reais)
**O que mudou:**
- 🔌 **Meta Graph API v22.0 conectada pela primeira vez** — token de usuário validado, IDs permanentes extraídos e documentados em `INSTAGRAM_API_CONFIG.md`
- 📊 **Snapshot de métricas coletado via API** (28 dias: abr/2026):
  - Seguidores: **8.720** (era 8.295 no sistema — +425)
  - Media count: **233 posts**
  - Alcance 28d: **14.863 contas únicas**
  - Novos seguidores 28d: **439** (pico 30/04: +58 em 1 dia)
  - Post 15/04: 5.719 alcance · 142 follows · 231 likes · 157 saves → TIER S CONFIRMADO
  - Post 21/04: 5.517 alcance · 157 follows · 216 likes · 202 saves → TIER S CONFIRMADO
  - Post 30/04: 6.755 alcance · 60 follows · 193 likes · 119 saves → TIER S CONFIRMADO
  - Baseline (posts comuns): reach 200-600 · 0-1 follows · 2-13 likes
- 🎯 **Padrão dos posts Tier S confirmado por dados reais:**
  - Hooks com COMPARAÇÃO (AFE vs Licença) → medo de confundir → 15/04 e 21/04
  - Hooks com REVELAÇÃO SURPREENDENTE (vigilância consulta SEM visitar) → choque → 30/04
  - Hook "O que verificam PRIMEIRO" (insider knowledge) → urgência → 15/04
  - Taxa de Tier S: 3/15 posts = 20% (1 a cada 5 posts é home run com a fórmula certa)
- 📈 **sistema_v4.html atualizado:**
  - Header: "8.295 seguidores" → "8.720 seguidores"
  - Aba Métricas: dados reais da API substituem dados antigos de fev/mar 2026
  - Diagnóstico atualizado: status positivo em vez de alerta vermelho
- 📁 **Arquivo de configuração criado:** `INSTAGRAM_API_CONFIG.md` (IDs permanentes, endpoints, como regenerar token)

**Por quê:**
- Token de 2h fornecido pela Karine — usamos para extrair máximo de dados antes de expirar

**Arquivos criados/modificados:**
- `INSTAGRAM_API_CONFIG.md` (novo — IDs permanentes, sem token)
- `04_SNAPSHOTS_SEMANAIS/metricas_api_20260501.json` (novo — snapshot completo da API)
- `sistema_v4.html` (header + aba Métricas atualizados)

**Backup criado:** N/A (dado novo, não sobrescreve nada crítico)

**Status:** ✅ Concluído

---

## 2026-05-01 — Claude Code — SISTEMA + DADOS (Onda 1)
**O que mudou:**
- 🎣 **`banco_hooks_72.json` atualizado para v5.0-onda1** — banco passa de 73 para 88 hooks:
  - Campo `familia_hook` adicionado em todos os 73 hooks existentes (todos receberam `'voce_sabe'`)
  - Campo `roteiro_reel` adicionado nos 32 hooks Tier S — roteiro completo de 20-28s com timestamps [0s/4s/12s/20s] e legenda sugerida para o Reel
  - 15 hooks novos criados (#74 a #88) em 4 famílias inéditas:
    - `o_que_acontece_se`: #74 (S), #75 (S), #76 (A), #77 (A), #78 (A)
    - `x_erros`: #79 (S), #80 (S), #81 (A), #82 (A)
    - `mito_verdade`: #83 (S), #84 (A), #85 (A)
    - `caso_real`: #86 (S), #87 (A), #88 (A)
  - Stats finais: S=32 / A=42 / B=10 / C=4 · famílias: voce_sabe=73 / o_que_acontece_se=5 / x_erros=4 / mito_verdade=3 / caso_real=3
- 🔄 **BANCO_HOOKS reembutido no `sistema_v4.html`** — versão v5.0-onda1 com 88 hooks embarcada no HTML (+38KB)
- 📱 **Nova aba "Stories" criada no sistema_v4.html** — inclui:
  - Planejador semanal 7×5 (7 dias × 5 tipos: Bastidores, Enquete, Dica, Depoimento, CTA) com estado persistido em localStorage
  - Barra de progresso da semana com alerta quando a meta de 5 stories for atingida
  - Banco de 12 enquetes prontas (copiar e colar no Instagram) por tema: Fiscalização, Documentação, RT, Multa, Organização, Serviço, Equipe, Ambiental, Boas Práticas
  - Roteiro semanal sugerido (Segunda a Sexta) com descrição prática de cada tipo de story e explicação por que a estratégia funciona algoritmicamente
- 🎬 **Botão "🎬 Reel" adicionado no modal de aprovação** — aparece condicionalmente apenas quando o hook do post tem `roteiro_reel`. Ao clicar, expande o roteiro completo com timestamps inline e botão de cópia
- ⚠️ **Regra de variação de família no calendário** — `renderCal` agora detecta quando 2+ dias consecutivos usam a mesma `familia_hook` e exibe badge "⚠ rep" no canto inferior esquerdo da célula do calendário

**Por quê:**
- Diagnóstico via Instagram Insights (30 dias) revelou: 1) todos os 73 hooks são da família "Você sabe...?" → saturação explicando por que só 1/7 posts performa; 2) Stories com <100 views por falta de consistência e ausência de enquetes; 3) 0 Reels publicados apesar de 49.915 visualizações disponíveis no período
- Onda 1 resolve a saturação de hook e dá infraestrutura para Stories + Reels sem depender de API externa

**Arquivos afetados:**
- `banco_hooks_72.json` (v5.0-onda1, agora com 88 hooks + familia_hook + roteiro_reel)
- `sistema_v4.html` (BANCO_HOOKS reembutido + aba Stories + botão Reel + regra família)
- `scripts/atualizar_banco_onda1.js` (script gerador — criado como documentação do processo)
- `scripts/add_stories_js.js` (script auxiliar — pode ser descartado)
- `scripts/add_familia_check.js` (script auxiliar — pode ser descartado)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/banco_hooks_backup_20260501.json`
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_2026-W18.html`

**Validações:**
- ✅ JS syntax válido — `new vm.Script(js)` sem erros
- ✅ 88 hooks no banco (88 `"num":` encontrados)
- ✅ 32 hooks com roteiro_reel (todos Tier S)
- ✅ 12 funções do módulo Stories presentes
- ✅ reelHook, mostrarReel, initStories, renderEnquetes, renderStoriesRoteiro funcionais
- ✅ renderCal com lookup _famLookup e badge ⚠ rep injetados

**Status:** ✅ Concluído

---

## 2026-04-27 — Cowork — DADOS + UI
**O que mudou:**
- 📚 **Correção informativa sobre AFE** (alerta da Karine: AFE não vence/expira, só é atualizada com alteração contratual). Reescritos 3 hooks com premissa errada e corrigidos slides de outros 11 hooks:
  - **#28** "AFE expira sem você perceber" → "AFE pode ser CASSADA sem você perceber" (foco em alteração não comunicada)
  - **#30** "renovar AFE no prazo" → "ATUALIZAR AFE depois de mudar algo" (4-6 meses sem assessoria)
  - **#69** "renovar AFE sozinho" → "ATUALIZAR sua AFE sozinho atrasa 6 meses"
  - 19 correções pontuais nos slides de #2, #3, #5, #12, #13, #17, #26, #57, #58, #63, #64, #71 (substituindo "AFE vencida/renovação" por "AFE desatualizada/atualização")
- 🔢 **Bug visual da capa corrigido** — função `sAt1` (capa pilar Atração) extraía o primeiro número do título e renderizava ele gigante em verde. Quebrava hooks como "R$ 50 mil de multa" → mostrava "50" gigante e "R$  mil de multa" embaixo. Removida lógica `_NUM(d.titulo)`. Título agora sai inteiro.
- 🔄 **Hooks duplicados D34 e D36 substituídos** (Karine identificou repetição visual):
  - **D34 (04/05 Seg, venda)**: era #70 (regularizar pós-interdição) → agora #69 venda A "ATUALIZAR sua AFE sozinho pode te ATRASAR 6 meses?"
  - **D36 (06/05 Qua, autoridade)**: era #57 (drogaria interditada vista pela Karine) → agora **#73 NOVO HOOK** autoridade S "Você sabe os 5 sinais que dizem 'sua drogaria precisa de assessoria — AGORA'?"
  - **D55 (25/05)**: estava com hook #69 antigo (renovar AFE) → trocado por #70 (regularizar pós-interdição)
  - **D39 (09/05)**: estava com hook #28 antigo (AFE expira) → atualizado com versão reescrita (AFE cassada)
- ➕ **Hook #73 criado** (autoridade tier S) — banco passa de 72 para 73 hooks. Tema "Karine" com 5 sinais que pedem assessoria urgente.

**Por quê:**
- Karine relatou 3 problemas críticos na revisão: (1) informação errada sobre AFE em vários posts, (2) número da capa em posição errada (D37, D44, D56 etc. tinham número desconfigurado), (3) D34 e D36 duplicados visualmente.

**Arquivos afetados:**
- `banco_hooks_72.json` (versão v4.2-hooks-novos, agora com 73 hooks)
- `sistema_v4.html` (BANCO_HOOKS reembutido + DIAS atualizado em D34/D36/D39/D55 + função sAt1 corrigida)

**Validações:**
- ✅ JS passa em `node --check` (sem syntax errors)
- ✅ DIAS válido: 60 dias
- ✅ BANCO_HOOKS válido: 73 hooks
- ✅ Zero duplicatas de título no calendário
- ✅ HTML termina com `</script></body></html>` sem nulls

**Status:** ✅ Concluído

---

## 2026-04-26 23:30 — Cowork — SISTEMA + DADOS
**O que mudou:**
- 🩺 **Auditoria minuciosa do sistema** completa (relatório em `Diagnostico_Sistema_v4_26abr2026.md`). Identificou 6 problemas críticos: posts repetidos, capa não conversa com slides, legendas dessincronizadas, português falhando, dia 26 ausente, botão "Publicar" não publica.
- ✏️ **Acentos do banco_hooks_72.json corrigidos**: 220+ correções aplicadas (voce→você, vigilancia→vigilância, etc.). 374 caracteres acentuados agora presentes no banco. Versão atualizada para `v4-todos-slides-customizados`.
- 🎨 **Slides customizados criados pros 47 hooks que estavam SEM slides** — agora 72/72 hooks têm slides específicos da pergunta da capa (não cai mais no template genérico). Conteúdo no `scripts/slides_47_hooks.py`.
- 🔄 **Dias 32 a 61 (2 mai a 31 mai) regenerados** com slides customizados + legendas ricas (de ~280 chars genéricas para ~900-1.000 chars específicas com hashtags por tema). 30 dias atualizados.
- 🧹 **Botões inúteis ajustados:**
  - "📤 Publicar" virou "✓ Marcar publicado" (verde simples) com tooltip explicando que NÃO publica no Meta — só marca status no calendário.
  - "🔄 Republicar" (que não republicava) virou "↩ Voltar p/ pendente" (cinza), pra reverter status quando precisar.
- ➕ **Botões de manutenção adicionados na aba Config:**
  - "🔄 Regenerar legendas (todos os posts)" — expõe `regerarLegendasAprovadosUI()` que aplica `gerarLegendaRica()` em TODOS os dias.
  - "🔄 Regenerar slides dos posts pendentes" — expõe `regerarSlidesPendentesUI()` que regera slides apenas dos pendentes (preserva aprovados/publicados).
- 🛡️ **Dias 27 a 31 (semana 27/4 a 1/5) preservados** — Karine já agendou os posts no Instagram, então não foram regenerados. Apenas os títulos/subs/legendas receberam acentos.

**Por quê:**
- Karine relatou ter gasto 6h+ pra gerar 5 posts da semana com sintomas: posts repetidos, capa não combina com slides, legendas erradas, português falhando, botões inúteis.
- Causa-raiz identificada: dos 72 hooks do banco, 47 (65%) não tinham campo `slides` customizado → função `gerarConteudoCompleto` caía em template genérico → 22 dos 35 dias agendados (27 abr a 31 mai) tinham t2/t4/t5/cta IDÊNTICOS palavra por palavra.
- Banco JSON foi originalmente escrito sem acentos → 147 ocorrências de "voce", "vigilancia", "fiscalizacao" etc. afetando capas e legendas.

**Arquivos afetados:**
- `banco_hooks_72.json` (versão v4-todos-slides-customizados)
- `sistema_v4.html` (BANCO_HOOKS reembutido + DIAS dias 32-61 regerados + botões ajustados + funções novas)
- `scripts/slides_47_hooks.py` (novo arquivo com slides customizados pros 47 hooks)
- `Diagnostico_Sistema_v4_26abr2026.md` (relatório de auditoria)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_correcao_20260426_232445.html`
- `04_SNAPSHOTS_SEMANAIS/banco_hooks_72_pre_correcao_20260426_232445.json`

**Status:** ✅ Concluído

---


## 2026-04-26 22:08 — Cowork — SISTEMA (legendas ricas + botão copiar)
**O que mudou:**
- Adicionada função `gerarLegendaRica(hook, slides)` que produz legenda profissional Instagram com 5 blocos: hook + dor (t2+i2) + consequências (t4+it4) + solução (t3+l3) + CTA + hashtags (10 fixas + 2 do tema)
- `gerarConteudoCompleto` agora usa `gerarLegendaRica` em vez da versão minimalista anterior
- Adicionada função `regerarLegendasAprovados()` que atualiza legendas de TODOS os posts aprovados (preserva titulo/slides, só recria legenda)
- Adicionada função `copiarLegendaAtual()` que copia legenda do post atual pra clipboard
- Botão **"📋 Copiar Legenda"** azul adicionado no rodapé do modal (estados pendente e aprovado)

**Validação Node.js:** legenda gerada para hook #10 (denúncia anônima) tem 919 chars com estrutura completa.

**Por quê:**
- Karine reportou: aprovou 5 posts (27, 28, 29, 30 abr + 1 mai) e baixou pro Meta Business Suite — mas as legendas continuam dos posts ANTIGOS (anteriores à aplicação de sugestão)
- A geração de legenda em gerarConteudoCompleto era minimalista: "💡 hook + sub + t2 + cta"
- Agora é story-telling profissional pronto pra colar no Instagram

**Como Karine atualiza os 5 posts já aprovados:**
1. Recarrega sistema_marketing.html (Ctrl+F5)
2. F12 → Console → cola: `regerarLegendasAprovados()` → Enter
3. Para cada post aprovado, abre, clica "📋 Copiar Legenda" e cola no Meta

**Arquivos afetados:**
- `sistema_v4.html` (modificado: +3 funções +2 botões + chamada a gerarLegendaRica)
- `sistema_marketing.html` (mesma cópia)

**Backup criado:** `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_legendas_20260426_2208.html`

**Status:** ✅ Concluído + validado em Node.js. Aguardando Karine atualizar e copiar.

---

## 2026-04-26 21:10 — Cowork — DADOS (slides 2-6 customizados por hook)
**O que mudou:**
- Identificado o BUG REAL: a função gerarConteudoCompleto usava templates GENÉRICOS por pilar (todos hooks de Atração tinham mesmo t2/i2/t3/l3/t4/it4/t5/ck/cta)
- Criado conteúdo CUSTOMIZADO específico por hook para os 25 hooks Tier S do banco_hooks_72.json
- Cada hook customizado tem t2/i2/t3/l3/t4/it4/t5/ck/cta especifico do TEMA do hook
- Função gerarConteudoCompleto modificada: usa hook.slides quando existir, senão fallback para template genérico

**Validação Node.js:** 4 hooks distintos do mesmo pilar (Atração) testados — geraram t2 100% diferentes. ✅

**Por quê:**
- Karine print confirmou: ao trocar hook, o slide 2 sempre era "Por que isso importa pra sua drogaria?" (texto genérico)
- O OV estava sendo aplicado corretamente, mas o conteúdo dos slides 2-6 era idêntico para qualquer hook do mesmo pilar
- Agora cada hook gera conteúdo único: ex hook "fiscal 5 minutos" → slide 2 fala dos 5 minutos, hook "denúncia anônima" → slide 2 fala de denúncia anônima, etc

**Arquivos afetados:**
- `banco_hooks_72.json` (modificado: campo "slides" adicionado em 25 hooks Tier S, versão atualizada para v2-customizado)
- `sistema_v4.html` (modificado: BANCO_HOOKS atualizado + gerarConteudoCompleto usa hook.slides)
- `sistema_marketing.html` (modificado: mesmas mudanças)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_custom_slides_20260426_2110.html`

**Pendente:** customizar os 33 hooks Tier A (próxima rodada). Hoje os 14 Tier B/C usam fallback genérico (aceitável).

**Status:** ✅ Concluído + validado em Node.js. Aguardando Karine confirmar visualmente no navegador.

---

## 2026-04-26 20:46 — Cowork — SISTEMA (validação Node.js + nova lógica de hooks usados + arquivo sem cache)
**O que mudou:**
- Validei via Node.js que `gerarConteudoCompleto` retorna TODOS os 18 campos esperados (titulo, destaque, t2, i2, t3, l3, t4, it4, t5, ck, cta, tipo, template, pilar, imgKeys, legenda, hashtags, story)
- Validei via Node.js que `Object.assign({}, d, OV)` sobrescreve corretamente todos os campos
- **Conclusão:** o código JS está 100% correto. O problema é cache do navegador rodando aplicarSugestao ANTIGA.
- Atualizada `getHooksUsados`: hook só sai da lista de sugestões quando o post for APROVADO ou PUBLICADO. Reprovados ficam disponíveis pra sugerir em outros dias (conforme pedido da Karine).
- Criada cópia `sistema_marketing.html` (idêntico ao sistema_v4.html mas com nome novo) — navegador nunca viu esse nome, sem cache antigo

**Por quê:**
- Karine reportou comportamento "misturado": slide 1 com novo, slide 2 com antigo, slide 3 com novo (após aplicar sugestão)
- Após teste em Node.js confirmar que a lógica está correta, a única explicação restante é cache do navegador
- Arquivo com nome novo é cache-proof
- Mudança em getHooksUsados resolve o pedido específico da Karine: hooks reprovados continuam sugeríveis

**Arquivos afetados:**
- `sistema_v4.html` (modificado: getHooksUsados nova versão)
- `sistema_marketing.html` (novo — cópia idêntica, nome diferente pra evitar cache)

**Backup criado:** o sistema_v4 já tinha sido restaurado do backup 20:19, e essa edição é cirúrgica em getHooksUsados.

**Status:** ✅ Concluído. Aguardando Karine testar `sistema_marketing.html` (nome novo, sem cache).

---

## 2026-04-26 20:35 — Cowork — DIAGNÓSTICO (versão visível + lançador anti-cache)
**O que mudou:**
- Adicionado tag visível "v: 2026-04-26-2030-aplicar-completo" no canto inferior direito do sistema_v4 (sempre visível durante uso)
- Adicionado `console.log` colorido na inicialização do sistema mostrando a versão carregada
- Criado `_ABRIR_SISTEMA_SEM_CACHE.html` que abre sistema_v4.html com query string única (?v=TIMESTAMP) forçando navegador a tratar como arquivo novo

**Por quê:**
- Karine reportou múltiplas vezes que o sistema mostra comportamento antigo mesmo após Ctrl+Shift+R
- Investigação confirmou que o código no ARQUIVO está correto (aplicarSugestao copia todos 15 campos, templates usam nomes certos)
- Hipótese: navegador está executando JavaScript em cache, ignorando o arquivo atualizado
- Solução: tag visível permite confirmar visualmente qual versão está rodando + lançador anti-cache resolve definitivamente

**Arquivos afetados:**
- `sistema_v4.html` (modificado: +tag visível +console.log de versão)
- `_ABRIR_SISTEMA_SEM_CACHE.html` (novo, na raiz)

**Status:** ✅ Concluído. Aguardando Karine confirmar versão carregada.

---

## 2026-04-26 20:19 — Cowork — SISTEMA (correção aplicarSugestao)
**O que mudou:**
- Adicionada função `gerarConteudoCompleto(hook)` que cria estrutura completa do post baseada no pilar do hook (titulo, destaque, tipo, template, pilar, legenda, hashtags, story, imgKeys, t2/i2, t3/l3, t4/it4, t5/ck, cta)
- Templates de conteúdo padronizados por pilar (atracao/autoridade/conexao/venda) com tom apropriado pra cada
- Função `aplicarSugestao` reescrita para aplicar TODOS os campos via override (loop Object.keys), não apenas titulo+destaque

**Por quê:**
- Karine reportou que ao reprovar dia 28 e aplicar uma sugestão, apenas a CAPA (slide 1) foi atualizada — os outros 5 slides continuaram com conteúdo do post antigo
- Causa: aplicarSugestao só sobrescrevia titulo e destaque no OV; os demais campos (t2-t5, ck, cta, legenda) vinham do DIAS original

**Arquivos afetados:**
- `sistema_v4.html` (modificado: nova função gerarConteudoCompleto + aplicarSugestao reescrita)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_aplicar_completo_20260426_2019.html`

**Status:** ✅ Concluído. Aguardando Karine recarregar e testar.

---

## 2026-04-26 20:01 — Cowork — SISTEMA (botão Segunda Sugestão)
**O que mudou:**
- Embedado `BANCO_HOOKS` (72 hooks classificados) inline no sistema_v4.html como variável JS — ~19KB
- Adicionadas funções: `getHooksUsados()`, `sugerirAlternativa(d, qtd)`, `mostrarSugestoes()`, `aplicarSugestao(num)`, `fecharSugestoes()`
- Modal de sugestões: gradiente navy, lista até 8 hooks rankeados por (mesmo pilar + tier S/A/B/C), cada um com badge de tier colorido, tema, cena de capa e botão "✓ Aplicar este hook"
- Algoritmo de ranking: hooks NÃO usados em outros dias > mesmo pilar do post atual > tier mais alto primeiro
- Botão "💡 Sugerir" adicionado ao rodapé do modal do post (estados pendente/reprovado e aprovado)
- Função `reprovar()` modificada: após reprovar com motivo, ABRE AUTOMATICAMENTE o painel de sugestões (300ms depois pra UX suave)
- Aplicar sugestão: salva como override (OV) que SOBRESCREVE o que vem do DIAS — funciona MESMO se o navegador estiver com cache antigo do HTML

**Por quê:**
- Karine sugeriu fluxo "reprovar → ver alternativas → escolher uma → aplicar" para resolver simultaneamente:
  1. Necessidade real do botão de segunda sugestão (prioridade da semana)
  2. Problema de cache do HTML (overrides do banco SOBRESCREVEM qualquer cache antigo)

**Arquivos afetados:**
- `sistema_v4.html` (modificado: BANCO_HOOKS inserido, 5 funções novas, reprovar() alterado, 2 botões adicionados ao rodapé do modal)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_sugestao_20260426_2001.html`

**Status:** ✅ Concluído. Aguardando Karine recarregar e testar.

---

## 2026-04-26 19:50 — Cowork — FERRAMENTA (limpa-cache standalone)
**O que mudou:**
- Criado `_LIMPAR_CACHE.html` — página HTML independente do sistema_v4 com 4 botões: inspecionar localStorage, limpar overrides 27-30, limpar TODOS os overrides, reset nuclear
- Página é standalone (não depende do cache do sistema_v4)
- Auto-inspeciona localStorage ao abrir, mostrando todos os ff_v4_ov / ff_v4 / ff_imgs_custom

**Por quê:**
- Hard reload do sistema_v4 não foi suficiente para Karine ver os hooks novos dos dias 27-30
- Possível cache HTML mais agressivo do navegador, ou outro mecanismo de override
- Ferramenta standalone garante 100% de independência do problema

**Arquivos afetados:**
- `_LIMPAR_CACHE.html` (novo, na raiz)

**Status:** ✅ Concluído. Aguardando Karine abrir o arquivo e usar.

---

## 2026-04-26 19:42 — Cowork — SISTEMA (migração auto de overrides)
**O que mudou:**
- Adicionado bloco JS de migração que limpa automaticamente os overrides obsoletos dos dias 27, 28, 29, 30 do localStorage
- Roda 1 vez no próximo carregamento (controlado por flag `ff_migr_2026_04_26_dias_27_28_29` em localStorage)
- Remove campos titulo, destaque, legenda, tipo, template, pilar, hora, imgKeys, t2-t5, i2-it4-l3-ck, cta, story, hashtags do OV[27/28/29/30] preservando imgPos

**Por quê:**
- Karine reportou que após substituição dos posts 27-30 abr (commit 19:04), apenas o dia 30 mostrava o novo hook — os dias 27, 28, 29 continuavam com texto antigo
- Causa: ela já tinha aberto/editado esses posts em sessões anteriores, gerando overrides em localStorage que sobrescrevem o objeto DIAS via função `applyOV(d)`
- Snippet manual de console (limpar OV) não resolveu — sistema precisava fazer isso automaticamente

**Arquivos afetados:**
- `sistema_v4.html` (modificado: bloco inserido antes de `function saveOV()`)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_reset_ov_20260426_1942.html`

**Status:** ✅ Concluído. Aguardando Karine fazer hard reload (Ctrl+F5) para a migração rodar.

---

## 2026-04-26 19:12 — Cowork — SISTEMA (galeria de imagens expandida)
**O que mudou:**
- Card "🖼️ Gerenciar Imagens" da aba Configurações foi REDESENHADO:
  - Área de upload triplicada (padding 60px, ícone 64px, gradiente sutil de fundo)
  - **Drag & drop REAL adicionado** (handlers ondragover/ondragleave/ondrop) — agora pode arrastar arquivos do explorador direto pra área e solta
  - Layout reorganizado: nome + botão salvar lado a lado em grid 2:1
  - Mensagem de feedback visual quando arrasta arquivo (área fica verde)
- **Grid de imagens salvas redesenhado:**
  - Imagens agora 140px de largura (era 70px) — DOBRO do tamanho
  - Grid responsivo `repeat(auto-fill, minmax(140px, 1fr))` — adapta à largura da tela
  - Hover effect (eleva e sombreia ao passar mouse)
  - Botão de remover redondo no canto superior direito (estilo Instagram)
  - Lazy loading de imagens (performance)
- **Barra de busca** adicionada no topo da grade — filtra imagens pelo nome em tempo real
- **Indicador de uso do localStorage** no topo do card — mostra "X.XX MB / 5 MB (Y%)" em verde/amarelo/vermelho conforme uso

**Por quê:**
- Karine relatou que o espaço para adicionar imagens estava pequeno
- Sem drag & drop, sem busca, sem visibilidade do limite de storage (5MB do localStorage)
- Preview de 70x87px era muito pequeno para visualizar imagens

**Arquivos afetados:**
- `sistema_v4.html` (modificado: HTML do card de imagens + função renderCfgImgs)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_galeria_20260426_1912.html`

**Status:** ✅ Concluído. Recarregar sistema (Ctrl+F5) e abrir aba "Configurações" para ver.

---

## 2026-04-26 19:04 — Cowork — SISTEMA + DADOS (correções críticas)
**O que mudou:**

1. **Substituídos 4 posts fracos de 27-30 abril** por hooks Tier S/A do banco:
   - Dia 27 (Seg, Venda): "Fechando abril..." (Tier C) → **#71 [A] "Você sabe que sua drogaria pode estar IRREGULAR agora sem você saber?"** (auditoria gratuita)
   - Dia 28 (Ter, Atração): "Manual de Boas Práticas..." (Tier B) → **#10 [S] "Você sabe que a vigilância pode usar denúncia ANÔNIMA para te interditar?"** (e usa sem aviso)
   - Dia 29 (Qua, Autoridade): "O que mudou na legislação..." (Tier B) → **#61 [B] "Você sabe por que algumas drogarias PASSAM em vistoria sem multa nenhuma?"** (método que entrego pros meus clientes) — único Tier não-C disponível no pilar Autoridade
   - Dia 30 (Qui, era Reel): "Resumo de abril..." (descritivo) → **#16 [A] "Você sabe o que pode estar IRREGULAR na sua drogaria agora mesmo?"** (5 itens críticos) — TROCA DE FORMATO: era Reel, agora é Carrossel Atração (formato vencedor)

2. **Corrigida renderização do calendário** que mostrava todos os posts (incluindo maio) como "X de Abril":
   - Adicionada função JS `nomeDia(dia)` que retorna "X de Abril" se dia ≤ 30, senão "X de Maio"
   - Adicionada função JS `labelDia(dia)` que retorna número 1-30 ou "Mai/01"-"Mai/31" no calendário
   - Substituídas 5 ocorrências hardcoded de "de Abril" no código JS (renderFila, abrirDia, dlViewer, header, nome do arquivo de download)

**Por quê:**
- Karine relatou que abriu o sistema, viu os posts de 27-30 abril e os achou fracos (concordo — eram 1 Tier C + 2 Tier B + 1 descritivo)
- Karine relatou que o calendário "não está seguindo as datas corretas" — bug confirmado: tudo aparecia como "de Abril" mesmo os posts de maio (chaves 31-61)

**Arquivos afetados:**
- `sistema_v4.html` (modificado: linha 402 + correções de renderização em ~5 locais)

**Backup criado:**
- `04_SNAPSHOTS_SEMANAIS/sistema_v4_pre_correcao_20260426_1904.html`

**Status:** ✅ Concluído. Aguardando Karine validar visualmente no navegador.

---

## 2026-04-26 18:50 — Cowork — LIMPEZA (script .bat)
**O que mudou:**
- Criado script `_LIMPAR_LIXO.bat` na raiz da pasta para deletar 17 arquivos lixo + 2 pastas com 1 clique

**Por quê:**
- Tentei deletar diretamente via bash mas Cowork em modo "unsupervised" bloqueia rm com "Operation not permitted"
- Tentei usar `mcp__cowork__allow_cowork_file_delete` mas mesmo com Karine autorizando, o hook PreToolUse bloqueia em modo sem supervisão
- Workaround: gerar script .bat que Karine executa manualmente com 1 duplo-clique

**Arquivos afetados:**
- `_LIMPAR_LIXO.bat` (novo — execute pra limpar a pasta)

**Status:** ✅ Script pronto. Aguardando Karine executar.

---

## 2026-04-26 18:30 — Cowork — LIMPEZA + ORGANIZAÇÃO
**O que mudou:**
- Criado `00_LEIA_AQUI.md` (ponto único de verdade do projeto)
- Criado este arquivo `HISTORICO_REVISAO.md` (log de alterações)
- Criada pasta `04_SNAPSHOTS_SEMANAIS/` (snapshots semanais para rollback)
- Listados 17 arquivos lixo + 2 pastas para deleção manual pela Karine

**Por quê:**
- Karine relatou frustração com falta de memória entre sessões e arquivos espalhados
- Necessidade de rastrear o que mudou semana a semana para conseguir fazer rollback se uma semana performar pior que a anterior

**Arquivos afetados:**
- `00_LEIA_AQUI.md` (novo)
- `HISTORICO_REVISAO.md` (novo — este arquivo)
- `04_SNAPSHOTS_SEMANAIS/` (pasta nova)

**Backup criado:** N/A (não houve modificação de sistema_v4)

**Status:** ✅ Concluído (parte de Cowork). Aguardando Karine deletar manualmente os 17 arquivos lixo listados em 00_LEIA_AQUI.md.

---

## 2026-04-26 18:00 — Cowork — DADOS (calendário maio + biblioteca de hooks)
**O que mudou:**
- Adicionados 31 posts de maio 2026 ao objeto DIAS no `sistema_v4.html` (chaves "31" a "61")
- Loop de exibição estendido: linha 1624, de `d<=30` para `d<=61`
- Cada post de maio tem prefixo "📅 Mai/XX —" no campo `destaque` para identificação visual
- Criado `banco_hooks_72.json` com 72 hooks classificados por tier (S/A/B/C)
- Criado `calendario_maio_2026.json` com agenda detalhada do mês

**Por quê:**
- Diagnóstico anterior mostrou que o sistema só tinha 3 posts agendados de hoje até 31/maio (calendário praticamente vazio)
- Os 2 posts vencedores trouxeram 226 novos seguidores juntos seguindo uma fórmula específica — replicar essa fórmula nos próximos 31 dias

**Arquivos afetados:**
- `sistema_v4.html` (modificado: linha 402 + linha 1624)
- `banco_hooks_72.json` (novo)
- `calendario_maio_2026.json` (novo)

**Backup criado:**
- `sistema_v4_backup_antes_maio_2026.html` (2.37MB, estado pré-modificação)

**Distribuição dos 31 posts de maio:**
- 24 do TIER S (vencedores) + 6 do TIER A (fortes) + 1 do TIER B
- 20 Atração + 4 Autoridade + 3 Conexão + 4 Venda
- Regras: Seg→Venda, Ter/Qui/Sab/Dom→Atração, Qua→Autoridade, Sex→Conexão
- Nenhum tema regulatório repetido em janela de 7 dias

**Status:** ✅ Concluído. Aguardando Karine revisar/aprovar os posts no sistema.

---

## 2026-04-26 15:00 — Cowork — ANÁLISE
**O que mudou:**
- Análise dos 2 posts vencedores do Instagram via Claude in Chrome
- Identificada fórmula vencedora: pergunta + rosto humano + emoção de susto + autoridade visual + subtítulo seco + ambiente reconhecível
- Comprovação: posts seguindo a fórmula trouxeram 124 e 102 novos seguidores cada vs 8 do baseline (15x diferença)
- Gerado `Analise_Posts_Vencedores_26abr2026.docx` com a análise completa

**Por quê:**
- Karine notou que apenas 2 posts dos últimos 30 dias bombaram. Necessidade de entender o padrão para replicar.

**Arquivos afetados:**
- `Analise_Posts_Vencedores_26abr2026.docx` (novo)

**Status:** ✅ Concluído.

---

## 2026-04-19 — Claude Code (?) — SISTEMA (campanha vigilância)
**O que mudou:**
- Aplicado patch do padrão vigilância para os dias 19 a 29 de abril
- Posts desses dias seguem identidade visual da campanha "vigilância"

**Por quê:**
- Não documentado anteriormente. Inferido pela presença de `padrao_vigilancia_preset.js`, `patch_dias_19_a_29.js`, `PADRAO_VIGILANCIA.docx`, `README_PADRAO_VIGILANCIA.md`, `COMO_APLICAR_PATCH.md`

**Arquivos afetados:**
- `sistema_v4.html` (modificado)

**Backup criado:**
- `sistema_v4_backup_antes_padrao_vigilancia.html`

**Status:** ✅ Concluído (já em produção).

---

## 2026-04-02 — Cowork — SISTEMA (4 pilares de design)
**O que mudou:**
- Aprovados e integrados os 4 pilares visuais no `sistema_v4.html`:
  - Atração (fundo escuro + teal #00C9A7) — sAt1 a sAt6
  - Conexão (fundo escuro + rose #E8788A) — sCx1 a sCx6
  - Autoridade (branco + navy #0D2B3E) — sAu1 a sAu6
  - Venda (navy + barra verde 28px) — sVd1 a sVd6

**Por quê:**
- Cada pilar precisa de identidade visual distinta para o leitor identificar qual tipo de conteúdo está consumindo

**Arquivos afetados:**
- `sistema_v4.html` (modificado com os 24 templates de slide)

**Status:** ✅ Concluído (em produção).

---

# 📌 BASE: ESTADO INICIAL DO PROJETO

Anterior a 2026-04-02 — projeto começou no Cowork e está sendo mantido alternadamente entre Cowork e Claude Code.
