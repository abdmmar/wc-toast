import { loadHTML, getTranslateValues } from './utility.js';

// TODO:
// - Add support for custom toast item styles with custom properties
// - Add support for dark mode
//-  Add support for update toast to use in toast.promise()

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
  }

  connectedCallback() {
    loadHTML('./src/wc-toast.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
        this.setAttribute('aria-live', 'polite');

        this.position = this.getAttribute('position') || 'top-center';

        this.arrangeToastPosition(this.position);
      })
      .catch((err) => console.error(err));
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

    this.style.setProperty('--wc-toast-item-factor', factor);
    this.style.setProperty('--wc-toast-item-position', horizontalStyle);
    this.style.setProperty('--wc-toast-wrapper-direction', toastWrapperDirection);

    const toastContainer = this.shadowRoot.querySelector('.wc-toast-container');

    toastContainer.style.top = verticalStyle.top;
    toastContainer.style.bottom = verticalStyle.bottom;
    toastContainer.style.right = scrollbarGutter.includes('stable') && '4px';
    toastContainer.style.justifyContent = horizontalStyle;
  }
}

customElements.define('wc-toast', WCToast);
