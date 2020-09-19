<template>
  <div
    class="ui-input"
    :class="{
      'ui-input_error': errorMessage,
      'ui-input_active': isListView
    }"
    :style="{ 'max-width': maxWidth, 'min-width': minWidth }"
  >
    <label class="ui-input--inner">
      <span v-if="label" class="ui-input--label">{{ label }}</span>
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
    </label>

    <div v-if="errorMessage" class="ui-input--footer">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import inputPropsMixin from "../mixins/inputs/inputPropsMixin";

// Helpers
import debounce from "../helpers/debounce";

@Component({
  name: 'UiInputSearch'
})
export default class UiInputSearch extends mixins(inputPropsMixin) {
  @Model('change')
  private readonly selectedItems!: any;

  @Prop({ type: [String, Number], default: '' })
  private readonly value!: string | number;

  @Prop({ type: Function, default: () => {} })
  private readonly searchMethod!: Function;

  @Prop({ type: Number, default: '' })
  private readonly timing!: number;

  private debounce: () => void = () => {};

  private isListView: boolean = false;

  created() {
    this.debounce = debounce(this.searchMethod, this.timing);
  }

  search($event: Event): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement;

    this.$emit("input", target.value);
    this.debounce();
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
