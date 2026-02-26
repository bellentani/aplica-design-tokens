# Aplica Theme - Estrutura do Tema

Este documento descreve a **estrutura real de pastas e arquivos** do tema consumível pelo Tokens Studio no Figma, tal como está em `data/aplica-theme/` neste repositório. Existe ainda a variante `data/aplica-theme-with-extensions/`, com a mesma estrutura e mais: uso de **Extensions do Tokens Studio** (ex.: dark mode por `modify`/mix) na marca aplica_joy e a pasta **figma-generators/** com `_generator-dimension.json`. Para conceitos de camadas e arquitetura, veja [#01 Arquitetura Técnica Completa](%2301%20Aplica%20Theme%20Engine%20-%20Arquitetura%20T%C3%A9cnica%20Completa.md) e [#05 Referência Técnica](%2305%20Aplica%20Theme%20Engine%20-%20Refer%C3%AAncia%20T%C3%A9cnica.md).

---

## Árvore de arquivos (data/aplica-theme)

```
data/aplica-theme/
├── $metadata.json
├── $themes.json
├── $themes.engine.json.template
│
├── foundation/
│   ├── engine/
│   │   ├── default.json
│   │   ├── styles/
│   │   │   ├── elevation_styles.json
│   │   │   └── typography_styles.json
│   │   └── .validation/
│   │       ├── engine.validation.json
│   │       └── engine.validation.txt
│   └── sample/
│       ├── default.json
│       ├── styles/
│       │   ├── elevation_styles.json
│       │   └── typography_styles.json
│       └── .validation/
│           ├── sample.validation.json
│           └── sample.validation.txt
│
├── semantic/
│   └── default.json
│
├── surface/
│   ├── positive.json
│   └── negative.json
│
├── mode/
│   ├── light.json
│   └── dark.json
│
├── dimension/
│   └── normal.json
│
└── brand/
    ├── aplica_joy/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _primitive_theme.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    ├── aplica_tangerine/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    ├── aplica_grinch/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    └── theme_engine/
        ├── _brand.json
        ├── _grayscale.json
        ├── _primitive_theme.json
        ├── _borders.json
        ├── _typography.json
        ├── _gradients.json
        └── $meta.json
```

---

## Papel dos arquivos de controle

### $metadata.json

- **tokenSetOrder:** Define a ordem em que o Tokens Studio carrega os token sets. A ordem influencia a resolução de referências entre sets.
- Ordem típica: foundation (engine e sample) → semantic → surface → mode → brand (por marca) → dimension → validações.

### $themes.json

- Lista de **themes** (modos/combinações) que aparecem no plugin.
- Cada entrada tem: `name`, `group`, `selectedTokenSets` (quais sets estão `enabled` ou `source`), e opcionalmente IDs de coleção/modo do Figma.
- Exemplos de grupos: `foundation`, `semantic`, `surface`, `mode`, `dimension`, `brand`. Os themes de brand (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine) selecionam os sets da marca correspondente.

---

## Convenções

- **Arquivos com prefixo `_`:** Tokens estruturais (ex.: `_brand`, `_grayscale`, `_primitive_theme`, `_borders`, `_typography`, `_gradients`). Organizam o tema no Tokens Studio; não fazem parte da cadeia de transformação externa (neste repo não há engine de build).
- **$meta.json (por marca):** Metadados da marca (ex.: nome, descrição). Um por pasta em `brand/`.
- **Foundation engine vs sample:** Dois conjuntos de foundation: `engine` é o conjunto principal; `sample` é um conjunto de exemplo. Ambos têm `default.json` e `styles/` (elevation_styles, typography_styles) e opcionalmente `.validation/`.

---

## Fluxo no Tokens Studio

1. **Ordem dos sets:** O plugin carrega os arquivos na ordem definida em `$metadata.json` (`tokenSetOrder`). Referências como `{theme.color.dark.interface...}` são resolvidas a partir dos sets de brand ativos no theme selecionado.
2. **Themes:** Em `$themes.json`, cada theme define quais token sets estão habilitados. Por exemplo, o theme "aplica_joy" usa os sets em `brand/aplica_joy/` como fonte; "light" e "dark" usam `mode/light` e `mode/dark`.
3. **Source vs enabled:** Um set em `source` fornece valores base; sets em `enabled` sobrescrevem ou complementam. Assim se montam as combinações light/dark e positive/negative.

---

## Diferenças por marca

| Marca            | _primitive_theme | Observação                                      |
|------------------|------------------|--------------------------------------------------|
| aplica_joy       | Sim              | Possui paletas primitivas (ex.: para dark mode)  |
| theme_engine     | Sim              | Template/base com primitive theme                |
| aplica_tangerine | Não              | Cores vêm de _brand e _grayscale                 |
| aplica_grinch    | Não              | Cores vêm de _brand e _grayscale                |

---

## Referência cruzada

- **Camadas e conceitos:** [#01 Arquitetura Técnica Completa](%2301%20Aplica%20Theme%20Engine%20-%20Arquitetura%20T%C3%A9cnica%20Completa.md), [#03 Arquitetura Core](%2303%20Aplica%20Theme%20Engine%20-%20Arquitetura%20Core.md).
- **Fórmulas, tipos de token, inversão surface:** [#05 Referência Técnica](%2305%20Aplica%20Theme%20Engine%20-%20Refer%C3%AAncia%20T%C3%A9cnica.md).
- **Uso no Figma e implementação:** [#04 Guia de Implementação](%2304%20Aplica%20Theme%20Engine%20-%20Guia%20de%20Implementa%C3%A7%C3%A3o.md).

Este documento foca em **o que existe em qual pasta**; a documentação técnica detalha o significado das camadas e dos tokens.
