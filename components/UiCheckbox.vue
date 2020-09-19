<template>
  <label class="ui-checkbox" :style="{ 'min-width': minWidth }">
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      @input="input"
      @change="change"
    >
    <span class="ui-checkbox--item">
      <svg width="19" height="14" viewBox="0 0 19 14" fill="none">
        <path
          d="M2 6L8.3 12L17.3 2"
          stroke="white"
          stroke-width="2.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label" class="ui-checkbox--label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component({
  name: 'UiCheckbox'
})
export default class UiCheckbox extends Vue {
  @Model('change')

  @Prop({ type: [String, Number, Object, Array, Boolean], default: null })
  private readonly dataValue!: any;

  @Prop({ type: String, default: '' })
  private readonly label!: string;

  @Prop({ type: Boolean, default: false })
  private readonly checked!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly disabled!: boolean;

  @Prop({ type: String, default: '' })
  private readonly name!: string;

  @Prop({ type: String, default: '' })
  private readonly minWidth!: string;

  change($event: Event): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement;

    if (!target) return;

    this.$emit("change", {
      checked: target.checked,
      value: this.dataValue,
    });

    this.$emit("changeActive", target.checked);
  }

  input($event: Event): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement;

    if (!target) return;

    this.$emit("input", target.checked);
  }
};
</script>

<style scoped lang="scss">
.ui-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 20px;
  padding-left: 20px;
  input[type="checkbox"] {
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
    border-radius: $border-radius;
    border: 1px solid $brand-darken-color-1;
    cursor: pointer;
    transition: background-color 0.3s $cubic;
    svg {
      width: 16px;
      height: 16px;
      opacity: 0;
      transition: opacity 0.15s $cubic;
    }
  }
  &--label {
    margin-left: $gap / 2;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + &--item {
    background-color: $brand-darken-color-1;
    svg {
      opacity: 1;
    }
  }

  input[type="checkbox"]:disabled + &--item {
    background-color: $light-gray-color;
    border-color: $light-gray-color;
    svg {
      opacity: 1;
    }
  }
}
</style>
