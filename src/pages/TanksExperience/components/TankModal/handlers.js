import { isCloseButton } from '@/pages/TanksExperience/components/TankModal/utils/isCloseButton';

export function setupCloseButtonHandlers(button, tankStore) {
  if (!button) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tankStore.setActiveTank(null);
  });

  button.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });

  button.addEventListener('mouseup', (e) => {
    e.stopPropagation();
  });
}

export function setupDesktopHandlers(modal, tankStore, clearTimeoutFn) {
  modal.addEventListener('mouseenter', () => {
    clearTimeoutFn();
  });

  modal.addEventListener('mouseleave', (e) => {
    const relatedTarget = e.relatedTarget;

    const isBackToCard =
      relatedTarget && relatedTarget.closest(`[data-tank-id="${tankStore.activeTankId}"]`);

    if (!isBackToCard) {
      tankStore.setActiveTank(null);
    }
  });
}

export function setupMobileHandlers(modal, tankStore) {
  /* Close the modal when clicking on the overlay */
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      tankStore.setActiveTank(null);
    }
  });
}

export function setupTouchDesktopHandlers(modal, tankStore) {
  document.addEventListener('click', (e) => {
    const clickedElement = e.target;
    const isInsideModal = modal.contains(clickedElement);
    const isInsideCard = clickedElement.closest(`[data-tank-id="${tankStore.activeTankId}"]`);

    if (!isInsideModal && !isInsideCard) {
      tankStore.setActiveTank(null);
    }
  });
}

export function setupContentHandlers(modalContent, closeButton) {
  modalContent.addEventListener('click', (e) => {
    if (!isCloseButton(e.target, closeButton)) {
      e.stopPropagation();
    }
  });

  modalContent.addEventListener('mousedown', (e) => {
    if (!isCloseButton(e.target, closeButton)) {
      e.stopPropagation();
    }
  });
}
