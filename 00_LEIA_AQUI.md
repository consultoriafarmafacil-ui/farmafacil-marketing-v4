# 📌 LEIA AQUI PRIMEIRO — Farma Fácil Marketing v4

> **Este é o ponto único de verdade do projeto.**
> Sempre que abrir o projeto (Karine, Cowork ou Claude Code), começar por aqui.
> Última atualização: **26 abr 2026 — 23h30 (correção massiva pós-auditoria)**

---

## 🎯 O QUE É ESTE PROJETO

Sistema de marketing Instagram da **@farmafacilassessoria** (Assessoria Farma Fácil — Karine Menezes CRF 15039).
Pipeline: análise do perfil → estratégia → geração de conteúdo → aprovação → publicação no Instagram.

**Arquivo principal:** `sistema_v4.html` (abrir no navegador)

---

## ✅ O QUE JÁ ESTÁ FEITO

- [x] **4 pilares de design aprovados** e integrados no `sistema_v4.html`: Atração (teal), Conexão (rose), Autoridade (navy), Venda (verde)
- [x] **29 posts de abril** (dias 1 a 29) agendados no objeto DIAS (chaves "1" a "29")
- [x] **Análise dos 2 posts vencedores** do Instagram → fórmula descoberta: rosto humano + emoção de susto + autoridade visual + subtítulo seco + ambiente de farmácia
- [x] **Banco de 72 hooks** seguindo a fórmula vencedora, classificados por tier (S/A/B/C) — ver `banco_hooks_72.json`
- [x] **31 posts de maio** agendados no `sistema_v4.html` (chaves "31" a "61", representando dias 1 a 31 de maio)
- [x] **Backup do sistema** criado em `sistema_v4_backup_antes_maio_2026.html`
- [x] **Loop de exibição estendido** de `d<=30` para `d<=61` (linha 1624 do sistema_v4.html)
- [x] **Auditoria minuciosa do sistema (26/04 23h30)** — 6 problemas críticos identificados em `Diagnostico_Sistema_v4_26abr2026.md`
- [x] **Banco de hooks acentuado** — 220+ correções (voce→você, vigilancia→vigilância, etc.). Versão `v4-todos-slides-customizados`
- [x] **47 hooks sem slides ganharam slides customizados** — agora 72/72 hooks têm slides específicos da capa
- [x] **Dias 32 a 61 (2 a 31 maio) regenerados** com slides customizados + legendas ricas (~900 chars com hashtags por tema)
- [x] **Botões inúteis renomeados/repurposados** — "Publicar" virou "Marcar publicado" (não promete o que não cumpre); "Republicar" virou "Voltar p/ pendente"
- [x] **Botões de manutenção adicionados na aba Config** — "Regenerar legendas" e "Regenerar slides dos pendentes"
- [x] **Onda 1 implementada (01/05/2026)** — banco expandido para 88 hooks com 4 famílias novas + roteiro_reel nos 32 Tier S + aba Stories com planejador semanal + banco de 12 enquetes + botão 🎬 Reel no modal + regra ⚠ família no calendário

---

## 🚧 PRIORIDADE ATUAL — semana de 1 a 7 mai 2026

### 🔴 ALTA — fazer ANTES de publicar próximo post
- [ ] **Karine revisar e aprovar** os posts da primeira semana de maio (1 a 7 mai)
- [ ] **Usar a aba Stories** todo dia — meta: 5 stories/semana com enquete pelo menos 1×

