import type { Component } from 'solid-js';

import styles from './App.module.css';
import { createEffect, createSignal, For } from 'solid-js';
import { inputHandler } from './inputHandler';
import fileTree from './store/fileTree';

const App: Component = () => {
  const [prevLine, setPrevLine] = createSignal('')
  const [prevLines, setPrevLines] = createSignal<Array<string>>([])

  const onInputChange = (event: InputEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    setPrevLine(event.currentTarget.value)
  };
  const listener = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && prevLine() !== "") {
      event.preventDefault()
      setPrevLines(inputHandler(prevLine(), prevLines()))
      setPrevLine('')
    }
  }
  createEffect(() => document.getElementById("mainInput")?.addEventListener('keydown', listener))
  createEffect(() => document.getElementById("mainInput")?.addEventListener('blur', (event) =>
    document.getElementById("mainInput")?.focus())
  )

  return (
    <div class={styles.App}>
      <div>
        <For each={prevLines()} fallback={""}>
          {(line) => (
            <p class={styles.line}>{line}</p>
          )}
        </For>
      </div>
      <div class={styles.mainInputContainer}>
        <span>{fileTree.currentPath()}</span>
        <input id="mainInput" type="text" class={styles.mainInput} onInput={(e) => onInputChange(e)} value={prevLine()} autofocus />
      </div>
    </div>
  );
};

export default App;
