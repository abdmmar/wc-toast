export default toast;
/**
 * Author: Timo Lins
 * License: MIT
 * Source: https://github.com/timolins/react-hot-toast/blob/main/src/core/toast.ts
 */
/**
 * Create blank toast
 * @param {string} message
 * @param {object} options
 * @param {object} options.icon
 * @param {'success' | 'loading' | 'error' | 'custom' | 'svg'} options.icon.type
 * @param {string} options.icon.content
 * @param {number} options.duration
 * @param {object} options.theme
 * @param {'light' | 'dark' | 'custom'} options.theme.type
 * @param {object} options.theme.style
 * @param {string} options.theme.style.background
 * @param {string} options.theme.style.color
 * @param {string} options.theme.style.stroke
 * @returns {string}
 */
declare function toast(message: string, options: {
    icon: {
        type: 'success' | 'loading' | 'error' | 'custom' | 'svg';
        content: string;
    };
    duration: number;
    theme: {
        type: 'light' | 'dark' | 'custom';
        style: {
            background: string;
            color: string;
            stroke: string;
        };
    };
}): string;
declare namespace toast {
    function loading(message: any, options?: {
        icon: {
            type: string;
            content: string;
        };
        duration: string;
        closeable: boolean;
        theme: {
            type: string;
            style: {
                background: string;
                color: string;
                stroke: string;
            };
        };
    }): any;
    function success(message: any, options?: {
        icon: {
            type: string;
            content: string;
        };
        duration: string;
        closeable: boolean;
        theme: {
            type: string;
            style: {
                background: string;
                color: string;
                stroke: string;
            };
        };
    }): any;
    function error(message: any, options?: {
        icon: {
            type: string;
            content: string;
        };
        duration: string;
        closeable: boolean;
        theme: {
            type: string;
            style: {
                background: string;
                color: string;
                stroke: string;
            };
        };
    }): any;
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
     * @param {string} message.loading
     * @param {string} message.success
     * @param {string} message.error
     * @param {object} options
     * @returns {Promise}
     */
    function promise(promise: Promise<any>, message: {
        loading: string;
        success: string;
        error: string;
    }, options: any): Promise<any>;
}
