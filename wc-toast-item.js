import { loadHTML } from './utility.js';

export default class WCToastItem extends HTMLElement {
  constructor() {
    super();
    this.EXIT_ANIMATION_DURATION = 350;
  }
  connectedCallback() {
    loadHTML('./wc-toast-item.html')
      .then((html) => {
        const template = html.body.querySelector('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.duration = this.getAttribute('duration') || 4000;

        setTimeout(() => {
          this.shadowRoot.querySelector('.wc-toast-bar').classList.add('dismiss');

          setTimeout(() => {
            this.remove();
          }, this.EXIT_ANIMATION_DURATION);
        }, this.duration);
      })
      .catch((err) => console.error(err));
  }
}
