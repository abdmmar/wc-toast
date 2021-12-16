import { generateId } from './utility.js';

// TODO
// - Add documentation for release to npm
// - Add package to unpkg, sykpack, etc
// - Publish web component -> https://justinfagnani.com/2019/11/01/how-to-publish-web-components-to-npm/

function createToast(message, type = 'blank', options) {
  const id = generateId();

  // create wc-toast-item
  const toastItem = document.createElement('wc-toast-item');
  toastItem.setAttribute('type', type);
  toastItem.setAttribute('duration', options.duration ? options.duration : '');
  toastItem.setAttribute('data-toast-item-id', id);

  // create wc-toast-icon
  const toastIcon = document.createElement('wc-toast-icon');
  toastIcon.setAttribute('type', options?.icon?.type ? options.icon.type : type);
  toastIcon.setAttribute(
    'icon',
    options?.icon?.content && options?.icon?.type === 'custom' ? options.icon.content : ''
  );

  if (options?.icon?.type === 'svg') {
    setTimeout(() => {
      toastIcon.innerHTML = options?.icon?.content ? options.icon.content : '';
    }, 100);
  }

  //  create wc-toast-content
  const toastContent = document.createElement('wc-toast-content');
  toastContent.setAttribute('message', message);

  // append wc-toast-icon to wc-toast-item
  toastItem.appendChild(toastIcon);
  toastItem.appendChild(toastContent);

  // create wc-toast-close-button
  if (options.closeable) {
    const toastCloseButton = document.createElement('wc-toast-close-button');
    toastCloseButton.addEventListener('click', () => {
      toastItem.classList.add('dismiss-with-close-button');
    });

    toastItem.appendChild(toastCloseButton);
  }

  // append wc-toast-item to wc-toast
  document.querySelector('wc-toast').appendChild(toastItem);

  return {
    id,
    type,
    message,
    ...options
  };
}

/**
 * Create toast from type
 * @param {'blank' | 'success' | 'loading' | 'error' | 'custom'} type
 */
function createHandler(type) {
  /**
   * @param {string} message
   * @param {object} options
   * @param {object} options.icon
   * @param {'success' | 'loading' | 'error' | 'custom' | 'svg'} options.icon.type
   * @param {string} options.icon.content
   * @param {number} options.duration
   * @param {boolean} options.closeable
   * @returns {string}
   */
  return function (
    message,
    options = { icon: { type: '', content: '' }, duration: '', closeable: false }
  ) {
    const toast = createToast(message, type, options);
    return toast.id;
  };
}

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
 * @returns {string}
 */
function toast(message, options) {
  return createHandler('blank')(message, options);
}

toast.loading = createHandler('loading');
toast.success = createHandler('success');
toast.error = createHandler('error');

/**
 * Dismiss toast by id
 * @param {string} id
 * @returns {void}
 * @example
 * const id = toast.loading('Loading...')
 * ...
 * toast.dismiss(id);
 */
toast.dismiss = function (toastId) {
  const toastItems = document.querySelectorAll('wc-toast-item');

  for (const toastItem of toastItems) {
    const dataId = toastItem.getAttribute('data-toast-item-id');

    if (toastId === dataId) {
      toastItem.classList.add('dismiss');
    }
  }
};

/**
 * Automatically add loading toast, success or error toast in promise
 * @param {Promise} promise
 * @param {string} message.loading
 * @param {string} message.success
 * @param {string} message.error
 * @param {object} options
 * @param {string} options.icon
 * @param {number} options.duration
 * @returns {Promise}
 */
toast.promise = async function (
  promise,
  message = { loading: '', success: '', error: '' },
  options = { icon: '', duration: '' }
) {
  const id = toast.loading(message.loading, { ...options });

  try {
    const result = await promise;
    toast.dismiss(id);
    toast.success(message.success, { ...options });
    return result;
  } catch (error) {
    toast.dismiss(id);
    toast.error(message.error, { ...options });
    return error;
  }
};

export default toast;
