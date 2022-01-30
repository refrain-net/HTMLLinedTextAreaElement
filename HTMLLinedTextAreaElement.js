'use strict';

customElements.define('lined-textarea', class extends HTMLElement {
  #linenumbers;
  #editor;
  
  set value (newValue) {
    this.#editor.value = newValue;
  }

  constructor () {
    super();

    const root = this.attachShadow({mode: 'open'});

    const link = document.createElement('link');
    const linenumbers = document.createElement('div');
    const editor = document.createElement('textarea');
    const slot = document.createElement('slot');

    this.#linenumbers = linenumbers;
    this.#editor = editor;

    root.appendChild(link);
    root.appendChild(linenumbers);
    root.appendChild(editor);
    root.appendChild(slot);

    link.href = 'https://refrain-net.github.io/HTMLLinedTextAreaElement/HTMLLinedTextAreaElement.css';
    link.rel = 'stylesheet';

    linenumbers.className = 'linenumbers';
    linenumbers.innerHTML = this.#updateLineNumbers();

    editor.className = 'editor';
    const onchange = event => this.#updateLineNumbers();
    editor.oninput = onchange;
    editor.onpaste = onchange;
    editor.wrap = 'off';

    slot.addEventListener('slotchange', event => {
      const [node] = slot.assignedNodes();
      editor.value = node.nodeValue;
      node.nodeValue = '';
      editor.oninput();
    });
  }

  #updateLineNumbers () {
    const lineCount = this.#editor.value.split('\n').length;
    const html_string = '<span class="linenumber"></span>';
    this.#linenumbers.innerHTML = html_string.repeat(lineCount);
  }
});
