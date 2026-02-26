# Theme Engine - Resumo Executivo para Desenvolvimento

## 🎯 **Status Atual do Projeto**

### **Sistema de Build: IMPLEMENTADO** ✅
- **Engine**: Style Dictionary v5 + @tokens-studio/sd-transforms
- **Comando principal**: `node transformers/build.js`
- **Arquitetura**: 5 camadas (Brand → Mode → Surface → Semantic → Foundation)
- **Plataformas**: JSON, JavaScript (CommonJS/ESM), TypeScript (declarations)
- **Total**: 8 temas funcionais gerados automaticamente

### **Documentação: ATUALIZADA** ✅
- **Estrutura de tokens**: Migrada de `theme/` para `brand/`
- **Sistema de build**: Documentado completamente
- **Multi-idioma**: PT-BR e EN atualizados
- **Guias práticos**: Comandos e exemplos de uso

### **Arquitetura: CONSOLIDADA** ✅
- **5 camadas hierárquicas**: Brand → Mode → Surface → Semantic → Foundation
- **2 marcas implementadas**: ze (principal), theme_engine (alternativo)
- **Estrutura escalável**: Sistema suporta N marcas × M modes × S surfaces
- **Single Source of Truth**: Git repository com JSONs organizados

---

## 🚀 **Sistema de Build Implementado**

### **Tecnologias**
- **Style Dictionary v5**: Engine principal de transformação
- **@tokens-studio/sd-transforms**: Transforms específicos do Tokens Studio
- **Node.js**: Runtime de execução
- **Formatos nativos**: 100% baseado em formatos nativos do Style Dictionary

### **Configuração de Temas**
Cada tema é uma **combinação específica** de token sets seguindo nossa hierarquia:

```
TEMA = Brand Theme → Mode → Surface → Semantic → Foundation
SIZES = Dimensions → Semantic → Foundation
```

**Exemplo de configuração:**
```json
{
  "ze-light-positive": {
    "selectedTokenSets": {
      "theme/ze/_brand": "enabled",
      "mode/light": "enabled", 
      "surface/positive": "enabled",
      "semantic/default": "enabled",
      "foundation/ze/default": "enabled",
      "dimension/normal": "source"
    }
  }
}
```

### **Regras de Valores Finais**
1. **Semantic + Foundation/Components**: únicos layers que aparecem no output final
2. **Foundation/Components**: são aliases que referenciam Semantic (`{semantic.*}`)
3. **Semantic**: contém valores **raw** (cores hex, pixels, etc.)
4. **Layers anteriores** (Theme/Mode/Surface): apenas intermediários, não aparecem no output

---

## 🚧 **Próxima Fase: Build & Transformers - FASEADO**

### **FASE 1: Global Transformer (CSS para conferência)** 🎯
**Objetivo**: Criar transformer base que gera CSS para validação visual

#### **Estrutura Proposta**
```
transformers/
├── global/
│   ├── base-config.js          # Config base Style Dictionary + Tokens Studio
│   ├── theme-resolver.js       # Resolve combinações de token sets
│   ├── semantic-extractor.js   # Extrai apenas semantic + foundation
│   └── css-transformer.js      # Gera CSS para conferência
├── outputs/
│   └── css/                    # CSS gerado para cada tema
└── README.md                   # Documentação do sistema
```

#### **Output Target (Fase 1)**
```css
/* ze-light-positive.css */
:root {
  /* Semantic colors */
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-text-body: #333333;
  --semantic-spacing-medium: 16px;
  
  /* Foundation aliases */
  --foundation-bg-primary: var(--semantic-color-brand-primary);
  --foundation-text-body: var(--semantic-color-text-body);
}
```

### **FASE 2: Outros Outputs** ⏳
- TypeScript/JavaScript objects
- JSON structured
- Framework-specific (Radix, Tamagui)

### **FASE 3: Testing & Validation** ⏳
- Automated tests
- Scale validation
- Breaking change detection

---

## 📋 **FASE 1 - Tasks Específicas**

### **1.1 Setup Base Configuration**
```javascript
// transformers/global/base-config.js
const StyleDictionary = require('style-dictionary');

// Configuração que entende Tokens Studio format
const baseConfig = {
  source: ['tokens/**/*.json'],
  exclude: ['**/_*.json'], // Arquivos estruturais
  
  // Usar transforms do Tokens Studio
  transforms: [
    'ts/descriptionToComment',
    'ts/size/px', 
    'ts/opacity/percent',
    'ts/size/letterspacing',
    'ts/typography/fontWeight',
    'ts/resolveMath',
    'ts/size/lineheight',
    'ts/typography/ios/fontWeight',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    'ts/shadow/css/shorthand'
  ]
};
```

