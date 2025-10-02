import chevronIcon from '@/assets/icons/chevron.png';
import { h } from '@/shared/utils/h';

import styles from './ScrollButton.module.scss';

export const ScrollButton = () => {
  const btn = h(
    'button',
    {
      class: styles.button,
    },
    h('img', { src: chevronIcon, alt: 'chevron-icon' }),
  );

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const halfScreen = window.innerHeight / 2;

    const scrollingUp = currentScroll < lastScrollY;
    const farFromTop = currentScroll > halfScreen;

    if (scrollingUp && farFromTop) {
      btn.setAttribute('show', '');
    } else {
      btn.removeAttribute('show');
    }

    lastScrollY = currentScroll;
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return btn;
};
