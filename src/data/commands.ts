
const cd  = {
  name: 'cd',
  helperText: 'cd – Change directory',
  nodeType: 'folder'
}


const ls = {
  name: 'ls',
  helperText: 'ls – Display files and directories in current folder'
}

const cat = {
  name: 'cat',
  helperText: 'cat <file> – Read from file',
  nodeType: 'code'
}

const clear = {
  name: 'clear',
  helperText: 'clear or cls – Clear terminal',
  alt: 'cls'
}

const tree = {
  name: 'tree',
  helperText: 'tree - List all files in system'
}

const view = {
  name: 'view',
  helperText: 'view <image> – View image',
  nodeType: 'image'
}

const touch = {
  name: 'touch',
  helperText: 'touch <file name> – Create file'
}

const mkdir = {
  name: 'mkdir',
  helperText: 'mkdir <folder name> – Create folder'
}

const help = {
  name: 'help',
  helperText: 'help – Show available commands'
}
export const commands = [cd,ls, cat, clear, tree, view, touch, mkdir, help]