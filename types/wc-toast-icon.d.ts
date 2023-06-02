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
    static template(): string;
    template: HTMLTemplateElement;
    connectedCallback(): void;
    icon: any;
    type: string;
    createIcon(toastType?: string, icon?: string): HTMLDivElement;
}
//# sourceMappingURL=wc-toast-icon.d.ts.map