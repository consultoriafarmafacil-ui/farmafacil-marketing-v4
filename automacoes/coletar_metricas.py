"""
coletar_metricas.py
===================
Coleta métricas do Instagram via Meta Business Suite API
Execute toda segunda-feira para manter o histórico atualizado.

Uso:
    python coletar_metricas.py

Requisitos:
    pip install requests python-dotenv

Configuração:
    Crie um arquivo .env na pasta automacoes/ com:
    META_ACCESS_TOKEN=seu_token_aqui
"""

import json
import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# ── Configurações ────────────────────────────────────────────────
ASSET_ID       = "109761077453312"
BUSINESS_ID    = "137336747461436"
ACCESS_TOKEN   = os.getenv("META_ACCESS_TOKEN", "")
METRICAS_FILE  = "../metricas/historico_2026.json"

METRICAS_BUSCAR = [
    "impressions",       # Visualizações
    "reach",             # Alcance
    "profile_views",     # Visitas ao perfil
    "follower_count",    # Total de seguidores
    "website_clicks",    # Cliques no link
    "email_contacts",    # Cliques em email
]

# ── Funções ──────────────────────────────────────────────────────

def coletar_periodo(dias: int) -> dict:
    """Coleta métricas dos últimos N dias via Graph API."""
    if not ACCESS_TOKEN:
        print("⚠️  META_ACCESS_TOKEN não configurado no .env")
        print("    Acesse: Meta Business Suite → Configurações → API")
        return {}

    url = f"https://graph.facebook.com/v19.0/{ASSET_ID}/insights"
    params = {
        "metric":        ",".join(METRICAS_BUSCAR),
        "period":        "day",
        "since":         (datetime.now() - timedelta(days=dias)).strftime("%Y-%m-%d"),
        "until":         datetime.now().strftime("%Y-%m-%d"),
        "access_token":  ACCESS_TOKEN,
    }

    try:
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException as e:
        print(f"❌ Erro na API: {e}")
        return {}


def salvar_historico(dados: dict, periodo_dias: int):
    """Salva métricas no arquivo JSON histórico."""
    hoje = datetime.now().strftime("%Y-%m-%d")

    # Carrega histórico existente
    try:
        with open(METRICAS_FILE, "r", encoding="utf-8") as f:
            historico = json.load(f)
    except FileNotFoundError:
        historico = {"registros": []}

    # Adiciona novo registro
    registro = {
        "data_coleta": hoje,
        "periodo_dias": periodo_dias,
        "dados_brutos": dados,
    }
    historico["registros"].append(registro)

    # Salva de volta
    os.makedirs(os.path.dirname(METRICAS_FILE), exist_ok=True)
    with open(METRICAS_FILE, "w", encoding="utf-8") as f:
        json.dump(historico, f, ensure_ascii=False, indent=2)

    print(f"✅ Métricas salvas em {METRICAS_FILE}")


def relatorio_manual():
    """Exibe instruções para coleta manual via Meta Business Suite."""
    print("\n" + "="*55)
    print("📊 COLETA MANUAL — META BUSINESS SUITE")
    print("="*55)
    print(f"\nData de hoje: {datetime.now().strftime('%d/%m/%Y')}")
    print(f"\n1. Acesse: business.facebook.com")
    print(f"2. Selecione: @farmafacilassessoria")
    print(f"3. Vá em: Insights → Visão Geral")
    print(f"\nColete os dados dos últimos 7 e 28 dias:")
    print(f"  □ Visualizações")
    print(f"  □ Alcance")
    print(f"  □ Interações")
    print(f"  □ Novos seguidores")
    print(f"  □ Total de seguidores")
    print(f"\n4. Registre em: metricas/historico_2026.json")
    print("="*55 + "\n")


# ── Main ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("\n🌿 Farma Fácil — Coleta de Métricas Instagram")
    print(f"   {datetime.now().strftime('%d/%m/%Y %H:%M')}\n")

    if ACCESS_TOKEN:
        print("📡 Coletando últimos 7 dias...")
        dados_7d  = coletar_periodo(7)
        salvar_historico(dados_7d, 7)

        print("📡 Coletando últimos 28 dias...")
        dados_28d = coletar_periodo(28)
        salvar_historico(dados_28d, 28)
    else:
        print("ℹ️  Token não configurado — exibindo guia manual:\n")
        relatorio_manual()

    print("\n✅ Concluído! Verifique metricas/historico_2026.json")
