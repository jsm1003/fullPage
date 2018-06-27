/**
 * Nav component
 */
import * as anime from 'animejs';

const easing: string = 'easeInOutQuad';

export default class Navs {
  private el: HTMLElement;
  private items: HTMLElement[];
  private $selectedIndex: number = 0;
  private indicator: HTMLElement;

  public get selectedIndex(): number {
    return this.$selectedIndex;
  }

  public set selectedIndex(value: number) {
    this.animeNav(this.$selectedIndex, value);
    this.$selectedIndex = value;
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

    this.el = dom;
    this.indicator = indicatorDom;
    this.items = Array.from(dom.querySelectorAll('.item'));

    this.handleHashChange();

    this.el.addEventListener('click', (event: MouseEvent) => {
      this.handleNavClick(event);
    });
  }

  private handleNavClick(event: MouseEvent): void | boolean {
    const target: HTMLElement = <HTMLElement>event.target;
    if (!target.hasAttribute('href')) {
      return false;
    }

    this.selectedIndex = this.items.findIndex(
      (item: HTMLElement) =>
        item.getAttribute('href') === target.getAttribute('href'),
    );
  }

  public handleHashChange(): void {
    const anchorPoint: string = window.location.hash;
    const targetIndex: number = this.items.findIndex(
      (item: HTMLElement) => item.getAttribute('href') === anchorPoint,
    );

    this.selectedIndex = targetIndex === -1 ? 0 : targetIndex;
  }

  private animeNav(oldIndex: number, newIndex: number): void {
    const oldItem: HTMLElement = this.items[oldIndex];
    const newItem: HTMLElement = this.items[newIndex];

    anime({
      targets: this.indicator,
      translateX:
        newItem.offsetLeft +
        newItem.offsetWidth / 2 -
        this.indicator.offsetWidth / 2,
      duration: 600,
      easing,
      begin(): void {
        oldItem.classList.remove('selected');
        newItem.classList.add('selected');
      },
    });
  }
}
