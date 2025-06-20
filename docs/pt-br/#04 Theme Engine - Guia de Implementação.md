# Theme Engine - Guia de Implementação

## Como Adicionar Nova Marca

### 1. **Preparação dos Arquivos Base**

#### Criar estrutura de diretórios:
```bash
theme/nova-marca/
├── _brand.json
├── _typography.json
├── _borders.json
├── _components.json
└── _primitive_theme.json
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

- Executar API de acessibilidade para gerar `_primitive_theme.json`
- Verificar contrastes surface/txtOn (mínimo WCAG AA)
- Ajustar cores se necessário

### 3. **Configuração no Tokens Studio**

Adicionar nova marca aos theme sets:
```json
{
  "nova-marca-light-positive": {
    "selectedTokenSets": {
      "theme/nova-marca/_brand": "enabled",
      "theme/nova-marca/_typography": "enabled",
      "dimension/normal": "source",
      "mode (WIP)/light": "enabled",
      "surface/positive": "enabled",
      "semantic/default": "enabled"
    }
  }
}
```

### 4. **Build e Distribuição**

```bash
# Executar build
npm run build:tokens nova-marca

# Verificar saída
dist/
├── nova-marca-light-positive.css
├── nova-marca-light-negative.css
├── nova-marca-dark-positive.css
└── nova-marca-dark-negative.css
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

## Scripts Úteis

```bash
# Validar tokens
npm run validate:tokens

# Preview de tema
npm run preview:theme ze-light-positive

# Gerar relatório de acessibilidade
npm run a11y:report nova-marca

# Sync com Figma
npm run sync:figma -- --brand nova-marca
```

## Melhores Práticas

1. **Sempre começar pelo _primitive_theme**
   - Garante acessibilidade desde o início
   - Evita retrabalho

2. **Testar incrementalmente**
   - Adicione uma surface por vez
   - Valide antes de prosseguir

3. **Documentar decisões**
   - Por que certas cores foram escolhidas
   - Casos especiais de customização

4. **Versionar mudanças**
   - Use semantic versioning
   - Documente breaking changes

---

*Seguindo este guia, novos temas são criados de forma consistente e validada.*