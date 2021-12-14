/**
 * Generate an id
 * @returns {string} id
 */
export const generateId = (() => {
  let count = 0;
  return () => {
    return (++count).toString();
  };
})();

/**
 * Load HTML file from specified path
 * @param {string} path
 * @returns {HTMLDocument}
 */
export async function loadHTML(path) {
  const response = await fetch(path);
  const doc = await response.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(doc, 'text/html');
  return html;
}

/*
 * Author: vsync
 * Source: https://stackoverflow.com/questions/5944038/getting-the-height-of-an-element-before-added-to-the-dom
 */

/**
 * Gets node element height
 * @param {HTMLElement} node
 * @returns {number} height
 */
export function getNodeHeight(node) {
  const clone = node.cloneNode(true);
  // Hide the meassured (cloned) element
  clone.style.visibility = 'hidden';
  // Add the clone element to the DOM
  document.body.appendChild(clone);
  // Measure the clone element
  const height = clone.clientHeight;
  // Remove the clone element from the DOM
  clone.parentNode.removeChild(clone);

  return parseInt(height);
}

/**
 * Author: Zell Liew
 * Source: https://zellwk.com/blog/css-translate-values-in-javascript/
 */

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
export function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix = style['transform'] || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === 'none' || typeof matrix === 'undefined') {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d';
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === '2d') {
    return {
      x: parseInt(matrixValues[4]),
      y: parseInt(matrixValues[5]),
      z: 0
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === '3d') {
    return {
      x: parseInt(matrixValues[12]),
      y: parseInt(matrixValues[13]),
      z: parseInt(matrixValues[14])
    };
  }
}
