import { MODAL_CONSTANTS } from '@/pages/TanksExperience/components/TankModal/constants';

export function closeModal(modal, modalContent, isMobile, timeout = MODAL_CONSTANTS.CLOSE_DELAY) {
  /* Close the modal after a delay
   * to allow the animation to complete */
  return setTimeout(() => {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    if (!isMobile) {
      modal.style.top = '0px';
      modal.style.left = '0px';
    }
    document.body.style.overflow = '';

    /* Reset padding when closing the modal */
    modalContent.style.paddingTop = '';
    modalContent.style.paddingBottom = '';
    modalContent.removeAttribute('data-position');
  }, timeout);
}
