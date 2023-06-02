/**
 * @attr {string} message - message to be displayed in toast item
 *
 * @slot content - add your custom content such as HTMLElement to toast item
 *
 * @cssprop [--wc-toast-content-margin='4px 10px'] - margin of toast content
 * @cssprop [--wc-toast-color="#000"] - color. Default is #000
 * @cssprop [--wc-toast-font-family="'Roboto', 'Amiri', sans-serif"] - font-family. Default is 'Roboto', 'Amiri', sans-serif;
 * @cssprop [--wc-toast-font-size="16px"] - font-size. Default is 16px
 *
 * @summary - message or content to be displayed in toast item
 *
 * @tag wc-toast-content
 */
export default class WCToastContent extends HTMLElement {
    static template(): string;
    template: HTMLTemplateElement;
    connectedCallback(): void;
    message: string;
}
//# sourceMappingURL=wc-toast-content.d.ts.map