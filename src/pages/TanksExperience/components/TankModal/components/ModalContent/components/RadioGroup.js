import './RadioGroup.scss';

export class RadioGroup {
  #container;
  #radioInputs = [];
  #onChange;

  constructor({ options, name, onChange }) {
    this.#onChange = onChange;
    this.#container = document.createElement('div');
    this.#container.classList.add('radio-group-container');

    options.forEach((opt, index) => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = name | 'radio-group';
      radio.value = opt.value;

      if (index === 0) {
        radio.checked = true;
      }

      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.#onChange(e.target.value);
        }
      });

      this.#radioInputs.push(radio);

      const span = document.createElement('span');

      const label = document.createElement('label');
      label.append(radio);
      label.append(span);
      label.append(opt.label);

      this.#container.append(label);
    });
  }

  get container() {
    return this.#container;
  }

  get radioInputs() {
    return this.#radioInputs;
  }

  change(value) {
    this.#radioInputs.forEach((radio) => (radio.checked = radio.value == value));
  }
}
