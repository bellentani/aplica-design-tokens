# Aplica Theme Engine - Guia de Implementação

## Como Adicionar Nova Marca

### 1. **Preparação dos Arquivos Base**

#### Criar estrutura de diretórios:
```bash
brand/theme/nova-marca/
├── _brand.json
├── _grayscale.json
├── _theme-typography.json
├── _theme-borders.json
├── _theme-depth.json
├── _components.json
└── _nova-marca-generated.json
```

#### Definir cores em `_brand.json`:
```json
{
  "theme": {
    "light": {
      "brand": {
        "branding": {
          "first": {
            "lowest": { "background": "#FFF3E0", "txtOn": "#333333", "border": "#FFE0B2" },
            "default": { "background": "#FF9800", "txtOn": "#FFFFFF", "border": "#F57C00" },
            "highest": { "background": "#E65100", "txtOn": "#FFFFFF", "border": "#BF360C" }
          }
        },
        "ambient": {
          "contrast": {
            "base": {
              "positive": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
              "negative": { "background": "#000000", "txtOn": "#FFFFFF", "border": "#333333" }
            },
            "deep": {
              "positive": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
              "negative": { "background": "#000000", "txtOn": "#FFFFFF", "border": "#333333" }
            }
          },
          "neutral": {
            "lowest": { "background": "#FAFAFA", "txtOn": "#333333", "border": "#E0E0E0" },
            "lower": { "background": "#F5F5F5", "txtOn": "#333333", "border": "#CCCCCC" },
            "low": { "background": "#EEEEEE", "txtOn": "#333333", "border": "#BDBDBD" },
            "mid": { "background": "#E0E0E0", "txtOn": "#333333", "border": "#9E9E9E" },
            "high": { "background": "#BDBDBD", "txtOn": "#FFFFFF", "border": "#757575" },
            "higher": { "background": "#9E9E9E", "txtOn": "#FFFFFF", "border": "#616161" },
            "highest": { "background": "#757575", "txtOn": "#FFFFFF", "border": "#424242" }
          },
          "grayscale": {
            "lowest": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
            "lower": { "background": "#F5F5F5", "txtOn": "#000000", "border": "#CCCCCC" },
            "low": { "background": "#EEEEEE", "txtOn": "#000000", "border": "#BDBDBD" },
            "mid": { "background": "#E0E0E0", "txtOn": "#000000", "border": "#9E9E9E" },
            "high": { "background": "#BDBDBD", "txtOn": "#FFFFFF", "border": "#757575" },
            "higher": { "background": "#9E9E9E", "txtOn": "#FFFFFF", "border": "#616161" },
            "highest": { "background": "#757575", "txtOn": "#FFFFFF", "border": "#424242" }
          }
        },
        "interface": {
          "function": {
            "primary": { "background": "#FF9800", "txtOn": "#FFFFFF", "border": "#F57C00" },
            "secondary": { "background": "#E0E0E0", "txtOn": "#333333", "border": "#BDBDBD" },
            "link": { "background": "transparent", "txtOn": "#1976D2", "border": "transparent" },
            "disabled": { "background": "#F5F5F5", "txtOn": "#9E9E9E", "border": "#E0E0E0" }
          },
          "feedback": {
            "info": { "background": "#E3F2FD", "txtOn": "#1976D2", "border": "#BBDEFB" },
            "success": { "background": "#E8F5E8", "txtOn": "#2E7D32", "border": "#C8E6C9" },
            "warning": { "background": "#FFF3E0", "txtOn": "#F57C00", "border": "#FFCC02" },
            "danger": { "background": "#FFEBEE", "txtOn": "#D32F2F", "border": "#FFCDD2" }
          }
        },
        "product": {
          "cold": {
            "lowest": { "background": "#E3F2FD", "txtOn": "#1976D2", "border": "#BBDEFB" },
            "default": { "background": "#2196F3", "txtOn": "#FFFFFF", "border": "#1976D2" },
            "highest": { "background": "#1565C0", "txtOn": "#FFFFFF", "border": "#0D47A1" }
          }
        },
        "text": {
          "positive": {
            "title": "#000000",
            "body": "#333333",
            "highlight": "#FF9800",
            "muted": "#757575",
            "label": "#616161"
          },
          "negative": {
            "title": "#FFFFFF",
            "body": "#E0E0E0",
            "highlight": "#FF9800",
            "muted": "#BDBDBD",
            "label": "#9E9E9E"
          }
        }
      }
    },
    "dark": {
      // Estrutura similar com cores ajustadas para dark mode
    }
  }
}
```

### 2. **Validação de Acessibilidade**

- **Para marcas que usam nossa API:** Executar API de acessibilidade para gerar `_primitive-theme-default.json`
- **Para marcas que usam Tokens Studio (como Joy):** Utilizar matemática nativa do Tokens Studio
- Verificar contrastes surface/txtOn (mínimo WCAG AA)
- Ajustar cores se necessário

### 3. **Configuração no Tokens Studio**

Atualizar `$metadata.json` com nova ordem:
```json
{
  "tokenSetOrder": [
    "foundation/default",
    "foundation/styles/typography-styles",
    "foundation/styles/depth-styles",
    "semantic/default",
    "surface/positive",
    "surface/negative",
    "mode/light",
    "mode/dark",
    "dimensions/dimension",
    "brand/theme/nova-marca/_brand",
    "brand/theme/nova-marca/_grayscale",
    "brand/theme/nova-marca/_theme-typography",
    "brand/theme/nova-marca/_theme-borders",
    "brand/theme/nova-marca/_theme-depth",
    "brand/theme/nova-marca/_components",
    "brand/theme/nova-marca/_nova-marca-generated"
  ]
}
```

### 4. **Build e Distribuição**

