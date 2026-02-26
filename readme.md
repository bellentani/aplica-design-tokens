# Aplica Theme — Design Tokens Architecture Reference

![Design Tokens](https://img.shields.io/badge/Aplica%20Tokens-Tokens%20Studio%20%26%20Figma-blue)

A **reference** repository for Design Tokens architecture (Aplica Theme) for study, training, and use as a boilerplate in Figma. Free and open source; **does not depend on the Aplica Theme Engine** or any generation scripts — token structure and documentation only.

---

## What this repository contains

- **`data/aplica-theme/`** — Ready-to-use tokens (resolved values) for [Tokens Studio](https://www.tokens.studio/) in Figma. Boilerplate to start a Design System with a layered architecture (foundation, semantic, surface, mode, dimension, brand).
- **`data/aplica-theme-with-extensions/`** — Same structure as `aplica-theme`, but using **Tokens Studio Extensions** (e.g. dark mode via `modify`/mix). Useful for studying token calculations and composition inside the plugin.
- **`docs/`** — Architecture documentation in Portuguese (pt-br) and English (en): layers, semantics, scale, implementation, and [theme structure](docs/pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md).
- **`data/tokens-aplica-default.json`** — Single-file token set based on **aplica_joy** (all values in one file). Use with **Tokens Studio Free** in Figma.
- **`data/tokens-aplica-boilerplate.json`** — Same architecture as default; **template to start your Design System**. Copy and replace brand colors and typography with your own.
- **`data/aplica-theme-free/`** — Single-file token sets built for **Tokens Studio Free**: one file per theme × mode × surface (e.g. `tokens-free-aplica_joy-light-positive.json`, `tokens-free-aplica_grinch-dark-negative.json`). Generate with **`npm run make:tokens-free`** from themes in `data/aplica-theme/brand/`.

---

## Project structure

```
├── data/
│   ├── aplica-theme/                    # Resolved tokens (Figma/Tokens Studio)
│   ├── aplica-theme-with-extensions/    # Same structure + Extensions (e.g. dark)
│   ├── aplica-theme-free/               # Built single-file sets (npm run make:tokens-free)
│   ├── tokens-aplica-boilerplate.json
│   └── tokens-aplica-default.json
├── docs/
│   ├── pt-br/                           # Documentation in Portuguese
│   └── en/                              # Documentation in English
├── AI_CONTEXT.md                        # Context for AI agents
├── README.md
└── LICENSE
```

---

## How to use in Figma

**Tokens Studio version:**  
- **Free:** Use the free version of [Tokens Studio](https://www.tokens.studio/) with **`data/aplica-theme-free/`** (e.g. `tokens-aplica-default.json` or `tokens-free-aplica-joy.json`) or **`data/tokens-aplica-default.json`**.  
- **Pro:** Loading **`data/aplica-theme`** or **`data/aplica-theme-with-extensions`** (multi-set theme structure with `$metadata.json` / `$themes.json`) requires **Tokens Studio Pro**.

1. Install the [Tokens Studio](https://www.tokens.studio/) plugin in Figma (free or Pro, depending on which data you use).
2. Clone this repository or download the desired data folder or file.
3. In Tokens Studio, **connect** the project to the repository or import the data:
   - **`data/aplica-theme-free/`** — built single-file sets; works with the **free** version (run `npm run make:tokens-free` to generate).
   - **`data/tokens-aplica-default.json`** — single file (aplica_joy) in `data/`; for other combinations use generated files in `aplica-theme-free/`.
   - **`data/tokens-aplica-boilerplate.json`** — same structure as default; use as starting point for your DS (replace brand/typography).
   - **`data/aplica-theme`** — full theme structure; requires **Pro**. Direct use; all values already calculated.
   - **`data/aplica-theme-with-extensions`** — full theme with Extensions; requires **Pro**. Dark mode and dimension generated via the plugin.
4. Use themes and modes (light/dark, positive/negative, brands) as defined in `$themes.json` and in the documentation when using the theme folders.

Implementation details and layer flow: [Implementation Guide](docs/en/#04%20Aplica%20Theme%20Engine%20-%20Implementation%20Guide.md) (en) / [Guia de Implementação](docs/pt-br/#04%20Aplica%20Theme%20Engine%20-%20Guia%20de%20Implementa%C3%A7%C3%A3o.md) (pt-br).

---

## Audience

- **Designers** and teams who want to study multidimensional themes, scale, centralized decisions, and use this as a base without the Aplica Theme Engine.
- **Courses and training** on Design Systems: Multidimensional Themes, Scale, Centralized Design System Decisions.
- Anyone who wants to evolve their own Design System using this architecture as an example.

---

## Documentation

| Document | Content |
|----------|---------|
| [#01 Complete Technical Architecture](docs/en/#01%20Aplica%20Theme%20Engine%20-%20Complete%20Technical%20Architecture.md) | Overview and 5 layers |
| [#07 Theme Structure](docs/en/#07%20Aplica%20Theme%20-%20Theme%20Structure.md) | File tree and conventions |
| [#04 Implementation Guide](docs/en/#04%20Aplica%20Theme%20Engine%20-%20Implementation%20Guide.md) | Figma usage and consumption |
| [#05 Technical Reference](docs/en/#05%20Aplica%20Theme%20Engine%20-%20Technical%20Reference.md) | Formulas, token types, glossary |

Portuguese versions in `docs/pt-br/`.

---

## Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Tokens Studio](https://www.tokens.studio/) for the Figma plugin and token format.
- Design systems and token management best practices that inspired this architecture.

## Contact

For questions or support, please open an issue on this repository.
