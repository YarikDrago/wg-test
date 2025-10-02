import { h } from '@/shared/utils/h';

import styles from './Footer.module.scss';

export function Footer() {
  return h('footer', { class: styles.footer }, 'Footer');
}
