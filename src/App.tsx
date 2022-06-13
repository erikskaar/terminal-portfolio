import type { Component } from 'solid-js';

import hljs from 'highlight.js/lib/common'
import styles from './App.module.css';
import { createEffect, createSignal, For } from 'solid-js';
import { inputHandler } from './inputHandler';
import fileTree from './store/fileTree';
import { LineContent } from './types';

const App: Component = () => {
  const [prevLine, setPrevLine] = createSignal<LineContent>({ type: 'command', command: '', content: ''})
  const [prevLines, setPrevLines] = createSignal<Array<LineContent>>([])

  const onInputChange = (event: InputEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    setPrevLine({ ...prevLine(), content: event.currentTarget.value })
  };

  const scrollToBottom = () => {
    const scrollingElement = document.scrollingElement || document.body
    scrollingElement.scrollTop = scrollingElement.scrollHeight
  }
  const listener = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && prevLine().content !== "") {
      event.preventDefault()
      setPrevLines(inputHandler(prevLine(), prevLines()))
      setPrevLine({ type: 'command', command: '', content: ''})
      hljs.highlightAll()
      scrollToBottom()
    }
  }
  createEffect(() => document.getElementById("mainInput")?.addEventListener('keydown', listener))
  createEffect(() => document.getElementById("mainInput")?.addEventListener('blur', (event) =>
    document.getElementById("mainInput")?.focus())
  )

  return (
    <div class={styles.App} id="container">
      <div>
        <For each={prevLines()} fallback={""}>
          {(line) => {
            switch (line.type) {
              // TODO: Fix
              case 'command':
                return (
                  <>
                    <p class={styles.line}>{line.command}</p>
                    <p class={styles.line}>{line.content}</p>
                  </>
              )
              case 'code':
                return (
                  <>
                    <p class={styles.line}>{line.command}</p>
                    <pre><code class={styles.code}>{line.content}</code></pre>
                  </>
                )
              case 'image':
                return (
                  <>
                    <p class={styles.line}>{line.command}</p>
                    <img class={styles.image} src={line.content} />
                  </>
                )
            }
          }}
        </For>
      </div>
      <div class={styles.mainInputContainer}>
        <span>{fileTree.currentPath()}</span>
        <input
          id="mainInput"
          type="text"
          class={styles.mainInput}
          onInput={(e) => onInputChange(e)}
          value={prevLine().content}
          autofocus
        />
      </div>
    </div>
  );
};

export default App;
