import { autorun } from 'mobx';

import { LeftSide } from '@/pages/TanksExperience/components/TankModal/components/ModalContent/components/LeftSide/LeftSide';
import { RightSide } from '@/pages/TanksExperience/components/TankModal/components/ModalContent/components/RightSide/RightSide';
import { h } from '@/shared/utils/h';

import styles from './ModalContent.module.scss';

export function createModalContent(store) {
  const tankName = h('h1', {}, 'NAME');
  const header = h('header', { class: styles.header }, tankName);
  const leftSide = LeftSide(store);
  const rightSide = RightSide(store);

  const content = h('div', { class: styles.modalContent }, [header, leftSide, rightSide]);

  function update() {
    const activeTank = store.activeTank;

    if (!activeTank) return;

    /* Update tank name */
    tankName.textContent = activeTank.name;
  }

  autorun(() => {
    update();
  });

  return content;
}
