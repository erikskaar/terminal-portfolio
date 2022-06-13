export type NodeType = 'folder' | 'file'

export type FileTreeNode = {
  title: string,
  type: NodeType
  content: string | null
  children: Array<FileTreeNode>
  parent: FileTreeNode | null
}

export type LineType = 'command' | 'code' | 'image'

export type LineContent = {
  type: LineType,
  command: string,
  content: string
}