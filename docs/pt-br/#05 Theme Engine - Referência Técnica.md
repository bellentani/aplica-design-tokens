# Theme Engine - Referência Técnica

## Glossário de Termos

### **Design Tokens**
Valores de design armazenados como dados (JSON) que representam decisões visuais fundamentais como cores, tipografia, espaçamentos.

### **SSoT (Single Source of Truth)**
Repositório Git centralizado contendo todos os arquivos JSON que definem os tokens. Única fonte autorizada para mudanças.

### **Factory (_primitive_theme)**
Sistema automatizado que gera paletas de cores garantindo acessibilidade através de algoritmos de contraste e harmonia.

### **Transformer**
Processo que converte tokens JSON em formatos consumíveis (CSS, XML, Swift, etc.) usando Style Dictionary ou similar.

### **Surface**
Contexto de hierarquia visual baseado em analogia fotográfica - positive (normal) vs negative (invertido).

### **Semantic Layer**
Camada que consolida todas as transformações anteriores, dando finalidade específica aos tokens para uso em interfaces.

### **Theme Set**
Configuração no Tokens Studio que define quais arquivos JSON compõem um tema específico.

## Fórmulas e Sistemas

### **Sistema Dimensional - Fibonacci Adaptado**

#### Regras:
1. Base: 16px (1 unidade de design)
2. Unidade mínima: 4px (1 unidade de layout)
3. Progressão: Fibonacci modificado

#### Escala:
```
0, 1, 2, 4, 8, 12, 16, 20, 24, 28, 44, 72, 116
```

#### Aplicação:
- **Sizing**: Inclui 1 e 2 para bordas finas
- **Spacing**: Mínimo 4px para distâncias

### **Sistema de Line Height**

#### Fórmula:
```
lineHeight = ROUNDUP((fontSize × multiplicador) / 4) × 4
```

#### Multiplicadores:
- **Tight**: 1.0 (100%)
- **Close**: 1.2 (120%)
- **Regular**: 1.4 (140%)
- **Wild**: 1.8 (180%)

#### Exemplo:
```
fontSize: 14px
multiplicador: 1.2 (close)
cálculo: 14 × 1.2 = 16.8
arredondamento: ROUNDUP(16.8/4) × 4 = 20px
```

### **Sistema de Opacidade**

#### Valores hexadecimais:
```
Transparent:      #RRGGBB00 (0%)
SuperTransparent: #RRGGBB1A (10%)
SemiTranslucid:   #RRGGBB33 (20%)
Translucid:       #RRGGBB80 (50%)
SuperTranslucid:  #RRGGBBCC (80%)
SemiOpaque:       #RRGGBBE6 (90%)
Opaque:           #RRGGBB   (100%)
```

### **Inversão Surface (Positive ↔ Negative)**

#### Intensidades (3 níveis):
```
lowest  ↔ highest
default ↔ default
highest ↔ lowest
```

#### Escalas (7 níveis):
```
lowest  ↔ highest
lower   ↔ higher
low     ↔ high
mid     ↔ mid
high    ↔ low
higher  ↔ lower
highest ↔ lowest
```

## Estrutura de Tokens

### **Tipo de Token ($type)**
```json
{
  "$type": "color",     // Tipo do token
  "$value": "#FF6B00"   // Valor do token
}
```

### **Referências ($value com {})**
```json
{
  "$value": "{semantic.color.brand.primary}" // Referência outro token
}
```

### **Tokens Estruturais (underscore)**
- `_primitive_theme`: Gerado por API
- `_color_palette`: Factory de cores
- `_theme_*`: Sistemas base reutilizáveis
- Não participam da cadeia de transformação principal

## APIs e Integrações

### **Style Dictionary**
```javascript
// Configuração básica
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    }
  }
}
```

### **Tokens Studio para Figma**
```json
{
  "themes": {
    "ze-light-positive": {
      "selectedTokenSets": {
        "theme/ze/_brand": "enabled",
        "dimension/normal": "source"
      }
    }
  }
}
```

### **CI/CD Pipeline**
```yaml
# GitHub Actions exemplo
on:
  push:
    paths:
      - 'tokens/**/*.json'
jobs:
  build:
    steps:
      - run: npm run validate:tokens
      - run: npm run build:tokens
      - run: npm run sync:figma
```

## Padrões de Nomenclatura

### **Tokens**
- **Hierárquico**: `semantic.color.interface.feedback.success`
- **Camel case**: `fontSizes`, `lineHeights`
- **Ordinal para marca**: `first`, `second`, `third`
- **Intensidade**: `lowest`, `default`, `highest`

### **Arquivos**
- **Underscore**: `_brand.json` (estrutural)
- **Kebab case**: `light-positive.json`
- **Agrupamento**: `theme/ze/`, `mode/`

### **Temas finais**
```
theme_[marca]_[mode]_[surface]_[density]
theme_ze_light_positive_normal
```

## Limites e Constraints

### **Performance**
- Build time máximo: 60s para 10 marcas
- Tamanho por tema: < 100KB
- Profundidade máxima de referência: 10 níveis

### **Escalabilidade**
- Máximo prático: 50 marcas × 4 modes × 4 surfaces
- Além disso, considerar arquitetura distribuída

### **Compatibilidade**
- Tokens Studio: v0.11+
- Style Dictionary: v3.0+
- Node.js: 16+

## Links para Detalhes

### **Especificações**
- [W3C Design Tokens Format](https://tr.designtokens.org/format/)
- [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)
- [Tokens Studio Transform](https://docs.tokens.studio/transform-tokens)

### **Ferramentas**
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Figma Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978)
- [Token Transformer](https://transform.tokens.studio/)

### **Documentação Interna**
- Arquitetura Completa: `theme_engine_architecture_doc.md`
- Racionais de Design: `tokens_tamanho_espacamento.md`
- Tipografia: `tokens_tipografia_fontes.md`

---

*Esta referência técnica serve como consulta rápida para implementadores e mantenedores do Theme Engine.*