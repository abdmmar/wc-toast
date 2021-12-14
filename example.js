import { toast } from './index.js';

document.querySelector('.toast').addEventListener('click', () => {
  if ((Math.random(10) * 10) % 2 === 0) {
    promiseToast();
  } else {
    manualToast();
  }
});

function promiseToast() {
  // Automatically add success or error toast in promise
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
}

function manualToast() {
  // Manually dismiss toast
  const id = toast.loading('Auth...');

  setTimeout(() => {
    if ((Math.random(10) * 10) % 2 === 0) {
      toast.success('Auth success!');
      toast.dismiss(id);
    } else {
      toast.error('Auth failed!');
      toast.dismiss(id);
    }
  }, 1000);
}
