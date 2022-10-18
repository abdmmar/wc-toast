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
  new Promise(process.nextTick);
}
