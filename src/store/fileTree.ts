import { createEffect, createRoot, createSignal } from 'solid-js';
import { FileTreeNode } from '../types';
import { rootFolder } from '../data/nodes';

const getPath = (input: FileTreeNode): string => {
  let root = '~/erikskaar'
  const result = []
  let node = input
  while (node.parent !== null) {
    result.push(node.title)
    node = node.parent
  }
  return `${root}/${result.reverse().join('/')}>`
}

const setParentOfAllChildren = (node: FileTreeNode) => {
  node.children.forEach((child) => {
    child.parent = node
    if (child.children.length > 0) {
      setParentOfAllChildren(child)
    }
  })
}

const createFileTree = () => {
  const [currentNode, setCurrentNode] = createSignal(rootFolder)
  const [rootNode] = createSignal(rootFolder)
  const [currentPath, setCurrentPath] = createSignal(getPath(currentNode()))

  createEffect(() => setCurrentPath(getPath(currentNode())))
  createEffect(() => setParentOfAllChildren(rootNode()))
  return {currentNode, setCurrentNode, rootNode, currentPath}
}

export default createRoot(createFileTree)