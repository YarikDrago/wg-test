import { PLAY_MODE_OPTIONS, tankStore } from '@/pages/TanksExperience/store';
import { h } from '@/shared/utils/h';

import styles from './RadioGroup.module.scss';

export const RadioGroup = () => {
  const radioInputs = [];

  const container = h(
    'div',
    { class: styles.playModeSelector },
    PLAY_MODE_OPTIONS.map((opt, index) => {
      const radio = h('input', {
        type: 'radio',
        name,
        value: opt.value,
      });

      /* Always check the first radio button */
      if (index === 0) {
        radio.checked = true;
      }

      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          tankStore.setCoefMode(e.target.value);
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
