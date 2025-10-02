import { h } from '@/shared/utils/h';

import styles from './TankCard.module.scss';

export function TankCard({ id, name, img }) {
  const card = h('div', { class: styles.tankCard, 'data-tank-id': id }, [
    h('img', { src: `/src/assets/images/tanks/${img}`, alt: name }),
    h('div', { class: 'tank-name' }, name),
  ]);
  return card;
}
