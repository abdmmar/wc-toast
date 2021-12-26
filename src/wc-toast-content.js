/**
 * @attr {string} message - message to be displayed in toast item
 *
 * @slot content - add your custom content such as HTMLElement to toast item
 *
 * @cssprop [--wc-toast-content-margin='4px 10px'] - margin of toast content
 * @cssprop [--wc-toast-color="#000"] - color. Default is #000
 * @cssprop [--wc-toast-font-family="'Roboto', 'Amiri', sans-serif"] - font-family. Default is 'Roboto', 'Amiri', sans-serif;
 * @cssprop [--wc-toast-font-size="16px"] - font-size. Default is 16px
 *
 * @summary - message or content to be displayed in toast item
 *
 * @tag wc-toast-content
 */
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
