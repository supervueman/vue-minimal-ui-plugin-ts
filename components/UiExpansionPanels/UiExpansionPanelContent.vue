<template>
  <div
    class="ui-expansion-panels--item-content"
    :style="{
      height: height !== null && height !== undefined ? `${height}px` : ''
    }"
  >
    <div
      class="ui-expansion-panels--item-content--inner"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiExpansionPanelsItemContent'
})
export default class UiExpansionPanelsItemContent extends Vue {
  @Prop({ type: Number, default: null })
  private readonly height!: number;
};
</script>

<style lang="scss" scoped>
.ui-expansion-panels--item-content {
  width: 100%;
  transition: height 0.3s $cubic;
  &--inner {
    width: 100%;
    padding: $gap / 2;
  }
}
</style>
