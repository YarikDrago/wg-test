import { autorun } from 'mobx';

import { AnimatedNumber } from '@/shared/ui/AnimatedNumbers/AnimatedNumber';
import { h } from '@/shared/utils/h';

import starIcon from '../../../../../../assets/images/Star 1.png';
import styles from './ModalContent.module.scss';

export const tankOptions = [
  { value: 1, label: 'Стандартная' },
  { value: 1.1, label: 'Элитная' },
  { value: 1.2, label: 'Премиум' },
];

export function createModalContent(store) {
  const tankName = h('h1', {}, 'NAME');
  const header = h('header', { class: styles.header }, tankName);

  const playModeTitle = h('h4', {}, 'Комплектация');

  const PlayModeSelector = (name = 'tankType') => {
    const radioInputs = [];

    const container = h(
      'div',
      { class: styles.playModeSelector },
      tankOptions.map((opt, index) => {
        const radio = h('input', {
          type: 'radio',
          name,
          value: opt.value,
        });

        // Устанавливаем первый элемент выбранным по умолчанию
        if (index === 0) {
          radio.checked = true;
        }

        // Добавляем обработчик изменения
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            store.setCoefMode(e.target.value);
          }
        });

        radioInputs.push(radio);

        return h('label', { class: styles.radioLabel }, [
          radio,
          h('span', { class: styles.custom }),
          ` ${opt.label}`,
        ]);
      }),
    );

    return { container, radioInputs };
  };

  const { container: playModeSelector, radioInputs } = PlayModeSelector();
  const playModeSelectorBlock = h('div', { class: styles.playModeBlock }, [
    playModeTitle,
    playModeSelector,
  ]);

  const titleSlider = h('h4', {}, 'Количество боёв');

  /* Range slider */
  const range = h('input', {
    class: styles.slider,
    type: 'range',
    min: '0',
    max: '300',
    step: '1',
    value: '0',
  });

  range.addEventListener('input', (e) => {
    store.setDaysValue(e.target.value);
  });

  const sliderWrapper = h('div', { class: styles.sliderWrapper }, [
    h('div', { class: styles.sliderBackground }, [range]),
  ]);

  const sliderBlock = h('div', { class: styles.sliderBlock }, [
    titleSlider,
    h('div', { class: styles.slider }, sliderWrapper),
  ]);

  const titleExp = h('h4', {}, 'Опыт танка');
  const resultIndicator = new AnimatedNumber({ value: '0', class: 'indicator' });

  const resultLine = () => {
    const star = h('img', { class: styles.star, src: starIcon, alt: 'star' });
    return h('div', { class: styles.resultLine }, [star, resultIndicator.element]);
  };

  const expBlock = h('div', { class: styles.expBlock }, [titleExp, resultLine()]);

  /* Number input */
  const numberInput = h('input', {
    class: styles.numberInput,
    type: 'number',
    min: '0',
    max: '300',
    step: '1',
    value: '0',
  });

  function inputCorrectValue(e) {
    const value = parseInt(e.target.value, 10);

    if (value < 0) {
      e.target.value = 0;
    } else if (value > 300) {
      e.target.value = 300;
    } else if (isNaN(value)) {
      e.target.value = 0;
    }
  }

  numberInput.addEventListener('input', (e) => {
    inputCorrectValue(e);

    store.setDaysValue(e.target.value);
  });

  /* Additional check of the value on blur */
  numberInput.addEventListener('blur', (e) => {
    inputCorrectValue(e);
    store.setDaysValue(e.target.value);
  });

  const inputBlock = h('div', { class: styles.inputBlock }, [numberInput]);

  const leftSide = h('div', { class: styles.leftSide }, [playModeSelectorBlock, sliderBlock]);
  const rightSide = h('div', { class: styles.rightSide }, [expBlock, inputBlock]);

  const content = h('div', { class: styles.modalContent }, [header, leftSide, rightSide]);

  function update() {
    const activeTank = store.activeTank;
    const daysValue = store.daysValue;
    const coefMode = store.coefMode;

    if (!activeTank) return;

    /* Update tank name */
    tankName.textContent = activeTank.name;

    // Обновляем значения в input и range (предотвращаем циклические обновления)
    if (numberInput.value !== String(daysValue)) {
      numberInput.value = daysValue;
    }

    if (range.value !== String(daysValue)) {
      range.value = daysValue;
    }

    /* Update slider progress background */
    const val = ((daysValue - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty('--val', `${val}%`);

    /* Update radio buttons state (checked/unchecked) */
    radioInputs.forEach((radio) => {
      const shouldBeChecked = Number(radio.value) === coefMode;
      if (radio.checked !== shouldBeChecked) {
        radio.checked = shouldBeChecked;
      }
    });

    /* Update result indicator with animation */
    resultIndicator.setValue(Math.round(store.calculatedExp));
  }

  autorun(() => {
    update();
  });

  return content;
}
