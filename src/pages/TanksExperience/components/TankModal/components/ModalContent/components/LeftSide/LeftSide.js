import { autorun } from 'mobx';

import { PLAY_MODE_OPTIONS } from '@/pages/TanksExperience/store';
import { RadioGroup } from '@/shared/ui/RadioGroup/RadioGroup';
import { Slider } from '@/shared/ui/Slider/Slider';
import { h } from '@/shared/utils/h';

import styles from './LeftSide.module.scss';

export const LeftSide = (store) => {
  const playModeTitle = h('h4', {}, 'Комплектация');

  const playModeSelector = new RadioGroup({
    options: PLAY_MODE_OPTIONS,
    name: 'tankType',
    onChange: (value) => {
      store.setCoefMode(value);
    },
  });

  const playModeSelectorBlock = h('div', { class: styles.playModeBlock }, [
    playModeTitle,
    playModeSelector.container,
  ]);

  const slider = new Slider({
    min: '0',
    max: '300',
    step: '1',
    value: '0',
    onChange: (value) => {
      store.setDaysValue(value);
    },
  });

  const sliderWrapper = h('div', { class: styles.sliderWrapper }, slider.element);

  const titleSlider = h('h4', {}, 'Количество боёв');

  const sliderBlock = h('div', { class: styles.sliderBlock }, [titleSlider, sliderWrapper]);

  const leftSide = h('div', { class: styles.leftSide }, [playModeSelectorBlock, sliderBlock]);

  function update() {
    const activeTank = store.activeTank;
    const daysValue = store.daysValue;
    const coefMode = store.coefMode;

    if (!activeTank) return;

    slider.changeValue(daysValue);
    playModeSelector.change(coefMode);
  }

  autorun(() => {
    update();
  });

  return leftSide;
};
