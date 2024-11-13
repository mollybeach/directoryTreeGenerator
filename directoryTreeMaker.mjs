import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import { projectRootPath } from './config.mjs';
import { ignorePatterns } from './ignorePatterns.mjs';

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

