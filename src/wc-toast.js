/**
 * Available toast position:
 * - top-left
 * - top-right
 * - top-center
 * - bottom-left
 * - bottom-right
 * - bottom-center
 */
export default class WCToast extends HTMLElement {
  constructor() {
    super();
    this.MARGIN_ITEM = 16;
    this.toastsCount = 0;
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = WCToast.template();
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.position = this.getAttribute('position') || 'top-center';

    this.arrangeToastPosition(this.position);
  }

  /**
   * This method is to arrange the toast position based on the position attribute.
   * @param {string} position
   * @returns {void}
   * @memberof WCToast
   * @example
   * this.arrangeToastPosition('top-left');
   */
  arrangeToastPosition(position) {
    const top = position.includes('top');
    const verticalStyle = { top: top && 0, bottom: !top && 0 };
    const horizontalStyle = position.includes('center')
      ? 'center'
      : position.includes('right')
      ? 'flex-end'
      : 'flex-start';
    const factor = top ? 1 : -1;
    const toastWrapperDirection = top ? 'column-reverse' : 'column';

    const css = window.getComputedStyle(document.querySelector('html'));
    const scrollbarGutter = css.getPropertyValue('scrollbar-gutter');

    this.style.setProperty('--wc-toast-factor', factor);
    this.style.setProperty('--wc-toast-position', horizontalStyle);
    this.style.setProperty('--wc-toast-direction', toastWrapperDirection);

    const toastContainer = this.shadowRoot.querySelector('.wc-toast-container');

    toastContainer.style.top = verticalStyle.top;
    toastContainer.style.bottom = verticalStyle.bottom;
    toastContainer.style.right = scrollbarGutter.includes('stable') && '4px';
    toastContainer.style.justifyContent = horizontalStyle;
  }

  static template() {
    return `
    <style>
      :host {
        --wc-toast-factor: 1;
        --wc-toast-position: center;
        --wc-toast-direction: column-reverse;

        position: fixed;
        z-index: 9999;
        top: 16px;
        left: 16px;
        right: 16px;
        bottom: 16px;
        pointer-events: none;
      }

      .wc-toast-container {
        z-index: 9999;
        left: 0;
        right: 0;
        display: flex;
        position: absolute;
      }

      .wc-toast-wrapper {
        display: flex;
        flex-direction: var(--wc-toast-direction);
        justify-content: center;
        gap: 16px;
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
      }

      .wc-toast-wrapper * {
        pointer-events: auto;
      }
    </style>
    <div class="wc-toast-container">
      <div class="wc-toast-wrapper" aria-live="polite">
        <slot> </slot>
      </div>
    </div>
    `;
  }
}

customElements.define('wc-toast', WCToast);
