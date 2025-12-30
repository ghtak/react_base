# Prettier Guide

Prettier is an opinionated code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules.

## Configuration (`.prettierrc`)

The project's Prettier configuration is defined in the `.prettierrc` file.

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

### Configuration Options

*   `"tabWidth": 2`: Specifies the number of spaces per indentation-level.
*   `"semi": true`: Prints semicolons at the ends of statements.
*   `"singleQuote": true`: Uses single quotes instead of double quotes.
*   `"trailingComma": "all"`: Prints trailing commas wherever possible in multi-line comma-separated syntactic structures.
*   `"printWidth": 80`: Specifies the line length that the printer will wrap on.
*   `"bracketSpacing": true`: Prints spaces between brackets in object literals.
*   `"arrowParens": "always"`: Includes parentheses around a sole arrow function parameter.

## Common Commands

Here are some of the most frequently used Prettier commands.

### Check for Formatting Issues

This command checks for files that do not adhere to the Prettier rules. It's useful for CI/CD pipelines to verify formatting without actually changing the files.

```bash
npx prettier --check .
```

### Format All Files

This command formats all files in the current directory and its subdirectories. It overwrites the files with the formatted version.

```bash
npx prettier --write .
```

### Format a Specific File

To format a single file:

```bash
npx prettier --write src/app.tsx
```

### Format Files in a Specific Directory

To format all files within a specific directory (e.g., `src`):

```bash
npx prettier --write src/
```
