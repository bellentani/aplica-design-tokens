# Aplica Theme Engine - Token Mapping Roadmap

> **A comprehensive guide for conducting token mapping sessions with Design and Marketing teams**

## Table of Contents

1. [Introduction & Context](#introduction--context)
2. [Preparing for Work Sessions](#preparing-for-work-sessions)
3. [How to Conduct Conversations and Workshops](#how-to-conduct-conversations-and-workshops)
4. [Complete Brand Properties Checklist](#complete-brand-properties-checklist)
5. [Mapping Brand Colors](#mapping-brand-colors)
6. [Mapping Action Colors](#mapping-action-colors)
7. [Mapping Feedback Colors](#mapping-feedback-colors)
8. [Mapping Product Colors](#mapping-product-colors)
9. [Mapping Typography](#mapping-typography)
10. [Mapping Shadows (Elevation)](#mapping-shadows-elevation)
11. [Mapping Spacing (Dimension)](#mapping-spacing-dimension)
12. [Mapping Borders](#mapping-borders)
13. [Mapping Opacity](#mapping-opacity)
14. [Mapping Depth/Spread](#mapping-depthspread)
15. [Customizations and Overrides](#customizations-and-overrides)
16. [Configuration Decisions](#configuration-decisions)
17. [Data Collection and Documentation Template](#data-collection-and-documentation-template)
18. [Complete Examples by Theme](#complete-examples-by-theme)
19. [Validation and Discussion Process](#validation-and-discussion-process)
20. [Next Steps and Implementation](#next-steps-and-implementation)

---

## Introduction & Context

### Purpose of This Documentation

This document serves as a **permanent reference** for teams working with the Aplica Theme Engine. It explains:

- How to understand the token system and its capabilities
- How to conduct conversations and workshops with designers and marketing teams
- How to extract specific information (custom colors, fonts, sizes)
- How to document decisions and customizations
- How to adapt the system when necessary (using overrides, customizations)
- How to validate and iterate on choices

### Who Is This For?

- **Designers**: Understanding what information needs to be provided and how to communicate design decisions
- **Marketing Teams**: Learning how brand colors and typography choices translate into the system
- **Developers**: Understanding how to extract and document information from design sessions
- **Product Teams**: Learning the process of theme creation and customization

### Why We Need Token Mapping

Creating a theme requires extracting specific brand properties from design systems, style guides, and team discussions. Designers and marketing teams often have:

- Specific color requirements that may not match standard systems
- Custom font families with varying weight availability
- Specific size requirements for spacing and typography
- Brand guidelines that need to be translated into technical tokens

This roadmap guides you through the process of:
1. **Understanding** what information is needed
2. **Extracting** that information through effective conversations
3. **Documenting** decisions and justifications
4. **Adapting** the system to accommodate specific requirements

### How to Use This Documentation

- **Before a session**: Review the preparation section and relevant mapping sections
- **During a session**: Use the checklists and conversation guides
- **After a session**: Use the documentation template to organize collected information
- **For customizations**: Refer to the overrides and personalization sections

---

## Preparing for Work Sessions

### Required Materials

Before scheduling a token mapping session, ensure you have access to:

- **Figma files** or design system documentation
- **Brand style guide** or brand book
- **Color palette** (if available separately)
- **Typography specifications** (font families, weights, sizes)
- **Existing design tokens** (if migrating from another system)
- **Access to design team** members who understand the brand identity
- **Access to marketing team** members who can provide brand guidelines

### Scheduling and Structure

#### Who Should Participate?

- **Required**: 
  - At least one designer familiar with the brand
  - Developer/technical lead who will implement the theme
- **Recommended**:
  - Marketing/brand manager
  - Product owner (for product-specific colors)
  - UX lead (for accessibility considerations)

#### Suggested Duration

- **Initial session**: 2-3 hours
- **Follow-up sessions**: 1-2 hours (for validation and adjustments)
- **Total time**: 4-6 hours across multiple sessions

#### Suggested Agenda

**Session 1: Discovery (2-3 hours)**
- Introduction and context (15 min)
- Brand colors mapping (45 min)
- Action and feedback colors (30 min)
- Typography discussion (30 min)
- Break (15 min)
- Shadows, spacing, and borders (30 min)
- Configuration decisions (15 min)
- Wrap-up and next steps (15 min)

**Session 2: Validation (1-2 hours)**
- Review collected information (30 min)
- Test generated theme (30 min)
- Discuss customizations needed (30 min)
- Finalize decisions (30 min)

### Documentation Tools

Prepare these tools before the session:

- **Checklist template** (printed or digital)
- **Note-taking tool** (Google Docs, Notion, or similar)
- **Color picker tool** (for extracting colors from Figma)
- **Screen sharing** (for collaborative review)
- **Template document** (for structured data collection)

---

## How to Conduct Conversations and Workshops

### Facilitation Techniques

#### 1. Start with Open Questions

Begin with broad questions to understand the overall brand identity:

- "What three words would you use to describe your brand?"
- "What colors best represent your brand identity?"
- "What feeling should users have when they see your brand?"

#### 2. Use Visual References

- Show examples from existing themes (aplica_joy, aplica_grinch, theme_engine)
- Use color wheels or palette tools
- Reference Figma designs or style guides

#### 3. Document in Real-Time

- Take notes during the conversation
- Capture both decisions and justifications
- Note any concerns or questions that arise

#### 4. Validate Understanding

- Repeat back what you understood
- Ask clarifying questions
- Confirm decisions before moving on

### Key Questions by Category

Each mapping section below includes specific questions to ask. Here are general principles:

**For Colors:**
- "What is the primary color that represents your brand?"
- "Do you have specific hex codes, or should we extract from Figma?"
- "Are there any colors that must be exact, or can we generate variations?"

**For Typography:**
- "What fonts are currently used in your designs?"
- "Do you have all font weights available, or are some missing?"
- "Are there specific size requirements that differ from standard scales?"

**For Customizations:**
- "Are there any design elements that don't fit the standard system?"
- "What specific requirements do you have that might need overrides?"

### Handling Specific Requests

#### Scenario: "We want a specific color that's not in the system"

**Response:**
- "That's fine! We can use the override system to specify exact colors."
- "Let's document this as a customization and note why it's needed."
- "We'll validate accessibility automatically when we implement it."

**Documentation:**
```markdown
Custom Color: #FF5733
Reason: Brand guideline requirement
Location: Primary brand color
Accessibility: To be validated
```

#### Scenario: "Our font doesn't have all the required weights"

**Response:**
- "No problem! We can map available weights to the semantic weights needed."
- "For example, if you don't have Light (300), we can use Regular (400) as a substitute."
- "Let's document which weights map to which semantic weights."

**Example:**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }, // No Light available
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  // ... rest of weights
}
```

#### Scenario: "We need different sizes than the standard scale"

**Response:**
- "We can customize font sizes, spacing, and border radii."
- "Let's identify which sizes need to be different and document them."
- "We'll use overrides or custom configuration for these."

### Explaining System Limitations and Possibilities

**What the system can do:**
- Automatically generate 19 color intensity levels from a base color
- Create light and dark mode variations
- Generate accessible text colors (txtOn) automatically
- Validate contrast ratios (WCAG AA/AAA)
- Support custom fonts with weight mapping
- Allow overrides for specific requirements

**What requires customization:**
- Exact brand colors that don't fit automatic generation
- Fonts with missing weights (requires mapping)
- Custom spacing scales
- Specific border radius values
- Custom opacity levels

### Example Dialogues

#### Dialogue 1: Extracting Brand Colors

**Facilitator:** "Let's start with your brand colors. What's the primary color that represents your brand?"

**Designer:** "We use a vibrant pink, #E7398A."

**Facilitator:** "Great! Is this used for primary actions like buttons, or is it more for branding elements?"

**Designer:** "It's our main brand color, used in logos and key branding elements."

**Facilitator:** "Perfect. So we'll map this as `first` in the brand colors. Do you have secondary and tertiary brand colors?"

**Designer:** "Yes, we have a blue (#38C2D0) and a purple (#8F58BD)."

**Facilitator:** "Excellent. So we have:
- Primary (first): #E7398A - joy_pink
- Secondary (second): #38C2D0 - joy_blue  
- Tertiary (third): #8F58BD - joy_purple

The system will automatically generate lighter and darker variations of these for different use cases. Does that work for you?"

**Designer:** "Yes, that sounds good!"

**Facilitator:** "Great! I'm documenting this. Any concerns or specific requirements for these colors?"

#### Dialogue 2: Handling Missing Font Weights

**Facilitator:** "Now let's talk about typography. What font do you use for headlines?"

**Designer:** "We use Sansita for display text."

**Facilitator:** "Perfect. Does Sansita have all the weights: Light (300), Regular (400), SemiBold (600), Bold (700), and Black (900)?"

**Designer:** "Actually, Sansita doesn't have a Light weight. It starts at Regular."

**Facilitator:** "No problem! We can map the Light semantic weight to Regular. So when the system needs Light, it will use Regular (400) instead. Does Sansita have Bold and Black?"

**Designer:** "Yes, it has Regular, Bold, ExtraBold, and Black."

**Facilitator:** "Perfect! So we'll map:
- Light → Regular (400)
- Regular → Regular (400)
- SemiBold → Bold (700)
- Bold → ExtraBold (800)
- Black → Black (900)

I'm documenting this mapping. This is a common scenario and the system handles it well."

---

## Complete Brand Properties Checklist

Use this checklist during your mapping session. Check off items as you collect information.

### Brand Colors

- [ ] Primary color (first): `_______________` (Hex: `#______`)
- [ ] Secondary color (second): `_______________` (Hex: `#______`)
- [ ] Tertiary color (third): `_______________` (Hex: `#______`)
- [ ] Quaternary color (fourth - optional; extend schema/config when using N brand colors): `_______________` (Hex: `#______`)

### Action Colors

- [ ] Primary button color: `_______________` (Hex: `#______`)
- [ ] Secondary button color: `_______________` (Hex: `#______`)
- [ ] Link color: `_______________` (Hex: `#______`)

### Feedback Colors

- [ ] Info (default): `_______________` (Hex: `#______`)
- [ ] Info (secondary): `_______________` (Hex: `#______`)
- [ ] Success (default): `_______________` (Hex: `#______`)
- [ ] Success (secondary): `_______________` (Hex: `#______`)
- [ ] Warning (default): `_______________` (Hex: `#______`)
- [ ] Warning (secondary): `_______________` (Hex: `#______`)
- [ ] Danger (default): `_______________` (Hex: `#______`)
- [ ] Danger (secondary): `_______________` (Hex: `#______`)

### Product Colors

- [ ] Promo (default): `_______________` (Hex: `#______`)
- [ ] Promo (secondary): `_______________` (Hex: `#______`)
- [ ] Cashback (default): `_______________` (Hex: `#______`)
- [ ] Cashback (secondary): `_______________` (Hex: `#______`)
- [ ] Premium (default): `_______________` (Hex: `#______`)
- [ ] Premium (secondary): `_______________` (Hex: `#______`)

### Typography

- [ ] Main font family: `_______________`
- [ ] Content font family: `_______________`
- [ ] Display font family: `_______________`
- [ ] Code font family: `_______________`

**Font Weights Available:**
- [ ] Main font weights: `_______________`
- [ ] Content font weights: `_______________`
- [ ] Display font weights: `_______________`
- [ ] Code font weights: `_______________`

**Custom Typography (if applicable):**
- [ ] Custom font sizes: `_______________`
- [ ] Custom line heights: `_______________`
- [ ] Custom letter spacing: `_______________`

### Shadows (Elevation)

- [ ] Level -1 (inner shadow): x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 0: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 1: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 2: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 3: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 4: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 5: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`
- [ ] Level 6: x: `___`, y: `___`, blur: `___`, spread: `___`, type: `______`

**Note:** Properties include: x (horizontal offset), y (vertical offset), blur (blur radius), spread (spread radius), type (dropShadow/innerShadow), color (shadow color)

### Spacing (Dimension)

- [ ] Base spacing unit: `_______________` (px/rem/etc.)
- [ ] Custom semantic values (if any): `_______________`
- [ ] Spacing scale preference: [ ] Standard [ ] Custom

### Borders

- [ ] Default border radius: `_______________` (px)
- [ ] Border radius variations: micro: `___`, small: `___`, medium: `___`, large: `___`, etc.
- [ ] Default border width: `_______________` (px)

### Opacity

- [ ] Custom opacity levels (if any): `_______________`
- [ ] Opacity for shadows: `_______________`
- [ ] Opacity for overlays: `_______________`

### Configuration Options

- [ ] Contrast strategy: [ ] high-contrast [ ] brand-tint
- [ ] Dark mode saturation: `_______________` (0.7-1.0, default: 0.85)
- [ ] Accessibility level: [ ] AA (4.5:1) [ ] AAA (7:1)
- [ ] Include primitives: [ ] Yes [ ] No
- [ ] Generate UI tokens: [ ] Yes [ ] No

### Customizations and Overrides

- [ ] Custom colors requiring overrides: `_______________`
- [ ] Custom neutrals: `_______________`
- [ ] Custom grayscale: `_______________`
- [ ] Other customizations: `_______________`

---

## Mapping Brand Colors

### Understanding Brand Colors

Brand colors are the core identity colors of your brand. They are mapped to:
- `first` - Primary brand color
- `second` - Secondary brand color
- `third` - Tertiary brand color
- `fourth` - Quaternary brand color (optional; extend schema/config when using N brand colors)

### How to Identify Brand Colors

**Questions to Ask:**
- "What is the primary color that represents your brand identity?"
- "What colors appear in your logo?"
- "What colors are used in your main marketing materials?"
- "Are there secondary or accent colors that are part of your brand identity?"

### Extracting Colors from Figma

1. Open your Figma design file
2. Select the element with the brand color
3. Use the color picker to get the hex code
4. Verify the color name in your design system
5. Document both the hex code and the color name

### Examples from Existing Themes

| Theme | Primary (first) | Secondary (second) | Tertiary (third) | Characteristics |
|-------|----------------|-------------------|------------------|-----------------|
| **aplica_joy** | `joy_pink: #E7398A` | `joy_blue: #38C2D0` | `joy_purple: #8F58BD` | Vibrant, playful |
| **aplica_grinch** | `grinch_moss: #58BD59` | `grinch_christmas: #EA323C` | `grinch_golden: #FFA833` | Nature-inspired, green tones |
| **theme_engine** | `brand_primary: #265ED9` | `brand_secondary: #FECB01` | `brand_accent: #8952E0` | Neutral, professional |

### What Gets Generated

From each brand color, the system automatically generates:

- **7 intensity levels**: lowest, lower, low, default, high, higher, highest
- **19 palette levels**: Full color decomposition (10-190)
- **Light and dark mode versions**: Automatic adaptation
- **Text colors (txtOn)**: Accessible text colors for each background
- **Border colors**: Appropriate border colors for each level

**Example:** If you define `joy_pink: '#E7398A'`:
- The system creates 7 intensity variations
- Generates 19 palette levels (surface, txtOn, border)
- Creates light and dark mode versions
- Ensures WCAG AA/AAA contrast compliance

### Conversation Guide

**Opening:**
- "Let's start with your brand colors. These are the core colors that represent your brand identity."

**Extracting Information:**
- "What's your primary brand color? Do you have the hex code?"
- "Is this color used in your logo or main branding?"
- "Do you have secondary or accent colors?"

**Validating:**
- "So we have [color1] as primary, [color2] as secondary, [color3] as tertiary. The system will automatically generate lighter and darker variations. Does that work for you?"

**Documenting:**
```markdown
Brand Colors:
- Primary (first): joy_pink - #E7398A
- Secondary (second): joy_blue - #38C2D0
- Tertiary (third): joy_purple - #8F58BD
```

---

## Mapping Action Colors

### Understanding Action Colors

Action colors are used for interactive elements:
- **Primary**: Main call-to-action buttons
- **Secondary**: Secondary buttons or less prominent actions
- **Link**: Text links and hyperlinks

### How to Identify Action Colors

**Questions to Ask:**
- "What color do you use for primary buttons or main CTAs?"
- "What color indicates clickable links?"
- "Do you have a different color for secondary actions?"

### Examples from Existing Themes

| Theme | Primary | Secondary | Link |
|-------|---------|-----------|------|
| **aplica_joy** | `action_magenta: #C40145` | `action_cyan: #1872A6` | `link_pink: #FF0F80` |
| **aplica_grinch** | `action_grinch: #418B43` | `action_christmas: #AD3E25` | `link_week: #C09E72` |
| **theme_engine** | `action_primary: #013FC4` | `action_secondary: #A68A18` | `action_link: #5000D1` |

### Design Decisions and Implications

**Primary Action Color:**
- Usually matches or complements the primary brand color
- Should have sufficient contrast for white or light text
- Used for main CTAs, primary buttons, important actions

**Secondary Action Color:**
- Often a neutral or complementary color
- Used for secondary buttons, less prominent actions
- Should still be clearly actionable

**Link Color:**
- Typically darker or more saturated than primary
- Must meet accessibility contrast requirements
- Used for text links, navigation elements

### Conversation Guide

**Opening:**
- "Now let's talk about interactive elements. What colors do you use for buttons and links?"

**Extracting Information:**
- "What color are your primary buttons?"
- "Do you have a different color for secondary buttons?"
- "What color do you use for text links?"

**Validating:**
- "So primary actions use [color], secondary actions use [color], and links use [color]. These will be used for all interactive elements. Does that align with your design system?"

---

## Mapping Feedback Colors

### Understanding Feedback Colors

Feedback colors communicate system status:
- **Info**: Informational messages (default = lighter, secondary = more saturated)
- **Success**: Success messages and confirmations
- **Warning**: Warning messages and cautions
- **Danger**: Error messages and destructive actions

Each has two variants:
- **Default**: Lighter, more subtle version
- **Secondary**: More saturated, prominent version

### How to Identify Feedback Colors

**Questions to Ask:**
- "What colors do you use for success messages?"
- "What color indicates errors or warnings?"
- "Do you have different shades for subtle vs prominent feedback?"

### Examples from Existing Themes

| Theme | Info (default/secondary) | Success (default/secondary) | Warning (default/secondary) | Danger (default/secondary) |
|-------|-------------------------|----------------------------|----------------------------|---------------------------|
| **aplica_joy** | `#CBF6ED` / `#A5E7D9` | `#D7F6CB` / `#86C46D` | `#FEE6C2` / `#FDB750` | `#F9C8C8` / `#EE5A5A` |
| **aplica_grinch** | `#A5E7D9` / `#46CEB1` | `#E7A6C5` / `#CE4685` | `#E7CDA6` / `#E59B2E` | `#021802` / `#E5EBE5` |
| **theme_engine** | `#02D9FF` / `#46B9CE` | `#00AD26` / `#228137` | `#FF9A00` / `#C18933` | `#F53232` / `#C43B3B` |

### Difference Between Default and Secondary

- **Default**: Lighter, more subtle - used for backgrounds, subtle indicators
- **Secondary**: More saturated - used for borders, icons, prominent indicators

### Conversation Guide

**Opening:**
- "Let's discuss feedback colors - these are used for success messages, errors, warnings, and info messages."

**Extracting Information:**
- "What color do you use for success messages?"
- "What color indicates errors?"
- "Do you have lighter and darker versions of these colors?"

**Validating:**
- "So we have [color1] for success, [color2] for errors, [color3] for warnings, [color4] for info. We'll use lighter versions for backgrounds and more saturated versions for borders and icons. Does that match your design system?"

---

## Mapping Product Colors

### Understanding Product Colors

Product colors are domain-specific feature colors:
- **Promo**: Promotions, sales, special offers
- **Cashback**: Rewards, cashback features
- **Premium**: Premium features, exclusive content

Each has two variants (default and secondary), similar to feedback colors.

### How to Identify Product Colors

**Questions to Ask:**
- "Do you have specific colors for promotional content?"
- "What color represents rewards or cashback features?"
- "Is there a color for premium or exclusive features?"

### Examples from Existing Themes

| Theme | Promo (default/secondary) | Cashback (default/secondary) | Premium (default/secondary) |
|-------|--------------------------|----------------------------|---------------------------|
| **aplica_joy** | `#E3F6CC` / `#AEE071` | `#FCE0D4` / `#FEA680` | `#ECE2E9` / `#B200AF` |
| **aplica_grinch** | `#E3F6CC` / `#AEE071` | `#FCE7D4` / `#E0A671` | `#E2E8EC` / `#71ADE0` |
| **theme_engine** | `#6BC200` / `#D2FD9D` | `#FFBB00` / `#FFF94F` | `#B200AF` / `#EBC2DD` |

### Conversation Guide

**Opening:**
- "Now let's talk about product-specific colors. These are used for features like promotions, rewards, and premium content."

**Extracting Information:**
- "Do you have specific colors for promotional banners or sales?"
- "What color represents cashback or rewards?"
- "Is there a color for premium features?"

**Note:** If product colors aren't defined, you can skip this section or use brand colors as placeholders.

---

## Mapping Typography

### Understanding Typography System

The typography system includes:
- **Font Families**: main, content, display, code
- **Font Weights**: light (300), regular (400), semibold (600), bold (700), black (900)
- **Font Sizes**: micro (10px) to exa (60px)
- **Line Heights**: tight, close, regular, loose, wild
- **Letter Spacing**: tight, regular, wild

### Font Families

**Main**: Used for UI elements, buttons, labels
**Content**: Used for body text, paragraphs
**Display**: Used for headlines, titles
**Code**: Used for code blocks, monospace text

### How to Identify Font Families

**Questions to Ask:**
- "What font do you use for body text?"
- "What font is used for headlines?"
- "Do you have a specific font for code or monospace text?"
- "Are these fonts available in your design system or Figma?"

### Font Weights

The system requires 5 semantic weights:
- **light** (300)
- **regular** (400)
- **semibold** (600)
- **bold** (700)
- **black** (900)

**Important:** If a font doesn't have an exact weight, you must map an available weight to the semantic weight.

### Examples of Weight Mapping

**Example 1: Font with all weights (Roboto)**
```javascript
main: {
  light: { normal: 'Light', italic: 'Light Italic', numeric: 300 },
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'SemiBold', italic: 'SemiBold Italic', numeric: 600 },
  bold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 },
  black: { normal: 'Black', italic: 'Black Italic', numeric: 900 }
}
```

**Example 2: Font without Light weight (Sansita)**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }, // No Light, using Regular
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 }, // No SemiBold, using Bold
  bold: { normal: 'ExtraBold', italic: 'ExtraBold Italic', numeric: 800 },
  black: { normal: 'Black', italic: 'Black Italic', numeric: 900 }
}
```

**Example 3: Font without Black weight (IBM Plex Mono)**
```javascript
code: {
  light: { normal: 'Light', italic: 'Light Italic', numeric: 300 },
  regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
  semibold: { normal: 'SemiBold', italic: 'SemiBold Italic', numeric: 600 },
  bold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 },
  black: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 } // No Black, using Bold
}
```

### Font Sizes

Default font sizes:
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

**Custom Sizes:** If you need different sizes, document them for override configuration.

### Line Heights

Line heights are organized by "tightness":
- **tight**: Compact line spacing
- **close**: Slightly more spacing
- **regular**: Standard spacing
- **loose**: More generous spacing
- **wild**: Maximum spacing

Each line height has values for each font size.

### Letter Spacing

- **tight**: -0.72px (compact)
- **regular**: 0px (default)
- **wild**: 0.8px (expanded)

### Conversation Guide

**Opening:**
- "Let's discuss typography. We need to know about your font families and available weights."

**Extracting Information:**
- "What fonts do you use? Main font for UI, content font for body text, display font for headlines?"
- "Do you have all font weights available: Light (300), Regular (400), SemiBold (600), Bold (700), Black (900)?"
- "If any weights are missing, which available weight should we use instead?"

**Handling Missing Weights:**
- "I see [font] doesn't have Light. We can map Light to Regular (400). Does that work?"
- "For weights that don't exist, we'll use the closest available weight. Let's document this mapping."

**Documenting:**
```markdown
Typography:
- Main: Roboto (all weights available)
- Content: Roboto (all weights available)
- Display: Sansita (no Light, mapping Light→Regular, no SemiBold, mapping SemiBold→Bold)
- Code: IBM Plex Mono (no Black, mapping Black→Bold)
```

---

## Mapping Shadows (Elevation)

### Understanding the Elevation System

The elevation system defines shadow styles for different depth levels:
- **level_minus_one**: Inner shadow (inset)
- **level_zero**: No shadow (flat)
- **level_one** through **level_six**: Increasing depth

### Shadow Properties

Each shadow has:
- **x**: Horizontal offset (usually 0)
- **y**: Vertical offset (increases with level)
- **blur**: Blur radius (increases with level)
- **spread**: Spread radius (negative values create tighter shadows)
- **type**: `dropShadow` or `innerShadow`
- **color**: Shadow color (usually uses opacity tokens)

### Default Elevation Levels

| Level | x | y | blur | spread | type | Description |
|-------|---|---|------|--------|------|-------------|
| level_minus_one | 0 | 0 | micro | close | innerShadow | Inset shadow |
| level_zero | 0 | 0 | zero | close | dropShadow | Flat, no shadow |
| level_one | 0 | nano | small | next | dropShadow | Subtle elevation |
| level_two | 0 | nano | large | next | dropShadow | Medium elevation |
| level_three | 0 | micro | extraLarge | near | dropShadow | High elevation |
| level_four | 0 | extraSmall | mega | near | dropShadow | Very high elevation |
| level_five | 0 | small | giga | distant | dropShadow | Maximum elevation |
| level_six | 0 | large | giga | distant | dropShadow | Extreme elevation |

### How to Extract Shadows from Figma

1. Select an element with a shadow
2. Check the Effects panel
3. Note the values:
   - X and Y offset
   - Blur radius
   - Spread radius
   - Color and opacity
4. Map to the closest elevation level

### Conversation Guide

**Opening:**
- "Let's discuss shadows and elevation. These define how elements appear to float above the surface."

**Extracting Information:**
- "Do you have a standard shadow system in your design?"
- "Can you show me examples of different elevation levels?"
- "Are there specific shadow values we should use?"

**Note:** If shadows aren't explicitly defined, you can use the default system and adjust later if needed.

---

## Mapping Spacing (Dimension)

### Understanding the Spacing System

The spacing system has two parts:
- **Primitive scale**: Numeric values from 0 to 1600 (e.g., 0px, 2px, 4px, 8px... up to 128px)
- **Semantic values**: Human-readable names (zero, pico, nano, micro, extraSmall, small, medium, large, extraLarge, mega, giga, tera, peta)

### Primitive Scale

The scale uses a base unit system:
- 0px (zero)
- 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px (base unit)
- Continues up to 128px

### Semantic Values

| Semantic Name | Value | Usage |
|---------------|-------|-------|
| zero | 0px | Remove spacing |
| pico | 1px | Minimal spacing |
| nano | 2px | Tiny spacing |
| micro | 4px | Very small spacing |
| extraSmall | 8px | Base unit |
| small | 12px | Small components |
| medium | 16px | Default spacing |
| large | 20px | Generous spacing |
| extraLarge | 24px | Major spacing |
| mega | 28px | Large components |
| giga | 44px | Touch target size |
| tera | 72px | Hero sections |
| peta | 116px | Maximum spacing |

### When to Use Primitives vs Semantics

- **Use primitives** for direct pixel values in components
- **Use semantics** for documentation and foundation contexts
- **Semantic values reference primitives** (e.g., `medium` = `{dimension.scale.200}` = 16px)

### Conversation Guide

**Opening:**
- "Let's discuss spacing. The system has a standard scale, but we can customize if needed."

**Extracting Information:**
- "Do you use a standard spacing scale in your designs?"
- "What's your base spacing unit? (usually 4px, 8px, or 16px)"
- "Are there specific spacing values that differ from the standard?"

**Note:** Most themes use the standard scale. Custom spacing is rare but possible.

---

## Mapping Borders

### Understanding Border System

Borders include:
- **Border Radius**: Corner rounding (straight, micro, small, medium, large, extraLarge, mega, circular)
- **Border Width**: Border thickness (none, small, medium, large, extraLarge)

### Border Radius Values

| Name | Value | Usage |
|------|-------|-------|
| straight | 0px | Sharp corners |
| micro | 2px | Minimal rounding |
| extraSmall | 4px | Small rounding |
| small | 8px | Standard rounding |
| medium | 12px | Medium rounding |
| large | 16px | Large rounding |
| extraLarge | 20px | Very large rounding |
| mega | 24px | Maximum rounding |
| circular | 1000px | Fully rounded (pills, circles) |

### Border Width Values

| Name | Value | Usage |
|------|-------|-------|
| none | 0px | No border |
| small | 1px | Thin border |
| medium | 2px | Standard border |
| large | 4px | Thick border |
| extraLarge | 8px | Very thick border |

### Conversation Guide

**Opening:**
- "Let's discuss borders - corner radius and border width."

**Extracting Information:**
- "What's your standard border radius? (e.g., 8px, 12px)"
- "Do you have different radius values for different components?"
- "What border widths do you use?"

**Note:** Borders typically use standard values. Custom values can be configured if needed.

---

## Mapping Opacity

### Understanding the Opacity System

The opacity system has two parts:
- **Raw opacity values**: 0, 10, 20, 50, 80, 90, 100
- **Semantic opacity names**: transparent, superTransparent, semiTranslucid, translucid, superTranslucid, semiOpaque, opaque

### Opacity Levels

| Semantic Name | Raw Value | Usage |
|---------------|-----------|-------|
| transparent | 0 | Fully transparent |
| superTransparent | 10 | Very transparent |
| semiTranslucid | 20 | Mostly transparent |
| translucid | 50 | Semi-transparent |
| superTranslucid | 80 | Mostly opaque |
| semiOpaque | 90 | Nearly opaque |
| opaque | 100 | Fully opaque |

### Opacity for Colors

Opacity can be applied to:
- **Grayscale colors**: For shadows and overlays
- **Light colors**: For light mode specific effects

### Conversation Guide

**Opening:**
- "Let's discuss opacity - this affects shadows, overlays, and transparency effects."

**Extracting Information:**
- "Do you have specific opacity requirements for shadows or overlays?"
- "Are there transparency effects in your design system?"

**Note:** Most themes use the standard opacity system. Custom values are rare.

---

## Mapping Depth/Spread

### Understanding Depth/Spread

Depth/spread values control shadow spread:
- **close**: 0 (no spread)
- **next**: -2 (slight inward spread)
- **near**: -4 (moderate inward spread)
- **distant**: -8 (significant inward spread)
- **far**: -12 (maximum inward spread)

Negative values create tighter, more focused shadows.

### How It Affects Shadows

- **close (0)**: Shadow spreads normally
- **next (-2)**: Shadow slightly tighter
- **near (-4)**: Shadow moderately tighter
- **distant (-8)**: Shadow significantly tighter
- **far (-12)**: Shadow very tight, focused

### Conversation Guide

**Note:** Depth/spread is typically handled automatically by the system. Custom values are rarely needed unless you have specific shadow requirements.

---

## Customizations and Overrides

### When to Use Customizations

Use customizations when:
- Exact brand colors don't fit automatic generation
- Specific color levels need fine-tuning
- Font weights need special mapping
- Custom spacing or border values are required
- Existing design systems need to be maintained

### How to Document Customizations

Always document:
1. **What** is being customized
2. **Why** it's needed
3. **How** it's implemented
4. **Accessibility impact** (if applicable)

### Override System

The system supports four types of overrides:

#### 1. Neutrals Overrides

Override neutral colors for specific brand colors:

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

Or manual override:

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

#### 2. Grayscale Override

Override the grayscale palette:

```javascript
overrides: {
  grayscale: {
    surface: { '5': '#faf8f5', '140': '#1a1814' }
  }
}
```

#### 3. Brand Token Override

Override specific brand token values:

```javascript
overrides: {
  brand: {
    theme: {
      color: {
        light: { /* _brand.json structure */ }
      }
    }
  }
}
```

#### 4. Interface function active override

Override the **active** state for all interface function colors (primary, secondary, link). When **string (hex)**: generator sets surface = hex, txtOn = black or white by WCAG contrast (AA/AAA from config), border = surface darkened ~20%. When **object** `{ surface, txtOn?, border? }`, uses given values with fallback. See `docs/override-interface-active.md`.

```javascript
overrides: {
  interface: {
    function: { active: '#0067FF' }
  }
}
```

### Accessibility Validation

**Important:** All manual `txtOn` overrides are automatically validated for WCAG contrast compliance:
- **AA level**: 4.5:1 contrast ratio (default)
- **AAA level**: 7:1 contrast ratio (if configured)

The system will:
- ✅ Show warnings if contrast fails
- ✅ Suggest accessible alternatives
- ✅ Document validation status in metadata

### Handling Specific Requests

#### Request: "We need this exact color #FF5733"

**Response:**
- "We can use an override to specify the exact color."
- "Let's document why this exact color is needed."
- "The system will validate accessibility automatically."

**Documentation:**
```markdown
Custom Color Override:
- Color: #FF5733
- Location: Primary brand color
- Reason: Brand guideline requirement
- Accessibility: To be validated
```

#### Request: "Our font doesn't have Light weight"

**Response:**
- "We'll map Light to Regular (400)."
- "This is a common scenario and works well."
- "Let's document this mapping."

**Implementation:**
```javascript
display: {
  light: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 }
}
```

### Best Practices for Customizations

1. **Document everything**: Always note why a customization is needed
2. **Validate accessibility**: Ensure custom colors meet contrast requirements
3. **Test thoroughly**: Verify customizations work in both light and dark modes
4. **Keep it minimal**: Only customize what's necessary
5. **Review regularly**: Revisit customizations to see if they're still needed

### Conversation Guide

**Opening:**
- "Are there any specific requirements that don't fit the standard system?"

**Extracting Information:**
- "Do you have exact brand colors that must be used?"
- "Are there any design elements that need special handling?"
- "What customizations might be needed?"

**Documenting:**
- "Let's document this as a customization with the reason."
- "We'll implement this using the override system."
- "The system will validate accessibility automatically."

---

## Configuration Decisions

### Contrast Strategy

**Options:**
- **high-contrast**: Text is always black or white (maximum readability)
- **brand-tint**: Text uses closest palette color that passes WCAG (maintains brand tone)

**When to use:**
- **high-contrast**: Maximum accessibility, professional applications
- **brand-tint**: Brand consistency, more expressive designs

**Examples:**
- `theme_engine`: Uses `high-contrast` (professional, maximum readability)
- `aplica_joy`: Uses `brand-tint` (playful, maintains brand colors)

### Dark Mode Saturation

**Options:**
- **1.0**: Same saturation as light mode (vibrant)
- **0.85**: 15% less saturated (default, easier on eyes)
- **0.7**: 30% less saturated (very muted)

**Recommendation:** Use 0.85 (default) unless you have specific requirements.

### Accessibility Level

**Options:**
- **AA (4.5:1)**: Industry standard minimum (default)
- **AAA (7:1)**: Enhanced accessibility for better readability

**When to use:**
- **AA**: Most applications, standard compliance
- **AAA**: High accessibility requirements, better readability

**Examples:**
- `theme_engine`: Uses `AA` (standard compliance)
- `aplica_joy`: Uses `AAA` (enhanced accessibility)

### Include Primitives

**Options:**
- **true**: Generates `_primitive_theme.json` with all color decompositions
- **false**: Does not generate primitives, uses raw HEX values

**When to use:**
- **true**: Need full color palette access, Figma integration
- **false**: Reduce file size, faster processing

**Example:**
- `aplica_grinch`: Uses `false` (reduced file size)

### Generate UI Tokens

**Options:**
- **true**: Generates `_ui.json` with component tokens
- **false**: Does not generate UI tokens (default)

**When to use:**
- **true**: Need component-level tokens
- **false**: Standard theme generation

### Conversation Guide

**Opening:**
- "Now let's discuss some configuration options that affect how the theme is generated."

**Questions:**
- "For text on colored backgrounds, do you prefer maximum contrast (black/white) or brand-colored text?"
- "For dark mode, do you want the same saturation or slightly less saturated colors?"
- "What accessibility level do you need: AA (standard) or AAA (enhanced)?"

**Documenting:**
```markdown
Configuration:
- Contrast strategy: brand-tint
- Dark mode saturation: 0.85
- Accessibility level: AAA
- Include primitives: true
- Generate UI tokens: false
```

---

## Data Collection and Documentation Template

### During the Session

Use this template to collect information in real-time:

```markdown
# Theme Mapping Session: [Theme Name]
**Date:** [Date]
**Participants:** [Names]
**Facilitator:** [Name]

## Brand Colors
- Primary (first): [Name] - #[Hex]
- Secondary (second): [Name] - #[Hex]
- Tertiary (third): [Name] - #[Hex]

## Action Colors
- Primary: [Name] - #[Hex]
- Secondary: [Name] - #[Hex]
- Link: [Name] - #[Hex]

## Feedback Colors
- Info (default): [Name] - #[Hex]
- Info (secondary): [Name] - #[Hex]
- Success (default): [Name] - #[Hex]
- Success (secondary): [Name] - #[Hex]
- Warning (default): [Name] - #[Hex]
- Warning (secondary): [Name] - #[Hex]
- Danger (default): [Name] - #[Hex]
- Danger (secondary): [Name] - #[Hex]

## Product Colors
- Promo (default): [Name] - #[Hex]
- Promo (secondary): [Name] - #[Hex]
- Cashback (default): [Name] - #[Hex]
- Cashback (secondary): [Name] - #[Hex]
- Premium (default): [Name] - #[Hex]
- Premium (secondary): [Name] - #[Hex]

## Typography
- Main: [Font Name] (Weights: [List])
- Content: [Font Name] (Weights: [List])
- Display: [Font Name] (Weights: [List])
- Code: [Font Name] (Weights: [List])

**Weight Mappings (if any):**
- [Document any special mappings]

## Shadows
- [Document shadow levels if custom]

## Spacing
- Base unit: [Value]
- Custom values: [List if any]

## Borders
- Default radius: [Value]
- Custom values: [List if any]

## Configuration
- Contrast strategy: [high-contrast/brand-tint]
- Dark mode saturation: [Value]
- Accessibility level: [AA/AAA]
- Include primitives: [true/false]
- Generate UI tokens: [true/false]

## Customizations
- [List any customizations needed]
- [Document reasons for customizations]

## Decisions and Justifications
- [Note any important decisions and why they were made]
- [Document any concerns or questions raised]

## Next Steps
- [ ] Review collected information
- [ ] Generate initial theme
- [ ] Schedule validation session
- [ ] Implement customizations
```

### After the Session

1. **Organize the information** into the config file format
2. **Review with the team** to ensure accuracy
3. **Document customizations** with justifications
4. **Create the config file** (`.config.mjs`)
5. **Generate the theme** for validation

### Converting to Config File

Use the collected information to create a `.config.mjs` file:

```javascript
export default {
  name: 'theme_name',
  
  colors: {
    // All color definitions
  },
  
  mapping: {
    // All mappings
  },
  
  options: {
    // Configuration options
  },
  
  typography: {
    // Typography configuration
  },
  
  borders: {
    // Border configuration (if custom)
  },
  
  overrides: {
    // Any overrides needed
  }
};
```

---

## Complete Examples by Theme

### aplica_joy Theme

**Brand Identity:** Vibrant, playful, energetic

**Brand Colors:**
- Primary: `joy_pink: #E7398A`
- Secondary: `joy_blue: #38C2D0`
- Tertiary: `joy_purple: #8F58BD`

**Action Colors:**
- Primary: `action_magenta: #C40145`
- Secondary: `action_cyan: #1872A6`
- Link: `link_pink: #FF0F80`

**Feedback Colors:**
- Info: `#CBF6ED` / `#A5E7D9`
- Success: `#D7F6CB` / `#86C46D`
- Warning: `#FEE6C2` / `#FDB750`
- Danger: `#F9C8C8` / `#EE5A5A`

**Typography:**
- Main: Noto Sans (all weights)
- Content: Noto Sans (all weights)
- Display: Poppins (all weights)
- Code: IBM Plex Mono (Black mapped to Bold)

**Configuration:**
- Contrast: `brand-tint`
- Dark mode: `0.85`
- Accessibility: `AAA`
- Primitives: `true`

### aplica_grinch Theme

**Brand Identity:** Nature-inspired, green tones, vibrant

**Brand Colors:**
- Primary: `grinch_moss: #58BD59`
- Secondary: `grinch_christmas: #EA323C`
- Tertiary: `grinch_golden: #FFA833`

**Action Colors:**
- Primary: `action_grinch: #418B43`
- Secondary: `action_christmas: #AD3E25`
- Link: `link_week: #C09E72`

**Typography:**
- Main: Roboto (all weights)
- Content: Roboto (all weights)
- Display: Sansita (Light→Regular, SemiBold→Bold)
- Code: IBM Plex Mono (Black→Bold)

**Configuration:**
- Contrast: `brand-tint`
- Dark mode: `0.85`
- Accessibility: `AAA` (with bypass)
- Primitives: `false`

### theme_engine Theme

**Brand Identity:** Neutral, professional, versatile

**Brand Colors:**
- Primary: `brand_primary: #265ED9`
- Secondary: `brand_secondary: #FECB01`
- Tertiary: `brand_accent: #8952E0`

**Action Colors:**
- Primary: `action_primary: #013FC4`
- Secondary: `action_secondary: #A68A18`
- Link: `action_link: #5000D1`

**Typography:**
- Main: Roboto (all weights)
- Content: Roboto (all weights)
- Display: Sansita (Light→Regular, SemiBold→Bold)
- Code: IBM Plex Mono (Black→Bold)

**Configuration:**
- Contrast: `high-contrast`
- Dark mode: `0.85`
- Accessibility: `AA`
- Primitives: `true`

---

## Validation and Discussion Process

### How to Validate Choices

1. **Review collected information** with the team
2. **Generate initial theme** using the config file
3. **Test in both light and dark modes**
4. **Check accessibility** (contrast ratios)
5. **Compare with design system** (Figma, style guide)
6. **Gather feedback** from designers and stakeholders

### Reviewing Customizations

When reviewing customizations:
- **Verify necessity**: Is the customization really needed?
- **Check accessibility**: Do custom colors meet contrast requirements?
- **Test compatibility**: Do customizations work in all modes?
- **Document impact**: How do customizations affect the system?

### Accessibility Testing

The system automatically validates:
- **Text contrast**: txtOn colors vs background colors
- **WCAG compliance**: AA (4.5:1) or AAA (7:1) as configured
- **Warnings**: Shows issues with suggested fixes

**Manual checks:**
- Test with accessibility tools (e.g., axe, WAVE)
- Review in both light and dark modes
- Check with different font sizes

### Iterating on Feedback

1. **Collect feedback** from validation session
2. **Prioritize changes** (critical vs nice-to-have)
3. **Update config file** with changes
4. **Regenerate theme** and test
5. **Repeat** until approved

### Conversation Guide for Validation

**Opening:**
- "Let's review the generated theme and see how it matches your design system."

**Review Process:**
- "Does this look right in light mode?"
- "How does dark mode look?"
- "Are there any colors that need adjustment?"
- "Do the fonts look correct?"

**Handling Feedback:**
- "I see [issue]. We can fix this by [solution]."
- "Let's document this change and update the config."
- "We'll regenerate and test again."

---

## Next Steps and Implementation

### Converting Collected Data to Config File

1. **Organize information** from the session template
2. **Create `.config.mjs` file** in `dynamic-themes/configs/`
3. **Follow the structure** of existing config files
4. **Add comments** explaining decisions
5. **Test the config** syntax

### Generating the Theme

```bash
# Generate all themes
npm run themes:generate

# Or generate specific theme
node dynamic-themes/scripts/generate-all-themes.mjs [theme-name]
```

### Testing the Theme

1. **Check generated files** in `data/brand/[theme-name]/`
2. **Verify color palettes** are correct
3. **Test in both modes** (light/dark)
4. **Validate accessibility** (automatic + manual)
5. **Compare with design system**

### Updating Documentation

When changes are made:
1. **Update the config file** with changes
2. **Document the reason** for changes
3. **Update this roadmap** if process changes
4. **Share updates** with the team

### Versioning and Decision History

**Best practices:**
- **Version config files** in Git
- **Document decisions** in commit messages
- **Keep session notes** for reference
- **Maintain changelog** of customizations

### Getting Help

If you encounter issues:
1. **Review existing themes** for examples
2. **Check documentation** (this file, Designer Guide, Technical Reference)
3. **Consult the team** (designers, developers)
4. **Review override best practices** (`dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md`)

---

## Conclusion

This roadmap provides a comprehensive guide for conducting token mapping sessions with Design and Marketing teams. By following this process, you can:

- **Effectively extract** brand information
- **Document decisions** clearly
- **Handle customizations** appropriately
- **Validate choices** thoroughly
- **Implement themes** successfully

Remember: The goal is to create a theme that accurately represents the brand while maintaining system consistency and accessibility standards.

For additional resources:
- **Designer Guide** (`#08 Theme Engine - Designer Guide.md`): Understanding the system from a designer's perspective
- **Technical Reference** (`#05 Theme Engine - Technical Reference.md`): Technical implementation details
- **Override Best Practices** (`dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md`): Advanced customization guide

---

*Last updated: January 2026*
