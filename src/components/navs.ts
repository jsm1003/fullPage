/**
 * Nav component
 */
import * as anime from 'animejs';

const easing: string = 'easeInOutQuad';

export default class Navs {
  private nav: HTMLElement;
  private $selectedNavItem: HTMLElement;
  private indicator: HTMLElement;

  public get selectedNavItem(): HTMLElement {
    return this.$selectedNavItem;
  }

  public set selectedNavItem(value: HTMLElement) {
    this.$selectedNavItem = value;
    this.animeNav(this.$selectedNavItem);
  }

  public constructor(el: string | HTMLElement) {
    const dom: HTMLElement | null =
      typeof el === 'string' ? document.querySelector(el) : el;
    if (!dom) {
      throw Error(`The parameter el '${el}' is invalid`);
    }

    const indicatorDom: HTMLElement | null = dom.querySelector('.indicator');
    if (!indicatorDom) {
      throw Error('can not find DOM by class "indicator"');
    }

    this.nav = dom;
    this.indicator = indicatorDom;

    this.nav.addEventListener('click', (event: MouseEvent) => {
      this.handleNavClick(event);
    });
  }

  private handleNavClick(event: MouseEvent): void | boolean {
    const target: HTMLElement = <HTMLElement>event.target;
    if (!target.hasAttribute('href')) {
      return false;
    }

    this.selectedNavItem = target;
  }

  private animeNav(selectedNavItem: HTMLElement): void {
    // if (this.oldSelectedNavItem )
    anime({
      targets: this.indicator,
      translateX:
        selectedNavItem.offsetLeft +
        selectedNavItem.offsetWidth / 2 -
        this.indicator.offsetWidth / 2,
      duration: 600,
      easing,
    });
  }
}
