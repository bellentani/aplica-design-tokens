# Design Tokens Generator with Tokens Studio & Style Dictionary

![Design Tokens](https://img.shields.io/badge/Aplica%20Tokens-Studio%20Plugin%20%26%20Style%20Dictionary-green)

## Overview

This project aims to streamline the creation and management of design tokens using the [Tokens Studio](https://www.tokens.studio/) plugin for Figma, in conjunction with [Style Dictionary](https://amzn.github.io/style-dictionary/). By leveraging these tools, we automate the process of generating, organizing, and distributing design tokens across different platforms.

### What are Design Tokens?

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. These can include colors, typography, spacing, and more. They are used to ensure consistent design language across various platforms and products.

### Why Tokens Studio & Style Dictionary?

- **Tokens Studio** allows for easy creation and management of design tokens directly within Figma, which is great for designers.
- **Style Dictionary** takes these tokens and transforms them into formats suitable for development, making it easier to apply consistent styles in different programming environments.

## Features

- **Automated Token Generation**: Create design tokens directly from Figma using the Tokens Studio plugin.
- **Cross-Platform Support**: Transform tokens into multiple formats (JSON, SCSS, XML, etc.) using Style Dictionary.
- **Consistency & Scalability**: Maintain a single source of truth for design tokens that can be applied consistently across all platforms.
- **Customizable & Extendable**: Tailor the token generation process to fit your specific project needs and easily extend it with additional functionality.

## Getting Started

Follow these steps to set up and use the Design Tokens Generator:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- A Figma account with access to the [Tokens Studio](https://www.tokens.studio/) plugin
- A GitHub repository to store your project

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bellentani/aplica-design-tokens.git
   cd design-tokens-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Using Tokens Studio

1. **Setup Tokens Studio in Figma**:
   - Open your Figma project.
   - Open the [Tokens Studio plugin](https://www.tokens.studio/).
   - Setupe tokens within Figma using the plugin.

2. **Export Tokens**:
   - Export your tokens from Tokens Studio in a JSON format.

### Integrating with Style Dictionary

1. **Place your JSON tokens**:
   - Save the exported JSON file in the `tokens` directory within your project.

2. **Configure Style Dictionary**:
   - Open `config.json` and customize it according to your token categories and desired output formats.

3. **Build the tokens**:
   - Run the following command to generate the tokens in the specified formats:
     ```bash
     npm run build
     ```

## Project Structure

- **tokens/**: Contains the exported token files from Tokens Studio.
- **build/**: The output directory where generated tokens will be saved.
- **config.json**: The configuration file for Style Dictionary.
- **scripts/**: Custom scripts to enhance the token generation process.
- **README.md**: Project documentation.

## Usage

### Command Line Interface

You can run various commands to generate and manage your tokens:

- `npm run build`: Generate tokens based on the configuration.
- `npm run clean`: Clean the build directory.

### Customizing Output Formats

Edit the `config.json` file to specify how and where the tokens should be output. You can define multiple formats and destinations to suit different platform requirements.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the teams at [Tokens Studio](https://www.tokens.studio/) and [Style Dictionary](https://amzn.github.io/style-dictionary/) for providing such powerful tools.
- Inspired by design systems and token management best practices.

## Contact

For questions or support, please open an issue on this repository or reach out via [email](mailto:2rsnz49ft@relay.firefox.com).

---

Feel free to customize the content as per your specific project details and requirements.