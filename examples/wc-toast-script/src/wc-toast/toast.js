/**
 * Generate an id
 * @returns {string} id
 */
const generateId = (function () {
  let count = 0;
  return function () {
    return (++count).toString();
  };
})();

function createToast(
  message,
  type = 'blank',
  options = {
    icon: { type: '', content: '' },
    duration: '',
    closeable: false,
    theme: { type: 'light', style: { background: '', color: '', stroke: '' } }
  }
) {
  const id = generateId();
  const toastItem = createToastItem(id, type, options);
  const toastIcon = createToastIcon(type, options);
  const toastContent = createToastContent(message);

  toastItem.appendChild(toastIcon);
  toastItem.appendChild(toastContent);

  if (options.closeable) toastItem.appendChild(createToastCloseButton(toastItem));

  document.querySelector('wc-toast').appendChild(toastItem);

  return {
    id,
    type,
    message,
    ...options
  };
}

function createToastItem(id, type, options) {
  const { duration, theme } = options;
  const toastItem = document.createElement('wc-toast-item');
  const isDarkTheme = window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const prefersTheme = isDarkTheme?.matches ? 'dark' : 'light';

  toastItem.setAttribute('type', type);
  toastItem.setAttribute('duration', duration ? duration : '');
  toastItem.setAttribute('data-toast-item-id', id);
  toastItem.setAttribute('theme', theme?.type ? theme.type : prefersTheme);

  if (theme?.type === 'custom' && theme?.style) {
    const { background, stroke, color } = theme.style;
    toastItem.style.setProperty('--wc-toast-background', background);
    toastItem.style.setProperty('--wc-toast-stroke', stroke);
    toastItem.style.setProperty('--wc-toast-color', color);
  }

  return toastItem;
}

function createToastIcon(type, options) {
  const { icon } = options;
  const toastIcon = document.createElement('wc-toast-icon');

  toastIcon.setAttribute('type', icon?.type ? icon.type : type);
  toastIcon.setAttribute('icon', icon?.content && icon?.type === 'custom' ? icon.content : '');
  if (icon?.type === 'svg') toastIcon.innerHTML = icon?.content ? icon.content : '';

  return toastIcon;
}

function createToastContent(message) {
  const toastContent = document.createElement('wc-toast-content');
  toastContent.setAttribute('message', message);
  return toastContent;
}

function createToastCloseButton(toastItem) {
  const toastCloseButton = document.createElement('wc-toast-close-button');
  toastCloseButton.addEventListener('click', () => {
    toastItem.classList.add('dismiss-with-close-button');
  });
  return toastCloseButton;
}

/**
 * Create toast from type
 * @param {'blank' | 'success' | 'loading' | 'error' | 'custom'} type
 */
function createHandler(type) {
  /**
   * @param {string} message
   * @param {ToastOptions} [options]
   * @returns {string}
   */
  return function (message, options) {
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
 * @param {object} message
 * @param {string} message.loading
 * @param {string} message.success
 * @param {string} message.error
 * @param {ToastOptions} [options]
 * @returns {Promise}
 */
toast.promise = async function (
  promise,
  message = { loading: '', success: '', error: '' },
  options
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