```bash
# Executar build
npm run build:tokens nova-marca

# Verificar saída
dist/
├── aplica-nova-marca-light-positive.css
├── aplica-nova-marca-light-negative.css
├── aplica-nova-marca-dark-positive.css
└── aplica-nova-marca-dark-negative.css
```

## Como Criar Novo Mode

### 1. **Analisar Contexto Visual**

Perguntas-chave:
- Qual o propósito do novo mode? (ex: high-contrast, colorblind)
- Como as cores devem se comportar?
- Quais transformações são necessárias?

### 2. **Criar Arquivo de Mode**

`mode/high-contrast.json`:
```json
{
  "mode": {
    "brand": {
      "branding": {
        "first": {
          "default": {
            "background": "{theme.light.brand.branding.first.highest.background}",
            "txtOn": "{theme.light.brand.branding.first.highest.txtOn}"
          }
        }
      }
    }
  }
}
```

### 3. **Testar Combinações**

Verificar todas as combinações:
- high-contrast + positive
- high-contrast + negative
- Com todas as marcas existentes

## Como Adicionar Nova Surface

### 1. **Definir Lógica de Inversão**

`surface/neutral.json`:
```json
{
  "surface": {
    "color": {
      "brand": {
        "branding": {
          "first": {
            "lowest": "{mode.brand.branding.first.mid.background}",
            "default": "{mode.brand.branding.first.default.background}",
            "highest": "{mode.brand.branding.first.mid.background}"
          }
        }
      }
    }
  }
}
```

### 2. **Atualizar Metadata**

Adicionar nova surface ao `$metadata.json`:
```json
{
  "tokenSetOrder": [
    // ... outros tokens
    "surface/positive",
    "surface/negative",
    "surface/neutral",  // nova surface
    // ... resto
  ]
}
```

## Checklist de Validação

### ✅ **Pré-lançamento**

#### Acessibilidade
- [ ] Contraste mínimo WCAG AA em todos pares surface/txtOn
- [ ] Contraste WCAG AAA para textos pequenos
- [ ] Teste com simuladores de daltonismo

#### Consistência Visual
- [ ] Hierarquia preservada em todas surfaces
- [ ] Transições suaves entre estados (normal → action → active)
- [ ] Feedback colors distinguíveis entre si

#### Técnica
- [ ] Sem referências circulares
- [ ] Todos tokens resolvem para valores raw
- [ ] Build passa sem warnings

### ✅ **Testes de Integração**

#### Figma
- [ ] Sync com Figma Tokens Plugin funcional
- [ ] Modes aparecem corretamente no Figma
- [ ] Designers conseguem alternar temas

#### Código
- [ ] CSS Variables geradas corretamente
- [ ] Theme switching funciona no runtime
- [ ] Sem breaking changes em componentes

### ✅ **Performance**

- [ ] Build time < 30 segundos
- [ ] Bundle size por tema < 50KB
- [ ] Theme switch < 100ms

## Troubleshooting Comum

### Problema: "Token não resolve"
**Solução:** Verificar ordem dos selectedTokenSets - source deve vir antes de enabled

### Problema: "Cores inconsistentes entre Figma e código"
**Solução:** Re-sync no Figma Tokens e verificar se CI/CD executou

### Problema: "Contraste falha em dark mode"
**Solução:** Ajustar saturação/luminosidade no `theme.dark` específico

### Problema: "Build muito lento"
**Solução:** 
- Verificar referências desnecessárias
- Usar cache do Style Dictionary
- Paralelizar builds por marca

### Problema: "Arquivo _generated não encontrado"
**Solução:** Verificar se o gerador automático está configurado corretamente

### Problema: "Metadata conflitante"
**Solução:** Verificar ordem no `$metadata.json` e resolver conflitos de precedência

## Scripts Úteis

```bash
# Validar tokens
npm run validate:tokens

# Preview de tema
npm run preview:theme aplica-tangerine-light-positive

# Gerar relatório de acessibilidade
npm run a11y:report nova-marca

# Sync com Figma
npm run sync:figma -- --brand nova-marca

# Gerar nova marca
npm run generate:brand nova-marca -- --colors "#FF9800,#E65100"

# Validar metadata
npm run validate:metadata
```

## Melhores Práticas

1. **Escolher entre API e Tokens Studio**
   - **API:** Para marcas que precisam de controle total e customizações avançadas
   - **Tokens Studio:** Para marcas que podem usar matemática nativa (como Joy)
   - **Decisão:** Baseada na complexidade e requisitos específicos da marca

2. **Sempre começar pelo _brand.json**
   - Define a identidade visual da marca
   - Garante consistência desde o início

3. **Usar estrutura padronizada**
   - Seguir nomenclatura `_theme-*.json`
   - Manter hierarquia consistente

4. **Testar incrementalmente**
   - Adicione uma surface por vez
   - Valide antes de prosseguir

5. **Documentar decisões**
   - Por que certas cores foram escolhidas
   - Casos especiais de customização
   - Escolha entre API e Tokens Studio

6. **Versionar mudanças**
   - Use semantic versioning
   - Documente breaking changes

7. **Manter metadata atualizado**
   - Sempre atualizar `$metadata.json`
   - Verificar ordem de precedência

## Estrutura de Arquivos Recomendada

```
brand/theme/nova-marca/
├── _brand.json              # Cores principais da marca
├── _grayscale.json          # Escala de cinzas
├── _theme-typography.json   # Tipografia específica
├── _theme-borders.json      # Sistema de bordas
├── _theme-depth.json        # Sistema de sombras
├── _components.json         # Tokens de componentes
└── _nova-marca-generated.json # Gerado automaticamente
```

---

*Seguindo este guia, novos temas são criados de forma consistente e validada.*