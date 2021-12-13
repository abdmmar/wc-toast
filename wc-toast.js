import { loadHTML, getNodeHeight, getTranslateValues } from './utility.js';

export default class WCToast extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTML('./wc-toast.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.onSlotChange = this.onSlotChange.bind(this);
        this.toasItemSlot = this.shadowRoot.querySelector('slot');
        this.toasItemSlot.addEventListener('slotchange', this.onSlotChange);

        this.position = this.getAttribute('position') || 'top-center';

        this.arrangeToastPosition(this.position);
      })
      .catch((err) => console.error(err));
  }

  onSlotChange(e) {
    const lastToast = this.allToastItems().at(-1);

    if (lastToast) {
      this.recalculateToastPosition(lastToast);
    }
    this.arrangeToastPosition(this.position);
  }

  allToastItems() {
    return Array.from(document.querySelectorAll('wc-toast-item'));
  }

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
    const margin = {
      top: top && 16,
      bottom: !top && 16
    };

    const toastItems = document.querySelectorAll('wc-toast-item');

    for (const toast of toastItems) {
      toast.style.top = verticalStyle.top;
      toast.style.bottom = verticalStyle.bottom;
      toast.style.setProperty('--wc-toast-item-margin-top', margin.top);
      toast.style.setProperty('--wc-toast-item-margin-bottom', margin.bottom);
      toast.style.setProperty('--wc-toast-item-factor', factor);
      toast.style.right = scrollbarGutter.includes('stable') && '4px';
      toast.style.justifyContent = horizontalStyle;
      toast.style.transform = `translateY(${factor}px)`;
    }
  }

  recalculateToastPosition(node) {
    const toastOffset = getNodeHeight(node);
    const toastItems = this.allToastItems();

    const top = this.position.includes('top');

    if (toastItems.length > 0) {
      for (let i = 0; i < toastItems.length; i++) {
        const toast = toastItems[i];
        const { _, y } = getTranslateValues(toast);

        if (top) {
          toast.style.transform = `translateY(${toastOffset + y + 16}px)`;
        } else {
          toast.style.transform = `translateY(${(toastOffset - y + 16) * -1}px)`;
        }
      }
    }
  }
}
