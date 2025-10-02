import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { Main } from '@/layout/Main/Main';
import { h } from '@/shared/utils/h.js';

const app = document.getElementById('body');

function App() {
  return h('div', { class: 'app' }, [Header(), Main(), Footer()]);
}

app.appendChild(App());
