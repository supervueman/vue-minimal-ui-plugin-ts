import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import selectProps from './selectPropsMixin';

@Component({})
export default class ComputedData extends mixins(selectProps) {
  get parseItems(): any[] {
    if (this.objMode && !this.itemText) {
      throw new Error(
        "[UiInputSearch]: Property 'itemText' required in 'objMode'!"
      );
    }
    if (this.objMode && this.itemText) {
      return this.items.map(el => el[this.itemText]);
    }
    return this.items;
  }
};
