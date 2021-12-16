import { loadHTML } from './utility.js';

export default class WCToastIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTML('./src/wc-toast-icon.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        const attribute = {
          type: this.getAttribute('type') || 'blank',
          icon: this.getAttribute('icon')
        };

        if (attribute.type === 'svg') return;

        this.icon =
          attribute.icon != null
            ? this.createIcon(attribute.type, attribute.icon)
            : this.createIcon(attribute.type);

        this.shadowRoot.appendChild(this.icon);
      })
      .catch((err) => console.error(err));
  }

  createIcon(toastType = 'blank', icon = '') {
    switch (toastType) {
      case 'success':
        const checkmarkIcon = document.createElement('div');
        checkmarkIcon.classList.add('checkmark-icon');
        return checkmarkIcon;
      case 'error':
        const errorIcon = document.createElement('div');
        errorIcon.classList.add('error-icon');
        return errorIcon;
      case 'loading':
        const loadingIcon = document.createElement('div');
        loadingIcon.classList.add('loading-icon');
        return loadingIcon;
      case 'custom':
        const customIcon = document.createElement('div');
        customIcon.classList.add('custom-icon');
        customIcon.innerHTML = icon;
        return customIcon;
      case 'blank':
      default:
        const div = document.createElement('div');
        return div;
    }
  }
}

customElements.define('wc-toast-icon', WCToastIcon);
