/**
 * @attr {'blank' | 'success' | 'loading' | 'error' | 'custom' | 'svg'} type - type of icon
 *
 * @slot svg - Put your custom svg icon here
 *
 * @summary - custom element to add default icon, custom emoji, or svg icon to toast items
 *
 * @tag wc-toast-icon
 */
export default class WCToastIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = WCToastIcon.template();
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.icon = this.getAttribute('icon');
    this.type = this.getAttribute('type') || 'blank';
    this.setAttribute('aria-hidden', 'true');

    if (this.type === 'svg') return;

    this.icon =
      this.icon != null ? this.createIcon(this.type, this.icon) : this.createIcon(this.type);
    this.shadowRoot.appendChild(this.icon);
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
        errorIcon.innerHTML = `<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
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

  static template() {
    return `
    <style>
      /*
      * Author: Timo Lins
      * License: MIT
      * Source: 
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/checkmark.tsx
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/error.tsx
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/loader.tsx
      */

      :host {
        display: flex;
        align-self: flex-start;
        margin-block: 4px !important;
      }

      @keyframes circle-animation {
        from {
          transform: scale(0) rotate(45deg);
          opacity: 0;
        }
        to {
          transform: scale(1) rotate(45deg);
          opacity: 1;
        }
      }

      .checkmark-icon {
        width: 20px;
        opacity: 0;
        height: 20px;
        border-radius: 10px;
        background: #61d345;
        position: relative;
        transform: rotate(45deg);
        animation: circle-animation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        animation-delay: 100ms;
      }

      @keyframes checkmark-animation {
        0% {
          height: 0;
          width: 0;
          opacity: 0;
        }
        40% {
          height: 0;
          width: 6px;
          opacity: 1;
        }
        100% {
          opacity: 1;
          height: 10px;
        }
      }

      .checkmark-icon::after {
        content: '';
        box-sizing: border-box;
        animation: checkmark-animation 0.2s ease-out forwards;
        opacity: 0;
        animation-delay: 200ms;
        position: absolute;
        border-right: 2px solid;
        border-bottom: 2px solid;
        border-color: #fff;
        bottom: 6px;
        left: 6px;
        height: 10px;
        width: 6px;
      }

      @keyframes slide-in {
        from {
          transform: scale(0);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .error-icon {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #ff4b4b;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: slide-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }

      .error-icon svg{
        width: 16px;
        padding-left: 1px;
        height: 20px;
        stroke: #fff;
        animation: slide-in .2s ease-out;
        animation-delay: 100ms;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .loading-icon {
        height: 20px;
        width: 20px;
        position: relative;
        border-radius: 10px;
        background-color: white;
      }

      .loading-icon::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 4px;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border: 2px solid;
        border-radius: 100%;
        border-color: #e0e0e0;
        border-right-color: #616161;
        animation: rotate 1s linear infinite;
      }

      @media (prefers-color-scheme: dark) {
        ::slotted(svg) {
          stroke: var(--wc-toast-stroke, #fff);
        }
      }
    </style>
    <slot name="svg"></slot>
    `;
  }
}

customElements.define('wc-toast-icon', WCToastIcon);
