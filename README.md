# Huzeifa Asif · Data Science Portfolio

A [Quarto](https://quarto.org) website, rendered with Python. Every chart on the
project pages is computed at build time from that project's own result files
(copied into `data/`), so the numbers on the site are the numbers the code produced.

| Page | Project | Source of the numbers |
|---|---|---|
| `projects/hci-chatbot-preference.qmd` | SA-DeBERTa: predicting human preference between chatbot answers (Advanced HCI paper) | `data/hci/` ← `MSDS/results/` |
| `projects/ml-breast-cancer.qmd` | Decision Tree vs Random Forest vs KNN for breast cancer diagnosis | `data/ml-breast-cancer/` ← `ML_Assignment2/results/` |
| `projects/ml-id3-student-outcomes.qmd` | ID3 by hand, verified by a from-scratch implementation | computed on the page |
| `projects/bigdata-supply-chain.qmd` | Supply chain delay prediction with PySpark (**in progress**) | to be added |
| `software.qmd`, `about.qmd`, `index.qmd` | software in production, CV, landing page | text |

## Build

The Python environment is pinned with [uv](https://docs.astral.sh/uv/) (`pyproject.toml`, `uv.lock`).

```bash
uv sync                      # create .venv with the locked packages
uv run quarto preview        # live preview while editing
uv run quarto render         # build the site into _site/
```

Rendered results are cached in `_freeze/` (commit it). CI then publishes without
running Python: `.github/workflows/publish.yml` pushes the site to the `gh-pages`
branch on every push to `main`.

## Updating

- **Big data results:** when the PySpark runs finish, copy the metrics files into
  `data/bigdata/` and replace the "Results" section of `projects/bigdata-supply-chain.qmd`
  with charts drawn from them (see the other project pages for the pattern).
- **New project:** add a `.qmd` under `projects/`, a navbar entry in `_quarto.yml`
  and a card in `index.qmd` (`data-tags` drives the home-page filter).
- **CV:** replace `assets/cv/Huzeifa_Asif_CV.pdf`.

## Layout

```
_quarto.yml          site config, navbar, light/dark themes
theme/               light.scss / dark.scss (colour tokens), common.scss (components)
py/charts.py         shared Plotly style and table helper
index.qmd            landing page          about.qmd · software.qmd
projects/            one page per project
data/                result files the charts are drawn from
assets/              photo, CV, papers, figures
```
