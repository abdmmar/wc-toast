import { loadHTML } from './utility.js';

export default class WCToastCloseBtn extends HTMLElement {
  connectedCallback() {
    loadHTML('./wc-toast-close-btn.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
      })
      .catch((err) => console.error(err));
  }
}
