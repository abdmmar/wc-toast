# wc-toast

Add notifications component easily using wc-toast. Vanilla JavaScript web component notification inspired by react-hot-toast

## Features

- ✍🏻 **Easy to use**
- 🌏 **Use anywhere you like** - _[React][react-wc-toast]? [Vue][vue-wc-toast]? [Svelte][svelte-wc-toast]? Everywhere!_
- 👋🏻 **Emoji and SVG Support**
- 🎨 **Customizable**
- 🚥 **Promise API**
- ✅ **Accessible** - _Tested using Windows 10 Narrator_
- 🍃 **Lightweight** - _Only ~3.6KB Minified+Gzipped including styles_
- 💙 **Dark Mode**

## Installation

Add from NPM

```bash
npm i wc-toast
```

or import from CDN

```js
import { toast } from 'https://cdn.skypack.dev/wc-toast';
```

## Demo

[![Open wc-toast demo on Stackblitz](https://camo.githubusercontent.com/449b29bcd2bc469248faeece273f4e139f92a8d03e042de6214c94e9fa63c02a/68747470733a2f2f692e696d6775722e636f6d2f767232614267412e706e67)](https://stackblitz.com/edit/js-km237v?file=index.js)

or just try it on [https://abdmmar.github.io/wc-toast](https://abdmmar.github.io/wc-toast)

## Usage and Example

### Basic Usage

1. Make sure you've add `wc-toast` to your app through NPM or CDN. See [Installation](#installation) for more details.
2. Add `wc-toast` to your app and placed it at the top.

   ```html
   <body>
      <wc-toast></wc-toast>
      <button class="toast"></button>
   </body>
   ```

3. Start toasting! Call it from anywhere in your app.

   ```js
   import { toast } from 'wc-toast'
   // or if you use CDN:
   // import { toast } from 'https://cdn.skypack.dev/wc-toast';

   document.querySelector('.toast').addEventListener('click', () => {
     toast('Hello world!');
   });
   ```

### Example

- [Usage with React][react-wc-toast]
- [Usage with Vue 3][vue-wc-toast]
- [Usage with Svelte][svelte-wc-toast]

[react-wc-toast]: https://stackblitz.com/edit/react-ts-wp4wxh?file=index.tsx
[vue-wc-toast]: https://stackblitz.com/edit/vue-ob3n7x?file=src%2FApp.vue
[svelte-wc-toast]: https://stackblitz.com/edit/vitejs-vite-y98sm9?file=src%2FApp.svelte&terminal=dev

## Guide

### React TypeScript

If you are using the `wc-toast` in a React TypeScript project, you'll need to add `wc-toast.d.ts` type definitions to ensure proper type checking.

```ts
// wc-toast.d.ts
import { WCToast, WCToastItem, WCToastIcon, WCToastContent, WCToastCloseButton } from 'wc-toast';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wc-toast': React.DetailedHTMLProps<React.HTMLAttributes<WCToast>, WCToast>;
      'wc-toast-item': React.DetailedHTMLProps<React.HTMLAttributes<WCToastItem>, WCToastItem>;
      'wc-toast-icon': React.DetailedHTMLProps<React.HTMLAttributes<WCToastIcon>, WCToastIcon>;
      'wc-toast-content': React.DetailedHTMLProps<
        React.HTMLAttributes<WCToastContent>,
        WCToastContent
      >;
      'wc-toast-close-button': React.DetailedHTMLProps<
        React.HTMLAttributes<WCToastCloseButton>,
        WCToastCloseButton
      >;
    }
  }
}
```

If you are using Vite, place your `wc-toast.d.ts` inside `src/` folder

### Styling

You can customize style of wc-toast-item through custom properties

#### Default

##### wc-toast-item

```css
--wc-toast-background: #fff;
--wc-toast-max-width: 350px;
--wc-toast-stroke: #2a2a32;
--wc-toast-color: #000;
--wc-toast-font-family: 'Roboto', sans-serif;
--wc-toast-font-size: 16px;
--wc-toast-border-radius: 8px;
--wc-toast-content-margin: 4px 10px;
```

## API

#### toast()

```js
toast(
   message: string,
   options: {
      icon: {
        type: 'success' | 'loading' | 'error' | 'custom' | 'svg';
        content: string;
   };
   duration: number | 4000;
   theme: {
      type: 'light' | 'dark' | 'custom';
      style: {
         background: string;
         color: string;
         stroke: string;
      };
   };
})
```

#### wc-toast

```html
<wc-toast position="top-left | top-right | top-center | bottom-left | bottom-right | bottom-center">
  <slot></slot>
</wc-toast>
```

#### wc-toast-item

```html
<wc-toast-item
  type="success | loading | error | blank | custom"
  theme="light | dark | custom"
  duration="number | 3500 | 6000000"
>
  <slot></slot>
</wc-toast-item>
```

#### wc-toast-icon

```html
<wc-toast-icon icon="string" type="success | loading | error | blank | custom">
  <slot name="svg"></slot>
</wc-toast-icon>
```

#### wc-toast-content

```html
<wc-toast-content message="string">
  <slot name="message"></slot>
  <slot name="content"></slot>
</wc-toast-content>
```

#### wc-toast-close-button

```html
<wc-toast-close-button></wc-toast-close-button>
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Credit

Thanks to [react-hot-toast](https://react-hot-toast.com/) for an amazing library and such an inspiration. If you build a React project and need notifications, you should check out this library.

## License

[MIT License](LICENSE)
