import { Window } from 'happy-dom';
import test from 'ava';

let toast;
let document;

function createToaster(position = 'top-center') {
  const toaster = document.createElement('wc-toast');
  toaster.setAttribute('position', position);
  document.body.appendChild(toaster);
  return toaster;
}

function createButtonToast(callback) {
  const button = document.createElement('button');
  button.addEventListener('click', callback);
  document.body.appendChild(button);
  return button;
}

test.before((t) => {
  const window = new Window();

  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.customElements = window.customElements;
  globalThis.HTMLElement = window.HTMLElement;
});

test.beforeEach(async (t) => {
  const { toast: toastFn } = await import('../src/index.js');
  toast = toastFn;
  document = globalThis.document;
});

test('add wc-toast', (t) => {
  createToaster();

  t.is(document.querySelector('wc-toast').getAttribute('position'), 'top-center');
});

test('add blank toast to wc-toast', (t) => {
  createToaster();

  const message = 'Hello World';
  const button = createButtonToast(() => {
    toast(message);
  });

  button.click();

  const toastItem = document.querySelector('wc-toast-item');
  const toastContent = toastItem.querySelector('wc-toast-content');

  t.is(toastItem.getAttribute('type'), 'blank');
  t.is(toastItem.getAttribute('data-toast-item-id'), '1');
  t.is(toastItem.getAttribute('theme'), 'light');
  t.is(toastContent.getAttribute('message'), message);
  t.snapshot(toastItem.outerHTML);
});

test.todo('add error toast to wc-toast');
test.todo('add success toast to wc-toast');
test.todo('add loading toast to wc-toast');
test.todo('add loading-success toast to wc-toast');
test.todo('add promise toast to wc-toast');
test.todo('add emoji toast to wc-toast');
test.todo('add dark-mode toast to wc-toast');
test.todo('add custom style toast to wc-toast');
