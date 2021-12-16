import { loadHTML } from './utility.js';

export default class WCToastContent extends HTMLElement {
  connectedCallback() {
    loadHTML('./src/wc-toast-content.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        const attribute = {
          message: this.getAttribute('message')
        };

        this.shadowRoot.querySelector('slot[name="message"').innerHTML = attribute.message;
      })
      .catch((err) => console.error(err));
  }

  createMessage(message) {
    const p = document.createElement('p');
    p.style.margin = 0;
    p.innerHTML = message;
    return p;
  }
}
