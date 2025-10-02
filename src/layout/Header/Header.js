import { h } from '@/shared/utils/h';

import styles from './Header.module.scss';

export function Header() {
  return h('header', { class: styles.header }, 'Header');
}
