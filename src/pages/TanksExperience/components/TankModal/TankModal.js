import { autorun } from 'mobx';

import { h } from '@/shared/utils/h';

import styles from './TankModal.module.scss';
import { CloseButton } from './components/CloseButton/CloseButton';
import { createModalContent } from './components/ModalContent/ModalContent';
import {
  setupCloseButtonHandlers,
  setupContentHandlers,
  setupDesktopHandlers,
  setupMobileHandlers,
  setupTouchDesktopHandlers,
} from './handlers';
import { closeModal } from './utils/closeModal';
import { openModal } from './utils/openModal';
import { getDeviceType } from '@/pages/TanksExperience/components/TankModal/utils/getDeviceType';

export const TankModal = (tankStore) => {
  const { hasPointer, isMobile } = getDeviceType();
  let hideTimeout = null;

  const closeButton = isMobile ? CloseButton() : null;
  const modalContent = createModalContent(tankStore);
  const borderSim = h('div', { class: styles.borderSim });

  const modal = h(
    'div',
    {
      class: `${styles.modal} ${isMobile ? styles.modalMobile : ''}`,
      'data-modal': 'true',
    },
    [modalContent, borderSim, closeButton],
  );

  /* Setup event handlers */
  setupCloseButtonHandlers(closeButton, tankStore);
  setupContentHandlers(modalContent, closeButton);

  if (hasPointer && !isMobile) {
    setupDesktopHandlers(modal, tankStore, () => clearTimeout(hideTimeout));
  }

  if (isMobile) {
    setupMobileHandlers(modal, tankStore);
  }

  if (!hasPointer && !isMobile) {
    setupTouchDesktopHandlers(modal, tankStore);
  }

  function update() {
    const activeTank = tankStore.activeTank;

    if (activeTank) {
      clearTimeout(hideTimeout);
      openModal(modal, modalContent, borderSim, activeTank.id, isMobile);
    } else {
      hideTimeout = closeModal(modal, modalContent, isMobile);
    }
  }

  autorun(() => {
    update();
  });

  return modal;
};
