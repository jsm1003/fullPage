/**
 * Sections component
 */
import * as anime from 'animejs';

const easing: string = 'easeInOutQuad';

export default class Sections {
  private isScrolling: boolean = false;

  private el: HTMLElement;
  private items: HTMLElement[];
  private $selectedIndex: number = 0;

  public get selectedIndex(): number {
    return this.$selectedIndex;
  }

  public set selectedIndex(value: number) {
    if (!this.isScrolling && -1 < value && value < this.items.length) {
      this.$selectedIndex = value;
      this.scroll(this.$selectedIndex);
    }
  }

  public constructor(el: string | HTMLElement) {
    const dom: HTMLElement | null =
      typeof el === 'string' ? document.querySelector(el) : el;
    if (!dom) {
      throw Error(`The parameter el '${el}' is invalid`);
    }

    this.el = dom;
    this.items = Array.from(dom.querySelectorAll('.section-item'));

    this.handleHashChange();
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    this.el.addEventListener(
      'wheel',
      (event: WheelEvent) => (this.selectedIndex += event.deltaY > 0 ? 1 : -1),
    );
  }

  private handleHashChange(): void {
    const anchorPoint: string = window.location.hash.replace(/#\/?/, '');
    this.selectedIndex = this.items.findIndex(
      (item: HTMLElement) => item.getAttribute('data-anchor') === anchorPoint,
    );
  }

  private scroll(targetIndex: number): void {
    this.isScrolling = true;

    anime({
      targets: this.items,
      translateY: `${targetIndex * -100}%`,
      duration: 600,
      easing,
      complete: () => (this.isScrolling = false),
    });
  }
}
