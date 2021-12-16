import { toast } from './src/index.js';

document.querySelector('.toast-closeable').addEventListener('click', () => {
  toast('What!', { closeable: true });
});

document.querySelector('.toast-error').addEventListener('click', () => {
  toast.error('Authentication failed');
});

document.querySelector('.toast-success').addEventListener('click', () => {
  toast.success('Authentication success');
});

document.querySelector('.toast-loading').addEventListener('click', () => {
  toast.loading('Authenticating...', { duration: 4000 });
});

document.querySelector('.toast-blank').addEventListener('click', () => {
  toast('Hello World!');
});

document.querySelector('.toast-promise').addEventListener('click', () => {
  toast.promise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((Math.random(10) * 10) % 2 === 0) {
          resolve('foo');
        } else {
          reject('bar');
        }
      }, 2500);
    }),
    {
      loading: 'Authenticating...',
      success: 'Authentication success!',
      error: 'Authentication failed!'
    }
  );
});

document.querySelector('.toast-svg').addEventListener('click', () => {
  toast('Custom SVG', {
    icon: {
      type: 'svg',
      content: `<svg
  slot="svg"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  width="20"
  height="20"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  />
</svg>`
    }
  });
});

document.querySelector('.toast-emoji').addEventListener('click', () => {
  toast('Hallooo', { icon: { type: 'custom', content: '👋🏻' } });
});
