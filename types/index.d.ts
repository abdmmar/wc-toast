declare module "index" {
    import toast from "toast";
    import WCToast from "wc-toast";
    import WCToastItem from "wc-toast-item";
    import WCToastContent from "wc-toast-content";
    import WCToastIcon from "wc-toast-icon";
    import WCToastCloseButton from "wc-toast-close-button";
    export { toast, WCToast, WCToastItem, WCToastContent, WCToastIcon, WCToastCloseButton };
}
declare module "toast" {
    export default toast;
    export type ToastOptions = {
        icon?: {
            type?: string;
            content?: string;
        };
        duration?: number;
        theme?: {
            type?: 'light' | 'dark' | 'custom';
            style?: {
                background?: string;
                color?: string;
                stroke?: string;
            };
        };
        closeable?: boolean;
    };
    /**
     * Author: Timo Lins
     * License: MIT
     * Source: https://github.com/timolins/react-hot-toast/blob/main/src/core/toast.ts
     */
    /**
     * @typedef {Object} ToastOptions
     * @property {object} [icon]
     * @property {string} [icon.type]
     * @property {string} [icon.content]
     * @property {number} [duration=3500]
     * @property {object} [theme]
     * @property {'light' | 'dark' | 'custom'} [theme.type="light"]
     * @property {object} [theme.style]
     * @property {string} [theme.style.background]
     * @property {string} [theme.style.color]
     * @property {string} [theme.style.stroke]
     * @property {boolean} [closeable=false]
     */
    /**
     * Create blank toast
     * @param {string} message
     * @param {ToastOptions} [options]
     * @returns {string}
     */
    function toast(message: string, options?: ToastOptions): string;
    namespace toast {
        function loading(message: string, options?: ToastOptions): string;
        function success(message: string, options?: ToastOptions): string;
        function error(message: string, options?: ToastOptions): string;
        /**
         * Dismiss toast by id
         * @param {string} id
         * @returns {void}
         * @example
         * const id = toast.loading('Loading...')
         * ...
         * toast.dismiss(id);
         */
        function dismiss(toastId: any): void;
        /**
         * Automatically add loading toast, success or error toast in promise
         * @param {Promise} promise
         * @param {object} message
         * @param {string} message.loading
         * @param {string} message.success
         * @param {string} message.error
         * @param {ToastOptions} [options]
         * @returns {Promise}
         */
        function promise(promise: Promise<any>, message?: {
            loading: string;
            success: string;
            error: string;
        }, options?: ToastOptions): Promise<any>;
    }
}
declare module "wc-toast-close-button" {
    /**
     * @cssprop [--wc-toast-stroke=#2a2a32] - stroke. Default is #2a2a32;
     *
     * @summary - button to dismiss toast item
     *
     * @tag wc-toast-close-button
     */
    export default class WCToastCloseButton extends HTMLElement {
        static template(): string;
        template: HTMLTemplateElement;
    }
}
declare module "wc-toast-content" {
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
}
declare module "wc-toast-icon" {
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
}
declare module "wc-toast-item" {
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
}
declare module "wc-toast" {
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
}
//# sourceMappingURL=index.d.ts.map