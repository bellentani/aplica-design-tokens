# Contexto do Projeto - Theme Engine

## 📋 Resumo Executivo

O **Theme Engine** é um sistema avançado de geração e gerenciamento de design tokens que utiliza uma arquitetura multidimensional. O projeto combina **Tokens Studio** (plugin do Figma) com **Style Dictionary v5** para criar um sistema robusto de temas dinâmicos.

## 🏗️ Arquitetura do Sistema

### Estrutura Principal
```
zeta-tokens/
├── tokens/                     # Tokens fonte (Tokens Studio)
├── transformers/               # Sistema de build (Style Dictionary)
├── outputs/                    # Arquivos gerados
├── docs/                       # Documentação técnica
└── package.json               # Configuração do projeto
```

### Arquitetura de 5 Camadas
```
Brand → Mode → Surface → Semantic → Foundation
```

- **Brands**: ze, theme_engine
- **Modes**: light
- **Surfaces**: positive, negative
- **Total**: 8 temas gerados (4 semantic + 4 foundation)

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Build Unificado
- **Engine**: Style Dictionary v5 + @tokens-studio/sd-transforms
- **Comando Principal**: `node transformers/build.js`
- **Plataformas**: JSON, JavaScript (CommonJS/ESM), TypeScript (declarations)
- **Total de Arquivos**: Até 40 arquivos (8 temas × 5 plataformas)

### ✅ Estrutura de Tokens Atualizada
```
tokens/
├── brand/                      # Marcas específicas
│   ├── ze/
│   └── theme_engine/
├── mode/                       # Modos de cor
│   └── light.json
├── surface/                    # Superfícies
│   ├── positive.json
│   └── negative.json
├── semantic/                   # Tokens semânticos
│   └── default.json
├── foundation/                 # Foundation + styles
│   └── ze/
├── dimension/                  # Dimensões
│   └── normal.json
├── components/                 # 22 componentes
│   ├── buttonMain.json
│   ├── inputField.json
│   └── [20 outros componentes...]
├── $themes.json
└── $metadata.json
```

### ✅ Sistema de Build por Camadas
```bash
# Por camada da arquitetura
node transformers/build.js mode        # Brand + Mode
node transformers/build.js surface     # Brand + Mode + Surface
node transformers/build.js semantic    # Brand + Mode + Surface + Semantic
node transformers/build.js foundation  # Tudo (semantic + foundation + styles)

# Builds de conveniência
node transformers/build.js dev         # Desenvolvimento (semantic + foundation)
node transformers/build.js all         # Build completo

# Com override de plataformas
node transformers/build.js output:foundation "platform:[json,dts]"
```

### ✅ Multi-Plataforma de Output
- **JSON**: Tokens estruturados (.json)
- **JavaScript**: CommonJS (.js) e ES Modules (.mjs)
- **TypeScript**: Declarations (.d.ts e .d.mts)
- **Futuro**: CSS e SCSS (configurados mas não utilizados)

## 📊 Status Atual

### ✅ Temas Gerados
- **Semantic**: 4 temas (ze/theme_engine × positive/negative)
- **Foundation**: 4 temas (semantic + foundation + styles)
- **Total**: 8 temas funcionais
- **Arquivos**: ~30 arquivos gerados (JSON + JS + TS)

### 📁 Arquivos Gerados
```
transformers/outputs/
├── json/                           # Arquivos JSON
│   ├── ze-light-positive-semantic.json
│   ├── ze-light-positive-foundation.json
│   ├── ze-light-negative-semantic.json
│   ├── ze-light-negative-foundation.json
│   ├── theme_engine-light-positive-semantic.json
│   ├── theme_engine-light-positive-foundation.json
│   ├── theme_engine-light-negative-semantic.json
│   └── theme_engine-light-negative-foundation.json
└── dist/                           # Arquivos JS/TS
    ├── ze-light-positive-semantic.js
    ├── ze-light-positive-semantic.mjs
    ├── ze-light-positive-semantic.d.ts
    ├── ze-light-positive-semantic.d.mts
    └── [outros arquivos...]
```

## 🔧 Tecnologias Utilizadas

