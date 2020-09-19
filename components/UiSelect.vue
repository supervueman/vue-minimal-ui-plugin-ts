<template>
  <div
    class="ui-select"
    :class="{ 'ui-select_error': errorMessage, 'ui-select_active': isListView }"
    :style="{ 'max-width': maxWidth, 'min-width': minWidth }"
  >
    <span v-if="label" class="ui-select--label">{{ label }}</span>
    <div class="ui-select--inner">
      <input
        ref="input"
        :value="updatedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="ui-select--item item"
        :class="{ 'ui-select--item_active': isListView }"
        readonly
        @focus="isListView = true"
        @blur="listViewChange"
      >

      <div class="ui-select--icon">
        <slot name="icon">
          <svg
            class="ui-select--icon_default"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
          >
            <path
              d="M15.6056 1.29714C15.6056 1.42225 15.5426 1.56337 15.4495 1.65646L8.16213 8.94386C8.06805 9.03795 7.92793 9.1 7.80282 9.1C7.67771 9.1 7.53659 9.03694 7.44351 8.94386L0.156136 1.65646C0.0620541 1.56237 0 1.42225 0 1.29714C0 1.17203 0.063055 1.03091 0.156136 0.937824L0.93782 0.156136C1.0319 0.0620537 1.15701 0 1.29713 0C1.42224 0 1.56337 0.0630546 1.65645 0.156136L7.80282 6.30254L13.9492 0.156136C14.0433 0.0620537 14.1834 0 14.3085 0C14.4336 0 14.5747 0.0630546 14.6678 0.156136L15.4495 0.937824C15.5436 1.03191 15.6056 1.17203 15.6056 1.29714Z"
              fill="#BFBFBF"
            />
          </svg>
        </slot>
      </div>

      <transition name="ui-select--list">
        <div
          v-if="isListView && parseItems.length > 0"
          class="ui-select--list list"
        >
          <div
            v-for="item in parseItems"
            :key="item"
            class="ui-select--list-item"
            :class="{
              'ui-select--list-item_active': activeItem(item)
            }"
            @click="selectItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </transition>
    </div>

    <div v-if="errorMessage" class="ui-select--footer">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import dropListMixin from "../mixins/dropListMixin";
import inputPropsMixin from "../mixins/inputs/inputPropsMixin";
import selectPropsMixin from "../mixins/inputs/selectPropsMixin";
import computedDataMixin from "../mixins/inputs/computedDataMixin";

// Helpers
import closestPolyfill from '../helpers/closestPolyfill';

// Types
import { ItemObject } from '../types/ItemObject';

@Component({
  name: 'UiSelect'
})
export default class UiSelect extends mixins(inputPropsMixin, selectPropsMixin, dropListMixin, computedDataMixin) {
  @Prop({ type: [String, Number, Object], default: '', required: true })
  private readonly value!: any;

  @Prop({ type: [String, Number], default: '' })
  private readonly selectedText!: string | Number;

  get updatedValue(): any[] {
    if (this.objMode && this.returnObject && this.value) {
      if (this.multiple) {
        return this.value.map((el: ItemObject) => el[this.itemText]);
      }
      return this.value[this.itemText];
    }
    if (this.objMode && this.value) {
      const item = this.items.find(el => el[this.itemText] === this.value);
      return item ? item[this.itemText] : this.value[this.itemText];
    }
    return this.value;
  }

  created() {
    closestPolyfill();

    if (this.multiple) {
      document.addEventListener("click", this.closeListViewWhenMultiple);
    }
  }

  destroyed() {
    if (this.multiple) {
      document.removeEventListener("click", this.closeListViewWhenMultiple);
    }
  }

  emitHandler(item: any): void {
    let value: any = null;

    if (this.multiple) {
      const checkValue: ItemObject = this.objMode
        ? this.value.find((el: ItemObject) => el[this.itemText] === item[this.itemText])
        : this.value.find((el: any) => el === item);

      if (checkValue) {
        const filterValue: any[] = this.objMode
          ? this.value.filter((el: ItemObject) => el[this.itemText] !== item[this.itemText])
          : this.value.filter((el: any) => el !== item);

        value = filterValue.length > 0 ? [...filterValue] : [];
      } else {
        value = [...this.value, item];
      }
    } else {
      value = item;
    }
    this.$emit("input", value);
  }

  selectItem(item: any): void {
    let selectedItem: any = null;

    if (this.objMode) {
      selectedItem = this.items.find(el => el[this.itemText] === item);

      if (!this.returnObject) {
        selectedItem = selectedItem[this.itemText];
      }

      this.emitHandler(selectedItem);
    } else {
      this.emitHandler(item);
    }
  }

  activeItem(item: any): boolean {
    return (
      item === this.updatedValue ||
      (this.multiple && item === this.updatedValue.find(el => el === item))
    );
  }

  listViewChange(): void {
    if (!this.multiple) {
      this.isListView = false;
    }
  }

  closeListViewWhenMultiple($event: Event): void {
    const target: HTMLElement = $event.target as HTMLElement;

    if (!target.closest(".ui-select")) {
      this.isListView = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-select {
  padding-bottom: 12px;
  position: relative;
  cursor: pointer;
  color: $dark-color;
  &--label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  &--inner {
    width: 100%;
    position: relative;
  }
  &--icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
    margin-top: auto;
    margin-bottom: auto;
    width: 19px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transform-origin: 50% 50%;
    transition: transform 0.3s $cubic;
  }
  &--icon_default {
    width: 100%;
    height: 100%;
  }
  &--item {
    outline: none;
    width: 100%;
    height: 40px;
    padding-left: $gap / 2;
    padding-right: $gap / 2;
    border: 1px solid $light-gray-color;
    border-right-width: 4px;
    border-radius: $border-radius;
    background-color: $light-color;
    appearance: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.3s $cubic;
    @include on-event {
      border-right-color: $brand-lighten-color-2;
    }
    &:disabled {
      background-color: $light-gray-color-2;
      border-color: $light-gray-color;
    }
  }
  &--list {
    position: fixed;
    left: 0;
    width: 100%;
    background-color: $light-color;
    border: 1px solid $light-gray-color;
    border-radius: $border-radius;
    /*z-index: 10;*/
    max-height: 370px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 9999;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s $cubic;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
    }
    &-item {
      padding: $gap / 2;
      border-bottom: 1px solid $light-gray-color;
      color: $text-color;
      transition: color 0.3s, background-color 0.3s;
      transition-timing-function: $cubic;
      font-weight: normal;
      &:last-child {
        border-bottom: none;
      }
      @include on-event {
        color: $light-color;
        background-color: $brand-lighten-color-1;
      }
      &_active {
        background-color: $brand-lighten-color-1;
        color: $light-color;
      }
    }
  }
  &--footer {
    font-size: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: $error-color;
  }

  &_active {
    .ui-select {
      &--icon {
        transform: rotate(180deg);
      }
    }
  }

  &_error {
    .ui-select--item {
      border-right-color: $error-color;
    }
  }
}

.list {
  position: fixed;
}
@include ie11Style {
  input::-ms-clear {
    display: none;
  }
}
</style>
