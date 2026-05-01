# Instagram Graph API — Configuração da Farma Fácil

> IDs permanentes (não mudam). O token muda a cada geração — nunca salvar token aqui.

## IDs confirmados (extraídos em 01/05/2026)

| Campo | Valor |
|-------|-------|
| Facebook User ID | `27011571788468465` |
| Facebook Page ID | `109761077453312` |
| Instagram Business Account ID | `17841415773297230` |
| Instagram Username | `@farmafacilassessoria` |
| App Name | Farma Fácil API |
| App ID | `2794697707562132` |

## Permissões necessárias no token

- `instagram_basic`
- `instagram_manage_insights`
- `pages_show_list`
- `pages_read_engagement`

## Token ativo

- **Arquivo:** `.instagram_token` (na raiz do projeto)
- **Validade:** 30/06/2026 (Long-Lived Token — 60 dias)
- **⚠️ Nunca enviar este arquivo para o GitHub ou compartilhar em chats**

Quando o token vencer: gere um novo no Graph API Explorer, ative "Gerar token de longa duração" nas configurações do app, e substitua o conteúdo do arquivo `.instagram_token`.

---

## Como gerar novo token

1. Acesse: https://developers.facebook.com/tools/explorer/
2. Selecione o app **Farma Fácil API**
3. Gere User Token com as permissões acima
4. Token dura ~2h (User Token) — se quiser permanente, trocar por Long-Lived Token (60 dias)

## Endpoints usados (com IG_ID = 17841415773297230)

```
# Perfil
GET /v22.0/{IG_ID}?fields=followers_count,follows_count,media_count

# Alcance (28 dias)
GET /v22.0/{IG_ID}/insights?metric=reach&period=days_28

# Seguidores por dia
GET /v22.0/{IG_ID}/insights?metric=follower_count&period=day&since={UNIX}&until={UNIX}

# Posts recentes com métricas
GET /v22.0/{IG_ID}/media?fields=id,caption,media_type,timestamp,like_count,comments_count,insights.metric(reach,saved,follows,total_interactions)&limit=20

# Métricas extras (precisam metric_type=total_value)
GET /v22.0/{IG_ID}/insights?metric=accounts_engaged,profile_views&metric_type=total_value&period=days_28
```

## Snapshot mais recente

Ver: `04_SNAPSHOTS_SEMANAIS/metricas_api_20260501.json`
