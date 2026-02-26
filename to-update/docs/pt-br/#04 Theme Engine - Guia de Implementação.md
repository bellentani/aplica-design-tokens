# Aplica Tokens Theme Engine - Guia de Implementação

## Criando uma Nova Marca

### Passo 1: Criar Arquivo de Configuração

Copie o template e crie seu arquivo de configuração:

```bash
cp dynamic-themes/configs/theme-engine.config.mjs dynamic-themes/configs/minha-marca.config.mjs
```

### Passo 2: Configurar Cores

Edite o arquivo de configuração:

```javascript
// dynamic-themes/configs/minha-marca.config.mjs
export default {
  name: 'minha_marca',
  
  colors: {
    // Cores da marca
    brand_primary: '#0066CC',
    brand_secondary: '#2E2E2E',
    brand_tertiary: '#666666',
    
    // Cores de ação
    action_primary: '#0066CC',
    action_secondary: '#2E2E2E',
    action_link: '#0066CC',
    
    // Feedback (default = claro, secondary = saturado)
    feedback_info: '#047AF1',
    feedback_info_dark: '#0356B0',
    feedback_success: '#00A838',
    feedback_success_dark: '#007A28',
    feedback_warning: '#F28E01',
    feedback_warning_dark: '#C47100',
    feedback_error: '#E82727',
    feedback_error_dark: '#B81C1C',
    
    // Produto
    promo_red: '#e91935',
    promo_red_dark: '#c41228',
    cashback_gold: '#ffcc00',
    cashback_gold_dark: '#d4a800',
    premium_purple: '#6e3ce4',
    premium_purple_dark: '#5424c9'
  },
  
  mapping: {
    brand: {
      first: 'brand_primary',
      second: 'brand_secondary',
      third: 'brand_tertiary'
    },
    interface: {
      function: {
        primary: 'action_primary',
        secondary: 'action_secondary',
        link: 'action_link'
      },
      feedback: {
        info_default: 'feedback_info',
        info_secondary: 'feedback_info_dark',
        success_default: 'feedback_success',
        success_secondary: 'feedback_success_dark',
        warning_default: 'feedback_warning',
        warning_secondary: 'feedback_warning_dark',
        danger_default: 'feedback_error',
        danger_secondary: 'feedback_error_dark'
      }
    },
    product: {
      promo_default: 'promo_red',
      promo_secondary: 'promo_red_dark',
      cashback_default: 'cashback_gold',
      cashback_secondary: 'cashback_gold_dark',
      premium_default: 'premium_purple',
      premium_secondary: 'premium_purple_dark'
    }
  },
  
  options: {
    txtOnStrategy: 'high-contrast',
    darkModeChroma: 0.85,
    includePrimitives: true
  },
  
  typography: {
    fontFamilies: {
      main: 'Roboto Flex',
      content: 'Roboto Flex',
      display: 'Roboto Flex',
      code: 'Source Code Pro'
    }
  }
};
```

### Passo 3: Registrar o tema no build

Adicione o tema em `config/themes.config.json` em `themes` com a mesma chave do `name` (ex.: `minha_marca`) e defina `foundation.brand` e `foundation.files`. O build só inclui temas listados lá. Veja [Configurando Temas e Foundations](#10-theme-engine---configurando-temas-e-foundations) para o pipeline completo.

### Passo 4: Gerar tema

```bash
# Gerar apenas esta marca (use o nome do arquivo sem .config.mjs: minha-marca para minha-marca.config.mjs)
node dynamic-themes/scripts/generate-all-themes.mjs --config=minha-marca

# Ou gerar todas as marcas
npm run themes:generate

# Ou rodar o pipeline completo (ensure:data, themes, dimension, sync, foundations, build)
npm run build:themes
```

### Passo 5: Build

```bash
# Build completo
npm run build
```

### Resultado

Após `npm run build`, o sistema gera saídas como:
- `minha_marca-light-positive`
- `minha_marca-light-negative`
- `minha_marca-dark-positive`
- `minha_marca-dark-negative`

---

## Opções de Configuração

### txtOnStrategy

Define como calcular cores de texto sobre superfícies:

| Opção | Descrição |
|-------|-----------|
| `high-contrast` | Sempre preto ou branco (máximo contraste) |
| `brand-tint` | Usa cor da paleta que passa WCAG AA |

### darkModeChroma

Ajusta saturação no modo escuro:

| Valor | Efeito |
|-------|--------|
| `1.0` | Mesma saturação do modo claro |
| `0.85` | 15% menos saturado (recomendado) |
| `0.7` | 30% menos saturado |

### includePrimitives

Controla geração de `_primitive_theme.json`:

| Opção | Resultado |
|-------|-----------|
| `true` (padrão) | Gera arquivo com paletas decompostas |
| `false` | Valores HEX diretos no `_brand.json` |

---

## Customizando Tipografia

```javascript
typography: {
  fontFamilies: {
    main: 'Inter',           // UI principal
    content: 'Georgia',      // Corpo de texto
    display: 'Playfair Display', // Títulos
    code: 'Fira Code'        // Código
  },
  weights: {
    display: {
      'Regular': 400,
      'Bold': 700
    }
  }
}
```

### Fallback de Pesos

Se um peso não existir, o sistema usa o mais próximo:
- `light` (300) → regular → bold
- `semibold` (600) → bold → regular
- `black` (900) → bold → regular

---

## Overrides

### Neutrals Personalizados

```javascript
overrides: {
  neutrals: {
    brand_primary: {
      // Opção B: Decomposição automática
      baseColor: '#AFAFB8',
      referenceLevel: 100,
      
      // Opção C: Override manual
      surface: { '100': '#AFAFB8' },
      txtOn: { '100': '#000000' },
      border: { '100': '#9999A3' }
    }
  }
}
```

### Grayscale Personalizado

```javascript
overrides: {
  grayscale: {
    surface: { '5': '#faf8f5', '140': '#1a1814' }
  }
}
```

### Estado active das funções (interface)

Para definir uma cor única para o estado **active** de todos os botões/links (primary, secondary, link), use `overrides.interface.function.active`. Em hex: o gerador define surface = hex, txtOn por contraste WCAG e borda derivada. Ver `docs/override-interface-active.md`.

```javascript
overrides: {
  interface: { function: { active: '#0067FF' } }
}
```

---

## Sincronização de Arquitetura

Após modificar o schema, sincronize os arquivos:

```bash
# Atualizar arquivos de arquitetura
npm run sync:architecture

# Verificar sem alterar
npm run sync:architecture:test
```

---

## Troubleshooting

### Erro: Cor não encontrada

Verifique se a cor está definida em `colors` e mapeada em `mapping`.

### Erro: Build falhou

```bash
# Garantir estrutura de data (ex.: após clone)
npm run ensure:data

# Limpar e rebuild completo
rm -rf dist/
npm run build:themes
```

### Verificar Estrutura

```bash
# Ver schema atual
npm run sync:architecture:schema
```

---

**Ver também:** [Configurando Temas e Foundations](#10-theme-engine---configurando-temas-e-foundations) para o pipeline completo, foundations e `config/themes.config.json`.

*Siga este guia para criar novas marcas mantendo consistência com o sistema.*
