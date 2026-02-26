# Aplica Theme Engine - Roteiro de Mapeamento de Tokens

> **Um guia completo para conduzir sessões de mapeamento de tokens com times de Design e Marketing**

## Índice

1. [Introdução e Contexto](#introdução-e-contexto)
2. [Preparação para Sessões de Trabalho](#preparação-para-sessões-de-trabalho)
3. [Como Conduzir Conversas e Workshops](#como-conduzir-conversas-e-workshops)
4. [Checklist Completo de Propriedades da Marca](#checklist-completo-de-propriedades-da-marca)
5. [Mapeamento de Cores da Marca](#mapeamento-de-cores-da-marca)
6. [Mapeamento de Cores de Ação](#mapeamento-de-cores-de-ação)
7. [Mapeamento de Cores de Feedback](#mapeamento-de-cores-de-feedback)
8. [Mapeamento de Cores de Produto](#mapeamento-de-cores-de-produto)
9. [Mapeamento de Tipografia](#mapeamento-de-tipografia)
10. [Mapeamento de Sombras (Elevation)](#mapeamento-de-sombras-elevation)
11. [Mapeamento de Espaçamento (Dimension)](#mapeamento-de-espaçamento-dimension)
12. [Mapeamento de Bordas](#mapeamento-de-bordas)
13. [Mapeamento de Opacidade](#mapeamento-de-opacidade)
14. [Mapeamento de Depth/Spread](#mapeamento-de-depthspread)
15. [Personalizações e Overrides](#personalizações-e-overrides)
16. [Decisões de Configuração](#decisões-de-configuração)
17. [Template de Coleta e Documentação](#template-de-coleta-e-documentação)
18. [Exemplos Completos por Tema](#exemplos-completos-por-tema)
19. [Processo de Validação e Discussão](#processo-de-validação-e-discussão)
20. [Próximos Passos e Implementação](#próximos-passos-e-implementação)

---

## Introdução e Contexto

### Propósito desta Documentação

Este documento serve como uma **referência permanente** para times que trabalham com o Aplica Theme Engine. Ele explica:

- Como entender o sistema de tokens e suas capacidades
- Como conduzir conversas e workshops com designers e times de marketing
- Como extrair informações específicas (cores customizadas, fontes, tamanhos)
- Como documentar decisões e personalizações
- Como adaptar o sistema quando necessário (usando overrides, customizações)
- Como validar e iterar sobre as escolhas

### Para Quem É Este Documento?

- **Designers**: Entender quais informações precisam ser fornecidas e como comunicar decisões de design
- **Times de Marketing**: Aprender como escolhas de cores e tipografia da marca se traduzem no sistema
- **Desenvolvedores**: Entender como extrair e documentar informações de sessões de design
- **Times de Produto**: Aprender o processo de criação e customização de temas

### Por Que Precisamos de Mapeamento de Tokens

Criar um tema requer extrair propriedades específicas da marca de sistemas de design, guias de estilo e discussões em equipe. Designers e times de marketing frequentemente têm:

- Requisitos de cores específicos que podem não corresponder a sistemas padrão
- Famílias de fontes customizadas com disponibilidade variável de pesos
- Requisitos de tamanhos específicos para espaçamento e tipografia
- Diretrizes de marca que precisam ser traduzidas em tokens técnicos

Este roteiro guia você através do processo de:
1. **Entender** quais informações são necessárias
2. **Extrair** essas informações através de conversas eficazes
3. **Documentar** decisões e justificativas
4. **Adaptar** o sistema para acomodar requisitos específicos

### Como Usar Esta Documentação

- **Antes de uma sessão**: Revise a seção de preparação e seções de mapeamento relevantes
- **Durante uma sessão**: Use os checklists e guias de conversação
- **Após uma sessão**: Use o template de documentação para organizar informações coletadas
- **Para customizações**: Consulte as seções de overrides e personalização

---

## Preparação para Sessões de Trabalho

### Materiais Necessários

Antes de agendar uma sessão de mapeamento de tokens, certifique-se de ter acesso a:

- **Arquivos do Figma** ou documentação do design system
- **Guia de estilo da marca** ou brand book
- **Paleta de cores** (se disponível separadamente)
- **Especificações de tipografia** (famílias de fontes, pesos, tamanhos)
- **Tokens de design existentes** (se migrando de outro sistema)
- **Acesso a membros do time de design** que entendem a identidade da marca
- **Acesso a membros do time de marketing** que podem fornecer diretrizes da marca

### Agendamento e Estrutura

#### Quem Deve Participar?

- **Obrigatório**: 
  - Pelo menos um designer familiarizado com a marca
  - Desenvolvedor/líder técnico que implementará o tema
- **Recomendado**:
  - Gerente de marketing/marca
  - Product owner (para cores específicas de produto)
  - Líder de UX (para considerações de acessibilidade)

#### Duração Sugerida

- **Sessão inicial**: 2-3 horas
- **Sessões de acompanhamento**: 1-2 horas (para validação e ajustes)
- **Tempo total**: 4-6 horas em múltiplas sessões

#### Agenda Sugerida

**Sessão 1: Descoberta (2-3 horas)**
- Introdução e contexto (15 min)
- Mapeamento de cores da marca (45 min)
- Cores de ação e feedback (30 min)
- Discussão de tipografia (30 min)
- Intervalo (15 min)
- Sombras, espaçamento e bordas (30 min)
- Decisões de configuração (15 min)
- Encerramento e próximos passos (15 min)

**Sessão 2: Validação (1-2 horas)**
- Revisão de informações coletadas (30 min)
- Teste do tema gerado (30 min)
- Discussão de customizações necessárias (30 min)
- Finalização de decisões (30 min)

### Ferramentas de Documentação

Prepare estas ferramentas antes da sessão:

- **Template de checklist** (impresso ou digital)
- **Ferramenta de anotações** (Google Docs, Notion ou similar)
- **Ferramenta de seleção de cores** (para extrair cores do Figma)
- **Compartilhamento de tela** (para revisão colaborativa)
- **Documento template** (para coleta estruturada de dados)

---

## Como Conduzir Conversas e Workshops

### Técnicas de Facilitação

#### 1. Comece com Perguntas Abertas

Comece com perguntas amplas para entender a identidade geral da marca:

- "Quais três palavras você usaria para descrever sua marca?"
- "Quais cores melhor representam a identidade da sua marca?"
- "Que sentimento os usuários devem ter ao ver sua marca?"

#### 2. Use Referências Visuais

- Mostre exemplos de temas existentes (aplica_joy, aplica_grinch, theme_engine)
- Use rodas de cores ou ferramentas de paleta
- Referencie designs do Figma ou guias de estilo

#### 3. Documente em Tempo Real

- Tome notas durante a conversa
- Capture tanto decisões quanto justificativas
- Anote quaisquer preocupações ou questões que surjam

#### 4. Valide o Entendimento

- Repita o que você entendeu
- Faça perguntas esclarecedoras
- Confirme decisões antes de prosseguir

### Perguntas-Chave por Categoria

Cada seção de mapeamento abaixo inclui perguntas específicas a fazer. Aqui estão os princípios gerais:

**Para Cores:**
- "Qual é a cor primária que representa sua marca?"
- "Vocês têm códigos hex específicos, ou devemos extrair do Figma?"
- "Há alguma cor que deve ser exata, ou podemos gerar variações?"

**Para Tipografia:**
- "Quais fontes são usadas atualmente em seus designs?"
- "Vocês têm todos os pesos de fonte disponíveis, ou alguns estão faltando?"
- "Há requisitos de tamanhos específicos que diferem das escalas padrão?"

**Para Customizações:**
- "Há elementos de design que não se encaixam no sistema padrão?"
- "Quais requisitos específicos vocês têm que podem precisar de overrides?"

### Lidando com Pedidos Específicos

#### Cenário: "Queremos uma cor específica que não está no sistema"

**Resposta:**
- "Tudo bem! Podemos usar o sistema de override para especificar cores exatas."
- "Vamos documentar isso como uma customização e anotar por que é necessária."
- "Validaremos acessibilidade automaticamente quando implementarmos."

**Documentação:**
```markdown
Cor Customizada: #FF5733
Motivo: Requisito de diretriz de marca
Localização: Cor primária da marca
Acessibilidade: A ser validada
```

#### Cenário: "Nossa fonte não tem todos os pesos necessários"

**Resposta:**
- "Sem problema! Podemos mapear pesos disponíveis para os pesos semânticos necessários."
- "Por exemplo, se você não tem Light (300), podemos usar Regular (400) como substituto."
- "Vamos documentar quais pesos mapeiam para quais pesos semânticos."

**Exemplo:**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }, // Light não disponível
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  // ... resto dos pesos
}
```

#### Cenário: "Precisamos de tamanhos diferentes da escala padrão"

**Resposta:**
- "Podemos customizar tamanhos de fonte, espaçamento e raios de borda."
- "Vamos identificar quais tamanhos precisam ser diferentes e documentá-los."
- "Usaremos overrides ou configuração customizada para estes."

### Explicando Limitações e Possibilidades do Sistema

**O que o sistema pode fazer:**
- Gerar automaticamente 19 níveis de intensidade de cor a partir de uma cor base
- Criar variações de modo claro e escuro
- Gerar cores de texto acessíveis (txtOn) automaticamente
- Validar razões de contraste (WCAG AA/AAA)
- Suportar fontes customizadas com mapeamento de pesos
- Permitir overrides para requisitos específicos

**O que requer customização:**
- Cores de marca exatas que não se encaixam na geração automática
- Fontes com pesos faltando (requer mapeamento)
- Escalas de espaçamento customizadas
- Valores específicos de raio de borda
- Níveis de opacidade customizados

### Exemplos de Diálogos

#### Diálogo 1: Extraindo Cores da Marca

**Facilitador:** "Vamos começar com as cores da sua marca. Qual é a cor primária que representa sua marca?"

**Designer:** "Usamos um rosa vibrante, #E7398A."

**Facilitador:** "Ótimo! Esta cor é usada para ações primárias como botões, ou é mais para elementos de branding?"

**Designer:** "É nossa cor principal da marca, usada em logos e elementos-chave de branding."

**Facilitador:** "Perfeito. Então vamos mapear isso como `first` nas cores da marca. Vocês têm cores secundárias e terciárias da marca?"

**Designer:** "Sim, temos um azul (#38C2D0) e um roxo (#8F58BD)."

**Facilitador:** "Excelente. Então temos:
- Primária (first): #E7398A - joy_pink
- Secundária (second): #38C2D0 - joy_blue  
- Terciária (third): #8F58BD - joy_purple

O sistema gerará automaticamente variações mais claras e mais escuras destas para diferentes casos de uso. Isso funciona para vocês?"

**Designer:** "Sim, parece bom!"

**Facilitador:** "Ótimo! Estou documentando isso. Alguma preocupação ou requisito específico para essas cores?"

#### Diálogo 2: Lidando com Pesos de Fonte Faltando

**Facilitador:** "Agora vamos falar sobre tipografia. Qual fonte vocês usam para títulos?"

**Designer:** "Usamos Sansita para texto de display."

**Facilitador:** "Perfeito. A Sansita tem todos os pesos: Light (300), Regular (400), SemiBold (600), Bold (700) e Black (900)?"

**Designer:** "Na verdade, a Sansita não tem um peso Light. Ela começa no Regular."

**Facilitador:** "Sem problema! Podemos mapear o peso semântico Light para Regular. Então quando o sistema precisar de Light, usará Regular (400) em vez disso. A Sansita tem Bold e Black?"

**Designer:** "Sim, tem Regular, Bold, ExtraBold e Black."

**Facilitador:** "Perfeito! Então vamos mapear:
- Light → Regular (400)
- Regular → Regular (400)
- SemiBold → Bold (700)
- Bold → ExtraBold (800)
- Black → Black (900)

Estou documentando esse mapeamento. Este é um cenário comum e o sistema lida bem com isso."

---

## Checklist Completo de Propriedades da Marca

Use este checklist durante sua sessão de mapeamento. Marque os itens conforme você coleta informações.

### Cores da Marca

- [ ] Cor primária (first): `_______________` (Hex: `#______`)
- [ ] Cor secundária (second): `_______________` (Hex: `#______`)
- [ ] Cor terciária (third): `_______________` (Hex: `#______`)
- [ ] Cor quaternária (fourth - opcional; estender schema/config ao usar N cores de marca): `_______________` (Hex: `#______`)

### Cores de Ação

- [ ] Cor do botão primário: `_______________` (Hex: `#______`)
- [ ] Cor do botão secundário: `_______________` (Hex: `#______`)
- [ ] Cor de link: `_______________` (Hex: `#______`)

### Cores de Feedback

- [ ] Info (default): `_______________` (Hex: `#______`)
- [ ] Info (secondary): `_______________` (Hex: `#______`)
- [ ] Success (default): `_______________` (Hex: `#______`)
- [ ] Success (secondary): `_______________` (Hex: `#______`)
- [ ] Warning (default): `_______________` (Hex: `#______`)
- [ ] Warning (secondary): `_______________` (Hex: `#______`)
- [ ] Danger (default): `_______________` (Hex: `#______`)
- [ ] Danger (secondary): `_______________` (Hex: `#______`)

### Cores de Produto

- [ ] Promo (default): `_______________` (Hex: `#______`)
- [ ] Promo (secondary): `_______________` (Hex: `#______`)
- [ ] Cashback (default): `_______________` (Hex: `#______`)
- [ ] Cashback (secondary): `_______________` (Hex: `#______`)
- [ ] Premium (default): `_______________` (Hex: `#______`)
- [ ] Premium (secondary): `_______________` (Hex: `#______`)

### Tipografia

- [ ] Família de fonte Main: `_______________`
- [ ] Família de fonte Content: `_______________`
- [ ] Família de fonte Display: `_______________`
- [ ] Família de fonte Code: `_______________`

**Pesos de Fonte Disponíveis:**
- [ ] Pesos da fonte Main: `_______________`
- [ ] Pesos da fonte Content: `_______________`
- [ ] Pesos da fonte Display: `_______________`
- [ ] Pesos da fonte Code: `_______________`

**Tipografia Customizada (se aplicável):**
- [ ] Tamanhos de fonte customizados: `_______________`
- [ ] Line heights customizados: `_______________`
- [ ] Letter spacing customizado: `_______________`

### Sombras (Elevation)

- [ ] Nível -1 (sombra interna): x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 0: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 1: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 2: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 3: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 4: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 5: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Nível 6: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`

**Nota:** Propriedades incluem: x (offset horizontal), y (offset vertical), blur (raio de desfoque), spread (raio de expansão), type (dropShadow/innerShadow), color (cor da sombra)

### Espaçamento (Dimension)

- [ ] Unidade base de espaçamento: `_______________` (px/rem/etc.)
- [ ] Valores semânticos customizados (se houver): `_______________`
- [ ] Preferência de escala de espaçamento: [ ] Padrão [ ] Customizada

### Bordas

- [ ] Raio de borda padrão: `_______________` (px)
- [ ] Variações de raio de borda: micro: `___`, small: `___`, medium: `___`, large: `___`, etc.
- [ ] Largura de borda padrão: `_______________` (px)

### Opacidade

- [ ] Níveis de opacidade customizados (se houver): `_______________`
- [ ] Opacidade para sombras: `_______________`
- [ ] Opacidade para overlays: `_______________`

### Opções de Configuração

- [ ] Estratégia de contraste: [ ] high-contrast [ ] brand-tint
- [ ] Saturação do modo escuro: `_______________` (0.7-1.0, padrão: 0.85)
- [ ] Nível de acessibilidade: [ ] AA (4.5:1) [ ] AAA (7:1)
- [ ] Incluir primitivos: [ ] Sim [ ] Não
- [ ] Gerar tokens de UI: [ ] Sim [ ] Não

### Customizações e Overrides

- [ ] Cores customizadas que requerem overrides: `_______________`
- [ ] Neutrals customizados: `_______________`
- [ ] Grayscale customizado: `_______________`
- [ ] Outras customizações: `_______________`

---

## Mapeamento de Cores da Marca

### Entendendo Cores da Marca

Cores da marca são as cores de identidade central da sua marca. Elas são mapeadas para:
- `first` - Cor primária da marca
- `second` - Cor secundária da marca
- `third` - Cor terciária da marca
- `fourth` - Cor quaternária da marca (opcional; estender schema/config ao usar N cores de marca)

### Como Identificar Cores da Marca

**Perguntas a Fazer:**
- "Qual é a cor primária que representa a identidade da sua marca?"
- "Quais cores aparecem no seu logo?"
- "Quais cores são usadas em seus principais materiais de marketing?"
- "Há cores secundárias ou de destaque que fazem parte da identidade da sua marca?"

### Extraindo Cores do Figma

1. Abra seu arquivo de design do Figma
2. Selecione o elemento com a cor da marca
3. Use o seletor de cores para obter o código hex
4. Verifique o nome da cor no seu design system
5. Documente tanto o código hex quanto o nome da cor

### Exemplos de Temas Existentes

| Tema | Primária (first) | Secundária (second) | Terciária (third) | Características |
|------|------------------|---------------------|-------------------|-----------------|
| **aplica_joy** | `joy_pink: #E7398A` | `joy_blue: #38C2D0` | `joy_purple: #8F58BD` | Vibrante, brincalhão |
| **aplica_grinch** | `grinch_moss: #58BD59` | `grinch_christmas: #EA323C` | `grinch_golden: #FFA833` | Inspirado na natureza, tons de verde |
| **theme_engine** | `brand_primary: #265ED9` | `brand_secondary: #FECB01` | `brand_accent: #8952E0` | Neutro, profissional |

### O Que É Gerado

A partir de cada cor da marca, o sistema gera automaticamente:

- **7 níveis de intensidade**: lowest, lower, low, default, high, higher, highest
- **19 níveis de paleta**: Decomposição completa de cor (10-190)
- **Versões de modo claro e escuro**: Adaptação automática
- **Cores de texto (txtOn)**: Cores de texto acessíveis para cada fundo
- **Cores de borda**: Cores de borda apropriadas para cada nível

**Exemplo:** Se você definir `joy_pink: '#E7398A'`:
- O sistema cria 7 variações de intensidade
- Gera 19 níveis de paleta (surface, txtOn, border)
- Cria versões de modo claro e escuro
- Garante conformidade de contraste WCAG AA/AAA

### Guia de Conversação

**Abertura:**
- "Vamos começar com as cores da sua marca. Estas são as cores centrais que representam a identidade da sua marca."

**Extraindo Informações:**
- "Qual é a cor primária da sua marca? Vocês têm o código hex?"
- "Esta cor é usada no seu logo ou branding principal?"
- "Vocês têm cores secundárias ou de destaque?"

**Validando:**
- "Então temos [cor1] como primária, [cor2] como secundária, [cor3] como terciária. O sistema gerará automaticamente variações mais claras e mais escuras. Isso funciona para vocês?"

**Documentando:**
```markdown
Cores da Marca:
- Primária (first): joy_pink - #E7398A
- Secundária (second): joy_blue - #38C2D0
- Terciária (third): joy_purple - #8F58BD
```

---

## Mapeamento de Cores de Ação

### Entendendo Cores de Ação

Cores de ação são usadas para elementos interativos:
- **Primary**: Botões de call-to-action principais
- **Secondary**: Botões secundários ou ações menos proeminentes
- **Link**: Links de texto e hiperlinks

### Como Identificar Cores de Ação

**Perguntas a Fazer:**
- "Qual cor vocês usam para botões primários ou CTAs principais?"
- "Qual cor indica links clicáveis?"
- "Vocês têm uma cor diferente para ações secundárias?"

### Exemplos de Temas Existentes

| Tema | Primária | Secundária | Link |
|------|----------|------------|------|
| **aplica_joy** | `action_magenta: #C40145` | `action_cyan: #1872A6` | `link_pink: #FF0F80` |
| **aplica_grinch** | `action_grinch: #418B43` | `action_christmas: #AD3E25` | `link_week: #C09E72` |
| **theme_engine** | `action_primary: #013FC4` | `action_secondary: #A68A18` | `action_link: #5000D1` |

### Decisões de Design e Implicações

**Cor de Ação Primária:**
- Geralmente corresponde ou complementa a cor primária da marca
- Deve ter contraste suficiente para texto branco ou claro
- Usada para CTAs principais, botões primários, ações importantes

**Cor de Ação Secundária:**
- Frequentemente uma cor neutra ou complementar
- Usada para botões secundários, ações menos proeminentes
- Ainda deve ser claramente acionável

**Cor de Link:**
- Tipicamente mais escura ou mais saturada que a primária
- Deve atender aos requisitos de contraste de acessibilidade
- Usada para links de texto, elementos de navegação

### Guia de Conversação

**Abertura:**
- "Agora vamos falar sobre elementos interativos. Quais cores vocês usam para botões e links?"

**Extraindo Informações:**
- "Qual cor são seus botões primários?"
- "Vocês têm uma cor diferente para botões secundários?"
- "Qual cor vocês usam para links de texto?"

**Validando:**
- "Então ações primárias usam [cor], ações secundárias usam [cor], e links usam [cor]. Estas serão usadas para todos os elementos interativos. Isso está alinhado com seu design system?"

---

## Mapeamento de Cores de Feedback

### Entendendo Cores de Feedback

Cores de feedback comunicam status do sistema:
- **Info**: Mensagens informativas (default = mais claro, secondary = mais saturado)
- **Success**: Mensagens de sucesso e confirmações
- **Warning**: Mensagens de aviso e cautelas
- **Danger**: Mensagens de erro e ações destrutivas

Cada uma tem duas variantes:
- **Default**: Versão mais clara, mais sutil
- **Secondary**: Versão mais saturada, proeminente

### Como Identificar Cores de Feedback

**Perguntas a Fazer:**
- "Quais cores vocês usam para mensagens de sucesso?"
- "Qual cor indica erros ou avisos?"
- "Vocês têm versões mais claras e mais escuras dessas cores?"

### Exemplos de Temas Existentes

| Tema | Info (default/secondary) | Success (default/secondary) | Warning (default/secondary) | Danger (default/secondary) |
|------|--------------------------|----------------------------|----------------------------|---------------------------|
| **aplica_joy** | `#CBF6ED` / `#A5E7D9` | `#D7F6CB` / `#86C46D` | `#FEE6C2` / `#FDB750` | `#F9C8C8` / `#EE5A5A` |
| **aplica_grinch** | `#A5E7D9` / `#46CEB1` | `#E7A6C5` / `#CE4685` | `#E7CDA6` / `#E59B2E` | `#021802` / `#E5EBE5` |
| **theme_engine** | `#02D9FF` / `#46B9CE` | `#00AD26` / `#228137` | `#FF9A00` / `#C18933` | `#F53232` / `#C43B3B` |

### Diferença Entre Default e Secondary

- **Default**: Mais claro, mais sutil - usado para fundos, indicadores sutis
- **Secondary**: Mais saturado - usado para bordas, ícones, indicadores proeminentes

### Guia de Conversação

**Abertura:**
- "Vamos discutir cores de feedback - estas são usadas para mensagens de sucesso, erros, avisos e mensagens informativas."

**Extraindo Informações:**
- "Qual cor vocês usam para mensagens de sucesso?"
- "Qual cor indica erros?"
- "Vocês têm versões mais claras e mais escuras dessas cores?"

**Validando:**
- "Então temos [cor1] para sucesso, [cor2] para erros, [cor3] para avisos, [cor4] para info. Usaremos versões mais claras para fundos e versões mais saturadas para bordas e ícones. Isso corresponde ao seu design system?"

---

## Mapeamento de Cores de Produto

### Entendendo Cores de Produto

Cores de produto são cores específicas de funcionalidades:
- **Promo**: Promoções, vendas, ofertas especiais
- **Cashback**: Recompensas, funcionalidades de cashback
- **Premium**: Funcionalidades premium, conteúdo exclusivo

Cada uma tem duas variantes (default e secondary), similar às cores de feedback.

### Como Identificar Cores de Produto

**Perguntas a Fazer:**
- "Vocês têm cores específicas para conteúdo promocional?"
- "Qual cor representa recompensas ou funcionalidades de cashback?"
- "Há uma cor para funcionalidades premium ou exclusivas?"

### Exemplos de Temas Existentes

| Tema | Promo (default/secondary) | Cashback (default/secondary) | Premium (default/secondary) |
|------|--------------------------|----------------------------|---------------------------|
| **aplica_joy** | `#E3F6CC` / `#AEE071` | `#FCE0D4` / `#FEA680` | `#ECE2E9` / `#B200AF` |
| **aplica_grinch** | `#E3F6CC` / `#AEE071` | `#FCE7D4` / `#E0A671` | `#E2E8EC` / `#71ADE0` |
| **theme_engine** | `#6BC200` / `#D2FD9D` | `#FFBB00` / `#FFF94F` | `#B200AF` / `#EBC2DD` |

### Guia de Conversação

**Abertura:**
- "Agora vamos falar sobre cores específicas de produto. Estas são usadas para funcionalidades como promoções, recompensas e conteúdo premium."

**Extraindo Informações:**
- "Vocês têm cores específicas para banners promocionais ou vendas?"
- "Qual cor representa cashback ou recompensas?"
- "Há uma cor para funcionalidades premium?"

**Nota:** Se cores de produto não estiverem definidas, você pode pular esta seção ou usar cores da marca como placeholders.

---

## Mapeamento de Tipografia

### Entendendo o Sistema de Tipografia

O sistema de tipografia inclui:
- **Famílias de Fontes**: main, content, display, code
- **Pesos de Fonte**: light (300), regular (400), semibold (600), bold (700), black (900)
- **Tamanhos de Fonte**: micro (10px) até exa (60px)
- **Line Heights**: tight, close, regular, loose, wild
- **Letter Spacing**: tight, regular, wild

### Famílias de Fontes

**Main**: Usada para elementos de UI, botões, labels
**Content**: Usada para texto do corpo, parágrafos
**Display**: Usada para manchetes, títulos
**Code**: Usada para blocos de código, texto monoespaçado

### Como Identificar Famílias de Fontes

**Perguntas a Fazer:**
- "Qual fonte vocês usam para texto do corpo?"
- "Qual fonte é usada para manchetes?"
- "Vocês têm uma fonte específica para código ou texto monoespaçado?"
- "Essas fontes estão disponíveis no seu design system ou Figma?"

### Pesos de Fonte

O sistema requer 5 pesos semânticos:
- **light** (300)
- **regular** (400)
- **semibold** (600)
- **bold** (700)
- **black** (900)

**Importante:** Se uma fonte não tiver um peso exato, você deve mapear um peso disponível para o peso semântico.

### Exemplos de Mapeamento de Pesos

**Exemplo 1: Fonte com todos os pesos (Roboto)**
```javascript
main: {
  light: { normal: 'Light', italic: 'Light Italic', numeric: 300 },
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'SemiBold', italic: 'SemiBold Italic', numeric: 600 },
  bold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 },
  black: { normal: 'Black', italic: 'Black Italic', numeric: 900 }
}
```

**Exemplo 2: Fonte sem peso Light (Sansita)**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }, // Sem Light, usando Regular
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 }, // Sem SemiBold, usando Bold
  bold: { normal: 'ExtraBold', italic: 'ExtraBold Italic', numeric: 800 },
  black: { normal: 'Black', italic: 'Black Italic', numeric: 900 }
}
```

**Exemplo 3: Fonte sem peso Black (IBM Plex Mono)**
```javascript
code: {
  light: { normal: 'Light', italic: 'Light Italic', numeric: 300 },
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'SemiBold', italic: 'SemiBold Italic', numeric: 600 },
  bold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 },
  black: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 } // Sem Black, usando Bold
}
```

### Tamanhos de Fonte

Tamanhos de fonte padrão:
- micro: 10px
- extraSmall: 12px
- small: 14px
- medium: 16px
- large: 20px
- extraLarge: 24px
- mega: 28px
- giga: 36px
- tera: 40px
- peta: 48px
- exa: 60px

**Tamanhos Customizados:** Se você precisar de tamanhos diferentes, documente-os para configuração de override.

### Line Heights

Line heights são organizados por "apertamento":
- **tight**: Espaçamento de linha compacto
- **close**: Espaçamento ligeiramente maior
- **regular**: Espaçamento padrão
- **loose**: Espaçamento mais generoso
- **wild**: Espaçamento máximo

Cada line height tem valores para cada tamanho de fonte.

### Letter Spacing

- **tight**: -0.72px (compacto)
- **regular**: 0px (padrão)
- **wild**: 0.8px (expandido)

### Guia de Conversação

**Abertura:**
- "Vamos discutir tipografia. Precisamos saber sobre suas famílias de fontes e pesos disponíveis."

**Extraindo Informações:**
- "Quais fontes vocês usam? Fonte principal para UI, fonte de conteúdo para texto do corpo, fonte de display para manchetes?"
- "Vocês têm todos os pesos de fonte disponíveis: Light (300), Regular (400), SemiBold (600), Bold (700), Black (900)?"
- "Se algum peso estiver faltando, qual peso disponível devemos usar em vez disso?"

**Lidando com Pesos Faltando:**
- "Vejo que [fonte] não tem Light. Podemos mapear Light para Regular (400). Isso funciona?"
- "Para pesos que não existem, usaremos o peso disponível mais próximo. Vamos documentar esse mapeamento."

**Documentando:**
```markdown
Tipografia:
- Main: Roboto (todos os pesos disponíveis)
- Content: Roboto (todos os pesos disponíveis)
- Display: Sansita (sem Light, mapeando Light→Regular, sem SemiBold, mapeando SemiBold→Bold)
- Code: IBM Plex Mono (sem Black, mapeando Black→Bold)
```

---

## Mapeamento de Sombras (Elevation)

### Entendendo o Sistema de Elevation

O sistema de elevation define estilos de sombra para diferentes níveis de profundidade:
- **level_minus_one**: Sombra interna (inset)
- **level_zero**: Sem sombra (plano)
- **level_one** até **level_six**: Profundidade crescente

### Propriedades de Sombra

Cada sombra tem:
- **x**: Offset horizontal (geralmente 0)
- **y**: Offset vertical (aumenta com o nível)
- **blur**: Raio de desfoque (aumenta com o nível)
- **spread**: Raio de expansão (valores negativos criam sombras mais apertadas)
- **type**: `dropShadow` ou `innerShadow`
- **color**: Cor da sombra (geralmente usa tokens de opacidade)

### Níveis de Elevation Padrão

| Nível | x | y | blur | spread | type | Descrição |
|-------|---|---|------|--------|------|-----------|
| level_minus_one | 0 | 0 | micro | close | innerShadow | Sombra interna |
| level_zero | 0 | 0 | zero | close | dropShadow | Plano, sem sombra |
| level_one | 0 | nano | small | next | dropShadow | Elevação sutil |
| level_two | 0 | nano | large | next | dropShadow | Elevação média |
| level_three | 0 | micro | extraLarge | near | dropShadow | Elevação alta |
| level_four | 0 | extraSmall | mega | near | dropShadow | Elevação muito alta |
| level_five | 0 | small | giga | distant | dropShadow | Elevação máxima |
| level_six | 0 | large | giga | distant | dropShadow | Elevação extrema |

### Como Extrair Sombras do Figma

1. Selecione um elemento com uma sombra
2. Verifique o painel de Efeitos
3. Anote os valores:
   - Offset X e Y
   - Raio de desfoque
   - Raio de expansão
   - Cor e opacidade
4. Mapeie para o nível de elevation mais próximo

### Guia de Conversação

**Abertura:**
- "Vamos discutir sombras e elevation. Estas definem como elementos aparecem flutuando acima da superfície."

**Extraindo Informações:**
- "Vocês têm um sistema de sombra padrão em seu design?"
- "Vocês podem me mostrar exemplos de diferentes níveis de elevation?"
- "Há valores de sombra específicos que devemos usar?"

**Nota:** Se sombras não estiverem explicitamente definidas, você pode usar o sistema padrão e ajustar depois se necessário.

---

## Mapeamento de Espaçamento (Dimension)

### Entendendo o Sistema de Espaçamento

O sistema de espaçamento tem duas partes:
- **Escala primitiva**: Valores numéricos de 0 a 1600 (ex: 0px, 2px, 4px, 8px... até 128px)
- **Valores semânticos**: Nomes legíveis por humanos (zero, pico, nano, micro, extraSmall, small, medium, large, extraLarge, mega, giga, tera, peta)

### Escala Primitiva

A escala usa um sistema de unidade base:
- 0px (zero)
- 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px (unidade base)
- Continua até 128px

### Valores Semânticos

| Nome Semântico | Valor | Uso |
|----------------|-------|-----|
| zero | 0px | Remover espaçamento |
| pico | 1px | Espaçamento mínimo |
| nano | 2px | Espaçamento minúsculo |
| micro | 4px | Espaçamento muito pequeno |
| extraSmall | 8px | Unidade base |
| small | 12px | Componentes pequenos |
| medium | 16px | Espaçamento padrão |
| large | 20px | Espaçamento generoso |
| extraLarge | 24px | Espaçamento maior |
| mega | 28px | Componentes grandes |
| giga | 44px | Tamanho de toque |
| tera | 72px | Seções hero |
| peta | 116px | Espaçamento máximo |

### Quando Usar Primitivos vs Semânticos

- **Use primitivos** para valores de pixel diretos em componentes
- **Use semânticos** para documentação e contextos de foundation
- **Valores semânticos referenciam primitivos** (ex: `medium` = `{dimension.scale.200}` = 16px)

### Guia de Conversação

**Abertura:**
- "Vamos discutir espaçamento. O sistema tem uma escala padrão, mas podemos customizar se necessário."

**Extraindo Informações:**
- "Vocês usam uma escala de espaçamento padrão em seus designs?"
- "Qual é sua unidade base de espaçamento? (geralmente 4px, 8px ou 16px)"
- "Há valores de espaçamento específicos que diferem do padrão?"

**Nota:** A maioria dos temas usa a escala padrão. Espaçamento customizado é raro mas possível.

---

## Mapeamento de Bordas

### Entendendo o Sistema de Bordas

Bordas incluem:
- **Raio de Borda**: Arredondamento de cantos (straight, micro, small, medium, large, extraLarge, mega, circular)
- **Largura de Borda**: Espessura da borda (none, small, medium, large, extraLarge)

### Valores de Raio de Borda

| Nome | Valor | Uso |
|------|-------|-----|
| straight | 0px | Cantos retos |
| micro | 2px | Arredondamento mínimo |
| extraSmall | 4px | Arredondamento pequeno |
| small | 8px | Arredondamento padrão |
| medium | 12px | Arredondamento médio |
| large | 16px | Arredondamento grande |
| extraLarge | 20px | Arredondamento muito grande |
| mega | 24px | Arredondamento máximo |
| circular | 1000px | Totalmente arredondado (pills, círculos) |

### Valores de Largura de Borda

| Nome | Valor | Uso |
|------|-------|-----|
| none | 0px | Sem borda |
| small | 1px | Borda fina |
| medium | 2px | Borda padrão |
| large | 4px | Borda grossa |
| extraLarge | 8px | Borda muito grossa |

### Guia de Conversação

**Abertura:**
- "Vamos discutir bordas - raio de canto e largura de borda."

**Extraindo Informações:**
- "Qual é seu raio de borda padrão? (ex: 8px, 12px)"
- "Vocês têm valores de raio diferentes para diferentes componentes?"
- "Quais larguras de borda vocês usam?"

**Nota:** Bordas tipicamente usam valores padrão. Valores customizados podem ser configurados se necessário.

---

## Mapeamento de Opacidade

### Entendendo o Sistema de Opacidade

O sistema de opacidade tem duas partes:
- **Valores de opacidade raw**: 0, 10, 20, 50, 80, 90, 100
- **Nomes semânticos de opacidade**: transparent, superTransparent, semiTranslucid, translucid, superTranslucid, semiOpaque, opaque

### Níveis de Opacidade

| Nome Semântico | Valor Raw | Uso |
|----------------|-----------|-----|
| transparent | 0 | Totalmente transparente |
| superTransparent | 10 | Muito transparente |
| semiTranslucid | 20 | Principalmente transparente |
| translucid | 50 | Semi-transparente |
| superTranslucid | 80 | Principalmente opaco |
| semiOpaque | 90 | Quase opaco |
| opaque | 100 | Totalmente opaco |

### Opacidade para Cores

Opacidade pode ser aplicada a:
- **Cores grayscale**: Para sombras e overlays
- **Cores light**: Para efeitos específicos de modo claro

### Guia de Conversação

**Abertura:**
- "Vamos discutir opacidade - isso afeta sombras, overlays e efeitos de transparência."

**Extraindo Informações:**
- "Vocês têm requisitos de opacidade específicos para sombras ou overlays?"
- "Há efeitos de transparência em seu design system?"

**Nota:** A maioria dos temas usa o sistema de opacidade padrão. Valores customizados são raros.

---

## Mapeamento de Depth/Spread

### Entendendo Depth/Spread

Valores de depth/spread controlam a expansão da sombra:
- **close**: 0 (sem expansão)
- **next**: -2 (expansão interna leve)
- **near**: -4 (expansão interna moderada)
- **distant**: -8 (expansão interna significativa)
- **far**: -12 (expansão interna máxima)

Valores negativos criam sombras mais apertadas e focadas.

### Como Isso Afeta as Sombras

- **close (0)**: Sombra se expande normalmente
- **next (-2)**: Sombra ligeiramente mais apertada
- **near (-4)**: Sombra moderadamente mais apertada
- **distant (-8)**: Sombra significativamente mais apertada
- **far (-12)**: Sombra muito apertada, focada

### Guia de Conversação

**Nota:** Depth/spread é tipicamente tratado automaticamente pelo sistema. Valores customizados raramente são necessários, a menos que você tenha requisitos específicos de sombra.

---

## Personalizações e Overrides

### Quando Usar Customizações

Use customizações quando:
- Cores de marca exatas não se encaixam na geração automática
- Níveis de cor específicos precisam de ajuste fino
- Pesos de fonte precisam de mapeamento especial
- Valores de espaçamento ou borda customizados são necessários
- Sistemas de design existentes precisam ser mantidos

### Como Documentar Customizações

Sempre documente:
1. **O que** está sendo customizado
2. **Por que** é necessário
3. **Como** é implementado
4. **Impacto na acessibilidade** (se aplicável)

### Sistema de Override

O sistema suporta quatro tipos de overrides:

#### 1. Overrides de Neutrals

Sobrescrever cores neutras para cores de marca específicas:

```javascript
overrides: {
  neutrals: {
    brand_primary: {
      baseColor: '#AFAFB8',
      referenceLevel: 100
    }
  }
}
```

Ou override manual:

```javascript
overrides: {
  neutrals: {
    brand_primary: {
      surface: { '100': '#AFAFB8' },
      txtOn: { '100': '#000000' },
      border: { '100': '#9999A3' }
    }
  }
}
```

#### 2. Override de Grayscale

Sobrescrever a paleta de grayscale:

```javascript
overrides: {
  grayscale: {
    surface: { '5': '#faf8f5', '140': '#1a1814' }
  }
}
```

#### 3. Override de Brand Token

Sobrescrever valores específicos de brand token:

```javascript
overrides: {
  brand: {
    theme: {
      color: {
        light: { /* estrutura _brand.json */ }
      }
    }
  }
}
```

#### 4. Override de interface.function.active

Sobrescrever o estado **active** de todas as cores de função (primary, secondary, link). Quando é **string (hex)**: o gerador define surface = hex, txtOn = preto ou branco por contraste WCAG (AA/AAA do config), border = surface escurecido ~20%. Quando é **objeto** `{ surface, txtOn?, border? }`, usa os valores informados com fallback. Ver `docs/override-interface-active.md`.

```javascript
overrides: {
  interface: {
    function: { active: '#0067FF' }
  }
}
```

### Validação de Acessibilidade

**Importante:** Todos os overrides manuais de `txtOn` são automaticamente validados para conformidade de contraste WCAG:
- **Nível AA**: Razão de contraste 4.5:1 (padrão)
- **Nível AAA**: Razão de contraste 7:1 (se configurado)

O sistema irá:
- ✅ Mostrar avisos se o contraste falhar
- ✅ Sugerir alternativas acessíveis
- ✅ Documentar status de validação em metadados

### Lidando com Pedidos Específicos

#### Pedido: "Precisamos desta cor exata #FF5733"

**Resposta:**
- "Podemos usar um override para especificar a cor exata."
- "Vamos documentar por que esta cor exata é necessária."
- "O sistema validará acessibilidade automaticamente."

**Documentação:**
```markdown
Override de Cor Customizada:
- Cor: #FF5733
- Localização: Cor primária da marca
- Motivo: Requisito de diretriz de marca
- Acessibilidade: A ser validada
```

#### Pedido: "Nossa fonte não tem peso Light"

**Resposta:**
- "Vamos mapear Light para Regular (400)."
- "Este é um cenário comum e funciona bem."
- "Vamos documentar esse mapeamento."

**Implementação:**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }
}
```

### Boas Práticas para Customizações

1. **Documente tudo**: Sempre anote por que uma customização é necessária
2. **Valide acessibilidade**: Certifique-se de que cores customizadas atendem aos requisitos de contraste
3. **Teste completamente**: Verifique se customizações funcionam em ambos os modos claro e escuro
4. **Mantenha mínimo**: Apenas customize o que é necessário
5. **Revise regularmente**: Revisite customizações para ver se ainda são necessárias

### Guia de Conversação

**Abertura:**
- "Há algum requisito específico que não se encaixa no sistema padrão?"

**Extraindo Informações:**
- "Vocês têm cores de marca exatas que devem ser usadas?"
- "Há elementos de design que precisam de tratamento especial?"
- "Quais customizações podem ser necessárias?"

**Documentando:**
- "Vamos documentar isso como uma customização com o motivo."
- "Implementaremos isso usando o sistema de override."
- "O sistema validará acessibilidade automaticamente."

---

## Decisões de Configuração

### Estratégia de Contraste

**Opções:**
- **high-contrast**: Texto é sempre preto ou branco (máxima legibilidade)
- **brand-tint**: Texto usa a cor de paleta mais próxima que passa no WCAG (mantém tom da marca)

**Quando usar:**
- **high-contrast**: Máxima acessibilidade, aplicações profissionais
- **brand-tint**: Consistência da marca, designs mais expressivos

**Exemplos:**
- `theme_engine`: Usa `high-contrast` (profissional, máxima legibilidade)
- `aplica_joy`: Usa `brand-tint` (brincalhão, mantém cores da marca)

### Saturação do Modo Escuro

**Opções:**
- **1.0**: Mesma saturação do modo claro (vibrante)
- **0.85**: 15% menos saturado (padrão, mais fácil para os olhos)
- **0.7**: 30% menos saturado (muito suave)

**Recomendação:** Use 0.85 (padrão) a menos que tenha requisitos específicos.

### Nível de Acessibilidade

**Opções:**
- **AA (4.5:1)**: Mínimo padrão da indústria (padrão)
- **AAA (7:1)**: Acessibilidade aprimorada para melhor legibilidade

**Quando usar:**
- **AA**: Maioria das aplicações, conformidade padrão
- **AAA**: Requisitos de alta acessibilidade, melhor legibilidade

**Exemplos:**
- `theme_engine`: Usa `AA` (conformidade padrão)
- `aplica_joy`: Usa `AAA` (acessibilidade aprimorada)

### Incluir Primitivos

**Opções:**
- **true**: Gera `_primitive_theme.json` com todas as decomposições de cor
- **false**: Não gera primitivos, usa valores HEX raw

**Quando usar:**
- **true**: Precisa de acesso completo à paleta de cores, integração com Figma
- **false**: Reduzir tamanho do arquivo, processamento mais rápido

**Exemplo:**
- `aplica_grinch`: Usa `false` (tamanho de arquivo reduzido)

### Gerar Tokens de UI

**Opções:**
- **true**: Gera `_ui.json` com tokens de componente
- **false**: Não gera tokens de UI (padrão)

**Quando usar:**
- **true**: Precisa de tokens de nível de componente
- **false**: Geração de tema padrão

### Guia de Conversação

**Abertura:**
- "Agora vamos discutir algumas opções de configuração que afetam como o tema é gerado."

**Perguntas:**
- "Para texto em fundos coloridos, vocês preferem contraste máximo (preto/branco) ou texto colorido da marca?"
- "Para modo escuro, vocês querem a mesma saturação ou cores ligeiramente menos saturadas?"
- "Qual nível de acessibilidade vocês precisam: AA (padrão) ou AAA (aprimentado)?"

**Documentando:**
```markdown
Configuração:
- Estratégia de contraste: brand-tint
- Saturação do modo escuro: 0.85
- Nível de acessibilidade: AAA
- Incluir primitivos: true
- Gerar tokens de UI: false
```

---

## Template de Coleta e Documentação

### Durante a Sessão

Use este template para coletar informações em tempo real:

```markdown
# Sessão de Mapeamento de Tema: [Nome do Tema]
**Data:** [Data]
**Participantes:** [Nomes]
**Facilitador:** [Nome]

## Cores da Marca
- Primária (first): [Nome] - #[Hex]
- Secundária (second): [Nome] - #[Hex]
- Terciária (third): [Nome] - #[Hex]

## Cores de Ação
- Primária: [Nome] - #[Hex]
- Secundária: [Nome] - #[Hex]
- Link: [Nome] - #[Hex]

## Cores de Feedback
- Info (default): [Nome] - #[Hex]
- Info (secondary): [Nome] - #[Hex]
- Success (default): [Nome] - #[Hex]
- Success (secondary): [Nome] - #[Hex]
- Warning (default): [Nome] - #[Hex]
- Warning (secondary): [Nome] - #[Hex]
- Danger (default): [Nome] - #[Hex]
- Danger (secondary): [Nome] - #[Hex]

## Cores de Produto
- Promo (default): [Nome] - #[Hex]
- Promo (secondary): [Nome] - #[Hex]
- Cashback (default): [Nome] - #[Hex]
- Cashback (secondary): [Nome] - #[Hex]
- Premium (default): [Nome] - #[Hex]
- Premium (secondary): [Nome] - #[Hex]

## Tipografia
- Main: [Nome da Fonte] (Pesos: [Lista])
- Content: [Nome da Fonte] (Pesos: [Lista])
- Display: [Nome da Fonte] (Pesos: [Lista])
- Code: [Nome da Fonte] (Pesos: [Lista])

**Mapeamentos de Pesos (se houver):**
- [Documente quaisquer mapeamentos especiais]

## Sombras
- [Documente níveis de sombra se customizados]

## Espaçamento
- Unidade base: [Valor]
- Valores customizados: [Lista se houver]

## Bordas
- Raio padrão: [Valor]
- Valores customizados: [Lista se houver]

## Configuração
- Estratégia de contraste: [high-contrast/brand-tint]
- Saturação do modo escuro: [Valor]
- Nível de acessibilidade: [AA/AAA]
- Incluir primitivos: [true/false]
- Gerar tokens de UI: [true/false]

## Customizações
- [Liste quaisquer customizações necessárias]
- [Documente motivos para customizações]

## Decisões e Justificativas
- [Anote quaisquer decisões importantes e por que foram tomadas]
- [Documente quaisquer preocupações ou questões levantadas]

## Próximos Passos
- [ ] Revisar informações coletadas
- [ ] Gerar tema inicial
- [ ] Agendar sessão de validação
- [ ] Implementar customizações
```

### Após a Sessão

1. **Organize as informações** no formato de arquivo de configuração
2. **Revise com o time** para garantir precisão
3. **Documente customizações** com justificativas
4. **Crie o arquivo de configuração** (`.config.mjs`)
5. **Gere o tema** para validação

### Convertendo para Arquivo de Configuração

Use as informações coletadas para criar um arquivo `.config.mjs`:

```javascript
export default {
  name: 'nome_do_tema',
  
  colors: {
    // Todas as definições de cores
  },
  
  mapping: {
    // Todos os mapeamentos
  },
  
  options: {
    // Opções de configuração
  },
  
  typography: {
    // Configuração de tipografia
  },
  
  borders: {
    // Configuração de bordas (se customizada)
  },
  
  overrides: {
    // Quaisquer overrides necessários
  }
};
```

---

## Exemplos Completos por Tema

### Tema aplica_joy

**Identidade da Marca:** Vibrante, brincalhão, energético

**Cores da Marca:**
- Primária: `joy_pink: #E7398A`
- Secundária: `joy_blue: #38C2D0`
- Terciária: `joy_purple: #8F58BD`

**Cores de Ação:**
- Primária: `action_magenta: #C40145`
- Secundária: `action_cyan: #1872A6`
- Link: `link_pink: #FF0F80`

**Cores de Feedback:**
- Info: `#CBF6ED` / `#A5E7D9`
- Success: `#D7F6CB` / `#86C46D`
- Warning: `#FEE6C2` / `#FDB750`
- Danger: `#F9C8C8` / `#EE5A5A`

**Tipografia:**
- Main: Noto Sans (todos os pesos)
- Content: Noto Sans (todos os pesos)
- Display: Poppins (todos os pesos)
- Code: IBM Plex Mono (Black mapeado para Bold)

**Configuração:**
- Contraste: `brand-tint`
- Modo escuro: `0.85`
- Acessibilidade: `AAA`
- Primitivos: `true`

### Tema aplica_grinch

**Identidade da Marca:** Inspirado na natureza, tons de verde, vibrante

**Cores da Marca:**
- Primária: `grinch_moss: #58BD59`
- Secundária: `grinch_christmas: #EA323C`
- Terciária: `grinch_golden: #FFA833`

**Cores de Ação:**
- Primária: `action_grinch: #418B43`
- Secundária: `action_christmas: #AD3E25`
- Link: `link_week: #C09E72`

**Tipografia:**
- Main: Roboto (todos os pesos)
- Content: Roboto (todos os pesos)
- Display: Sansita (Light→Regular, SemiBold→Bold)
- Code: IBM Plex Mono (Black→Bold)

**Configuração:**
- Contraste: `brand-tint`
- Modo escuro: `0.85`
- Acessibilidade: `AAA` (com bypass)
- Primitivos: `false`

### Tema theme_engine

**Identidade da Marca:** Neutro, profissional, versátil

**Cores da Marca:**
- Primária: `brand_primary: #265ED9`
- Secundária: `brand_secondary: #FECB01`
- Terciária: `brand_accent: #8952E0`

**Cores de Ação:**
- Primária: `action_primary: #013FC4`
- Secundária: `action_secondary: #A68A18`
- Link: `action_link: #5000D1`

**Tipografia:**
- Main: Roboto (todos os pesos)
- Content: Roboto (todos os pesos)
- Display: Sansita (Light→Regular, SemiBold→Bold)
- Code: IBM Plex Mono (Black→Bold)

**Configuração:**
- Contraste: `high-contrast`
- Modo escuro: `0.85`
- Acessibilidade: `AA`
- Primitivos: `true`

---

## Processo de Validação e Discussão

### Como Validar Escolhas

1. **Revise informações coletadas** com o time
2. **Gere tema inicial** usando o arquivo de configuração
3. **Teste em ambos os modos** claro e escuro
4. **Verifique acessibilidade** (razões de contraste)
5. **Compare com design system** (Figma, guia de estilo)
6. **Colete feedback** de designers e stakeholders

### Revisando Customizações

Ao revisar customizações:
- **Verifique necessidade**: A customização é realmente necessária?
- **Verifique acessibilidade**: Cores customizadas atendem aos requisitos de contraste?
- **Teste compatibilidade**: Customizações funcionam em todos os modos?
- **Documente impacto**: Como customizações afetam o sistema?

### Teste de Acessibilidade

O sistema valida automaticamente:
- **Contraste de texto**: Cores txtOn vs cores de fundo
- **Conformidade WCAG**: AA (4.5:1) ou AAA (7:1) conforme configurado
- **Avisos**: Mostra problemas com sugestões de correções

**Verificações manuais:**
- Teste com ferramentas de acessibilidade (ex: axe, WAVE)
- Revise em ambos os modos claro e escuro
- Verifique com diferentes tamanhos de fonte

### Iterando sobre Feedback

1. **Colete feedback** da sessão de validação
2. **Priorize mudanças** (crítico vs nice-to-have)
3. **Atualize arquivo de configuração** com mudanças
4. **Regenere tema** e teste
5. **Repita** até aprovação

### Guia de Conversação para Validação

**Abertura:**
- "Vamos revisar o tema gerado e ver como ele corresponde ao seu design system."

**Processo de Revisão:**
- "Isso parece correto no modo claro?"
- "Como o modo escuro parece?"
- "Há alguma cor que precisa de ajuste?"
- "As fontes parecem corretas?"

**Lidando com Feedback:**
- "Vejo [problema]. Podemos corrigir isso com [solução]."
- "Vamos documentar essa mudança e atualizar a configuração."
- "Regeneraremos e testaremos novamente."

---

## Próximos Passos e Implementação

### Convertendo Dados Coletados para Arquivo de Configuração

1. **Organize informações** do template de sessão
2. **Crie arquivo `.config.mjs`** em `dynamic-themes/configs/`
3. **Siga a estrutura** de arquivos de configuração existentes
4. **Adicione comentários** explicando decisões
5. **Teste a sintaxe** da configuração

### Gerando o Tema

```bash
# Gerar todos os temas
npm run themes:generate

# Ou gerar tema específico
node dynamic-themes/scripts/generate-all-themes.mjs [nome-do-tema]
```

### Testando o Tema

1. **Verifique arquivos gerados** em `data/brand/[nome-do-tema]/`
2. **Verifique paletas de cores** estão corretas
3. **Teste em ambos os modos** (claro/escuro)
4. **Valide acessibilidade** (automático + manual)
5. **Compare com design system**

### Atualizando Documentação

Quando mudanças são feitas:
1. **Atualize o arquivo de configuração** com mudanças
2. **Documente o motivo** das mudanças
3. **Atualize este roteiro** se o processo mudar
4. **Compartilhe atualizações** com o time

### Versionamento e Histórico de Decisões

**Boas práticas:**
- **Versionar arquivos de configuração** no Git
- **Documentar decisões** em mensagens de commit
- **Manter notas de sessão** para referência
- **Manter changelog** de customizações

### Obtendo Ajuda

Se você encontrar problemas:
1. **Revise temas existentes** para exemplos
2. **Verifique documentação** (este arquivo, Guia do Designer, Referência Técnica)
3. **Consulte o time** (designers, desenvolvedores)
4. **Revise boas práticas de override** (`dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md`)

---

## Conclusão

Este roteiro fornece um guia completo para conduzir sessões de mapeamento de tokens com times de Design e Marketing. Seguindo este processo, você pode:

- **Extrair efetivamente** informações da marca
- **Documentar decisões** claramente
- **Lidar com customizações** apropriadamente
- **Validar escolhas** completamente
- **Implementar temas** com sucesso

Lembre-se: O objetivo é criar um tema que represente com precisão a marca enquanto mantém consistência do sistema e padrões de acessibilidade.

Para recursos adicionais:
- **Guia do Designer** (`#08 Theme Engine - Guia do Designer.md`): Entendendo o sistema da perspectiva de um designer
- **Referência Técnica** (`#05 Theme Engine - Technical Reference.md`): Detalhes de implementação técnica
- **Boas Práticas de Override** (`dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md`): Guia avançado de customização

---

*Última atualização: Janeiro 2026*
