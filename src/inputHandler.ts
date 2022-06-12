import fileTree, { FileTreeNode } from './store/fileTree';
import { findFile, findFolder, printTreeStructure } from './utils';

export const inputHandler = (input: string, currentLines: Array<string>): Array<string> => {
  const prefix = fileTree.currentPath()

  const printHelp = (): string => (
    "Available commands are: \n" +
    "cd – Change directory \n" +
    "ls – Display files and directories in current folder \n" +
    "cat – Read from file \n" +
    "clear (or clr) – Clear terminal \n" +
    "tree – List all files in system"
  )

  switch (input.split(' ')[0]) {
    case "cd":
      if (input.split(' ')[1] === '..') {
        if (fileTree.currentNode().parent !== null) {
          fileTree.setCurrentNode(fileTree.currentNode().parent!)
          return [...currentLines, `${prefix} ${input}`]
        } else {
          return [...currentLines, `${prefix} ${input} \n already at top level`]
        }
      }
      const folder = findFolder(input.split(' ')[1])
      if (folder !== undefined) {
        fileTree.setCurrentNode(folder)
        return [...currentLines, `${prefix} ${input}`]
      }
      return [...currentLines, `${prefix} ${input} \n could not find folder "${input.split(' ')[1]}"`]
    case "cat":
      const file = findFile(input.split(' ')[1])
      if (file !== undefined) {
        return [...currentLines, `${prefix} ${input} \n ${file.content}`]
      }
      return [...currentLines, `${prefix} ${input} \n could not find file "${input.split(' ')[1]}"`]
    case "touch":
      const newFile: FileTreeNode = {
        title: input.split(' ')[1],
        content: '',
        children: [],
        parent: fileTree.currentNode()
      }
      fileTree.currentNode().children.push(newFile)
      return [...currentLines, `${prefix} ${input}`]
    case "mkdir":
      const newFolder: FileTreeNode = {
        title: input.split(' ')[1],
        content: null,
        children: [],
        parent: fileTree.currentNode()
      }
      fileTree.currentNode().children.push(newFolder)
      return [...currentLines, `${prefix} ${input}`]
    default:
      break
  }

  switch (input) {
    case "clr":
      return []
    case "clear":
      return []
    case "dir":
      return [...currentLines, `${prefix} ${input} \nplease use a better OS...`]
    case "ls":
      return [...currentLines, `${prefix} ls \n${fileTree.currentNode().children
      .map((child) => child.title).toString().split(',').join(' ')}`]
    case "whoami":
      return [...currentLines, `${prefix} ${input} \nguest`]
    case "help":
      return [...currentLines, `${prefix} ${input} \n${printHelp()}`]
    case "tree":
      printTreeStructure(fileTree.rootNode())
      return [...currentLines, `${prefix} ${input} \n\n${printTreeStructure(fileTree.rootNode()).map((string) => `${string} \n`).join('')}\n`]
    default:
      return [...currentLines, `${prefix} ${input} \ncommand not found: ${input}`]
  }
}
