# Theme Engine – Configuração de Gradientes

Este guia explica como **habilitar, configurar e gerar** tokens de gradiente no theme engine. Os gradientes são definidos uma vez em um config central e depois fluem pelos temas de marca, camadas mode/surface e tokens semânticos.

---

## 1. O que são os gradientes neste sistema?

Gradientes são **tokens de gradiente linear** usados em fundos (marca, interface, produto). O sistema:

- Define **ângulos** (ex.: horizontal, diagonal) e **steps** (0–100) em um único config.
- Constrói **composites** (ex.: `first`, `second`, `third`) a partir das cores de marca e das definições de ângulo/parada.
- Expõe tudo como **tokens semânticos** (`semantic.color.gradient.config`, `semantic.color.gradient.composites`) e em arquivos de **brand** (`theme.color.{mode}.gradient`, `_gradients.json`).

**Categorias:**

| Categoria   | Descrição | Exemplos de nomes |
|------------|-----------|-------------------|
| **Brand**  | Um gradiente por cor de marca | `first`, `second`, `third` (de `defaultComposites`) |
| **Interface** | Por superfície (positive/negative) | `primary`, `secondary`, `link` |
| **Product**   | Por produto/superfície | ex.: `cfc_primary`, `bancaria_primary` |

A **estrutura** (quais nomes de gradiente existem, ângulos, steps) é **canônica** e compartilhada por todos os temas. Configs por tema só permitem **overrides** (ex.: cores diferentes), não novas formas ou nomes de gradiente.

---

## 2. Onde configurar os gradientes

Toda a **estrutura** e o **comportamento padrão** dos gradientes são configurados em:

```
config/themes.config.json
```

Na chave **`global`** você precisa de:

1. **`gradients`** – habilitar ou desabilitar a geração de gradientes.
2. **`gradientConfig`** – ângulos (degrees), steps e definições de composites padrão.

Configs por tema (`dynamic-themes/configs/*.config.mjs`) **não devem** definir nova estrutura de gradiente; só podem sobrescrever cores ou comportamento via `overrides.*`.

---

## 3. Configuração passo a passo

### 3.1 Habilitar gradientes

Em `config/themes.config.json`, dentro de `global`:

```json
{
  "global": {
    "gradients": true
  }
}
```

- **`true`** – o gerador de temas e o sync produzirão tokens de gradiente em `_brand.json`, semantic, mode, surface e `_gradients.json`.
- **`false`** – nenhuma seção de gradiente é gerada; blocos existentes podem ser removidos pelo sync.

---

### 3.2 Definir ângulos (degrees)

A direção do gradiente é controlada por **nomes de ângulo** e seus valores em graus. Em `global.gradientConfig.degrees`:

```json
"gradientConfig": {
  "degrees": {
    "horizontal": 180,
    "vertical": 270,
    "toBottom": 90,
    "diagonalLeft": -45,
    "diagonalRight": 45,
    "diagonalBrand": 135,
    "diagonalBrandAlt": 141
  }
}
```

- As chaves (ex.: `horizontal`, `diagonalBrand`) são **nomes** que você referencia nas definições de composite.
- Os valores são **graus** para `linear-gradient(… deg, …)` (0 = para cima, 90 = para baixo, 180 = para direita, etc.).

Você pode adicionar ou renomear chaves; em seguida referencie-as em `defaultComposites` (veja abaixo).

---

### 3.3 Definir steps (posições)

Os stops definem as **posições** ao longo do gradiente (0–100). Em `global.gradientConfig.steps`:

```json
"gradientConfig": {
  "steps": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}
```

Esses valores são usados ao montar as strings de gradiente dos composites (ex.: `color 0%`, `color 50%`, `color 100%`). Os steps também são gravados em `_gradients.json` para ferramentas (ex.: Figma) que consomem tokens numéricos.

---

### 3.4 Definir default composites (gradientes de marca)

