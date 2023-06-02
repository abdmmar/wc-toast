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
declare function toast(message: string, options?: ToastOptions): string;
declare namespace toast {
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
//# sourceMappingURL=toast.d.ts.map