### Dependências Principais
- **style-dictionary**: ^5.0.0
- **@tokens-studio/sd-transforms**: ^2.0.0
- **Node.js**: Runtime de execução

### Scripts do Build System
```javascript
// Arquivos principais
transformers/
├── build.js                    # Comando principal (CLI)
├── build-unified.js           # Engine de build unificado
├── base-config.js             # Configurações Style Dictionary
├── themes.config.js           # Configuração de temas e plataformas
├── examples.js                # Exemplos de uso
└── README.md                  # Documentação do sistema
```

## 📚 Documentação

### Documentação Técnica Atualizada
- **PT-BR**: `/docs/pt-br/` - Documentação em português (atualizada)
- **EN**: `/docs/en/` - Documentação em inglês (atualizada)
- **Sistema**: `/transformers/README.md` - Documentação do build system

### Arquivos de Configuração
- **package.json**: Dependências e scripts
- **transformers/themes.config.js**: Configuração central de temas
- **transformers/base-config.js**: Configurações Style Dictionary

## 🚀 Como Usar

### Comandos Principais
```bash
# Desenvolvimento local
node transformers/build.js dev

# Foundation completo
node transformers/build.js foundation

# Foundation apenas JSON
node transformers/build.js output:foundation platform:json

# Build específico para marca
node transformers/build.js brand:ze "platform:[json,esm]"

# Semantic em múltiplas plataformas
node transformers/build.js output:semantic "platform:[json,esm,dts]"
```

### Parâmetros Avançados
```bash
# Override de plataformas
node transformers/build.js output:TYPE "platform:[LIST]"

# Build customizado específico
node transformers/build.js brand:NAME type:TYPE "platform:[LIST]"

# Combinações
node transformers/build.js brand:ze surface:negative type:foundation "platform:[json,esm,dts]"
```

## 🎨 Fluxo de Transformação

### Arquitetura de 5 Camadas
1. **Brand**: Tokens específicos da marca
2. **Mode**: Brand + Mode (light)
3. **Surface**: Brand + Mode + Surface (positive/negative)
4. **Semantic**: Brand + Mode + Surface + Semantic
5. **Foundation**: Tudo (semantic + foundation + styles)

### Fluxo Dimensional
```
Dimensions → Semantic → Foundation
```

### Processo de Build
1. **Entrada**: Tokens JSON no formato Tokens Studio
2. **Transformação**: Style Dictionary v5 com transforms específicos
3. **Filtros**: Aplicação de filtros por camada (semantic, foundation, etc.)
4. **Saída**: Múltiplas plataformas (JSON, JS, TS)
5. **Validação**: Verificação de arquivos gerados

## 📈 Capacidades do Sistema

### Escalabilidade
- **Marcas**: Facilmente extensível (adicionar nova marca = 4+ temas automáticos)
- **Modes**: Suporte a múltiplos modes (dark mode futuro)
- **Surfaces**: Novas surfaces multiplicam possibilidades
- **Plataformas**: Sistema multi-platform nativo

### Performance
- **Build Time**: ~0s para builds padrão
- **Arquivos**: 30-40 arquivos gerados dependendo da configuração
- **Filtros**: Sistema de filtros otimizado para cada camada

## 🐛 Status de Problemas

### ✅ Resolvidos
- Integração Style Dictionary v5 + Tokens Studio
- Sistema unificado de build com parâmetros
- Geração de todos os 8 temas funcionais
- Multi-plataforma (JSON, JS, TS)
- Documentação completa atualizada

### ⚠️ Limitações Conhecidas
- Mode e Surface layers: Geram apenas ESM (não JSON físico - comportamento esperado)
- Brand clones: theme_engine usa fallback para foundation/ze/ (intencional)

## 📞 Informações do Projeto

- **Repositório**: zeta-tokens
- **Versão Style Dictionary**: 5.0
- **Versão Tokens Studio**: 2.0
- **Status**: ✅ Sistema completo e funcional

---

**Última atualização**: Janeiro 2025
**Versão do sistema**: 2.0.0
**Status**: ✅ Sistema de 5 camadas implementado e testado