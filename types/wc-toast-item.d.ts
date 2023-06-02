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
    static get observedAttributes(): string[];
    static template(): string;
    createdAt: Date;
    EXIT_ANIMATION_DURATION: number;
    template: HTMLTemplateElement;
    connectedCallback(): void;
    type: string;
    theme: string;
    duration: string | number;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    getDurationByType(type: any): number;
}
//# sourceMappingURL=wc-toast-item.d.ts.map