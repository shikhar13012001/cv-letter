# cv-letter

`cv-letter` is a Command Line Interface (CLI) tool that combines a resume, a job description, and a LaTeX template to create a personalized AI-generated cover letter. It utilizes OpenAI's GPT-3.5 model to tailor the content to specific job applications, highlighting crucial details like email contact, company names, and relevant skills.

## Features

- AI-driven generation of tailored cover letters.
- Accepts job descriptions and resumes in text and PDF formats.
- Outputs LaTeX formatted cover letters.
- Customizable through various command-line flags.

## Installation

To install `cv-letter`, you need to have Node.js set up on your system.

```bash
npm install cv-letter
```

## Configuration

- Set up your OpenAI API key in the `openaiConfig.json` file located at the root of the package:

  ```json
  {
    "apiKey": "Your-OpenAI-API-Key"
  }
  ```
- set your own openai apiKey

```bash
  cvl --apiKey=<your own apikey>
```

- Ensure LaTeX is installed for PDF processing.

## Usage

Run `cv-letter` with the paths to your job description, LaTeX cover letter template, and resume:

```bash
cv-letter <job-description-path> <cover-letter-path> <resume-path>
```

### Flags

- `--clear, -c`: Clear the console before running (default: true).
- `--noClear`: Do not clear the console before running.
- `--debug, -d`: Print debug information (default: false).
- `--version, -v`: Print the CLI version.
- `--apiKey, -a`: Set or update the OpenAI API key.

### Commands

- `help`: Display help information.

### Example

```bash
cv-letter ./job-description.txt ./cover-letter.tex ./resume.pdf
```

## Contributing

We welcome contributions to `cv-letter`. Please refer to [CONTRIBUTING.md](LINK_TO_CONTRIBUTING.md) for guidelines on contributions.

## License

This project is under the [MIT License](LINK_TO_LICENSE).

## Author

- Shikhar - [Portfolio](https://portfolio-shikhar13012001.vercel.app/)
