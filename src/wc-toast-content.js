export default class WCToastContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = WCToastContent.template();
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.message = this.getAttribute('message');
    this.shadowRoot.querySelector('slot[name="message"').innerHTML = this.message;
  }

  createMessage(message) {
    const p = document.createElement('p');
    p.style.margin = 0;
    p.innerHTML = message;
    return p;
  }

  static template() {
    return `
    <style>
      :host {
        --wc-toast-content-color: #000;
        --wc-toast-content-margin: 4px 10px;
        --wc-toast-content-font-family: sans-serif;
        --wc-toast-content-font-size: 16px;

        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        margin: var(--wc-toast-content-margin);
        color: var(--wc-toast-content-color);
        font-family: var(--wc-toast-content-font-family);
        font-size: var(--wc-toast-content-font-size);
      }
    </style>
    <slot name="message"></slot>
    <slot name="content"></slot>
    `;
  }
}

customElements.define('wc-toast-content', WCToastContent);
