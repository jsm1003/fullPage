/**
 * 名师坊
 */

import Sections from '@/components/sections';
import Navs from '@/components/navs';

const sections: Sections = new Sections('.sections');
const navs: Navs = new Navs('.nav-menu');

window.addEventListener('hashchange', () => {
  sections.handleHashChange();
  navs.handleHashChange();
});
