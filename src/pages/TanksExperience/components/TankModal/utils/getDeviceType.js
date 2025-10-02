import { MODAL_CONSTANTS } from '@/pages/TanksExperience/components/TankModal/constants';

export function getDeviceType() {
  return {
    hasPointer: window.matchMedia(MODAL_CONSTANTS.POINTER_FINE).matches,
    isMobile: window.matchMedia(MODAL_CONSTANTS.MOBILE_BREAKPOINT).matches,
  };
}
