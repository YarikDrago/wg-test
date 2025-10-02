import { desktopPositioning } from './desktopPositioning';

export function openModal(modal, modalContent, borderSim, cardId, isMobile) {
  if (isMobile) {
    /* Full screen mode for mobile devices */
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';

    /* Reset padding when opening the modal */
    modalContent.style.paddingTop = '';
    modalContent.style.paddingBottom = '';
    modalContent.removeAttribute('data-position');
  } else {
    desktopPositioning(cardId, modal, modalContent, borderSim);
  }
}
