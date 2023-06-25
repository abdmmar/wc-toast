/**
 * @attr {'blank' | 'success' | 'loading' | 'error' | 'custom'} type - type of toast items
 *
 * @slot - This is a default/unnamed slot
 *
 * @cssprop [--wc-toast-background="#fff"] - Background color of toast item and toast icon. Dark theme will use #2a2a32
 * @cssprop [--wc-toast-stroke="#2a2a32"] - Stroke color of toast icon svg item (if any). Dark theme will use #f9f9fa
 * @cssprop [--wc-toast-color="#000"] - Text color of toast item. Dark theme will use #f9f9fa
 * @cssprop [--wc-toast-content-margin='4px 10px'] - margin of toast content
 * @cssprop [--wc-toast-color="#000"] - color. Default is #000
 * @cssprop [--wc-toast-font-family="'Roboto', 'Amiri', sans-serif"] - font-family. Default is 'Roboto', 'Amiri', sans-serif;
 * @cssprop [--wc-toast-font-size="16px"] - font-size. Default is 16px
 *
 * @summary - item component that can be used to display toast notifications
 *
 * @tag wc-toast-item
 */
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
    this.type = this.getAttribute('type') || 'blank';
    this.theme = this.getAttribute('theme') || 'light';
    this.duration = this.getAttribute('duration') || this.getDurationByType(this.type);

    if (this.theme === 'dark') {
      this.style.setProperty('--wc-toast-background', '#2a2a32');
      this.style.setProperty('--wc-toast-stroke', '#f9f9fa');
      this.style.setProperty('--wc-toast-color', '#f9f9fa');
    }

    const onClose = () => {
      setTimeout(() => {
        this.remove();
      }, this.EXIT_ANIMATION_DURATION);
      this.shadowRoot.querySelector('.wc-toast-bar').classList.add('dismiss');
    }
    let isHover = false
    this.addEventListener("mouseenter", () => {
      isHover = true
    })
    this.addEventListener("mouseleave", () => {
      isHover = false
    })
    const timer = setInterval(() => {
      if(this.duration <= 0) {
        clearInterval(timer)
        onClose()
        return
      }
      if(!isHover) this.duration -= 100
    }, 100)
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
        --wc-toast-background: #fff;
        --wc-toast-max-width: 350px;
        --wc-toast-stroke: #2a2a32;
        --wc-toast-color: #000;
        --wc-toast-font-family: 'Roboto', 'Amiri', sans-serif;
        --wc-toast-font-size: 16px;
        --wc-toast-border-radius: 8px;
        --wc-toast-content-margin: 4px 10px;

        display: flex;
        justify-content: var(--wc-toast-position);
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
      }

      :host > * {
        pointer-events: auto;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --wc-toast-background: #2a2a32;
          --wc-toast-stroke: #f9f9fa;
          --wc-toast-color: #f9f9fa;
        }

        :host([theme=light]) {
          --wc-toast-background: #fff;
          --wc-toast-stroke: #2a2a32;
          --wc-toast-color: #000;
        }
      }

      @keyframes enter-animation {
        0% {
          transform: translate3d(0, calc(var(--wc-toast-factor) * -200%), 0) scale(0.6);
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
          transform: translate3d(0, calc(var(--wc-toast-factor) * -150%), -1px) scale(0.6);
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
        background: var(--wc-toast-background, #fff);
        line-height: 1.3;
        will-change: transform;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
        animation: enter-animation 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        max-width: var(--wc-toast-max-width);
        pointer-events: auto;
        padding: 8px 10px;
        border-radius: var(--wc-toast-border-radius);
      }

      .wc-toast-bar.dismiss {
        animation: exit-animation 0.3s forwards cubic-bezier(0.06, 0.71, 0.55, 1);
      }

      @media (prefers-reduced-motion: reduce) {
        .wc-toast-bar {
          animation-name: fade-in;
        }

        .wc-toast-bar.dismiss {
          animation-name: fade-out;
        }
      }
    </style>
    <div class="wc-toast-bar">
      <slot></slot>
    </div>
    `;
  }
}

customElements.define('wc-toast-item', WCToastItem);
