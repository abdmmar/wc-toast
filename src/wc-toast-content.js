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
    this.shadowRoot.querySelector('slot[name="content"]').innerHTML = this.message;
  }

  static template() {
    return `
    <style>
      :host {
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        margin: var(--wc-toast-content-margin) !important;
        color: var(--wc-toast-color, #000);
        font-family: var(--wc-toast-font-family);
        font-size: var(--wc-toast-font-size);
      }
    </style>
    <slot name="content"></slot>
    `;
  }
}

customElements.define('wc-toast-content', WCToastContent);
