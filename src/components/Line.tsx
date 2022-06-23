import { createSignal, JSX } from 'solid-js';
import { LineContent } from '../types';
import styles from '../App.module.css';
import { findCommand } from '../utils/utils';

interface IProps {
  line: LineContent,
}

const Line = ({ line }: IProps): JSX.Element => {

  switch (line.type) {
    // TODO: Fix
    case 'command':
      return (
        <div>
          <p class={styles.line}>{line.command}</p>
          <p class={styles.line}>{line.content}</p>
        </div>
      )
    case 'code':
      return (
        <div>
          <p class={styles.line}>{line.command}</p>
          <pre><code class={styles.code}>{line.content}</code></pre>
        </div>
      )
    case 'image':
      return (
        <div>
          <p class={styles.line}>{line.command}</p>
          <img class={styles.image} src={`${line.content}`} />
        </div>
      )
  }
}

export default Line