### 🟡 MÉDIA — durante esta semana
- [ ] Gerar imagens das capas dos próximos 7 posts seguindo a "cena sugerida" de cada hook
- [ ] Testar botão 🎬 Reel em um post Tier S e gravar o primeiro Reel da semana
- [ ] Reescrever os 4 hooks Tier C (#22, #52, #58, #66) ou descartar
- [ ] Atualizar `00_LEIA_AQUI.md` (este arquivo) sempre que algo for feito

---

## 🌊 ROADMAP — sistema vivo de marketing (3 ondas)

### 🌊 ONDA 1 — Sistema utilizável ✅ CONCLUÍDA (01/05/2026)
- [x] Banco de hooks expandido: 73→88 hooks, 1→5 famílias, roteiro_reel em todos os Tier S
- [x] Aba Stories: planejador 7×5 + 12 enquetes prontas + roteiro semanal
- [x] Botão 🎬 Reel no modal de aprovação (aparece condicionalmente)
- [x] Regra de família no calendário (badge ⚠ rep quando repete família consecutiva)
- [ ] Skeleton de painel de métricas no sistema_v4 (placeholders pras conexões) — próxima sprint
- [ ] Live Artifact "Status do Marketing" na sidebar do Cowork — próxima sprint

### 🌊 ONDA 2 — Conexões externas (depende de Karine enviar info)
- [ ] **Instagram Graph API conectado** — KARINE PRECISA: confirmar se @farmafacilassessoria está vinculado a Página do Facebook (Business) + criar app gratuito no Meta for Developers + gerar token de acesso
- [ ] **Google Analytics conectado** — KARINE PRECISA: enviar URL do site da Farma Fácil + confirmar se tem GA4 instalado + qual conta GA
- [ ] **Linktree → solução própria** — substituir Linktree por página HTML rastreável (Linktree free não tem API)
- [ ] **Hospedar sistema_v4** em GitHub Pages (grátis) pra rodar automação semanal

### 🌊 ONDA 3 — Automação (depende de Onda 2 estar pronta)
- [ ] Scheduled Task: sábado 10h roda análise semanal automática
- [ ] Comparação semana atual vs anterior
- [ ] Sugestões automáticas baseadas em performance real
- [ ] Alerta quando algum hook bombar/falhar

---

## 📨 O QUE KARINE PRECISA ME ENVIAR (lista completa)

### Pra Onda 2:
1. **URL do site** da Farma Fácil
2. **Confirmar se tem Google Analytics instalado** no site (GA4? Universal? Conta?)
3. **Confirmar acesso ao Meta Business Manager** (business.facebook.com) — página do Facebook vinculada ao Instagram
4. **Versão do Linktree**: Free, Starter, Pro?
5. **Onde o sistema_v4.html roda hoje**: só local (file://) ou já está hospedado?

### Pra análises futuras:
6. Prints semanais de "Visualizações por slide" do app Instagram (essa métrica não aparece no Web)
7. Lista de temas regulatórios que faltaram no banco de 72 hooks (ex: Farmácia Popular, manipulação, distribuidoras)

---

## 🗺️ MAPA DOS ARQUIVOS DA PASTA

> Esta seção será atualizada assim que a reorganização da pasta for aprovada.

### Arquivos PRINCIPAIS (não mexer sem cuidado)
- `sistema_v4.html` — sistema principal de marketing (abrir no navegador)
- `banco_hooks_72.json` — biblioteca de 72 hooks classificados por tier
- `calendario_maio_2026.json` — agenda de 31 posts de maio
- `00_LEIA_AQUI.md` — este arquivo (ponto único de verdade)
- `HISTORICO_REVISAO.md` — log cronológico de toda alteração no sistema
- `04_SNAPSHOTS_SEMANAIS/` — cópias semanais do sistema_v4 para rollback rápido

### Documentos de análise (referência)
- `Analise_Posts_Vencedores_26abr2026.docx` — análise da fórmula vencedora
- `Banco_Hooks_CONSOLIDADO_v2.docx` — banco de hooks em formato Word
- `Analise_Metricas_Instagram_Abril2026.docx` — análise inicial de métricas
- `Analise_Minuciosa_Post_Outlier_v2.docx` — análise do post outlier
- `Banco_Hooks_Abril_Maio_2026.docx` — versão anterior do banco
- `PADRAO_VIGILANCIA.docx` + `README_PADRAO_VIGILANCIA.md` — padrão visual da campanha de vigilância
- `LINKS_WAME_BIO.md` — links do WhatsApp e bio
- `COMO_APLICAR_PATCH.md` — instruções antigas de patch

### Backups (não usar — só pra emergência)
- `sistema_v4_backup_antes_maio_2026.html` — antes da inserção de maio (26/04/2026)
- `sistema_v4_backup_antes_compressao.html`
- `sistema_v4_backup_antes_padrao_vigilancia.html`
- `sistema_v4_backup_templates.html`
- `sistema_v4_backup_20260402_191032.html`
- `sistema_v4_pre_patch_20260403_105718.html`
- `sistema_v4_broken_backup.html`
- `sistema_v4.html.backup`
- `sistema_v4_new.html`

### Modelos visuais antigos (referência)
- `modelo_atracao_novo.html`
- `modelo_conexao_novo.html`
- `modelo_autoridade_novo.html`
- `modelo_venda_v4.html`
- `farmafacil-kit-posicionamento.html`
- pasta `carrosseis/` — carrosséis prontos
- pasta `templates/` — templates de design

### Scripts de patch antigos (não rodar de novo)
- `aplicar_templates.py`, `fix_templates.py`, `fix_templates2.py`, `fix_v3.py`, `fix_v4.py`, `patch_v4.py`
- `padrao_vigilancia_preset.js`, `patch_dias_19_a_29.js`
- pasta `scripts/`
- pasta `prints de erros/`

---

## 🎨 FÓRMULA VENCEDORA (não esquecer)

Cada post novo PRECISA seguir todos os 5 elementos abaixo. Se faltar 1, o algoritmo do Instagram não empurra pra fora da bolha.

1. **Hook em pergunta**: "Você sabe..." + verbo de ação + objeto regulatório (vigilância/fiscal/multa/interdição)
2. **Rosto humano com emoção INTENSA** (susto/medo/choque) na capa — multiplicador principal
3. **Presença visual da AUTORIDADE/AMEAÇA** (fiscal de uniforme, placa INTERDITADO, multa)
4. **Subtítulo SECO em 4-6 palavras** ("custa multa", "donos não sabe", "interdição em 24h")
5. **Ambiente de farmácia/drogaria reconhecível** (não cenário abstrato)

**Comprovação:** posts seguindo a fórmula trouxeram 124 e 102 novos seguidores cada (vs 8 do baseline com mesmo hook escrito mas sem rosto/emoção). Diferença de 15x.

---

## ⚙️ INSTRUÇÕES PRA CLAUDE (Cowork) E CLAUDE CODE

**SEMPRE FAZER:**
1. Ler este arquivo (`00_LEIA_AQUI.md`) ANTES de tomar qualquer decisão grande no projeto
2. Atualizar este arquivo (seções "Já está feito", "Mapa dos arquivos") sempre que adicionar/mover/criar algo
3. **Registrar TODA alteração no `HISTORICO_REVISAO.md`** — formato padronizado, ordem cronológica decrescente
4. Salvar TUDO dentro de `C:\Users\karin\farma-marketing-v4` — nunca em outras pastas do computador
5. Antes de mover arquivos, perguntar pra Karine
6. Antes de mexer no `sistema_v4.html`, fazer backup com timestamp na pasta `04_SNAPSHOTS_SEMANAIS/`
7. **Toda segunda, criar snapshot da semana** (cópia do sistema_v4.html para `04_SNAPSHOTS_SEMANAIS/sistema_v4_YYYY-WXX.html`)
8. Limitar a quantidade de arquivos na raiz da pasta — usar subpastas; não criar scripts soltos

**NUNCA FAZER:**
- Salvar arquivos em outras pastas do PC
- Deletar arquivos sem confirmar com Karine
- Sobrescrever backups existentes
- Mexer no objeto DIAS sem fazer backup antes

---

## 📞 CONTATOS / IDs RELEVANTES

- Instagram: `@farmafacilassessoria`
- Conta de anúncios: CA - Farma Fácil Assessoria (1385441855547107 BRL)
- GitHub repo (referenciado no sistema): `consultoriafarmafacil-ui/farmafacil-marketing-v4`

---

## 📅 LOG DE GRANDES MUDANÇAS

| Data | Quem | O que mudou |
|------|------|-------------|
| 02 abr 2026 | Cowork | Aprovação dos 4 pilares de design + integração no sistema_v4 |
| 19 abr 2026 | Cowork | Patch dos dias 19 a 29 abril com padrão vigilância |
| 26 abr 2026 | Cowork | Análise da fórmula vencedora dos 2 posts campeões |
| 26 abr 2026 | Cowork | Banco de 72 hooks classificados por tier + 31 posts de maio agendados |
| 26 abr 2026 | Cowork | Criação deste arquivo (00_LEIA_AQUI.md) como ponto único de verdade |
| 26 abr 2026 | Cowork | Criação do `HISTORICO_REVISAO.md` + pasta `04_SNAPSHOTS_SEMANAIS/` + snapshot da W17 |
| 26 abr 2026 23h30 | Cowork | Auditoria minuciosa + correção massiva: 47 hooks customizados, 220 acentos, dias 32-61 regerados, botões limpos |
| 01 mai 2026 | Claude Code | Onda 1: banco 73→88 hooks (4 famílias novas + roteiro_reel), aba Stories, botão Reel, regra família calendário |
| 01 mai 2026 | Claude Code | API Meta Graph: 1ª conexão real — 8.720 seguidores, 439 novos em 28d, 3 posts Tier S confirmados por dados |
