'use strict';

customElements.define('lined-textarea', class extends HTMLElement {
  #linenumbers;
  #editor;

  constructor () {
    super();

    const root = this.attachShadow({mode: 'open'});

    const link = document.createElement('link');
    link.href = 'HTMLLinedTextAreaElement.css';
    link.rel = 'stylesheet';
    root.appendChild(link);

    const linenumbers = document.createElement('div');
    linenumbers.className = 'linenumbers';
    linenumbers.innerHTML = this.#updateLineNumbers();
    root.appendChild(linenumbers);

    const editor = document.createElement('textarea');
    editor.className = 'editor';
    const onchange = event => this.#updateLineNumbers();
    editor.oninput = onchange;
    editor.onpaste = onchange;
    editor.wrap = 'off';
    root.appendChild(editor);

    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', event => {
      const [node] = slot.assignedNodes();
      editor.value = node.nodeValue;
      node.nodeValue = '';
      editor.oninput();
    });
    root.appendChild(slot);

    this.#linenumbers = linenumbers;
    this.#editor = editor;
  }

  #updateLineNumbers () {
    const lineCount = this.#editor.value.split('\n').length;
    const html_string = '<span class="linenumber"></span>';
    this.#linenumbers.innerHTML = html_string.repeat(lineCount);
  }
});
