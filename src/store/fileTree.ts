import { createEffect, createRoot, createSignal } from 'solid-js';

export type FileTreeNode = {
  title: string,
  content: string | null
  children: Array<FileTreeNode>
  parent: FileTreeNode | null
}

const projectsFolder: FileTreeNode = {
  title: 'Projects',
  content: null,
  children: [],
  parent: null
}

const documentsFolder: FileTreeNode = {
  title: 'Documents',
  content: null,
  children: [projectsFolder],
  parent: null
}

const picturesFolder: FileTreeNode = {
  title: 'Pictures',
  content: null,
  children: [],
  parent: null
}

const readme: FileTreeNode = {
  title: 'Readme.md',
  content: 'Welcome to my website. Please feel free to roam around the system as any other terminal',
  children: [],
  parent: null
}

const rootFolder: FileTreeNode = {
  title: '~',
  content: null,
  children: [documentsFolder, picturesFolder, readme],
  parent: null
}

const getPath = (input: FileTreeNode): string => {
  let result = '~/erikskaar'
  let node = input
  while (node.parent !== null) {
    result += `/${node.title}`
    node = node.parent
  }
  return result + '>'
}
 // SET PARENT FOR ALL AT RENDER INSTEAD TO FIX TREE COMMANDO
const setParentOfChildren = (node: FileTreeNode) => {
  node.children.forEach((child) => child.parent = node)
}

const createFileTree = () => {
  const [currentNode, setCurrentNode] = createSignal(rootFolder)
  const [rootNode] = createSignal(rootFolder)
  const [currentPath, setCurrentPath] = createSignal(getPath(currentNode()))

  createEffect(() => setCurrentPath(getPath(currentNode())))
  createEffect(() => setParentOfChildren(currentNode()))
  return {currentNode, setCurrentNode, rootNode, currentPath}
}

export default createRoot(createFileTree)