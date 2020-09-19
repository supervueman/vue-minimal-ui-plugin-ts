<template>
  <div
    v-bind="$attrs"
    class="ui-textarea"
    :class="{ 'ui-textarea--error': errorMessage && hasError }"
  >
    <div class="ui-textarea--inner">
      <span class="ui-textarea--label">{{ label }}</span>

      <textarea
        class="ui-textarea--item"
        :class="{ 'ui-textarea--error': hasError }"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :required="required"
        :value="value"
        :disabled="disabled"
        :style="{ height: height, resize: resize ? '' : 'none' }"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div v-if="errorMessage && hasError" class="ui-textarea--footer">
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
  name: 'UiTextarea'
})
export default class UiTextarea extends mixins(inputPropsMixin) {
  @Prop({ type: String, default: '' })
  private readonly value!: string;

  @Prop({ type: Number, default: 1000 })
  private readonly maxlength!: number;

  @Prop({ type: Boolean, default: false })
  private readonly hasError!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly resize!: boolean;

  @Prop({ type: String, default: '60px' })
  private readonly height!: string;
};
</script>

<style lang="scss" scoped>
.ui-textarea {
  padding-bottom: 12px;
  color: $dark-color;
  position: relative;

  &--inner {
    width: 100%;
    position: relative;
    height: 93%;
  }
  &--item {
    font-size: 14px;
    outline: none;
    width: 100%;
    height: 60px;
    padding: $gap / 2;
    border: 1px solid $light-gray-color;
    border-right-width: 4px;
    border-radius: $border-radius;
    background-color: $light-color;
    appearance: none;
    display: flex;
    align-items: center;
    transition: border-color 0.3s $cubic;

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

  &--error {
    border-right-color: $error-color;
    color: $error-color;
  }
}
</style>
