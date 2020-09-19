import { Vue, Component, Watch } from 'vue-property-decorator';

// Helpers
import ieBrowserDefine from "../helpers/ieBrowserDefine";

@Component({})
export default class DropList extends Vue {
  public isListView: boolean = false;

  @Watch('isListView')
  private onListChangeHandler() {
    this.onListChange();
  }

  @Watch('items')
  private onItemsChangeHandler() {
    this.onListChange();
  }

  private top: string = '0';

  private left: string = '0';

  private width: string = '0';

  mounted() {
    this.onChangeListPosition();
  }

  onListChange(): void {
    if (this.isListView) {
      setTimeout(() => {
        this.onChangeListPosition();

        window.addEventListener('scroll', this.onChangeListPosition);
      }, 50);
    } else {
      window.removeEventListener('scroll', this.onChangeListPosition);
    }
  }

  onChangeListPosition(): void {
    const list: HTMLElement = this.$el.querySelector('.list') as HTMLElement;

    if (list) {
      const targetElement: HTMLElement = this.$el.querySelector('.item') as HTMLElement;

      if (!targetElement) return;

      const hScreen: number = window.innerHeight;
      const wElem: number = targetElement.getBoundingClientRect().width;

      let offsetX: number = targetElement.getBoundingClientRect().x;
      let offsetY: number = targetElement.getBoundingClientRect().y;

      if (ieBrowserDefine.name === 'MSIE') {
        offsetX = targetElement.getBoundingClientRect().left;
        offsetY = targetElement.getBoundingClientRect().top;
      }

      if (offsetY * 100 / hScreen < 50) {
        list.style.top = `${offsetY + 40}px`;
        this.top = `${offsetY + 40}px`;
      } else {
        const hList = list.getBoundingClientRect().height;
        list.style.top = `${offsetY - hList}px`;
        this.top = `${offsetY - hList}px`;
      }
      list.style.left = `${offsetX}px`;
      list.style.width = `${wElem}px`;
      this.left = `${offsetX}px`;
      this.width = `${wElem}px`;
    }
  }
};
