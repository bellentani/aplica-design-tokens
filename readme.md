# Aplica Theme — Referência de Arquitetura de Design Tokens

![Design Tokens](https://img.shields.io/badge/Aplica%20Tokens-Tokens%20Studio%20%26%20Figma-blue)

Repositório de **referência** da arquitetura de Design Tokens (Aplica Theme) para estudo, treinamentos e uso como boilerplate no Figma. Material gratuito e open source; **não depende do Aplica Theme Engine** nem de scripts de geração — apenas a estrutura de tokens e a documentação.

---

## O que este repositório contém

- **`data/aplica-theme/`** — Tokens prontos (valores já resolvidos) para uso no [Tokens Studio](https://www.tokens.studio/) no Figma. Boilerplate para iniciar um Design System com arquitetura em camadas (foundation, semantic, surface, mode, dimension, brand).
- **`data/aplica-theme-with-extensions/`** — Mesma estrutura que `aplica-theme`, mas usando **Extensions do Tokens Studio** (ex.: dark mode por `modify`/mix). Útil para estudar cálculos e composição de tokens dentro do plugin.
- **`docs/`** — Documentação da arquitetura em português (pt-br) e inglês (en): camadas, semântica, escala, implementação e [estrutura do tema](docs/pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md).
- **`data/tokens-aplica-*.json`** — Gerações unificadas de tokens; documentação à parte (a ser detalhada depois).
- **`tokens-studio-model/`** — Modelo alternativo (nomenclatura brand/theme/joy, etc.); referência de uso de extensions, não a pasta padrão de consumo.

---

## Estrutura do projeto

```
├── data/
│   ├── aplica-theme/                    # Tokens resolvidos (Figma/Tokens Studio)
│   ├── aplica-theme-with-extensions/    # Mesma estrutura + Extensions (ex.: dark)
│   ├── tokens-aplica-boilerplate.json
│   └── tokens-aplica-default.json
├── docs/
│   ├── pt-br/                           # Documentação em português
│   └── en/                              # Documentação em inglês
├── tokens-studio-model/                 # Referência alternativa (extensions)
├── AI_CONTEXT.md                        # Contexto para agentes de IA
├── README.md
└── LICENSE
```

---

## Como usar no Figma

1. Instale o plugin [Tokens Studio](https://www.tokens.studio/) no Figma.
2. Clone este repositório ou baixe a pasta de dados desejada.
3. No Tokens Studio, **conecte** o projeto ao repositório ou importe uma das pastas:
   - **`data/aplica-theme`** — uso direto, todos os valores já calculados.
   - **`data/aplica-theme-with-extensions`** — mesmo tema, com dark mode e dimension gerados via Extensions no plugin.
4. Use os themes e modos (light/dark, positive/negative, marcas) conforme definido em `$themes.json` e na documentação.

Detalhes de implementação e fluxo de camadas: [Guia de Implementação](docs/pt-br/#04%20Aplica%20Theme%20Engine%20-%20Guia%20de%20Implementa%C3%A7%C3%A3o.md) (pt-br) / [Implementation Guide](docs/en/#04%20Aplica%20Theme%20Engine%20-%20Implementation%20Guide.md) (en).

---

## Público

- **Designers** e times que queiram estudar temas multidimensionais, escala, decisões centralizadas e usar como base sem o Aplica Theme Engine.
- **Cursos e treinamentos** em Design System: conceitos de Multidimensional Themes, Scale, Centralized Design System Decisions.
- Qualquer pessoa que queira evoluir o próprio Design System usando esta arquitetura como exemplo.

---

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [#01 Arquitetura Técnica Completa](docs/pt-br/#01%20Aplica%20Theme%20Engine%20-%20Arquitetura%20T%C3%A9cnica%20Completa.md) | Visão geral e 5 camadas |
| [#07 Estrutura do Tema](docs/pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md) | Árvore de arquivos e convenções |
| [#04 Guia de Implementação](docs/pt-br/#04%20Aplica%20Theme%20Engine%20-%20Guia%20de%20Implementa%C3%A7%C3%A3o.md) | Uso no Figma e consumo |
| [#05 Referência Técnica](docs/pt-br/#05%20Aplica%20Theme%20Engine%20-%20Refer%C3%AAncia%20T%C3%A9cnica.md) | Fórmulas, tipos de token, glossário |

Versões em inglês em `docs/en/`.

---

## Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Tokens Studio](https://www.tokens.studio/) for the Figma plugin and token format.
- Design systems and token management best practices that inspired this architecture.

## Contact

For questions or support, please open an issue on this repository.
