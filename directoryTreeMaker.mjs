import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import { projectRootPath } from './config.mjs';

// Add this near the top of the file, after the imports
const ignorePatterns = [
    // Package managers and dependencies
    'node_modules',
    'bower_components',
    'jspm_packages',
    'package-lock.json',
    'yarn.lock',
    'vendor',

    // Build and output directories
    'dist',
    'build',
    'out',
    '.min.js',
    '.min.css',

    // Environment and configuration
    '.env',
    '.pem',
    '.secret',

    // IDE and editor files
    '.idea',
    '.vscode',
    '.swp',
    '.swo',
    '.DS_Store',
    'Thumbs.db',

    // Logs and coverage
    'logs',
    '.log',
    'coverage',
    '.nyc_output',

    // Temporary files
    'tmp',
    'temp',
    '.temp',
    '.tmp',

    // Python specific
    'python3.9',
    'site-packages',
    'env',
    '__pycache__',
    'lib',
    'include',
    'bin',

    // Localization and static
    'LC_MESSAGES',
    'locale',
    'static'
];

function shouldSkipRecursion(path) {
    return ignorePatterns.some(pattern => 
        path.includes(pattern) || 
        path.endsWith(pattern)
    );
}

// Function to get the file structure recursively
function getFileStructure(dir, level = 0) {
    let structure = '';
    
    // Get all files and directories within the directory
    const items = readdirSync(dir);
    
    // Separate and sort directories and files
    const directories = items
        .filter(item => statSync(join(dir, item)).isDirectory())
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    const files = items
        .filter(item => statSync(join(dir, item)).isFile())
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    // Process directories first
    directories.forEach((item, index) => {
        const fullPath = join(dir, item);
        const isLast = index === directories.length - 1 && files.length === 0;
        
        // Add directory to structure
        structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}/\n`;
        
        if (!shouldSkipRecursion(fullPath)) {
            structure += getFileStructure(fullPath, level + 1);
        }
    });
    
    // Then process files
    files.forEach((item, index) => {
        const isLast = index === files.length - 1;
        structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}\n`;
    });
    
    return structure;
}

// Function to create the fileStructure.txt
function createFileStructureFile(rootDir) {
    const structure = `${basename(rootDir)}/\n` + getFileStructure(rootDir);
    
    // Get the directory of the current script
    const currentDir = dirname(new URL(import.meta.url).pathname);
    
    // Write to file in the current directory
    const outputPath = join(currentDir, 'fileStructure.txt');
    writeFileSync(outputPath, structure, 'utf-8');
    console.log(structure);
    console.log(outputPath);
    console.log('fileStructure.txt created successfully!');
}

// Example usage
const projectRoot = projectRootPath
createFileStructureFile(projectRoot);

