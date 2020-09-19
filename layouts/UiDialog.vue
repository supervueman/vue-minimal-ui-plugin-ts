<template>
  <transition name="ui-dialog">
    <div
      v-show="value"
      class="ui-dialog"
      :class="{ 'ui-dialog_active': value }"
    >
      <div
        class="ui-dialog--content shadow"
        :style="{
          'max-width': maxWidth,
          'min-width': minWidth,
          'max-height': maxHeight
        }"
      >
        <slot />
      </div>
      <div class="ui-dialog--downlay" @click="closeDialog" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  name: "UiDialog"
})
export default class UiDialog extends Vue {
  @Prop({ type: String, default: "500px" })
  private readonly maxWidth!: string;

  @Prop({ type: String, default: null })
  private readonly minWidth!: string;

  @Prop({ type: String, default: null })
  private readonly minHeight!: string;

  @Prop({ type: Boolean, default: false })
  private readonly value!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly outClick!: boolean;

  closeDialog() {
    if (this.outClick) {
      this.$emit("input", false);
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: z(modal);
  display: flex;
  align-items: center;
  justify-content: center;
  &--content {
    z-index: 2;
    width: 100%;
    transform: translateY(-40%);
    transition: transform 0.3s $cubic;
    overflow-y: auto;
  }
  &--downlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $light-color;
    opacity: 0.3;
    z-index: 1;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s $cubic;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &_active {
    .ui-dialog {
      &--content {
        transform: translateY(0);
      }
    }
  }
}
</style>
