<template>
  <div
    class="ui-input"
    :class="{
      'ui-input_error': errorMessage,
      'ui-input_active': isListView && parseItems.length > 0
    }"
    :style="{ 'max-width': maxWidth, 'min-width': minWidth }"
  >
    <div class="ui-input--inner">
      <span class="ui-input--label">{{ label }}</span>
      <input
        :value="value"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        class="ui-input--item item"
        @input="search"
        @focus="isListView = true"
        @blur="isListView = false"
      >
      <div class="ui-input--icon">
        <slot name="icon">
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            class="ui-input--icon_default"
          >
            <path
              d="M15.6056 1.29714C15.6056 1.42225 15.5426 1.56337 15.4495 1.65646L8.16213 8.94386C8.06805 9.03795 7.92793 9.1 7.80282 9.1C7.67771 9.1 7.53659 9.03694 7.44351 8.94386L0.156136 1.65646C0.0620541 1.56237 0 1.42225 0 1.29714C0 1.17203 0.063055 1.03091 0.156136 0.937824L0.93782 0.156136C1.0319 0.0620537 1.15701 0 1.29713 0C1.42224 0 1.56337 0.0630546 1.65645 0.156136L7.80282 6.30254L13.9492 0.156136C14.0433 0.0620537 14.1834 0 14.3085 0C14.4336 0 14.5747 0.0630546 14.6678 0.156136L15.4495 0.937824C15.5436 1.03191 15.6056 1.17203 15.6056 1.29714Z"
              fill="#BFBFBF"
            />
          </svg>
        </slot>
      </div>

      <transition name="ui-input--list">
        <div
          v-if="isListView && parseItems.length > 0"
          class="ui-input--list list"
        >
          <div
            v-for="(item, i) in parseItems"
            :key="`item-${i}`"
            class="ui-input--list-item"
            :class="{
              'ui-input--list-item_active':
                item === updatedValue.find(el => el === item)
            }"
            @click="toggleItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </transition>
    </div>

    <div v-if="errorMessage" class="ui-input--footer">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import dropListMixin from "../../mixins/dropListMixin";
import inputPropsMixin from "../../mixins/inputs/inputPropsMixin";
import selectPropsMixin from "../../mixins/inputs/selectPropsMixin";
import computedDataMixin from "../../mixins/inputs/computedDataMixin";

// Helpers
import debounce from "../../helpers/debounce";

// Types
import { ItemObject } from '../../types/ItemObject';

@Component({
  name: 'UiInputSearch'
})
export default class UiInputSearch extends mixins(inputPropsMixin, selectPropsMixin, dropListMixin, computedDataMixin) {
  @Model('change', { type: Array })
  private readonly selectedItems!: any[];

  @Prop({ type: [String, Number], default: '' })
  private readonly value!: any[] | ItemObject;

  @Prop({ type: String, default: '' })
  private readonly returnField!: string;

  @Prop({ type: Function, default: () => {} })
  private readonly searchMethod!: Function;

  @Prop({ type: Number, default: 1000 })
  private readonly timing!: number;

  private debounce: () => void = () => {};

  get parseSelectedItems() {
    if (this.objMode && !this.itemText) {
      throw new Error(
        "[UiInputSearch]: Property 'itemText' required in 'objMode'!"
      );
    }
    if (this.objMode && this.itemText) {
      return this.selectedItems.map(el => el[this.itemText]);
    }
    return this.selectedItems;
  }

  get updatedValue() {
    if (this.objMode && this.returnObject) {
      return this.selectedItems.map(el => el[this.itemText]);
    }
    if (this.objMode && !this.returnField) {
      return this.selectedItems.map(el => el[this.itemText] === this.value);
    }
    if (this.objMode && this.returnField) {
      return this.selectedItems.map(
        (el: ItemObject) => el[this.returnField] === this.value
      );
    }
    return [];
  }

  created() {
    this.debounce = debounce(this.searchMethod, this.timing);
  }

  search($event: Event): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement;

    this.$emit("input", target.value);
    this.debounce();
  }

  toggleItem(item: ItemObject): void {
    const items: any[] = [];
    let selectedItem: any = {};

    if (this.multiple) {
      items.push(...this.items);
    }

    if (this.objMode) {
      this.items.forEach(el => {
        if (el[this.itemText] === item) {
          selectedItem = el;
        }
      });

      if (this.objMode && !this.returnField && !this.returnObject) {
        selectedItem = selectedItem[this.itemText];
      }
      if (this.objMode && this.returnField && !this.returnObject) {
        selectedItem = selectedItem[this.returnField];
      }

      items.push(selectedItem);
    } else {
      items.push(item);
    }

    this.$emit("change", items);
  }
};
</script>

<style lang="scss" scoped>
.ui-input {
  padding-bottom: 12px;
  color: $dark-color;
  position: relative;
  &--inner {
    display: block;
    width: 100%;
    position: relative;
  }
  &--icon {
    position: absolute;
    bottom: 9px;
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
    transition: border-color 0.3s $cubic, background-color 0.3s $cubic;
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
    top: 60px;
    left: 0;
    width: 100%;
    background-color: $light-color;
    border: 1px solid $light-gray-color;
    border-radius: $border-radius;
    z-index: 10;
    max-height: 370px;
    overflow-x: hidden;
    overflow-y: auto;
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
      cursor: pointer;
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
  &--label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  &--footer {
    font-size: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: $error-color;
  }

  &_active {
    .ui-input {
      &--icon {
        transform: rotate(180deg);
      }
    }
  }
  &_error {
    .ui-input--item {
      border-right-color: $error-color;
      color: $error-color;
    }
  }
}

@include ie11Style {
  input::-ms-clear {
    display: none;
  }
}
</style>
