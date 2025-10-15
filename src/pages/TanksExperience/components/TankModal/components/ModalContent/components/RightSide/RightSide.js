import { autorun } from 'mobx';

import starIcon from '@/assets/images/Star 1.png';
import { AnimatedNumber } from '@/shared/ui/AnimatedNumbers/AnimatedNumber';
import { h } from '@/shared/utils/h';

import styles from './RightSide.module.scss';

export const RightSide = (store) => {
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
  const rightSide = h('div', { class: styles.rightSide }, [expBlock, inputBlock]);

  function update() {
    const activeTank = store.activeTank;
    const daysValue = store.daysValue;

    if (!activeTank) return;

    /* Update input value and range value (prevent cyclic updates) */
    if (numberInput.value !== String(daysValue)) {
      numberInput.value = daysValue;
    }

    /* Update result indicator with animation */
    resultIndicator.setValue(Math.round(store.calculatedExp));
  }

  autorun(() => {
    update();
  });

  return rightSide;
};
