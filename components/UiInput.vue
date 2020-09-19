<template>
  <div
    class="ui-input"
    v-bind="$attrs"
    :class="{ 'ui-input_error': errorMessage }"
    :style="{ 'max-width': maxWidth, 'min-width': minWidth }"
  >
    <label class="ui-input--inner">
      <span v-if="label" class="ui-input--label">{{ label }}</span>

      <input
        :class="inputClass.length ? inputClass : 'ui-input--item'"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        :maxlength="maxlength"
        :required="required"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
    </label>

    <div v-if="errorMessage && !hiddenDetails" class="ui-input--footer">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import inputPropsMixin from "../mixins/inputs/inputPropsMixin";

@Component({
  name: 'UiInput'
})
export default class UiInput extends mixins(inputPropsMixin) {
  @Prop({ type: [String, Number], default: '' })
  private readonly value!: string | number;

  @Prop({ type: String, default: '' })
  private readonly maxlength!: string;

  @Prop({ type: String, default: 'text' })
  private readonly type!: string;

  @Prop({ type: Boolean, default: false })
  private readonly hiddenDetails!: boolean;

  @Prop({ type: String, default: '' })
  private readonly inputClass!: string;
};
</script>

<style lang="scss" scoped>
.ui-input {
  // padding-bottom: 12px;
  margin-bottom: 10px;
  color: $dark-color;
  position: relative;
  &--inner {
    width: 100%;
    position: relative;
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
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    @include on-event {
      border-right-color: $brand-lighten-color-2;
    }
    &:disabled {
      background-color: $light-gray-color-2;
      border-color: $light-gray-color;
      pointer-events: none;
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
    top: 100%;
    left: 0;
    color: $error-color;
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
