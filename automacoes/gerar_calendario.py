"""
gerar_calendario.py
===================
Gera o calendário editorial mensal para o Instagram @farmafacilassessoria
baseado na estratégia V4 de 4 pilares.

Uso:
    python gerar_calendario.py
    python gerar_calendario.py --mes maio
    python gerar_calendario.py --mes junho --ano 2026

Saída:
    Exibe o calendário no terminal e salva em docs/calendario_[mes].md
"""

import argparse
import calendar
from datetime import date, timedelta

# ── Estratégia V4 ────────────────────────────────────────────────
ESTRATEGIA = {
    0: {"tipo": "Story",                "pilar": "Conexão",    "horario": "-"},
    1: {"tipo": "Post Feed",            "pilar": "Atração",    "horario": "12h"},
    2: {"tipo": "Carrossel",            "pilar": "Autoridade", "horario": "12h"},
    3: {"tipo": "Reel / Carrossel*",    "pilar": "Atração",    "horario": "18h"},
    4: {"tipo": "Post Feed",            "pilar": "Conexão",    "horario": "12h"},
    5: {"tipo": "Post Feed",            "pilar": "Venda",      "horario": "12h"},
    6: None,  # Domingo — descanso
}

PILARES_EMOJI = {
    "Atração":    "🟢",
    "Autoridade": "🔵",
    "Conexão":    "🟡",
    "Venda":      "🔴",
}

MESES_PT = {
    1: "janeiro", 2: "fevereiro", 3: "março", 4: "abril",
    5: "maio",    6: "junho",     7: "julho",  8: "agosto",
    9: "setembro",10: "outubro",  11: "novembro", 12: "dezembro",
}

DIAS_PT = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]


def gerar_calendario(mes: int, ano: int) -> list[dict]:
    """Retorna lista de dias úteis com tipo de conteúdo."""
    dias_do_mes = calendar.monthrange(ano, mes)[1]
    calendario = []

    for dia in range(1, dias_do_mes + 1):
        d = date(ano, mes, dia)
        semana = d.weekday()  # 0=seg, 6=dom
        estrategia = ESTRATEGIA.get(semana)

        if estrategia:
            calendario.append({
                "data":    d.strftime("%d/%m"),
                "dia_sem": DIAS_PT[semana],
                "tipo":    estrategia["tipo"],
                "pilar":   estrategia["pilar"],
                "horario": estrategia["horario"],
                "emoji":   PILARES_EMOJI.get(estrategia["pilar"], "⚪"),
            })

    return calendario


def imprimir_calendario(calendario: list, mes: int, ano: int):
    """Exibe calendário formatado no terminal."""
    mes_nome = MESES_PT[mes].upper()
    print(f"\n{'='*58}")
    print(f"  🌿 CALENDÁRIO EDITORIAL — {mes_nome}/{ano}")
    print(f"  @farmafacilassessoria · Sistema V4")
    print(f"{'='*58}")
    print(f"  {'DATA':<8} {'DIA':<9} {'HORÁRIO':<8} {'PILAR':<12} TIPO")
    print(f"  {'-'*52}")

    for item in calendario:
        print(
            f"  {item['data']:<8} "
            f"{item['dia_sem']:<9} "
            f"{item['horario']:<8} "
            f"{item['emoji']} {item['pilar']:<10} "
            f"{item['tipo']}"
        )

    print(f"\n  * Quinta: Reel prioritário, Carrossel como plano B")
    print(f"\n  LEGENDA:")
    for pilar, emoji in PILARES_EMOJI.items():
        print(f"    {emoji} {pilar}")
    print(f"{'='*58}\n")


def salvar_markdown(calendario: list, mes: int, ano: int):
    """Salva calendário como arquivo Markdown."""
    mes_nome = MESES_PT[mes]
    arquivo = f"../docs/calendario_{mes_nome}_{ano}.md"

    linhas = [
        f"# 📅 Calendário Editorial — {mes_nome.capitalize()}/{ano}",
        f"> @farmafacilassessoria · Sistema V4 Marketing",
        "",
        "| Data | Dia | Horário | Pilar | Tipo de Conteúdo |",
        "|------|-----|---------|-------|-----------------|",
    ]

    for item in calendario:
        linhas.append(
            f"| {item['data']} | {item['dia_sem']} | {item['horario']} | "
            f"{item['emoji']} {item['pilar']} | {item['tipo']} |"
        )

    linhas += [
        "",
        "> **\\*** Quinta: Reel prioritário. Se não tiver Reel pronto, usar Carrossel de Atração.",
        "",
        "## Legenda de Pilares",
        "- 🟢 **Atração** — Conteúdo que atrai novos seguidores",
        "- 🔵 **Autoridade** — Conteúdo que demonstra expertise",
        "- 🟡 **Conexão** — Conteúdo que engaja seguidores atuais",
        "- 🔴 **Venda** — Conteúdo que converte em contato/serviço",
    ]

    import os
    os.makedirs(os.path.dirname(arquivo), exist_ok=True)
    with open(arquivo, "w", encoding="utf-8") as f:
        f.write("\n".join(linhas))

    print(f"✅ Calendário salvo em: {arquivo}")


# ── Main ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    from datetime import date as _date

    parser = argparse.ArgumentParser(description="Gera calendário editorial V4")
    hoje = _date.today()

    parser.add_argument("--mes", type=str,
                        default=MESES_PT[hoje.month],
                        help="Nome do mês (ex: maio)")
    parser.add_argument("--ano", type=int,
                        default=hoje.year,
                        help="Ano (ex: 2026)")

    args = parser.parse_args()

    # Converte nome do mês para número
    mes_num = next(
        (num for num, nome in MESES_PT.items() if nome == args.mes.lower()),
        hoje.month
    )

    calendario = gerar_calendario(mes_num, args.ano)
    imprimir_calendario(calendario, mes_num, args.ano)
    salvar_markdown(calendario, mes_num, args.ano)
