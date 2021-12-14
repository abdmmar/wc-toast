import { generateId } from './utility.js';

function createToast(message, type = 'blank', options) {
  const id = generateId();

  // create wc-toast-item
  const toastItem = document.createElement('wc-toast-item');
  toastItem.setAttribute('type', type);
  toastItem.setAttribute('duration', options.duration);
  toastItem.setAttribute('data-toast-item-id', id);

  // create wc-toast-icon
  const toastIcon = document.createElement('wc-toast-icon');
  toastIcon.setAttribute('type', type);
  toastIcon.setAttribute('icon', options.icon);

  //  create wc-toast-content
  const toastContent = document.createElement('wc-toast-content');
  toastContent.setAttribute('message', message);

  // append wc-toast-icon to wc-toast-item
  toastItem.appendChild(toastIcon);
  toastItem.appendChild(toastContent);

  // append wc-toast-item to wc-toast
  document.querySelector('wc-toast').appendChild(toastItem);

  return {
    id,
    type,
    message,
    ...options
  };
}

function createHandler(type) {
  return function (message, options = { icon: '', duration: '' }) {
    const toast = createToast(message, type, options);
    return toast.id;
  };
}

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
