# 🌿 Farma Fácil Assessoria — Sistema V4 Marketing Instagram

> Sistema completo de gestão de conteúdo para o Instagram @farmafacilassessoria  
> Farmacêutica responsável: Karine Menezes · CRF 15039 · Goiás

---

## 📋 Sobre o Projeto

Sistema V4 de marketing digital para farmácias e drogarias, desenvolvido para a **Farma Fácil Assessoria Regulatória**. Centraliza calendário editorial, templates Canva, análise automática de métricas e estratégia de conteúdo em um único painel.

### ✅ O que está incluído

| Módulo | Descrição |
|--------|-----------|
| `sistema/` | Painel HTML principal com calendário de abril |
| `automacoes/` | Scripts Python para coleta de métricas do Meta Business Suite |
| `templates/` | Referências dos 6 templates Canva mapeados |
| `metricas/` | Histórico de dados do Instagram (fev–mar 2026 em diante) |
| `docs/` | Estratégia, guias e documentação do sistema |

---

## 🎯 Estratégia Semanal

| Dia | Horário | Tipo | Pilar |
|-----|---------|------|-------|
| Segunda | — | Story | Conexão |
| Terça | 12h | Post Feed | Atração |
| Quarta | 12h | Carrossel | Autoridade |
| Quinta | 18h | **Reel** *(ou Carrossel se sem Reel)* | Atração |
| Sexta | 12h | Post Feed | Conexão |
| Sábado | 12h | Post Feed | Venda |

---

## 📊 Métricas de Referência (Baseline)

> Período: 23 fev – 22 mar 2026

- **Visualizações:** 764 ↓80,7%
- **Alcance:** 142 ↓78,7%
- **Interações:** 7 ↓72%
- **Novos seguidores:** 28 ↓50,9%
- **Total de seguidores:** 8.295
- **Diagnóstico:** conta postando só Stories, sem alcance orgânico

**Meta recomendada pelo Instagram:** Reels 1–3×/semana + 1 post feed + 5 stories

---

## 🎨 Identidade Visual

```
Fundo:   #F4F7F9  (cinza claro)
Petróleo: #0D2B3E  (cor principal)
Mint:    #00C9A7  (destaque)
Fonte:   Tinos Bold Itálico
```

### 6 Templates Canva

| ID | Código Canva | Pilar |
|----|-------------|-------|
| T1 | DAHEmyA0 | Autoridade — Marrom Minimalista |
| T2 | DAHEm3frpKM | Conexão — Carrossel Reflexão |
| T3 | DAHEmyFjCHI | Atração — Castanho Citação |
| T4 | EAGyDKIibYY | Educação — Branco Moderno |
| T5 | EAGewAIq-V0 | Venda — Azul Marinho 3 Motivos |
| T6 | EAGe6BiE1Qc | Conexão/Venda — Verde Azul Consultoria |

---

## 🚀 Como Usar

### 1. Ver o sistema no navegador
Abra o arquivo `sistema/farmafacil_sistema_v4.html` diretamente no Chrome.

### 2. Coletar métricas automaticamente (toda segunda-feira)
```bash
cd automacoes
python coletar_metricas.py
```

### 3. Atualizar calendário mensal
```bash
cd automacoes
python gerar_calendario.py --mes maio
```

---

## 🌐 Acesso Online

O sistema está disponível via **GitHub Pages**:  
👉 `https://[seu-usuario].github.io/farmafacil-v4/sistema/farmafacil_sistema_v4.html`

---

## 📁 Estrutura de Pastas

```
farmafacil-v4/
├── README.md
├── sistema/
│   └── farmafacil_sistema_v4.html      ← Painel principal
├── automacoes/
│   ├── coletar_metricas.py             ← Coleta Meta Business Suite
│   ├── gerar_calendario.py             ← Gera calendário mensal
│   └── analisar_score.py               ← Análise de score Instagram
├── templates/
│   └── templates_canva.md              ← Referências dos 6 templates
├── metricas/
│   └── historico_2026.json             ← Dados históricos
└── docs/
    ├── estrategia_v4.md                ← Estratégia completa
    └── guia_postagem.md                ← Guia prático de postagem
```

---

## 👩‍💼 Responsável

**Karine Menezes** — Farmacêutica CRF 15039  
Farma Fácil Assessoria Regulatória · Goiás, Brasil  
Instagram: [@farmafacilassessoria](https://instagram.com/farmafacilassessoria)