**Composites** são as definições reais do gradiente: ângulo + lista de stops (posição + chave de cor). Eles são definidos em `global.gradientConfig.defaultComposites`:

```json
"gradientConfig": {
  "defaultComposites": {
    "first": {
      "angleKey": "horizontal",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 100, "colorKey": "default" }
      ]
    },
    "second": {
      "angleKey": "diagonalBrandAlt",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 50, "colorKey": "default" },
        { "position": 100, "colorKey": "highest" }
      ]
    },
    "third": {
      "angleKey": "diagonalBrand",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 100, "colorKey": "default" }
      ]
    }
  }
}
```

- **Chave** (ex.: `first`, `second`, `third`) – nome do composite; em geral um por cor de marca.
- **`angleKey`** – deve corresponder a uma chave em `gradientConfig.degrees` (ex.: `horizontal` → 180).
- **`stops`** – array de `{ position, colorKey }`:
  - **`position`** – deve ser um dos valores em `gradientConfig.steps` (0–100).
  - **`colorKey`** – um de `lowest`, `default`, `highest` (níveis de repertório). Eles mapeiam para cores do tema (ex.: `theme.color.{mode}.brand.branding.first.lowest.background`).

O gerador monta `linear-gradient({angle}deg, {colorLowest} 0%, {colorDefault} 50%, …)` a partir deste config e das cores de marca do tema.

---

### 3.5 Incluir `_gradients.json` nos arquivos de brand

Para que o config de gradiente (degrees, steps) seja emitido por tema e consumido pelo build/Figma, `global.brandFiles.default` deve incluir `_gradients.json`:

```json
"global": {
  "brandFiles": {
    "default": [
      "_primitive_theme.json",
      "_grayscale.json",
      "_brand.json",
      "_typography.json",
      "_borders.json",
      "_gradients.json"
    ]
  }
}
```

Se `_gradients.json` estiver fora dessa lista, o build pode não incluir os tokens de config de gradiente para esse tema.

---

## 4. Como os gradientes fluem (pipeline)

Entender a ordem dos passos evita “gradientes faltando” no semantic ou nos arquivos de brand.

1. **Config** – Você edita `config/themes.config.json` (`global.gradients`, `global.gradientConfig`).
2. **Geração de temas** – Ao rodar **`npm run themes:generate`** (ou `generate-all-themes.mjs`) são gerados, para cada tema:
   - **`data/brand/{theme}/_brand.json`** – inclui `theme.color.light.gradient` e `theme.color.dark.gradient` (configColor, interface, product).
   - **`data/brand/{theme}/_gradients.json`** – degrees e steps numéricos a partir de `gradientConfig` (para Figma/ferramentas).
3. **Sync architecture** – Ao rodar **`npm run sync:architecture`**, o script lê os `_brand.json` gerados, descobre nomes e estrutura de gradientes e atualiza:
   - **`data/mode/light.json`** e **`data/mode/dark.json`** – `mode.gradient.{light|dark}.*`
   - **`data/surface/positive.json`** e **`data/surface/negative.json`** – `surface.color.gradient.*` (incluindo refs configColor para o tema).
   - **`data/semantic/default.json`** – **`semantic.color.gradient.config`** (degrees, steps, colors) e **`semantic.color.gradient.composites`** (strings linear-gradient montadas a partir do config).

**Importante:** Rode **themes:generate** primeiro para que o `_brand.json` tenha as seções de gradiente; depois rode **sync:architecture** para que o semantic (e mode/surface) recebam os blocos de gradiente. Se você rodar o sync antes de gerar os temas, a descoberta pode não achar gradientes; rode o sync de novo após o themes:generate.

**Recomendado:** Use o pipeline completo para a ordem estar sempre correta:

```bash
npm run build:themes
```

Isso executa `ensure:data` → `themes:generate` → `dimension:generate` → **`sync:architecture`** → `foundations:generate` → `build:all`.

