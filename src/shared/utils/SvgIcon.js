/**
 * Universal component for loading and displaying SVG
 * @param {string} src - Path to the SVG file (it must be imported as a data URI)
 * @param {string} className - CSS class
 * @param {string} alt - Alt text
 * @returns {SVGElement} - SVG element
 */
export function SvgIcon({ src, className = '', alt = '' }) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  if (className) {
    svg.classList.add(className);
  }

  if (alt) {
    svg.setAttribute('aria-label', alt);
    svg.setAttribute('role', 'img');
  }

  /* Upload SVG content */
  fetch(new URL(src, import.meta.url).href)
    .then((response) => response.text())
    .then((svgContent) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      /* Copy attributes */
      Array.from(svgElement.attributes).forEach((attr) => {
        svg.setAttribute(attr.name, attr.value);
      });

      /* Copy the content */
      svg.innerHTML = svgElement.innerHTML;

      // Сохраняем класс, если он был добавлен ранее
      if (className) {
        svg.classList.add(className);
      }
    })
    .catch((error) => {
      console.error('Error loading SVG:', error);
    });

  return svg;
}
