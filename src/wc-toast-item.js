export default class WCToastItem extends HTMLElement {
  constructor() {
    super();
    this.createdAt = new Date();
    this.EXIT_ANIMATION_DURATION = 350;
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = WCToastItem.template();
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.type = this.getAttribute('type') || 'blank';
    this.duration = this.getAttribute('duration') || this.getDurationByType(this.type);

    setTimeout(() => {
      this.shadowRoot.querySelector('.wc-toast-bar').classList.add('dismiss');

      setTimeout(() => {
        this.remove();
      }, this.EXIT_ANIMATION_DURATION);
    }, this.duration);
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
          }, this.EXIT_ANIMATION_DURATION);
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

  static template() {
    return `
    <style>
      /*
       * Author: Timo Lins
       * License: MIT
       * Source: https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx
       */

      :host {
        display: flex;
        justify-content: var(--wc-toast-item-position);
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
      }

      :host > * {
        pointer-events: auto;
      }

      @keyframes enter-animation {
        0% {
          transform: translate3d(0, calc(var(--wc-toast-item-factor) * -200%), 0) scale(0.6);
          opacity: 0.5;
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 1;
        }
      }

      @keyframes exit-animation {
        0% {
          transform: translate3d(0, 0, -1px) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, calc(var(--wc-toast-item-factor) * -150%), -1px) scale(0.6);
          opacity: 0;
        }
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .wc-toast-bar {
        display: flex;
        align-items: center;
        background: #fff;
        color: #363636;
        line-height: 1.3;
        will-change: transform;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
        animation: enter-animation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        max-width: 350px;
        pointer-events: auto;
        padding: 8px 10px;
        border-radius: 8px;
      }

      .wc-toast-bar.dismiss {
        animation: exit-animation 0.4s forwards cubic-bezier(0.06, 0.71, 0.55, 1);
      }
    </style>
    <div class="wc-toast-bar">
      <slot></slot>
    </div>
    `;
  }
}

customElements.define('wc-toast-item', WCToastItem);
