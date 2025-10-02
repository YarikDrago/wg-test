import xIcon from '@/assets/icons/x-45.png';
import { h } from '@/shared/utils/h';

import styles from './CloseButton.module.scss';

export function CloseButton() {
  return h(
    'button',
    {
      class: styles.closeButton,
      'aria-label': 'Close',
      type: 'button',
    },
    h('img', { src: xIcon, alt: 'x' }),
  );
}
