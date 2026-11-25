"""Shared chart style for the portfolio.

Every page imports this module, so all charts read as one system: transparent
backgrounds (they sit on the page in light and dark mode), a neutral grey for
text and grid lines that works on both, indigo for the model being presented
and grey for everything it is compared against.
"""
from __future__ import annotations

import json
from pathlib import Path

import plotly.graph_objects as go
import plotly.io as pio

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

# Palette -------------------------------------------------------------------
INDIGO = "#6366F1"   # the proposed / selected model
AMBER = "#F5A524"    # a second highlighted series
TEAL = "#14B8A6"
ROSE = "#E11D48"
SLATE = "#94A3B8"    # baselines and context
SLATE_DARK = "#64748B"
TEXT = "#8A93A6"     # readable on #FAFAF8 and on #0B0F1A
GRID = "rgba(138,147,166,0.18)"

CONFIG = {"displayModeBar": False, "responsive": True}


def _template() -> go.layout.Template:
    t = go.layout.Template()
    t.layout = go.Layout(
        font=dict(family="Inter, system-ui, sans-serif", size=13, color=TEXT),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        colorway=[INDIGO, AMBER, TEAL, ROSE, SLATE_DARK],
        margin=dict(l=10, r=20, t=40, b=10),
        hoverlabel=dict(font=dict(family="Inter, sans-serif", size=12)),
        xaxis=dict(gridcolor=GRID, zerolinecolor=GRID, linecolor=GRID, automargin=True, title=dict(standoff=8)),
        yaxis=dict(gridcolor=GRID, zerolinecolor=GRID, linecolor=GRID, automargin=True, title=dict(standoff=8)),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0, bgcolor="rgba(0,0,0,0)"),
        title=dict(font=dict(size=14, color=TEXT), x=0, xanchor="left"),
    )
    return t


pio.templates["portfolio"] = _template()
pio.templates.default = "portfolio"


def show(fig: go.Figure, height: int = 380) -> None:
    """Display a figure with the portfolio defaults."""
    fig.update_layout(height=height)
    fig.show(config=CONFIG)


def load_json(*parts: str):
    return json.loads(DATA.joinpath(*parts).read_text())


def table(rows: list[dict], columns: list[tuple[str, str]], best: int | None = None,
          num: set[str] | None = None) -> str:
    """Render a small HTML table in the portfolio style.

    columns: (key, header) pairs. best: index of the row to highlight.
    num: keys whose cells are right-aligned numbers.
    """
    num = num or set()
    head = "".join(
        f'<th class="num">{h}</th>' if k in num else f"<th>{h}</th>" for k, h in columns
    )
    body = []
    for i, r in enumerate(rows):
        cls = ' class="best"' if i == best else ""
        cells = "".join(
            f'<td class="num">{r[k]}</td>' if k in num else f"<td>{r[k]}</td>" for k, _ in columns
        )
        body.append(f"<tr{cls}>{cells}</tr>")
    return f'<table class="hz-table"><thead><tr>{head}</tr></thead><tbody>{"".join(body)}</tbody></table>'
