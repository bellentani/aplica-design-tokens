# Gradientes – Referência e integração ao plano

> Este documento complementa o plano de **Gradientes no Theme Engine (SSoT + builds)** e incorpora o uso da pasta de referência `dynamic-themes/reference/gradient-tokens` como fonte de **valores de gradientes** configuráveis.
>
> **Modelo padrão do projeto:** Os gradientes de marca seguem o schema **first, second, third** (uma por cor de marca). Ver `architecture-schema.mjs` → `GRADIENT_SCHEMA.defaultBrandNames`. **v2.13.3:** A estrutura canónica (ângulos, steps, composição) está em **`config/themes.config.json`** (`global.gradientConfig`: degrees, steps, defaultComposites). Os configs por tema **não** definem gradientes; apenas overrides. Os gradientes são **construídos na camada semantic**: `semantic.color.gradient.config` + `semantic.color.gradient.composites` (usando refs a config.degrees e config.steps).

---

## 1. Papel da referência `dynamic-themes/reference/gradient-tokens`

A pasta [dynamic-themes/reference/gradient-tokens](dynamic-themes/reference/gradient-tokens) já contém:

| Arquivo | Conteúdo |
|--------|----------|
| **primitives.json** | Cores base (ex.: `colors.gray.50`, `colors.gray.900`) usadas como refs em gradientes. |
| **brand-colors.json** | Tokens de gradiente no formato Tokens Studio: `value` = string CSS-like `linear-gradient(angle deg, {ref} position%, …)`, `type` = `"color"`. Nomes: horizontal-2stops, horizontal-3stops, vertical-2stops, vertical-3stops, diagonal-left-2stops, diagonal-right-2stops. |
| **$metadata.json** | Ordem de resolução: `primitives` → `brand-colors`. |
| **$themes.json** | Temas (vazio por padrão). |

Esses arquivos definem **valores de gradientes** reutilizáveis: direção (horizontal, vertical, diagonal), número de stops (2 ou 3) e posições. As cores são referências (`{colors.gray.50}`, etc.) que podem ser **substituídas** por cores do tema ao gerar `_brand.json`.

---

## 2. Como integrar ao fluxo (SSoT + config do tema)

- **Opção A – Referência como template:** O theme-generator pode **ler** os gradientes de `reference/gradient-tokens/brand-colors.json` (e opcionalmente primitives) e usá-los como **templates**: mesma estrutura (angle, stops, posições), mas as refs de cor são **mapeadas** para tokens do tema (ex.: `{colors.gray.50}` → `{theme.color.{mode}.brand.branding.first.lowest.background}`). O config do tema declara **quais** gradientes da referência usar e, se necessário, o mapeamento de refs (ex.: qual token de tema substitui qual ref primitiva).
- **Opção B – Referência como catálogo:** Manter em `reference/gradient-tokens` um **catálogo** de “formas” de gradiente (horizontal-2stops, vertical-2stops, etc.). No config do tema, o autor declara gradientes por categoria (brand, interface, product) e **referencia por nome** um desses valores (ex.: `template: "horizontal-2stops"`) e indica quais tokens de tema usar para cada “slot” (ex.: startColor, endColor). O generator monta o token final (W3C ou CSS-like) a partir do template + cores do tema.
- **Opção C – Híbrido:** Valores padrão em `reference/gradient-tokens`; o config do tema pode **sobrescrever** apenas angle/stops/posições ou referenciar um template e sobrescrever cores. Assim temos “gradient values” configurados na referência e temas optam por usar ou customizar.

Recomendação para o plano: adotar **Opção B ou C** para que “valores de gradientes” fiquem de fato configurados em [dynamic-themes/reference/gradient-tokens](dynamic-themes/reference/gradient-tokens) e o config do tema apenas **referencie** esses valores e associe cores do tema.

---

## 3. Ajustes ao plano principal

1. **Fonte dos “valores” de gradiente**  
   - Incluir no plano que a **estrutura/direção/posições** dos gradientes podem vir de [dynamic-themes/reference/gradient-tokens](dynamic-themes/reference/gradient-tokens) (ex.: brand-colors.json).  
   - Theme-generator: ao gerar `theme.color.{mode}.gradient`, usar esses valores como base (templates) e preencher refs de cor com tokens do tema (theme.color.{mode}.*).

2. **Config do tema**  
   - Além de definir `gradients.brand`, `gradients.interface`, `gradients.product` (como no plano), permitir que cada entrada **referencie** um gradiente da referência, por exemplo:  
   - `template: "horizontal-2stops"` (nome em brand-colors.json)  
   - `colorRefs: { start: "brand.branding.first.lowest.background", end: "brand.branding.first.default.background" }`  
   - Assim os “valores de gradientes” ficam configurados na referência; o tema só liga cores.

3. **Formato da referência vs SSoT**  
   - Referência hoje: formato Tokens Studio (string CSS-like, `type: "color"`).  
   - SSoT (_brand.json): formato W3C (`$type: "gradient"`, array de stops) + `$extensions` para angle.  
   - O theme-generator deve **traduzir** do formato da referência (angle + refs) para o formato W3C ao escrever em _brand.json; o build depois traduz W3C → CSS (linear-gradient) para outputs.

4. **Passo extra no plano**  
   - **Passo 0 ou 1:** Definir como o theme-generator **carrega** e usa os arquivos em `reference/gradient-tokens` (leitura de brand-colors.json e, se necessário, primitives.json); e como o config do tema referencia templates por nome e mapeia colorRefs para tokens do tema.

---

## 4. Summary

**Gradient configuration guide (current engine state):** See **`docs/en/#11 Theme Engine - Gradient Configuration.md`** (EN) and **`docs/pt-br/#11 Theme Engine - Configuração de Gradientes.md`** (PT-BR) for step-by-step configuration in `config/themes.config.json` (degrees, steps, defaultComposites), pipeline order, and checklist.

- **Gradient values** can be configured in [dynamic-themes/reference/gradient-tokens](dynamic-themes/reference/gradient-tokens) (primitives + brand-colors.json).  
- The plan should treat that folder as the **source** of definitions (templates/catalogue) and the theme config as **binding** those values to theme colors.  
- This avoids duplicating gradient structures in each theme and keeps “gradient values” centralized in the reference.
