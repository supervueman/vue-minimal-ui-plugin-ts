<template>
  <div
    class="ui-card"
    :class="{
      'ui-card_error': type === 'error',
      'ui-card_success': type === 'success'
    }"
    :style="{
      'max-width': maxWidth,
      'min-width': minWidth,
      'max-height': maxHeight,
      'min-height': minHeight
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiCard'
})
export default class UiCard extends Vue {
  @Prop({ type: String, default: '' })
  private readonly maxWidth!: string;

  @Prop({ type: String, default: '' })
  private readonly minWidth!: string;

  @Prop({ type: String, default: '' })
  private readonly type!: string;

  @Prop({ type: String, default: '' })
  private readonly maxHeight!: string;

  @Prop({ type: String, default: '' })
  private readonly minHeight!: string;
};
</script>

<style lang="scss" scoped>
.ui-card {
  border: 1px solid $dark-color;
  color: $dark-color;
  position: relative;
  padding: $gap;
  border-radius: $border-radius;
  transition: border-color 0.3s $cubic;
  &--inner {
    border: 1px solid $dark-color;
    width: 100%;
    padding: $gap 0;
  }
  &_error {
    border-color: $error-color;
  }
  &_success {
    border-color: $success-color;
  }
}
</style>
