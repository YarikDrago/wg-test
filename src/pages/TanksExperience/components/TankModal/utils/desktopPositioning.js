import { updateModalPadding } from './updateModalPadding';

export function desktopPositioning(cardId, modal, modalContent, borderSim) {
  /* Additional margin to the edge of the screen */
  const MARGIN = 8;

  /* Find the active tank card to calculate the position of the modal */
  const cardElement = document.querySelector(`[data-tank-id="${cardId}"]`);
  if (!cardElement) return;

  /* Tank card rectangle element data */
  const cardRect = cardElement.getBoundingClientRect();
  /* Modal rectangle element data (even if it invisible) */
  const modalRect = modal.getBoundingClientRect();

  /* Determine top position of modal */
  let modalTop = 0;
  let isPlacedBelow = false;

  const canPlaceBelow = cardRect.bottom + MARGIN + modalRect.height < window.innerHeight;

  /* Position the modal below the card if possible, otherwise place it above the card */
  if (canPlaceBelow) {
    modalTop = cardRect.bottom + window.scrollY;
    isPlacedBelow = true;
  } else {
    const canPlaceUp = cardRect.top - MARGIN - modalRect.height > 0;
    if (canPlaceUp) {
      /* Place the modal above the card */
      modalTop = cardRect.top + window.scrollY - modalRect.height;
      isPlacedBelow = false;
    } else {
      /* This condition is when the modal can't be placed fully below
      and can't be placed fully above.
      * Place the modal on the top of the screen. */
      modalTop = window.scrollY + MARGIN;
      isPlacedBelow = false;
    }
  }

  /* Determine the left position of the modal */
  let modalLeft = 0;
  /* 15px for Y-scroll */
  const canPlaceLeft = cardRect.left + modalRect.width + MARGIN + 15 < window.innerWidth;
  if (canPlaceLeft) {
    modalLeft = cardRect.left;
  } else {
    modalLeft = cardRect.right - modalRect.width;
  }

  /* Clip modal form */
  const cardXCenter = cardRect.left + cardRect.width / 2;
  const cardXCenterPercent = ((cardXCenter - modalLeft) / modalRect.width) * 100;

  if (canPlaceBelow) {
    modalContent.style.clipPath = `polygon(
        0 44px,
        calc(${cardXCenterPercent}% - 34px) 44px,
        ${cardXCenterPercent}% 0,
        calc(${cardXCenterPercent}% + 34px) 44px,
        100% 44px,
        100% 100%,
        0 100%
      )`;
    borderSim.style.clipPath = `polygon(
      0 44px,
      0 calc(44px + 1px),
      calc(${cardXCenterPercent}% - 34px + 1px) calc(44px + 1px),
      ${cardXCenterPercent}% 1px,
        calc(${cardXCenterPercent}% + 34px - 1px) calc(44px + 1px),
      100% calc(44px + 1px),
      100% 44px,
      calc(${cardXCenterPercent}% + 34px) 44px,
      ${cardXCenterPercent}% 0,
      calc(${cardXCenterPercent}% - 34px) 44px
    )`;
  } else {
    modalContent.style.clipPath = `polygon(
        0 0,
        100% 0,
        100% calc(100% - 44px),
        calc(${cardXCenterPercent}% + 34px) calc(100% - 44px),
        ${cardXCenterPercent}% 100%,
        calc(${cardXCenterPercent}% - 34px) calc(100% - 44px),
        0 calc(100% - 44px)
      )`;
    borderSim.style.clipPath = `polygon(
      0 calc(100% - 44px),
      0 calc(100% - 44px - 1px),
      calc(${cardXCenterPercent}% - 34px + 1px) calc(100% - 44px - 1px),
      ${cardXCenterPercent}% calc(100% - 1px), 
      calc(${cardXCenterPercent}% + 34px - 1px) calc(100% - 44px - 1px),
      100% calc(100% - 44px - 1px),
      100% calc(100% - 44px),
      calc(${cardXCenterPercent}% + 34px) calc(100% - 44px),
      ${cardXCenterPercent}% 100%,
      calc(${cardXCenterPercent}% - 34px) calc(100% - 44px)
    )`;
  }

  /* Change padding depending on the position of the modal */
  updateModalPadding(modalContent, isPlacedBelow);

  /* Set the position of the modal and make it visible */
  modal.style.top = `${modalTop}px`;
  modal.style.left = `${modalLeft}px`;
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
}
