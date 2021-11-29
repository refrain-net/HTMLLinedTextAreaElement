'use strict';

customElements.define('lined-textarea', class HTMLLinedTextAreaElement extends HTMLElement {
  static #css_string = (await fetch('/HTMLLinedTextAreaElement/HTMLLinedTextAreaElement.css')).text();
  constructor () {
    super();
    const root = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');
    style.textContent = HTMLLinedTextAreaElement.#css_string;
    root.appendChild(style);

    const div = document.createElement('div');
    div.className = 'linenumbers';
    div.innerHTML = '<span class="linenumber"></span>';
    root.appendChild(div);

    const textarea = document.createElement('textarea');
    textarea.className = 'editor';
    const onchange = event => div.innerHTML = '<span class="linenumber"></span>'.repeat(textarea.value.split('\n').length);
    textarea.oninput = onchange;
    textarea.onpaste = onchange;
    textarea.wrap = 'off';
    root.appendChild(textarea);

    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', event => {
      const [node] = slot.assignedNodes();
      textarea.value = node.nodeValue;
      node.nodeValue = '';
      textarea.oninput();
    });
    root.appendChild(slot);
  }
});
