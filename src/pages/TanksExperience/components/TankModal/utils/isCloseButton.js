export function isCloseButton(target, closeButton) {
  if (!closeButton) return false;
  return target === closeButton || closeButton.contains(target);
}