---

## 5. Checklist resumido

| Passo | Ação |
|-------|------|
| 1 | Defina **`global.gradients`** como `true` em `config/themes.config.json`. |
| 2 | Defina **`global.gradientConfig`**: `degrees`, `steps`, `defaultComposites`. |
| 3 | Garanta que **`global.brandFiles.default`** inclua **`_gradients.json`**. |
| 4 | Rode **`npm run themes:generate`** para gerar `_brand.json` e `_gradients.json` por tema. |
| 5 | Rode **`npm run sync:architecture`** para propagar gradientes para mode, surface e **semantic** (`semantic.color.gradient`). |
| 6 | (Opcional) Em **`data/$themes.json`**, adicione **`brand/{theme}/_gradients`** a `selectedTokenSets` de cada tema para que Figma/consumidores carreguem os tokens de gradiente. |

---

## 6. Desabilitando gradientes

Para desligar os gradientes:

1. Defina **`global.gradients`** como **`false`** em `config/themes.config.json`.
2. Rode **`npm run themes:generate`** e em seguida **`npm run sync:architecture`**.

O sync removerá as seções de gradiente do semantic, mode e surface quando `gradients` for false.

---

## 7. Overrides por tema (sem mudar estrutura)

Configs de tema (`dynamic-themes/configs/*.config.mjs`) **não devem** definir nova estrutura de gradiente (novos nomes de composite ou novas chaves de ângulo). Eles só podem:

- Sobrescrever **cores** ou comportamento via **`overrides.*`** (ex.: sobrescrever uma cor semântica ou de marca específica que é usada pelas refs de gradiente).

A **estrutura** canônica dos gradientes (nomes, ângulos, steps) é definida apenas em **`config/themes.config.json`** e em **`dynamic-themes/schemas/architecture-schema.mjs`** (ex.: `GRADIENT_SCHEMA.defaultBrandNames`, nomes padrão de interface/product).

---

## 8. Arquivos e referências relacionados

| Arquivo ou caminho | Papel |
|--------------------|-------|
| **`config/themes.config.json`** | Lugar único para `global.gradients` e `global.gradientConfig` (degrees, steps, defaultComposites). |
| **`data/brand/{theme}/_brand.json`** | Contém `theme.color.{light,dark}.gradient` (configColor, interface, product). Gerado; não editar à mão. |
| **`data/brand/{theme}/_gradients.json`** | Degrees e steps numéricos por tema (Figma/ferramentas). Gerado pelo sync. |
| **`data/semantic/default.json`** | Contém `semantic.color.gradient.config` e `semantic.color.gradient.composites`. Atualizado pelo sync. |
| **`data/mode/*.json`**, **`data/surface/*.json`** | Refs de gradiente para o tema; atualizados pelo sync. |
| **`dynamic-themes/schemas/architecture-schema.mjs`** | `GRADIENT_SCHEMA`: nomes padrão, níveis de repertório, etc. |
| **`dynamic-themes/scripts/sync-architecture.mjs`** | Descobre gradientes a partir de `_brand.json`, grava semantic/mode/surface e `_gradients.json`. |
| **`dynamic-themes/scripts/theme-generator.mjs`** | Constrói `theme.color.{mode}.gradient` em `_brand.json` a partir do config e das cores do tema. |

- **Versão em inglês:** **`docs/en/#11 Theme Engine - Gradient Configuration.md`**
- **Contexto (agentes / visão técnica):** **`docs/context/DYNAMIC_THEMES.md`** (secção Gradients), **`docs/context/GRADIENT_PLAN_REFERENCE.md`** (config canónico + pasta de referência). **`AI_CONTEXT.md`** aponta para este guia (#11) e para o DYNAMIC_THEMES.
- Para comparação com o upstream Aplica e estratégia de branches, ver **`docs/comparacao-remotes-aplica-gradiente.md`** (se existir).
