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
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        margin: var(--wc-toast-content-margin);
        color: var(--wc-toast-color, #000);
        font-family: var(--wc-toast-font-family);
        font-size: var(--wc-toast-font-size);
      }
    </style>
    <slot name="message"></slot>
    <slot name="content"></slot>
    `;
  }
}

customElements.define('wc-toast-content', WCToastContent);
