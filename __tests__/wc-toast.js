import { createToaster } from '../test/utils.js';

describe('wc-toast', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should add wc-toast with position=top-center to the DOM', () => {
    createToaster();
    const toaster = document.querySelector('wc-toast');

    expect(toaster.getAttribute('position')).toBe('top-center');
    expect(toaster.getAttribute('aria-live')).toBe('polite');
    expect(toaster.getAttribute('role')).toBe('status');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('center');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column-reverse');
    expect(toaster.outerHTML).toMatchSnapshot();
  });

  it('should add wc-toast with position=top-left to the DOM', () => {
    const position = 'top-left';
    createToaster(position);
    const toaster = document.querySelector('wc-toast');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('flex-start');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column-reverse');
    expect(toaster.outerHTML).toMatchSnapshot();
  });

  it('should add wc-toast with position=top-right to the DOM', () => {
    const position = 'top-right';
    createToaster(position);
    const toaster = document.querySelector('wc-toast');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('flex-end');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column-reverse');
    expect(toaster.outerHTML).toMatchSnapshot();
  });

  it('should add wc-toast with position=bottom-center to the DOM', () => {
    const position = 'bottom-center';
    createToaster(position);
    const toaster = document.querySelector('wc-toast');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('-1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('center');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column');
    expect(toaster.outerHTML).toMatchSnapshot();
  });

  it('should add wc-toast with position=bottom-left to the DOM', () => {
    const position = 'bottom-left';
    createToaster(position);
    const toaster = document.querySelector('wc-toast');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('-1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('flex-start');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column');
    expect(toaster.outerHTML).toMatchSnapshot();
  });

  it('should add wc-toast with position=bottom-right to the DOM', () => {
    const position = 'bottom-right';
    createToaster(position);
    const toaster = document.querySelector('wc-toast');

    expect(toaster.style.getPropertyValue('--wc-toast-factor')).toBe('-1');
    expect(toaster.style.getPropertyValue('--wc-toast-position')).toBe('flex-end');
    expect(toaster.style.getPropertyValue('--wc-toast-direction')).toBe('column');
    expect(toaster.outerHTML).toMatchSnapshot();
  });
});
