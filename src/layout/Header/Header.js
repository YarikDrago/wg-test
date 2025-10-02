import wgLogo from '@/assets/images/wg_logo.svg';
import { SvgIcon } from '@/shared/utils/SvgIcon';
import { h } from '@/shared/utils/h';

import styles from './Header.module.scss';

export function Header() {
  const svg = SvgIcon({
    src: wgLogo,
    alt: 'WG Logo',
  });

  const logoLink = h('a', { href: 'https://wargaming.net/en', class: styles.logoLink }, svg);
  const nav = h('nav', {});

  return h('header', { class: styles.header }, [logoLink, nav]);
}
