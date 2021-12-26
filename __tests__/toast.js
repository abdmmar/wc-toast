import {
  createToaster,
  createButtonToast,
  getToastItemFromDOM,
  flushPromises
} from '../test/utils.js';
import { toast } from '../src/index.js';

let toastItemCount = 1;
const SVG_BELL = `<svg slot="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`;

describe('toast', () => {
  beforeEach(() => {
    createToaster();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    toastItemCount++;
  });

  it('should add blank wc-toast-item to the DOM', () => {
    const message = 'Hello World';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast('Hello World');
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('blank');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add success wc-toast-item to the DOM', () => {
    const message = 'Success';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast.success(message);
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('success');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('success');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add error wc-toast-item to the DOM', () => {
    const message = 'Error';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast.error(message);
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('error');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('error');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add promise-success wc-toast-item to the DOM', async () => {
    const loadingMessage = 'Authenticating...';
    const successMessage = 'Authentication success!';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast.promise(
        new Promise((resolve, reject) => {
          resolve('foo');
        }),
        {
          loading: loadingMessage,
          success: successMessage,
          error: 'Authentication failed!'
        }
      );
    });

    button.click();

    let [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('loading');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot('loading');

    expect(toastIcon.getAttribute('type')).toBe('loading');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(loadingMessage);

    toastItemCount++;

    await flushPromises();

    [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('success');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot('success');

    expect(toastIcon.getAttribute('type')).toBe('success');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(successMessage);
  });

  it('should add promise-error wc-toast-item to the DOM', async () => {
    const loadingMessage = 'Authenticating...';
    const errorMessage = 'Authentication failed!';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast.promise(
        new Promise((resolve, reject) => {
          reject('bar');
        }),
        {
          loading: loadingMessage,
          success: 'Authentication success!',
          error: errorMessage
        }
      );
    });

    button.click();

    let [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('loading');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot('loading');

    expect(toastIcon.getAttribute('type')).toBe('loading');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(loadingMessage);

    toastItemCount++;

    await flushPromises();

    [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('error');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot('error');

    expect(toastIcon.getAttribute('type')).toBe('error');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(errorMessage);
  });

  it('should add emoji wc-toast-item to the DOM', () => {
    const message = 'Icon';
    const icon = '🤓';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast(message, { icon: { type: 'custom', content: icon } });
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('custom');
    expect(toastIcon.getAttribute('icon')).toBe(icon);
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add dark mode wc-toast-item to the DOM', () => {
    const message = '❤ Dark mode';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast(message, { theme: { type: 'dark' } });
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('dark');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('blank');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add custom svg wc-toast-item to the DOM', () => {
    const message = 'Custom SVG';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast(message, {
        icon: {
          type: 'svg',
          content: SVG_BELL
        }
      });
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('svg');
    expect(toastIcon.innerHTML).toBe(SVG_BELL);
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add custom style wc-toast-item to the DOM', () => {
    const message = 'Custom Style';
    const customStyle = { background: 'royalblue', color: 'white' };
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast(message, {
        theme: { type: 'custom', style: customStyle }
      });
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('custom');
    expect(toastItem.style.getPropertyValue('--wc-toast-background')).toBe(customStyle.background);
    expect(toastItem.style.getPropertyValue('--wc-toast-stroke')).toBe('undefined');
    expect(toastItem.style.getPropertyValue('--wc-toast-color')).toBe(customStyle.color);
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('blank');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
  });

  it('should add closeable wc-toast-item to the DOM', () => {
    const message = 'Closeable';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toast(message, { closeable: true });
    });

    button.click();

    const [toastItem, toastIcon, toastContent] = getToastItemFromDOM();
    const toaseCloseButton = toastItem.querySelector('wc-toast-close-button');

    expect(toaster.childElementCount).toBe(1);

    expect(toastItem.getAttribute('type')).toBe('blank');
    expect(toastItem.getAttribute('data-toast-item-id')).toBe(toastItemCount.toString());
    expect(toastItem.getAttribute('theme')).toBe('light');
    expect(toastItem.outerHTML).toMatchSnapshot();

    expect(toastIcon.getAttribute('type')).toBe('blank');
    expect(toastIcon.getAttribute('aria-hidden')).toBe('true');

    expect(toastContent.getAttribute('message')).toBe(message);
    expect(toaseCloseButton).toBeTruthy();

    toaseCloseButton.click();
  });

  it('should add dismiss wc-toast-item to the DOM', () => {
    let toastId;
    const message = 'Dismiss';
    const toaster = document.querySelector('wc-toast');
    const button = createButtonToast(() => {
      toastId = toast(message);
    });

    button.click();

    toast.dismiss(toastId);

    expect(toaster.childElementCount).toBe(0);
  });

  it.todo('should render wc-toast-item and then removed from the DOM after timeout');
});
