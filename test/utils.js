export function createToaster(position = 'top-center') {
  const toaster = document.createElement('wc-toast');
  toaster.setAttribute('position', position);
  document.body.appendChild(toaster);
  return toaster;
}

export function createButtonToast(callback) {
  const button = document.createElement('button');
  button.addEventListener('click', callback);
  document.body.appendChild(button);
  return button;
}

export function getToastItemFromDOM() {
  const toastItem = document.querySelector('wc-toast-item');
  const toastIcon = toastItem.querySelector('wc-toast-icon');
  const toastContent = toastItem.querySelector('wc-toast-content');
  return [toastItem, toastIcon, toastContent];
}

/**
 * Used to wait action promise until it's finished
 * Source: https://stackoverflow.com/questions/44741102/how-to-make-jest-wait-for-all-asynchronous-code-to-finish-execution-before-expec
 */
export function flushPromises() {
  new Promise(setImmediate);
}

/**
 * Safely accesses an object using a flattened key
 *
 * @param {Object} obj base object
 * @param {String} key dot delimited access key for the object
 * @param {Object} defaultReturn default return when a match isn't found
 */
 export const get = (obj, key, defaultReturn = null) => {
  const res = key
    .split('.')
    .reduce((returnVal, currentKey) => (returnVal ? returnVal[currentKey] : defaultReturn), obj);
  return res !== null && res !== undefined ? res : defaultReturn;
}