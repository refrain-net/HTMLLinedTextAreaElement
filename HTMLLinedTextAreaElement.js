'use strict';

customElements.define('lined-textarea', class HTMLLinedTextAreaElement extends HTMLElement {
  static css_string;
  constructor () {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const link = document.createElement('link');
    link.href = 'HTMLLinedTextAreaElement.css';
    link.rel = 'stylesheet';
    shadow.appendChild(link);

    const div = document.createElement('div');
    div.className = 'linenumbers';
    div.innerHTML = '<span class="linenumber"></span>';
    shadow.appendChild(div);

    const textarea = document.createElement('textarea');
    textarea.className = 'editor';
    const onchange = event => div.innerHTML = '<span class="linenumber"></span>'.repeat(textarea.value.split('\n').length);
    textarea.oninput = onchange;
    textarea.onpaste = onchange;
    textarea.wrap = 'off';
    shadow.appendChild(textarea);

    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', event => {
      const [node] = slot.assignedNodes();
      textarea.value = node.nodeValue;
      node.nodeValue = '';
      textarea.oninput();
    });
    shadow.appendChild(slot);
  }
});
