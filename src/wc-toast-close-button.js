import { loadHTML } from './utility.js';

export default class WCToastCloseButton extends HTMLElement {
  connectedCallback() {
    loadHTML('./src/wc-toast-close-button.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
      })
      .catch((err) => console.error(err));
  }
}
