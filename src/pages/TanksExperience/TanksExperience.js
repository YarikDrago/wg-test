import { TankCard } from '@/pages/TanksExperience/components/TankCard/TankCard';
import { pageDesc } from '@/pages/TanksExperience/pageDesc';
import { h } from '@/shared/utils/h';

import styles from './TanksExperience.module.scss';

export const TanksExperience = () => {
  const descText = h('p', { class: styles.desc }, pageDesc);

  return h('div', { class: styles.container }, [descText, TankCard()]);
};
