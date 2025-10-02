export function updateModalPadding(modalContent, isPlacedBelow) {
  if (isPlacedBelow) {
    modalContent.style.paddingTop = '76px';
    modalContent.style.paddingBottom = '32px';
  } else {
    modalContent.style.paddingTop = '32px';
    modalContent.style.paddingBottom = '76px';
  }
}