### **1.2 Theme Resolver** 
```javascript
// transformers/global/theme-resolver.js
// Função que resolve cada tema baseado no $themes.json
function resolveThemeConfig(themeName) {
  // Le tokens/$themes.json
  // Aplica selectedTokenSets na ordem correta
  // Retorna configuração específica para Style Dictionary
}
```

### **1.3 Semantic Extractor**
```javascript
// transformers/global/semantic-extractor.js  
// Filtra apenas tokens que começam com 'semantic.' ou 'foundation.'
function extractFinalTokens(tokens) {
  return tokens.filter(token => 
    token.path[0] === 'semantic' || 
    token.path[0] === 'foundation'
  );
}
```

### **1.4 CSS Transformer**
```javascript
// transformers/global/css-transformer.js
// Gera CSS custom properties para conferência visual
StyleDictionary.registerFormat({
  name: 'css/aplica-variables',
  formatter: function({dictionary}) {
    // Gera CSS com semantic + foundation
  }
});
```

---

## 🎯 **Critérios de Sucesso - FASE 1**

### **Funcional**
- [ ] `npm run build:css` executa sem erros
- [ ] Gera 1 arquivo CSS por tema configurado (12 temas atuais)
- [ ] CSS contém apenas tokens `semantic.*` e `foundation.*`
- [ ] Foundation tokens referenciam semantic (`var(--semantic-*)`)
- [ ] Valores semantic são raw (hex, px, etc.)

### **Estrutural**
- [ ] Documentação clara de como funciona
- [ ] Código modular e extensível
- [ ] Error handling para tokens malformados
- [ ] Logging de processo de build

### **Validação**
- [ ] CSS gerado é válido
- [ ] Não há referências circulares
- [ ] Cores mantêm contraste adequado
- [ ] Hierarchy visual é preservada

---

## ⚠️ **Regras de Desenvolvimento**

### **Características do Projeto**
1. **Fazer apenas o solicitado** - não adicionar features extras
2. **Confirmar antes de mudanças** - sempre perguntar antes de alterar escopo
3. **SEMPRE confirmar antes de executar** qualquer comando
4. **Trabalhar em fases** - completar Fase 1 antes de prosseguir

### **Aprovação Necessária Para:**
- Instalar novas dependências
- Modificar estrutura de pastas existente
- Alterar arquivos de configuração
- Executar comandos de build
- Fazer commits

### **Processo de Confirmação**
```
1. Apresentar o que será feito
2. Aguardar aprovação explícita  
3. Executar apenas após "SIM" ou "APROVADO"
4. Reportar resultado
5. Aguardar próxima instrução
```

---

## 📊 **Métricas de Sucesso - FASE 1**

### **Output Quality**
- **4 arquivos CSS** gerados (2 marcas × 1 mode × 2 surfaces)
- **Apenas semantic/foundation** no output
- **Valores raw** em semantic
- **Referências corretas** em foundation

### **Developer Experience**
- **1 comando** para build: `npm run build:css`
- **Error messages** claros e actionables
- **Build time** < 10 segundos
- **Documentação** completa do processo

### **Technical Validation**
- **CSS válido** (sem erros de sintaxe)
- **Sem referências quebradas** 
- **Sem duplicações** desnecessárias
- **Consistent naming** seguindo padrão

---

## 📝 **Fase 1 - Deliverables**

### **Código**
1. `transformers/global/base-config.js` - Configuração base
2. `transformers/global/theme-resolver.js` - Resolver de temas
3. `transformers/global/semantic-extractor.js` - Extrator de tokens finais
4. `transformers/global/css-transformer.js` - Transformer CSS
5. `build-css.js` - Script principal de build

### **Outputs**
1. `outputs/css/ze-light-positive.css`
2. `outputs/css/ze-light-negative.css`
3. `outputs/css/engine-light-positive.css`
4. `outputs/css/engine-light-negative.css`

### **Documentação**
1. `transformers/README.md` - Como funciona o sistema
2. `transformers/global/README.md` - Documentação técnica
3. Exemplos de uso dos CSS gerados

---

## 🚀 **Ready to Start - FASE 1**

### **Próximo Step**
**Aguardando confirmação para:**
1. Criar estrutura de pastas `transformers/`
2. Implementar base-config.js com Style Dictionary + Tokens Studio
3. Criar theme-resolver.js para processar $themes.json

### **Pergunta para Confirmação**
Posso prosseguir com a criação da estrutura de pastas e implementação do base-config.js conforme especificado acima?

---

## 📚 **Referências Técnicas**

### **Tokens Studio + Style Dictionary**
- [Tokens Studio Transforms](https://docs.tokens.studio/transform-tokens/style-dictionary)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)

### **Projeto Base**
- `tokens/$themes.json` - Configurações de temas
- `tokens/$metadata.json` - Ordem de token sets
- `docs/pt-br/` e `docs/en/` - Documentação completa da arquitetura

---

*Este resumo serve como Single Source of Truth para implementação FASEADA das ferramentas de build.*