import './AnimatedNumber.scss';

export class AnimatedNumber {
  #el;
  #currentValue = 0;
  #animationFrame = null;
  // #isAnimating = false;

  constructor(initialValue = 0, className = '') {
    this.#el = document.createElement('p');
    this.#el.className = `${'indicator'} ${className}`;
    this.#el.textContent = initialValue;
  }

  get element() {
    return this.#el;
  }

  setValue(newValue, duration = 500) {
    if (this.#animationFrame) {
      cancelAnimationFrame(this.#animationFrame);
    }

    const start = this.#currentValue;
    const end = newValue;
    const diff = end - start;
    const startTime = performance.now();
    // this.#isAnimating = true;
    this.#el.classList.add('updating');

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      /* Progress of the animation (0-1)
       Limit progress to 1 to avoid overflow.
      * */
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      /* Animation display value.
       Always show positive value.*/
      const current = Math.abs(Math.round(start + diff * easeOut));
      this.#el.textContent = current;

      /* If animation is not finished, request next frame */
      if (progress < 1) {
        this.#animationFrame = requestAnimationFrame(animate);
      } else {
        // this.#isAnimating = false;
        this.#el.classList.remove('updating');
        this.#currentValue = end;
      }
    };

    this.#animationFrame = requestAnimationFrame(animate);
  }
}
