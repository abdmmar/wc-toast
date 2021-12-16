import { loadHTML } from './utility.js';

const EXIT_ANIMATION_DURATION = 350;
export default class WCToastItem extends HTMLElement {
  constructor() {
    super();
    this.createdAt = new Date();
  }

  connectedCallback() {
    loadHTML('./src/wc-toast-item.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
        this.setAttribute('aria-live', 'polite');
        this.setAttribute('role', 'status');

        this.type = this.getAttribute('type') || 'blank';
        this.duration = this.getAttribute('duration') || this.getDurationByType(this.type);

        setTimeout(() => {
          this.shadowRoot.querySelector('.wc-toast-bar').classList.add('dismiss');

          setTimeout(() => {
            this.remove();
          }, EXIT_ANIMATION_DURATION);
        }, this.duration);
      })
      .catch((err) => console.error(err));
  }

  static get observedAttributes() {
    return ['class'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'class') {
      switch (newValue) {
        case 'dismiss-with-close-button':
          this.shadowRoot.querySelector('.wc-toast-bar').classList.add('dismiss');

          setTimeout(() => {
            this.remove();
          }, EXIT_ANIMATION_DURATION);
          break;
        case 'dismiss':
        default:
          this.remove();
          break;
      }
    }
  }

  getDurationByType(type) {
    switch (type) {
      case 'success':
        return 2000;
      case 'loading':
        return 100000 * 60;
      case 'error':
      case 'blank':
      case 'custom':
      default:
        return 3500;
    }
  }
}
