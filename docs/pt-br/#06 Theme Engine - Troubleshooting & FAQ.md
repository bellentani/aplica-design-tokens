# Aplica Theme Engine - Troubleshooting & FAQ

## 🚨 Problemas Comuns e Soluções

### **Token não resolve / aparece undefined**

#### **Sintomas:**
- Token aparece como `undefined` no output final
- Referência circular detectada
- Build falha com erro de token resolution

#### **Causas Possíveis:**
1. **Ordem incorreta no $metadata.json**
2. **Referência circular entre tokens**
3. **Token Set não habilitado corretamente**
4. **Sintaxe incorreta na referência `{token.path}`**

#### **Soluções:**
```bash
# 1. Verificar ordem no metadata
npm run validate:metadata

# 2. Detectar referências circulares
npm run detect:circular-refs

# 3. Validar sintaxe de tokens
npm run validate:token-syntax

# 4. Trace específico de um token
npm run trace:token "semantic.color.brand.primary"
```

#### **Debug Step-by-Step:**
```json
// 1. Verificar se token existe na fonte
"theme.light.brand.branding.first.default.background": "#FF6B00"

// 2. Verificar referência no mode
"mode.brand.branding.first.default.background": 
  "{theme.light.brand.branding.first.default.background}"

// 3. Verificar no surface
"surface.color.brand.branding.first.default.background":
  "{mode.brand.branding.first.default.background}"

// 4. Verificar no semantic
"semantic.color.brand.branding.first.default.background":
  "{surface.color.brand.branding.first.default.background}"
```

---

### **Cores diferentes entre Figma e código**

#### **Sintomas:**
- Cores no Figma não coincidem com CSS gerado
- Sync do Tokens Studio não funciona
- Variables no Figma mostram valores incorretos

#### **Soluções:**
```bash
# 1. Re-sync com Figma
npm run sync:figma -- --force

# 2. Verificar token mapping
npm run validate:figma-mapping

# 3. Limpar cache do Figma
# No Figma: Plugins > Tokens Studio > Settings > Clear Cache

# 4. Regenerar $themes.json
npm run generate:themes-config
```

#### **Checklist de Validação:**
- [ ] `$figmaCollectionId` está correto no `$themes.json`
- [ ] `$figmaModeId` corresponde ao mode correto
- [ ] `$figmaVariableReferences` está atualizado
- [ ] Token Studio plugin está na versão mais recente
- [ ] Permissões de escrita no Figma estão habilitadas

---

### **Build lento ou com timeout**

#### **Sintomas:**
- Build demora mais de 60 segundos
- Timeout em CI/CD
- Memory leak durante build

#### **Soluções:**
```bash
# 1. Verificar cache
npm run build:tokens -- --use-cache

# 2. Build paralelo
npm run build:tokens -- --parallel

# 3. Build incremental
npm run build:tokens -- --incremental

# 4. Análise de performance
npm run analyze:build-performance
```

#### **Otimizações:**
```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      buildPath: 'dist/',
      transforms: ['name/kebab', 'color/hex', 'size/px'],
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true // Mantém referências
        }
      }]
    }
  }
}
```

---

### **Falhas de acessibilidade**

#### **Sintomas:**
- Contraste insuficiente reportado
- Validação WCAG falha
- API de acessibilidade retorna erro

#### **Soluções:**
```bash
# 1. Verificar contrastes específicos
npm run a11y:check-contrast theme.light

# 2. Gerar relatório completo
npm run a11y:report -- --format=html

# 3. Auto-fix contrastes
npm run a11y:auto-fix -- --min-contrast=4.5

# 4. Validar paleta antes de commit
npm run a11y:validate-palette
```

#### **Limites de Contraste:**
- **WCAG AA**: 4.5:1 para texto normal, 3:1 para texto grande
- **WCAG AAA**: 7:1 para texto normal, 4.5:1 para texto grande

---

### **Problemas com dark mode**

#### **Sintomas:**
- Dark mode não inverte corretamente
- Cores ficam muito claras/escuras
- Hierarquia visual se perde

#### **Soluções:**
```bash
# 1. Verificar transformações surface
npm run debug:surface-transforms dark

# 2. Validar positive/negative logic
npm run validate:surface-logic

# 3. Ajustar saturação do dark theme
npm run adjust:dark-saturation -- --factor=0.8
```

#### **Debug de Surface Transforms:**
```json
// positive.json
"surface.color.brand.branding.first.lowest.background": 
  "{mode.brand.branding.first.lowest.background}"

// negative.json  
"surface.color.brand.branding.first.lowest.background": 
  "{mode.brand.branding.first.highest.background}" // inverte!
```

---

## 🔍 FAQ - Perguntas Frequentes

### **Conceitos e Arquitetura**

#### **Q: Qual a diferença entre positive e negative surface?**
A: Positive = hierarquia normal (como foto positiva). Negative = hierarquia invertida (como negativo fotográfico). Lowest vira highest e vice-versa.

