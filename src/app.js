import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { Main } from '@/layout/Main/Main';
import { ScrollButton } from '@/shared/ui/ScrollButton/ScrollButton';
import { h } from '@/shared/utils/h.js';

const app = document.getElementById('body');

function App() {
  return h('div', { class: 'app' }, [Header(), Main(), Footer(), ScrollButton()]);
}

app.appendChild(App());
