import './Slider.scss';

export class Slider {
  #backdrop;
  #slider;
  #onChange;
  // #valuePercent = 0;

  constructor({ min = 0, max = 100, step = 1, onChange }) {
    this.#onChange = onChange;
    // this.#valuePercent = (min / (max - min)) * 100;
    this.#backdrop = document.createElement('div');
    this.#backdrop.classList.add('slider-backdrop');
    this.#slider = document.createElement('input');
    this.#slider.classList.add('slider');
    this.#slider.type = 'range';
    this.#slider.min = min;
    this.#slider.max = max;
    this.#slider.step = step;
    this.#slider.value = min;
    this.#determineValuePercent(min);

    this.#slider.addEventListener('input', (e) => {
      this.#onChange(e.target.value);
      this.#determineValuePercent(e.target.value);
    });

    this.#backdrop.append(this.#slider);
  }

  #determineValuePercent(value) {
    const valuePercent = (value / (this.#slider.max - this.#slider.min)) * 100;
    this.#slider.style.setProperty('--val', `${valuePercent}%`);
  }

  get element() {
    return this.#backdrop;
  }

  changeValue(value) {
    let newValue = value;
    if (value > this.#slider.max) {
      newValue = this.#slider.max;
    } else if (value < this.#slider.min) {
      newValue = this.#slider.min;
    }
    this.#slider.value = newValue;
    this.#determineValuePercent(newValue);
  }
}
