import { TanksExperience } from '@/pages/TanksExperience/TanksExperience';
import { h } from '@/shared/utils/h';

import styles from './Main.module.scss';

export const Main = () => {
  return h('main', { class: styles.main }, TanksExperience());
};
