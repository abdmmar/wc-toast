# wc-toast

## Features

- 💙 Easy to use
- 👋🏻 Emoji Support
- 🔵 SVG Support
- 🎨 Customizable
- 🚥 Promise API
- ✅ Accessible

## Installation

Add from NPM

```
npm i wc-toast
```

or import from CDN

```
// UNPKG
```

and add it before the closing `</head>` tag in your HTML file.

## Demo

[![Open WCToast demo on Stackblitz](https://camo.githubusercontent.com/449b29bcd2bc469248faeece273f4e139f92a8d03e042de6214c94e9fa63c02a/68747470733a2f2f692e696d6775722e636f6d2f767232614267412e706e67)](#)

## Usage/Example

### Basic Usage

1. Make sure you've add `wc-toast` to your app through NPM or CDN. See [#Installation](#installation) for more details.
2. Add `wc-toast` to your app and placed it at the top.

   ```
   <body>
      <wc-toast></wc-toast>
      <button class="toast">
   </body>
   ```

3. Start toasting! Call it from anywhere in your app.
   ```
   document.querySelector('.toast').addEventListener('click', () => {
     toast('Hello world!');
   });
   ```

### Create your own toast

## Guide

### Styling

Custom styling through custom properties

#### Default

```
  --wc-toast-item-background: #ffffff;
```

## API

#### toast()

#### wc-toast

#### wc-toast-item

#### wc-toast-icon

#### wc-toast-content

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Credit

Thanks to [react-hot-toast](https://react-hot-toast.com/) for an amazing library and such an inspiration. If you build a React project and need notifications, you should check out this library.

## License

[MIT License](LICENSE)
