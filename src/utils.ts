import fileTree, { FileTreeNode } from './store/fileTree';

export const filterOutFolders = (input: Array<FileTreeNode>): Array<FileTreeNode> => (
  input.filter((item) => item.content !== null)
)

export const findFile = (title: string): FileTreeNode | undefined => {
  return filterOutFolders(fileTree.currentNode().children).find((child) => child.title === title)
}

export const filterOutFiles = (input: Array<FileTreeNode>): Array<FileTreeNode> => (
  input.filter((item) => item.content === null)
)

export const findFolder = (title: string): FileTreeNode | undefined => {
  const result = (filterOutFiles(fileTree.currentNode().children).find((child) => child.title === title))
  return result
}

const getNumberOfAncestors = (node: FileTreeNode): number => {
  let ancestors = 0
  let currentNode = node
  while(currentNode.parent !== null) {
    ancestors++
    currentNode = currentNode.parent
  }
  return ancestors
}

export const printTreeStructure = (node: FileTreeNode, structure: Array<string> = ['~/erikskaar']) => {
  node.children.forEach((child) => {
    const currentString = `${getNumberOfAncestors(child) > 0 ?' '.repeat((getNumberOfAncestors(child)) * 3) : ''}└${'─'.repeat(2)}${child.title}`
    structure.push(currentString)
    if (child.children.length > 0) {
      printTreeStructure(child, structure)
    }
  })
  return structure
}