# 🚀 Guia: Subindo o Sistema V4 no GitHub com Claude Code

> Siga este guia do início ao fim. Cada passo tem o comando exato para copiar e colar.

---

## PARTE 1 — Preparar a pasta no seu PC

### Passo 1: Baixar os arquivos deste projeto

Baixe o arquivo ZIP do projeto que o Claude gerou e extraia em uma pasta chamada:
```
C:\Users\[SeuNome]\farmafacil-v4\
```

Dentro dela deve ter:
```
farmafacil-v4/
├── CLAUDE.md
├── README.md
├── .env.example
├── .gitignore
├── sistema/
│   └── farmafacil_sistema_v4.html   ← Cole aqui o seu arquivo HTML do V4!
├── automacoes/
│   ├── coletar_metricas.py
│   └── gerar_calendario.py
├── templates/
│   └── templates_canva.md
└── metricas/
    └── historico_2026.json
```

> ⚠️ **Importante:** Copie seu arquivo `farmafacil_sistema_v4.html` para dentro da pasta `sistema/`

---

## PARTE 2 — Criar o repositório no GitHub

### Passo 2: Criar repositório no GitHub.com

1. Acesse **github.com** e faça login
2. Clique no **"+"** no canto superior direito → **"New repository"**
3. Preencha:
   - **Repository name:** `farmafacil-v4`
   - **Description:** `Sistema V4 Marketing Instagram - Farma Fácil Assessoria`
   - Marque **"Private"** (só você verá)
   - **NÃO** marque "Initialize this repository"
4. Clique em **"Create repository"**
5. Copie a URL que aparecer (ex: `https://github.com/seunome/farmafacil-v4.git`)

---

## PARTE 3 — Usar o Claude Code para configurar tudo

### Passo 3: Abrir o Claude Code na pasta do projeto

No Windows, abra o **Prompt de Comando** ou **PowerShell**:

```bash
cd C:\Users\[SeuNome]\farmafacil-v4
claude
```

O Claude Code vai abrir. Agora é só pedir em português!

---

### Passo 4: Diga ao Claude Code para inicializar o Git

Cole esta mensagem no Claude Code:

```
Por favor, faça o seguinte:
1. Inicialize o Git nesta pasta
2. Configure meu nome e email no Git (pode usar: Karine Menezes e karine@farmafacilassessoria.com.br)
3. Adicione todos os arquivos
4. Faça o primeiro commit com a mensagem "feat: Sistema V4 Marketing Instagram - configuração inicial"
5. Conecte ao repositório remoto: https://github.com/[SEU-USUARIO]/farmafacil-v4.git
6. Faça o push para o GitHub
```

O Claude Code vai executar tudo automaticamente! 🎉

---

## PARTE 4 — Ativar o GitHub Pages (acesso online gratuito)

### Passo 5: Ativar GitHub Pages

1. Vá para o seu repositório no GitHub
2. Clique em **"Settings"** (Configurações)
3. No menu lateral, clique em **"Pages"**
4. Em **"Source"**, selecione **"GitHub Actions"**
5. Pronto! Em ~2 minutos seu sistema estará online

**URL do seu sistema:**
```
https://[seu-usuario].github.io/farmafacil-v4/sistema/farmafacil_sistema_v4.html
```

---

## PARTE 5 — Usar o Claude Code no dia a dia

### O que pedir ao Claude Code toda segunda-feira:

```
Hoje é segunda-feira. Por favor:
1. Gere o calendário do próximo mês
2. Abra o arquivo de métricas e me mostre o resumo
3. Faça commit e push das atualizações
```

### Para gerar calendário de um mês específico:

```
Gere o calendário de junho de 2026 e salve na pasta docs/
```

### Para fazer commit de alterações:

```
Fiz alterações no sistema. Faça commit com uma mensagem descritiva e push para o GitHub.
```

---

## PARTE 6 — Configuração do ambiente Python (opcional)

Se quiser usar a coleta automática de métricas:

### Passo 6: Instalar dependências

No Claude Code, peça:
```
Instale as dependências Python necessárias e configure o ambiente virtual
```

Ou manualmente:
```bash
pip install requests python-dotenv
```

### Passo 7: Configurar o token do Meta

1. Copie o arquivo `.env.example` e renomeie para `.env`
2. Abra o `.env` e preencha:
   ```
   META_ACCESS_TOKEN=seu_token_aqui
   ```
3. **NUNCA** mande o arquivo `.env` para o GitHub (já está no .gitignore ✅)

---

## 🎉 Pronto! Seu sistema está no GitHub

**Benefícios que você ganhou:**
- ✅ Sistema acessível de qualquer lugar (GitHub Pages)
- ✅ Backup automático no GitHub
- ✅ Histórico de todas as mudanças
- ✅ Claude Code pode atualizar tudo com um comando
- ✅ Calendários gerados automaticamente
- ✅ Métricas salvas e versionadas

---

## 🆘 Se algo der errado

Abra o Claude Code e diga:
```
Tive um erro ao tentar [descreva o que estava fazendo]. A mensagem de erro foi: [cole o erro aqui]
```

O Claude Code vai diagnosticar e resolver!
