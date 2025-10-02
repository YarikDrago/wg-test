import wofImage from '@/assets/images/wot.jpg';
import { TankCard } from '@/pages/TanksExperience/components/TankCard/TankCard';
import { TankModal } from '@/pages/TanksExperience/components/TankModal/TankModal';
import { pageDesc } from '@/pages/TanksExperience/pageDesc';
import { h } from '@/shared/utils/h';

import styles from './TanksExperience.module.scss';
import { tankStore } from './store';

export const TanksExperience = () => {
  const descText = h('p', { class: styles.desc }, pageDesc);
  const headerImg = h('img', { src: wofImage, alt: 'wof' });
  const header = h('header', {}, [headerImg]);

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

  const mainContent = h('div', { class: styles.mainContent }, [descText, cardsContainer]);

  const modal = TankModal(tankStore);

  return h('div', { class: styles.root }, [header, mainContent, modal]);
};
