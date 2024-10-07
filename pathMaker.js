import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

// Function to get the file structure recursively
function getFileStructure(dir, level = 0) {
    let structure = '';

    // Get all files and directories within the directory
    const items = readdirSync(dir);
    
    items.forEach((item, index) => {
        // Create the correct path
        const fullPath = join(dir, item);
        const isLast = index === items.length - 1;
        
        // Check if the current item is a directory or file
        if (statSync(fullPath).isDirectory()) {
            // Add directory to structure
            structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}/\n`;
            
            // Recursively add the directory contents
            structure += getFileStructure(fullPath, level + 1);
        } else {
            // Add file to structure
            structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}\n`;
        }
    });
    
    return structure;
}

// Function to create the fileStructure.txt
function createFileStructureFile(rootDir) {
    const structure = `${basename(rootDir)}/\n` + getFileStructure(rootDir);
    
    // Write to file
    writeFileSync(join(rootDir, 'fileStructure.txt'), structure, 'utf-8');
    console.log(structure);
    console.log(join(rootDir, 'fileStructure.txt'));
    console.log('fileStructure.txt created successfully!');
}

// Example usage
const projectRoot = '../mike-dex';
createFileStructureFile(projectRoot);
