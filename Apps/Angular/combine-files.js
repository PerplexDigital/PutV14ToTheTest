const fs = require('fs');
const path = require('path');

// Define paths to the JS files
const distPath = path.join(__dirname, '../../App_Plugins/', 'Angular');
const runtimeFile = path.join(distPath, 'runtime.js');
const polyfillsFile = path.join(distPath, 'polyfills.js');
const mainFile = path.join(distPath, 'main.js');

// Define the output file
const outputFile = path.join(distPath, 'angular.js');

// Read the content of the files in the correct order
const runtimeContent = fs.readFileSync(runtimeFile, 'utf8');
const polyfillsContent = fs.readFileSync(polyfillsFile, 'utf8');
const mainContent = fs.readFileSync(mainFile, 'utf8');

// Combine the contents
const combinedContent = `${runtimeContent}\n${polyfillsContent}\n${mainContent}`;

// Write the combined content to the output file
fs.writeFileSync(outputFile, combinedContent);
