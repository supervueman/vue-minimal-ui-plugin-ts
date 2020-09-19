<template>
  <label class="ui-radio-button">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      @change="updateInput"
    >
    <span class="ui-radio-button--item circle">
      <span class="ui-radio-button--item-point circle" />
    </span>
    <span class="ui-radio-button--label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component({
  name: 'UiRadioButton'
})
export default class UiRadioButton extends Vue {
  @Model('change', { type: [String, Number, Object] })
  private readonly modelValue!: any;

  @Prop({ type: [String, Number, Object], default: '', required: true })
  private readonly value!: any;

  @Prop({ type: String, default: '' })
  private readonly label!: string;

  @Prop({ type: Boolean, default: false })
  private readonly disabled!: boolean;

  @Prop({ type: String, default: 'id' })
  private readonly keyOfObject!: string;

  get isChecked(): boolean {
    if (!this.modelValue || !this.value) return false;

    if (typeof this.value === "object") {
      return (
        this.modelValue[this.keyOfObject] === this.value[this.keyOfObject]
      );
    } else {
      return this.modelValue === this.value;
    }
  }

  updateInput(): void {
    this.$emit("change", this.value);
  }
};
</script>

<style lang="scss" scoped>
.ui-radio-button {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: $gap / 2;
  height: 20px;
  input[type="radio"] {
    visibility: hidden;
    display: none;
  }
  &--item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid $brand-darken-color-1;
    cursor: pointer;
    transition: background-color 0.3s $cubic;
    &-point {
      width: 10px;
      height: 10px;
      opacity: 0;
      transition: opacity 0.15s $cubic;
      background-color: $brand-darken-color-1;
    }
  }
  &--label {
    margin-left: $gap * 1.5;
    cursor: pointer;
  }

  input[type="radio"]:checked + &--item {
    background-color: transparent;
    .ui-radio-button--item-point {
      opacity: 1;
    }
  }

  input[type="radio"]:disabled + &--item {
    background-color: transparent;
    border-color: $light-gray-color;
    .ui-radio-button--item-point {
      opacity: 1;
      background-color: $light-gray-color;
    }
  }
}

.circle {
  border-radius: 50%;
}
</style>
