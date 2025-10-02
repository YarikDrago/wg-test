import { h } from '@/shared/utils/h';

import styles from './TankCard.module.scss';

export function TankCard({ id, name, img, tankStore }) {
  const hasPointer = window.matchMedia('(pointer: fine)').matches;
  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  const card = h('div', { class: styles.tankCard, 'data-tank-id': id }, [
    h('img', { src: `/src/assets/images/tanks/${img}`, alt: name }),
    h('div', { class: 'tank-name' }, name),
  ]);

  function onCardEnter() {
    tankStore.setActiveTank(id);
  }

  function onCardLeave(e) {
    const relatedTarget = e.relatedTarget;

    /* Check if the cursor is moving to the modal window */
    const isMovingToModal =
      relatedTarget &&
      (relatedTarget.closest('[data-modal]') || relatedTarget.closest('[data-tank-id]'));

    if (!isMovingToModal) {
      tankStore.setActiveTank(null);
    }
  }

  /* For mobile devices, only click */
  if (isMobile) {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      onCardEnter();
    });
  } else if (hasPointer) {
    /* For desktop devices, only hover */
    card.addEventListener('mouseenter', onCardEnter);
    card.addEventListener('mouseleave', onCardLeave);
  } else {
    /* For touch screen devices, only click */
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      onCardEnter();
    });
  }

  return card;
}
