# Recursive File Structure Generator

This project is a simple tool that recursively scans a directory and generates a visual tree of its file and folder structure. The generated structure is then saved to a `fileStructure.txt` file for easy reference.

## Features

- **Recursive Directory Scan**: Scans all files and subdirectories within a given directory.
- **Visual Tree Representation**: Generates a hierarchical view using symbols to represent the structure.
- **File Output**: Saves the generated structure to a `fileStructure.txt` file in the project root.
- **ES6 Imports**: Uses modern ES6 modules for cleaner code.

## Installation

1. Clone this repository to your local machine.
2. Make sure you have Node.js installed.

## Usage

1. Modify the `projectRootPath` variable in `config.mjs` to point to your target directory:

```
const projectRoot = '../yourRepositoryName';
```
3. Run the script with Node.js:
    ```bash
    node pathMaker.js
    ```

4. The script will generate the directory structure and save it to `fileStructure.txt` in the specified directory.

## Example

Given the following file structure:

```
my-project/
├── src/
│   ├── index.js
│   ├── app.js
└── package.json
```

The tool will generate and save the following in `fileStructure.txt`:

```
my-project/
├── src/
│   ├── index.js
│   └── app.js
└── package.json
```

## License

This project is licensed under the MIT License.
