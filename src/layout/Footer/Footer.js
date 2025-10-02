import linkedinIcon from '@/assets/icons/linkedin.svg';
import IULogo from '@/assets/images/logo-IU.svg';
import { SvgIcon } from '@/shared/utils/SvgIcon';
import { h } from '@/shared/utils/h';

import styles from './Footer.module.scss';

const LINKEDIN_LINK = 'https://www.linkedin.com/in/i-uliantsev/';

export function Footer() {
  const IULogoElem = SvgIcon({ src: IULogo, alt: 'IU Logo', className: styles.logo });
  const linkedinLink = h(
    'a',
    { href: LINKEDIN_LINK, target: '_blank', rel: 'noopener noreferrer' },
    SvgIcon({ src: linkedinIcon }),
  );

  const textLine = h('div', { class: styles.line }, [
    h('p', {}, '2025, Iaroslav Uliantsev'),
    linkedinLink,
  ]);
  return h('footer', { class: styles.footer }, [IULogoElem, textLine]);
}
