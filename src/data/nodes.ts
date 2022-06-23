import { FileTreeNode } from '../types';

//TODO: Retrieve data from backend
const testTypescriptFile: FileTreeNode = {
  title: 'Test.ts',
  type: 'code',
  content: 'const createFileTree = () => {\n' +
    '  const [currentNode, setCurrentNode] = createSignal(rootFolder)\n' +
    '  const [rootNode] = createSignal(rootFolder)\n' +
    '  const [currentPath, setCurrentPath] = createSignal(getPath(currentNode()))\n' +
    '\n' +
    '  createEffect(() => setCurrentPath(getPath(currentNode())))\n' +
    '  createEffect(() => setParentOfAllChildren(rootNode()))\n' +
    '  return {currentNode, setCurrentNode, rootNode, currentPath}\n' +
    '}',
  children: [],
  parent: null
}

const projectsFolder: FileTreeNode = {
  title: 'Projects',
  type: 'folder',
  content: null,
  children: [testTypescriptFile],
  parent: null
}

const documentsFolder: FileTreeNode = {
  title: 'Documents',
  type: 'folder',
  content: null,
  children: [projectsFolder],
  parent: null
}

const surfPicture: FileTreeNode = {
  title: 'Surf.jpeg',
  type: 'image',
  content: 'src/surf.jpeg',
  children: [],
  parent: null
}
const picturesFolder: FileTreeNode = {
  title: 'Pictures',
  type: 'folder',
  content: null,
  children: [surfPicture],
  parent: null
}

const readme: FileTreeNode = {
  title: 'Readme.md',
  type: 'code',
  content: 'Welcome to my website. Please feel free to roam around the system as any other terminal',
  children: [],
  parent: null
}

export const rootFolder: FileTreeNode = {
  type: 'folder',
  title: '~',
  content: null,
  children: [documentsFolder, picturesFolder, readme],
  parent: null
}
