import { TankCard } from '@/pages/TanksExperience/components/TankCard/TankCard';
import { TankModal } from '@/pages/TanksExperience/components/TankModal/TankModal';
import { pageDesc } from '@/pages/TanksExperience/pageDesc';
import { h } from '@/shared/utils/h';

import styles from './TanksExperience.module.scss';
import { tankStore } from './store';

export const TanksExperience = () => {
  const descText = h('p', { class: styles.desc }, pageDesc);

  const cardsContainer = h(
    'div',
    { class: styles.cardsContainer },
    tankStore.tanks.map((tank) =>
      TankCard({
        id: tank.id,
        name: tank.name,
        img: tank.img,
        tankStore,
      }),
    ),
  );

  const modal = TankModal(tankStore);

  return h('div', { class: styles.container }, [descText, cardsContainer, modal]);
};
