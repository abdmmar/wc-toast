import { loadHTML, getTranslateValues } from './utility.js';

// TODO:
// - Add calculate toast item position when toast item is removed
// - Add support for custom toast item position
// - Add support for custom toast item styles with custom properties
// - Add support for dark mode

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
    loadHTML('./wc-toast.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
        this.setAttribute('aria-live', 'polite');

        this.onSlotChange = this.onSlotChange.bind(this);
        this.toastItemSlot = this.shadowRoot.querySelector('slot');
        this.toastItemSlot.addEventListener('slotchange', this.onSlotChange);

        this.position = this.getAttribute('position') || 'top-center';

        this.arrangeToastPosition(this.position);
      })
      .catch((err) => console.error(err));
  }

  /**
   * This method is to listen to slotchange event on wc-toast slot and detect when a new toast is added or removed.
   * @returns {void}
   */
  onSlotChange() {
    this.arrangeToastPosition(this.position);
    const toastCount = this.getToasts().length;

    if (toastCount === 0) {
      /**
       * If all toasts are removed, set the toast count to 0
       */
      this.toastsCount = 0;
    } else if (toastCount < this.toastsCount) {
      /**
       * If the toastsCount is less than the previous toast count,
       * then the toast has been removed.
       * So we need to set the toastsCount to the current toast count.
       */
      this.toastsCount = toastCount;
    } else if (toastCount > this.toastsCount) {
      /**
       * If the toastsCount is greater than the previous toast count,
       * then the toast has been added.
       * So we need to set the toastsCount to the current toast count.
       */
      this.toastsCount = toastCount;
      /**
       * This is to recalculate the toast position when a new toast is added.
       * This is to avoid the toast to jump when a new toast is removed.
       */
      this.recalculateToastPosition();
    }
  }

  /**
   * This method is to get all the toast items.
   * @returns {NodeList}
   * @memberof WCToast
   */
  getToasts() {
    return Array.from(document.querySelectorAll('wc-toast-item'));
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
    const css = window.getComputedStyle(document.querySelector('html'));
    const scrollbarGutter = css.getPropertyValue('scrollbar-gutter');
    const margin = { top: top && 16, bottom: !top && 16 };

    const toastItems = this.getToasts();

    for (const toast of toastItems) {
      toast.style.top = verticalStyle.top;
      toast.style.bottom = verticalStyle.bottom;
      toast.style.setProperty('--wc-toast-item-margin-top', margin.top);
      toast.style.setProperty('--wc-toast-item-margin-bottom', margin.bottom);
      toast.style.setProperty('--wc-toast-item-factor', factor);
      toast.style.right = scrollbarGutter.includes('stable') && '4px';
      toast.style.justifyContent = horizontalStyle;
    }
  }

  /**
   * This method is to recalculate the toast position when a new toast is added.
   * Calculation is based on position attribute on wc-toast.
   * @returns {void}
   * @memberof WCToast
   */
  recalculateToastPosition() {
    const top = this.position.includes('top');
    const toasts = this.getToasts();

    if (toasts.length === 0) return;

    if (toasts.length === 1) {
      if (top) return (toasts.at(0).style.transform = `translateY(0px)`);

      return (toasts.at(0).style.transform = `translateY(-1px)`);
    }

    setTimeout(() => {
      const recentToast = toasts.pop();
      const toastOffset = recentToast.clientHeight;

      for (const toast of toasts) {
        const { _, y } = getTranslateValues(toast);

        if (top) {
          toast.style.transform = `translateY(${toastOffset + y + this.MARGIN_ITEM}px)`;
        } else {
          toast.style.transform = `translateY(${(toastOffset - y + this.MARGIN_ITEM) * -1}px)`;
        }
      }
    }, 100);
  }
}
