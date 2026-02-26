# Theme Engine – Configurando Temas e Foundations

Este guia explica **passo a passo** como configurar novos temas e foundations no Aplica Tokens Theme Engine. É voltado a quem trabalha em projetos que usam este sistema de tokens.

---

## Índice

1. [Visão geral: Temas vs Foundations](#1-visão-geral-temas-vs-foundations)
2. [Pipeline e scripts](#2-pipeline-e-scripts)
3. [Referência dos arquivos de configuração](#3-referência-dos-arquivos-de-configuração)  
   - [Gradientes (opcional)](#34-gradientes-opcional)
4. [Passo a passo: Adicionar um novo tema](#4-passo-a-passo-adicionar-um-novo-tema)
5. [Passo a passo: Alterar ou adicionar uma Foundation](#5-passo-a-passo-alterar-ou-adicionar-uma-foundation)
6. [Passo a passo: Pipeline completo de build](#6-passo-a-passo-pipeline-completo-de-build)
7. [Quando rodar o Sync Architecture](#7-quando-rodar-o-sync-architecture)
8. [Referência rápida](#8-referência-rápida)

---

## 1. Visão geral: Temas vs Foundations

### Temas (Brands)

- **O que são**: Sistemas de cores e tokens semânticos de uma **marca** (ex.: aplica_joy, aplica_grinch, theme_engine).
- **Onde são definidos**: Um **config de tema** por tema em `dynamic-themes/configs/` (ex.: `aplica-joy.config.mjs`).
- **O que geram**: Arquivos em `data/brand/{nome_do_tema}/`:
  - `_primitive_theme.json`, `_grayscale.json`, `_brand.json`, `_typography.json`, `_borders.json`, opcionalmente `_ui.json`.
- **Saída do build**: O build combina cada tema com **mode** (light/dark) e **surface** (positive/negative) para gerar os arquivos finais de tokens (ex.: `aplica_joy-light-positive.json`) em `dist/`.

### Foundations

- **O que são**: Tokens **alias** que apontam para tokens semânticos. Definam uma API estável para consumidores (ex.: `foundation.bg.primary`, `foundation.border.feedback.info.default`).
- **Onde são definidas**: Configs de foundation em `dynamic-themes/configs/foundations/` (ex.: `engine.config.mjs`, `sample.config.mjs`).
- **O que geram**: Arquivos em `data/foundation/{nome_da_foundation}/`:
  - `default.json` (tokens da foundation)
  - `styles/typography_styles.json`, `styles/elevation_styles.json`
- **Relação**: Cada **tema** é vinculado a uma **foundation** em `config/themes.config.json` (ex.: aplica_joy → engine). O build usa essa foundation para esse tema.

### Arquitetura (Mode, Surface, Semantic)

- **mode** (`data/mode/light.json`, `data/mode/dark.json`): Referências às cores do tema para feedback, produto e texto por modo.
- **surface** (`data/surface/positive.json`, `data/surface/negative.json`): Referências às cores do tema por superfície (positive ≈ contexto claro, negative ≈ contexto escuro).
- **semantic** (`data/semantic/default.json`): Camada semântica resolvida; referencia surface/mode e é a fonte das referências da foundation.

Esses arquivos são **sincronizados** a partir do **schema de arquitetura** e da estrutura de referências pelo script `sync-architecture.mjs`. Não edite a estrutura à mão; rode o script de sync e/ou altere o schema.

---

## 2. Pipeline e scripts

| Script / Comando | Propósito |
|------------------|-----------|
| `npm run ensure:data` | Cria `data/` e subdirs necessários; `data/dimension/normal.json` mínimo; estilos de foundation para engine/sample se faltarem. Rode após clone. |
| `npm run dimension:generate` | Gera `data/dimension/normal.json` a partir de `config/dimension.config.mjs` (referenciado em `config/themes.config.json`). |
| `npm run themes:generate` | Lê todos os `*.config.mjs` na raiz de `dynamic-themes/configs/` (excluindo subpastas como `foundations/`) e gera `data/brand/{tema}/` para cada tema. |
| `npm run themes:single` | Gera um único tema (ex.: `node dynamic-themes/scripts/generate-theme.mjs --config=aplica_joy`). |
| `npm run sync:architecture` | Atualiza `data/mode/`, `data/surface/`, `data/semantic/` e `data/foundation/engine/` a partir do schema de arquitetura e das regras de referência. **Rode após alterar o schema ou quando precisar refrescar a estrutura de referências.** |
| `npm run sync:architecture:test` | Igual ao sync, mas não grava arquivos (apenas verifica). |
| `npm run sync:architecture:schema` | Exibe o schema atual (itens de feedback/produto, variantes, etc.). |
| `npm run foundations:generate` | Gera todas as foundations a partir de `dynamic-themes/configs/foundations/*.config.mjs` e seus estilos (typography_styles, elevation_styles). |
| `npm run foundations:validate` | Valida um arquivo de foundation contra os tokens semânticos (ex.: `npm run foundations:validate data/foundation/engine/default.json`). |
| `npm run build:themes` | Pipeline completo de temas: ensure:data → themes:generate → dimension:generate → sync:architecture → foundations:generate → build:all. |
| `npm run build` ou `npm run build:all` | Build do Style Dictionary: lê `data/` + `config/themes.config.json` e grava em `dist/` (JSON, JS, ESM, CSS, etc.). |

**Importante**: Os configs de tema ficam em `dynamic-themes/configs/` (ex.: `aplica-joy.config.mjs`). O **build** sabe **quais temas existem** por `config/themes.config.json` (chaves de `themes`). Portanto: **adicione o config do tema** em `configs/` e **adicione a entrada do tema** em `config/themes.config.json` se quiser que ele entre no build.

---

## 3. Referência dos arquivos de configuração

### 3.1 Config de tema (`dynamic-themes/configs/{nome}.config.mjs`)

- **Local**: Os configs de tema devem ficar na **raiz** de `dynamic-themes/configs/` (não em subpastas como `foundations/` ou `legacy_reference/`). O gerador de temas só considera arquivos `*.config.mjs` nessa raiz.
- **Nomenclatura**: `{nome}.config.mjs` → o nome do tema usado em data e no build é a propriedade **`name`** (ex.: `name: 'aplica_joy'`). O nome do arquivo costuma ser o nome do tema com hífens (ex.: `aplica-joy.config.mjs`).
- **Estrutura necessária** (veja configs existentes como `aplica-joy.config.mjs`, `theme-engine.config.mjs`):
  - `name`: string (ex.: `'aplica_joy'`) – deve coincidir com a chave usada em `config/themes.config.json` ao registrar o tema.
  - `colors`: objeto – todas as cores hex usadas pelo tema (marca, ação, feedback, produto).
  - `mapping`: objeto – mapeia conceitos semânticos para chaves de cor:
    - `brand`: `first`, `second`, `third` (fourth ou mais opcional quando configurado) → chaves de cor
    - `interface.function`: `primary`, `secondary`, `link` → chaves de cor
    - `interface.feedback`: `info_default`, `info_secondary`, `success_default`, … → chaves de cor
    - `product`: `promo_default`, `promo_secondary`, … → chaves de cor
  - `options` (opcional): `txtOnStrategy`, `uiTokens`, `darkModeChroma`, `accessibilityLevel`, etc.
  - `typography` (opcional): famílias e pesos de fonte.
  - `gradients` (opcional): definições de gradiente por categoria; faz parte do schema de tokens. Quando omitido, um gradiente padrão (sólido) é usado para as refs em mode/surface/semantic. Ver [Gradientes (opcional)](#34-gradientes-opcional) abaixo.

O **schema de arquitetura** (`dynamic-themes/schemas/architecture-schema.mjs`) define os **itens e variantes** de feedback/produto. Seus `colors` e `mapping` do tema devem alinhar com esse schema (ex.: feedback: info, success, warning, danger; variantes: default, secondary).

### 3.2 Lista de temas do build (`config/themes.config.json`)

- **Propósito**: Lista central de temas que o **build** usa. Define quais marcas são buildadas e qual foundation cada tema usa.
- **Estrutura**:
  - `themes`: objeto – cada chave é um **nome de tema** (deve coincidir com `name` no config do tema e com o nome da pasta em `data/brand/`).
    - Para cada tema você pode definir:
      - `includePrimitives`: boolean (padrão true) – se inclui `_primitive_theme.json` no build.
      - `foundation`: qual foundation usar e quais arquivos:
        - `brand`: nome da foundation (ex.: `"engine"`) – pasta em `data/foundation/{brand}/`.
        - `files`: ex.: `["default.json", "styles/typography_styles.json", "styles/elevation_styles.json"]`.
  - `global`: `modes`, `surfaces`, `dimension.config`, `brandFiles.default`, **`gradients`** (boolean, padrão `true`). Defina `gradients: false` para desativar gradientes no projeto inteiro (não gera em `/data/`, não entra na arquitetura nem no build).

**Para adicionar um novo tema ao build**: Adicione uma entrada em `themes` com a mesma chave do `name` do tema (ex.: `"my_theme"`) e defina `foundation` e, se quiser, `includePrimitives`.

### 3.3 Config de foundation (`dynamic-themes/configs/foundations/{nome}.config.mjs`)

- **Propósito**: Define a **estrutura** e as **referências semânticas** de uma foundation (ex.: engine, sample).
- **Campos principais**:
  - `name`: nome da foundation (ex.: `'engine'`) – a saída vai para `data/foundation/{name}/`.
  - `outputPath`: ex.: `'data/foundation/engine/default.json'`.
  - `structure`: seções (bg, border, txt, opacity, sizing, spacing, typography) e itens/variantes/níveis.
  - `references`: mapeia cada caminho de token da foundation para um caminho de token semântico (mapeamento direto ou padrões).

Veja `dynamic-themes/configs/foundations/README.md` e `engine.config.mjs` / `sample.config.mjs` para exemplos. Os **estilos** de foundation (typography_styles, elevation_styles) são definidos em `foundation-styles.shared.mjs` e podem ser sobrescritos por foundation no config.

### 3.4 Gradientes (opcional)

- **Ativar/desativar no projeto**: Em `config/themes.config.json`, defina **`global.gradients: false`** para **remover gradientes da arquitetura inteira**. Quando `false`:
  - Gradientes **não são gerados** em `data/brand/{tema}/_brand.json`.
  - O sync-architecture **não adiciona** gradiente em `data/mode/`, `data/surface/`, `data/semantic/` (e remove se existir).
  - O build **não considera** tokens de gradiente. Sem gradiente em `/data/`, sem gradiente no build.
  - **Fluxo**: Defina `global.gradients: false` → rode `themes:generate` → rode `sync:architecture` → rode o build.
- **Quando `global.gradients` é true** (padrão): Gradientes são gerados. Você pode **omitir** `gradients` no config do tema; quando omitido, um gradiente padrão (sólido) é usado para as refs em mode/surface/semantic.
- **Onde ficam no SSoT** (quando habilitado): `theme.color.light.gradient` e `theme.color.dark.gradient` em `data/brand/{tema}/_brand.json`. Estrutura: `theme.color.{mode}.gradient.brand.{name}`, etc.
- **Como configurar** (quando gradientes habilitados e quiser customizar): No config do tema, adicione um objeto `gradients`:
  - `gradients.brand`: `{ [name]: { angle: number, stops: [ { position: 0|1|number, colorRef: string } ] } }`. **Modelo padrão**: `first`, `second`, `third` (uma por cor de marca). Ex.: `gradients.brand.first`, `gradients.brand.second`, `gradients.brand.third`. Cada tema define angle e stops (2 ou 3) por gradiente. `colorRef` é um caminho **relativo a** `theme.color.{mode}` (ex.: `'brand.branding.first.lowest.background'`).
  - `gradients.interface`: `{ positive: { [name]: { angle, stops } }, negative: { ... } }` (opcional).
  - `gradients.product`: `{ positive: { [name]: { angle, stops } }, negative: { ... } }` (opcional).
- **Saída do build** (quando habilitado): Os tokens de gradiente usam `$type: "gradient"` (estilo W3C) e `$value` (array de stops). O build CSS do Style Dictionary converte para `linear-gradient({angle}deg, ...)` em variáveis CSS. As camadas mode, surface e semantic referenciam os gradientes do tema e são propagados pelo `sync:architecture`.

- **⚠️ Gradientes na saída do build – ordem importa**: Os gradientes **só aparecem** na saída do build (CSS/JS) quando **`data/semantic/default.json`** tem a seção **`semantic.color.gradient`**. Essa seção **não** é criada pelo `npm run build`; é criada pelo **`npm run sync:architecture`**, que lê os gradientes de `data/brand/*/_brand.json` e grava em mode, surface e semantic.  
  **Ordem correta ao usar gradientes** (`global.gradients: true`):  
  1) `npm run themes:generate` (gera `_brand.json` com gradiente).  
  2) **`npm run sync:architecture`** (propaga gradiente até o semantic).  
  3) `npm run build` (emite variáveis de gradiente no dist).  
  Ou rode **`npm run build:themes`** de uma vez (pipeline completo com sync).  
  Se você só rodar `npm run build` e os gradientes estiverem habilitados mas o semantic não tiver gradient, o build **avisa** (e não falha) e os gradientes **não** aparecem na saída. Correção: rode `npm run sync:architecture` (ou `npm run build:themes`) e depois o build de novo.

---

## 4. Passo a passo: Adicionar um novo tema

1. **Criar o config do tema**
   - Adicione um arquivo em `dynamic-themes/configs/` com nome `{nome-do-tema}.config.mjs` (ex.: `minha-marca.config.mjs`). O **nome do arquivo sem .config.mjs** (ex.: `minha-marca`) é o que você passa em `--config=minha-marca` ao gerar um único tema.
   - Copie um config existente (ex.: `aplica-joy.config.mjs`) e defina:
     - `name: 'minha_marca'` (use underscores; será o nome da pasta em `data/brand/`).
     - `colors`: sua paleta hex (todas as chaves usadas em `mapping`).
     - `mapping`: brand, interface.function, interface.feedback, product – deve seguir o schema de arquitetura (veja `sync:architecture:schema` ou `architecture-schema.mjs`).
     - `gradients` (opcional): modelo padrão `first`, `second`, `third` (uma por cor de marca). Defina `gradients.brand.first`, `.second`, `.third` (angle e stops com colorRef relativos a `theme.color.{mode}`). Omita para usar o stub sólido. Veja [Gradientes (opcional)](#34-gradientes-opcional).
   - Ajuste `options` e `typography` se precisar.

2. **Registrar o tema no build**
   - Abra `config/themes.config.json`.
   - Em `themes`, adicione uma entrada com chave igual ao `name` do tema (ex.: `"minha_marca"`):
     - Defina `includePrimitives` (true/false).
     - Defina `foundation.brand` (ex.: `"engine"`) e `foundation.files` (igual aos outros temas: default.json + styles).

3. **Rodar o pipeline de temas**
   - Na raiz do projeto:
     - `npm run ensure:data`
     - `npm run dimension:generate`   (se alterou o config de dimension)
     - `npm run themes:generate`     (gera `data/brand/minha_marca/`)
     - `npm run sync:architecture`  (se alterou o schema ou quer referências atualizadas)
     - `npm run foundations:generate` (se alterou foundations)
     - `npm run build`               (gera os arquivos em dist para todos os temas em themes.config.json)

   Ou rode o pipeline completo de uma vez:  
   `npm run build:themes`

4. **Verificar**
   - Confira `data/brand/minha_marca/` para `_brand.json`, `_grayscale.json`, etc.
   - Rode `npm run build` e confira `dist/` para saídas como `minha_marca-light-positive.json` (ou o padrão definido em themes.config).

---

## 5. Passo a passo: Alterar ou adicionar uma Foundation

### Alterar uma foundation existente (ex.: engine)

1. Edite `dynamic-themes/configs/foundations/engine.config.mjs` (estrutura e/ou referências).
2. Rode:
   - `npm run foundations:generate`  
   Isso regera `data/foundation/engine/default.json` e `data/foundation/engine/styles/*`.
3. Opcionalmente valide:  
   `npm run foundations:validate data/foundation/engine/default.json`
4. Rode `npm run build` para regerar o dist.

### Adicionar uma nova foundation (ex.: minha_foundation)

1. **Criar o config da foundation**
   - Adicione `dynamic-themes/configs/foundations/minha-foundation.config.mjs`.
   - Copie `engine.config.mjs` ou `sample.config.mjs` e defina `name`, `outputPath` (ex.: `data/foundation/minha_foundation/default.json`), `structure` e `references`.

2. **Gerar a foundation**
   - `npm run foundations:generate`  
   Isso cria `data/foundation/minha_foundation/` e os estilos (typography_styles, elevation_styles).

3. **Usar em um tema**
   - Em `config/themes.config.json`, defina `foundation.brand` do tema como `"minha_foundation"` e mantenha `foundation.files` consistente (default.json + arquivos de styles).

4. **Garantir data e build**
   - Se o `ensure-data-structure.mjs` só criar estilos para `engine` e `sample`, pode ser necessário rodar `foundations:generate` após adicionar uma nova foundation para que `data/foundation/minha_foundation/styles/` exista. Depois rode `npm run build`.

---

## 6. Passo a passo: Pipeline completo de build

Use quando quiser atualizar **tudo** a partir dos configs (ex.: após clone ou após mudanças amplas).

1. **Garantir estrutura de data**  
   `npm run ensure:data`

2. **Dimension**  
   `npm run dimension:generate`

3. **Gerar todos os temas**  
   `npm run themes:generate`

4. **Sincronizar arquitetura**  
   `npm run sync:architecture`

5. **Gerar todas as foundations**  
   `npm run foundations:generate`

6. **Build**  
   `npm run build`

Ou de uma vez:

```bash
npm run build:themes
```

Isso executa os passos 1–5 e em seguida `build:all`. Depois, `dist/` contém as saídas finais de tokens (JSON, JS, ESM, CSS, etc.) para cada tema em `config/themes.config.json`.

---

## 7. Quando rodar o Sync Architecture

Rode `npm run sync:architecture` quando:

- **Alterar o schema de arquitetura** (`dynamic-themes/schemas/architecture-schema.mjs`) – ex.: adicionar/remover itens ou variantes de feedback/produto.
- **Atualizar a estrutura de referências** em mode, surface, semantic ou foundation/engine (ex.: após pull de mudanças que mexeram no schema ou na lógica do sync).
- **Adicionar um novo tema** e já tiver rodado `themes:generate` – rodar o sync mantém as referências semânticas/foundation consistentes (geralmente já faz parte do `build:themes`).
- **Gradientes estão habilitados** (`global.gradients: true`) e você rodou `themes:generate` – o sync propaga o gradiente de `_brand.json` para mode, surface e **semantic**; sem o sync, `semantic.color.gradient` não existe e o build não emite gradientes (ele avisa). Rode o sync (ou `build:themes`) e depois o build.

**Não** edite à mão `data/mode/*.json`, `data/surface/*.json`, `data/semantic/default.json` ou `data/foundation/engine/default.json` em **estrutura ou referências**; o script de sync sobrescreve. Edite o **schema** ou o **script de sync** e depois rode o sync.

---

## 8. Referência rápida

| Tarefa | O que fazer |
|--------|-------------|
| Adicionar um novo tema | 1) Adicionar `{name}.config.mjs` em `dynamic-themes/configs/`. 2) Adicionar o tema em `config/themes.config.json` em `themes`. 3) `npm run build:themes` (ou ensure:data → themes:generate → sync:architecture → foundations:generate → build). |
| Alterar cores/mapeamento do tema | Editar o config do tema em `configs/`, depois `npm run themes:generate` e `npm run build`. |
| Alterar estrutura/refs da foundation | Editar o config da foundation em `configs/foundations/`, depois `npm run foundations:generate` e `npm run build`. |
| Adicionar uma nova foundation | Adicionar `{name}.config.mjs` em `configs/foundations/`, rodar `npm run foundations:generate`, depois apontar um tema para ela em `themes.config.json` se quiser. |
| Alterar schema de feedback/produto | Editar `dynamic-themes/schemas/architecture-schema.mjs`, depois `npm run sync:architecture`, depois regerar temas e foundations e fazer o build. |
| Atualizar tudo a partir dos configs | `npm run build:themes`. |
| **Gradientes não aparecem na saída do build** | Gradientes só aparecem quando `data/semantic/default.json` tem `semantic.color.gradient`; essa seção é criada pelo **`sync:architecture`**, não pelo `build`. Rode **`npm run sync:architecture`** (ou `npm run build:themes`), depois `npm run build`. |
| Verificar sync sem gravar | `npm run sync:architecture:test`. |
| Ver o schema | `npm run sync:architecture:schema`. |

---

## Documentação relacionada

- **Schema de arquitetura**: `dynamic-themes/schemas/architecture-schema.mjs`
- **Configs de foundations**: `dynamic-themes/configs/foundations/README.md`
- **Dynamic themes (contexto)**: `docs/context/DYNAMIC_THEMES.md`
- **Sistema de build**: `docs/context/BUILD_SYSTEM_UPDATE.md`, `docs/context/AGENT_GUIDE.md`
