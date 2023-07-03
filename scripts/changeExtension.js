const { readdir, stat, rename } = require('node:fs/promises');
const { join, parse } = require('node:path');

async function changeExtensionRecursively(folderPath, currentExtension, newExtension) {

  const files = await readdir(folderPath)

  for(const file of files){
    const filePath = join(folderPath, file);

    const stats = await stat(filePath)

    if(stats.isDirectory())
      await changeExtensionRecursively(filePath, currentExtension, newExtension)
    else if(file.endsWith(currentExtension)){
      const newFileName = parse(file).name + newExtension;
      const newFilePath = join(folderPath, newFileName);

      await rename(filePath, newFilePath)
    }
  }
}

// Usage example
const folderPath = './src';
const currentExtension = '.js';
const newExtension = '.jsx';

changeExtensionRecursively(folderPath, currentExtension, newExtension);