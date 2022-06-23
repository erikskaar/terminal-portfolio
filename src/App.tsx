import type { Component } from 'solid-js';

import hljs from 'highlight.js/lib/common'
import styles from './App.module.css';
import { createEffect, createSignal, For } from 'solid-js';
import { inputHandler } from './inputHandler';
import fileTree from './store/fileTree';
import { LineContent } from './types';
import Line from './components/Line';
import { createSuggestion } from './utils/utils';

const App: Component = () => {
  const [currentLine, setCurrentLine] = createSignal<LineContent>({ type: 'command', command: '', content: ''})
  const [prevLines, setPrevLines] = createSignal<Array<LineContent>>([])
  const [suggestion, setSuggestion] = createSignal<string>('_')

  const onInputChange = (event: InputEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    setCurrentLine({ ...currentLine(), content: event.currentTarget.value })
  };

  const scrollToBottom = () => {
    const scrollingElement = document.scrollingElement || document.body
    scrollingElement.scrollTop = scrollingElement.scrollHeight
  }
  const listener = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && currentLine().content !== "") {
      event.preventDefault()
      setPrevLines(inputHandler(currentLine(), prevLines()))
      setCurrentLine({ type: 'command', command: '', content: ''})
      hljs.highlightAll()
      scrollToBottom()
    } else if (event.code === 'Tab' && suggestion() !== '_') {
      event.preventDefault()
      setCurrentLine({ ...currentLine(), content: suggestion()})
    }
  }
  createEffect(() => document.getElementById("mainInput")?.addEventListener('keydown', listener))
  createEffect(() => document.getElementById("mainInput")?.addEventListener('blur', (event) =>
    document.getElementById("mainInput")?.focus())
  )
  createEffect(() => setSuggestion(createSuggestion(currentLine().content)))

  return (
    <div class={styles.App} id="container">
      <div>
        <For each={prevLines()} fallback={""}>
          {(line) => (<Line line={line} />)}
        </For>
      </div>
      <div class={styles.mainInputContainer}>
        <span>{fileTree.currentPath()}</span>
        <div class={styles.inputDiv}>
          <p class={styles.placeholder}>{suggestion()}</p>
          <input
            id="mainInput"
            type="text"
            class={styles.mainInput}
            onInput={(e) => onInputChange(e)}
            value={currentLine().content}
            autofocus
          />
        </div>
      </div>
    </div>
  );
};

export default App;
