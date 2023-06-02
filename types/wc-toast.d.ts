/**
 * @attr {'top-center'|'top-left'|'top-right'|'bottom-center'|'bottom-left'|'bottom-right'} position - toast item elements position
 *
 * @slot - This is a default/unnamed slot
 *
 * @summary container for toast items
 *
 * @tag wc-toast
 */
export default class WCToast extends HTMLElement {
    static get observedAttributes(): string[];
    static template(): string;
    template: HTMLTemplateElement;
    connectedCallback(): void;
    position: any;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    arrangeToastPosition(position: any): void;
}
//# sourceMappingURL=wc-toast.d.ts.map