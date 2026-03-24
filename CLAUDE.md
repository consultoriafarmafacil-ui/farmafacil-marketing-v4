# CLAUDE.md — Guia para o Claude Code
## Projeto: Farma Fácil Assessoria · Sistema V4 Marketing Instagram

> Este arquivo instrui o Claude Code sobre o projeto, automações disponíveis e como ajudar.

---

## Sobre o Projeto

Sistema de marketing digital para o Instagram **@farmafacilassessoria**.  
Farmacêutica responsável: **Karine Menezes** · CRF 15039 · Goiás, Brasil.

**Objetivo do sistema:** Gerar, organizar e analisar conteúdo para o Instagram usando os 4 pilares (Atração, Autoridade, Conexão, Venda) com análise automática de métricas toda segunda-feira.

---

## Estrutura do Projeto

```
farmafacil-v4/
├── CLAUDE.md                          ← Este arquivo (instruções para Claude Code)
├── README.md                          ← Documentação pública
├── .env.example                       ← Modelo de variáveis de ambiente
├── .gitignore
├── sistema/
│   └── farmafacil_sistema_v4.html     ← Painel principal (abrir no Chrome)
├── automacoes/
│   ├── coletar_metricas.py            ← Coleta Meta Business Suite API
│   ├── gerar_calendario.py            ← Gera calendário editorial mensal
│   └── analisar_score.py              ← Analisa score e sugere ajustes
├── templates/
│   └── templates_canva.md             ← 6 templates Canva mapeados
├── metricas/
│   └── historico_2026.json            ← Dados históricos do Instagram
└── docs/
    └── calendario_*.md                ← Calendários mensais gerados
```

---

## Comandos Disponíveis

### Ver o sistema
```bash
# Abrir o painel principal no navegador (Windows)
start sistema/farmafacil_sistema_v4.html

# Abrir o painel principal no navegador (Mac)
open sistema/farmafacil_sistema_v4.html
```

### Gerar calendário do próximo mês
```bash
cd automacoes
python gerar_calendario.py --mes maio
python gerar_calendario.py --mes junho --ano 2026
```

### Coletar métricas (rodar toda segunda-feira)
```bash
cd automacoes
python coletar_metricas.py
```

### Instalar dependências
```bash
pip install requests python-dotenv
```

---

## Estratégia V4 — Referência Rápida

| Dia | Horário | Tipo | Pilar |
|-----|---------|------|-------|
| Segunda | — | Story | Conexão |
| Terça | 12h | Post Feed | Atração |
| Quarta | 12h | Carrossel | Autoridade |
| Quinta | 18h | Reel* | Atração |
| Sexta | 12h | Post Feed | Conexão |
| Sábado | 12h | Post Feed | Venda |

> *Quinta: Se não tiver Reel pronto, substituir por Carrossel de Atração (plano B automático)

---

## Identidade Visual

```
Fundo:    #F4F7F9
Petróleo: #0D2B3E  
Mint:     #00C9A7
Fonte:    Tinos Bold Itálico
```

---

## Templates Canva (6 mapeados)

| ID | Código | Pilar |
|----|--------|-------|
| T1 | DAHEmyA0 | Autoridade |
| T2 | DAHEm3frpKM | Conexão |
| T3 | DAHEmyFjCHI | Atração |
| T4 | EAGyDKIibYY | Educação/Autoridade |
| T5 | EAGewAIq-V0 | Venda |
| T6 | EAGe6BiE1Qc | Conexão/Venda |

---

## Métricas de Referência (Baseline mar/2026)

- Visualizações: 764 (↓80,7%)
- Alcance: 142 (↓78,7%)  
- Interações: 7 (↓72%)
- Novos seguidores: 28 (↓50,9%)
- Total seguidores: 8.295

**Diagnóstico:** Conta postando apenas Stories. Meta recomenda: Reels 1-3x/semana + feed + stories.

---

## Como o Claude Code Pode Ajudar

Peça ao Claude Code para:
- "Gerar o calendário de maio"
- "Coletar as métricas desta semana"
- "Criar um novo script de análise"
- "Atualizar o sistema v4 com novos dados"
- "Adicionar um novo template ao sistema"
- "Fazer commit e push das alterações"
- "Verificar se há erros nos scripts Python"

---

## Configuração do Ambiente

1. Copie `.env.example` para `.env`
2. Preencha o `META_ACCESS_TOKEN` com seu token da API do Meta
3. Instale as dependências: `pip install requests python-dotenv`
4. Teste: `python automacoes/coletar_metricas.py`

---

## GitHub

- Repositório: `github.com/[seu-usuario]/farmafacil-v4`
- GitHub Pages: `[seu-usuario].github.io/farmafacil-v4/sistema/farmafacil_sistema_v4.html`
- Branch principal: `main`
- Deploy automático: configurado via GitHub Actions