#### **Q: Por que usar 5 camadas? Não é complexo demais?**
A: Cada camada tem responsabilidade única:
- **Theme**: Identidade da marca
- **Mode**: Contexto visual (light/dark)  
- **Surface**: Hierarquia (positive/negative)
- **Semantic**: Consolidação com finalidade
- **Foundation**: Interface simplificada

#### **Q: Quando usar API vs Tokens Studio nativo?**
A: 
- **API**: Marcas que precisam controle total (tangerine, grinch)
- **Tokens Studio**: Marcas que podem usar matemática nativa (joy)

#### **Q: Como funciona a escala Fibonacci adaptada?**
A: Base 16px, mínimo 4px, progressão: 0,1,2,4,8,12,16,20,24,28,44,72,116. Garante harmonía visual e grid alignment.

### **Implementação e Uso**

#### **Q: Como adicionar uma nova marca rapidamente?**
A:
```bash
# Usar wizard (quando disponível)
npm run wizard:new-brand

# Ou manual:
1. Criar pasta brand/theme/nova-marca/
2. Copiar estrutura de arquivos existente
3. Atualizar $metadata.json
4. Run build
```

#### **Q: Posso usar apenas algumas camadas?**
A: Não recomendado. O sistema foi projetado para funcionar com todas as 5 camadas. Pular camadas quebra o fluxo de transformações.

#### **Q: Como versionar mudanças nos tokens?**
A: Use semantic versioning no package.json e documente breaking changes. Futuro: versionamento automático baseado em impact analysis.

#### **Q: Qual o máximo de marcas suportadas?**
A: Testado até 50 marcas. Além disso considere arquitetura distribuída ou otimizações avançadas.

### **Troubleshooting Específico**

#### **Q: Token aparece correto no Figma mas errado no código**
A: Verifique se o sync foi executado após mudanças. Tokens Studio → Push to GitHub → CI/CD → Figma Variables.

#### **Q: Build funciona local mas falha no CI/CD**
A: Diferenças de versão Node.js ou permissões de arquivo. Use Docker para garantir ambiente consistente.

#### **Q: Como debugar performance lenta?**
A:
```bash
# Profile do build
npm run build:tokens -- --profile

# Análise de dependências
npm run analyze:token-deps

# Check circular references
npm run detect:circular-refs
```

#### **Q: Posso usar tokens de uma marca em outra?**
A: Não diretamente. Cada marca deve ser independente. Para tokens compartilhados, use a camada `_components.json` global.

### **Migração e Versionamento**

#### **Q: Como migrar de outro sistema de tokens?**
A: 
1. Auditar tokens existentes
2. Mapear para estrutura de 5 camadas
3. Migração gradual por componente
4. Validar acessibilidade pós-migração

#### **Q: Breaking changes quebram tudo?**
A: Use feature flags e migração gradual:
```json
{
  "semantic.color.primary": {
    "$value": "{semantic.color.brand.branding.first.default.background}",
    "$deprecated": true,
    "$replacement": "semantic.color.brand.primary"
  }
}
```

#### **Q: Como fazer rollback de mudanças?**
A:
```bash
# Git rollback
git revert <commit-hash>

# Rebuild automatico
npm run build:tokens

# Sync com Figma
npm run sync:figma
```

---

## 🛠️ Ferramentas de Debug

### **Scripts Úteis**
```bash
# Validações gerais
npm run validate:all
npm run validate:tokens
npm run validate:metadata
npm run validate:accessibility

# Debug específico
npm run trace:token "semantic.color.primary"
npm run debug:surface-transforms positive
npm run analyze:circular-deps

# Fixes automáticos
npm run fix:accessibility -- --auto
npm run fix:circular-refs
npm run optimize:build-cache
```

### **Debug Manual**
```javascript
// Verificar token resolution
const tokens = require('./dist/tokens.json');
console.log(tokens.semantic.color.primary);

// Verificar transformações
const surface = require('./data/aplica-theme/surface/positive.json');
console.log(surface.surface.color.brand);
```

### **Logs e Monitoramento**
```bash
# Habilitar debug verbose
DEBUG=theme-engine:* npm run build:tokens

# Logs de performance
npm run build:tokens -- --profile --verbose

# Monitoring em produção
npm run monitor:tokens -- --webhook=<slack-url>
```

---

## 📞 Quando Pedir Ajuda

### **Abrir Issue no GitHub quando:**
- Token resolution falha consistentemente
- Performance degrada significativamente
- Acessibilidade falha após fix
- Sync Figma quebra repeatedly

### **Incluir sempre:**
- Versão do Theme Engine
- Sistema operacional
- Versões Node.js/npm
- Logs completos do erro
- Minimal reproduction case

### **Escalação:**
- **P0** (Sistema quebrado): Imediato
- **P1** (Feature não funciona): 24h
- **P2** (Performance/UX): 72h  
- **P3** (Enhancement): Next release

---

*Este guia será atualizado conforme novos problemas são identificados e resolvidos.*