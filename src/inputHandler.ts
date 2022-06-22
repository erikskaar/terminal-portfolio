import fileTree from './store/fileTree';
import { findFile, findFolder, printTreeStructure } from './utils';
import { FileTreeNode, LineContent } from './types';

export const inputHandler = (input: LineContent, currentLines: Array<LineContent>): Array<LineContent> => {
  const prefix = fileTree.currentPath()
  const command = `${prefix} ${input.content}`

  const line: LineContent = {
    type: 'command',
    command,
    content: ''
  }

  // TODO: Find a better system that just switch statements

  const printHelp = (): string => (
    "\nAvailable commands are: \n\n" +
    "cd – Change directory \n" +
    "ls – Display files and directories in current folder \n" +
    "cat <<file>> – Read from file \n" +
    "clear (or clr) – Clear terminal \n" +
    "tree – List all files in system \n" +
    "view <<image>> – View image \n" +
    "touch <<file name>> – Create file \n" +
    "mkdir <<folder name>> – Create folder \n\n"
  )

  const tokens = input.content.split(' ');

  switch (tokens[0]) {
    case "cd":
      if (tokens[1] === '..') {
        if (fileTree.currentNode().parent !== null) {
          fileTree.setCurrentNode(fileTree.currentNode().parent!)
          return [...currentLines, line]
        } else {
          return [...currentLines, { ...line, content: `already at top level` }]
        }
      } else if (tokens[1] === undefined) {
        fileTree.setCurrentNode(fileTree.rootNode())
        return [...currentLines, line]
      }
      const folder = findFolder(tokens[1])
      if (folder !== undefined) {
        fileTree.setCurrentNode(folder)
        return [...currentLines, line]
      }
      return [...currentLines, { ...line, content: `could not find folder "${tokens[1]}"` }]
    case "cat":
      const file = findFile(tokens[1])
      if (file !== undefined) {
        return [...currentLines, { ...line, type: 'code', content: `${file.content}` }]
      }
      return [...currentLines, { ...line, content: `could not find file "${tokens[1]}"` }]
    case "view":
      const image = findFile(tokens[1])
      if (image !== undefined) {
        return [...currentLines, { ...line, type: 'image', content: `${image.content}`}]
      }
      return [...currentLines, { ...line, content: `could not find file "${tokens[1]}"`}]
    case "touch":
      const newFile: FileTreeNode = {
        title: tokens[1],
        type: 'file',
        content: 'print(hello)',
        children: [],
        parent: fileTree.currentNode()
      }
      fileTree.currentNode().children.push(newFile)
      return [...currentLines, line]
    case "mkdir":
      const newFolder: FileTreeNode = {
        title: tokens[1],
        type: 'folder',
        content: null,
        children: [],
        parent: fileTree.currentNode()
      }
      fileTree.currentNode().children.push(newFolder)
      return [...currentLines, line]
    default:
      break
  }

  switch (input.content) {
    case "clr":
      return []
    case "clear":
      return []
    case "dir":
      return [...currentLines, { ...line, content: `please use a better OS...` }]
    case "ls":
      return [...currentLines, { ...line, content: `${fileTree.currentNode().children
        .map((child) => child.title).join(' ')}` }]
    case "whoami":
      return [...currentLines, { ...line, content: `guest` }]
    case "help":
      return [...currentLines, { ...line, content: `${printHelp()}` }]
    case "tree":
      printTreeStructure(fileTree.rootNode())
      return [...currentLines, { ...line, content: `\n${printTreeStructure(fileTree.rootNode())
        .map((string) => `${string} \n`).join('')}\n` }]
    default:
      return [...currentLines, { ...line, content:  `command not found: ${input.content}` }]
  }
}
