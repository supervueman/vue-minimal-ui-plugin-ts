<template>
  <div
    class="ui-scroll-pagination"
    :style="{
      'max-height': maxHeight,
      'max-width': maxWidth, height: height
    }"
    @scroll="scrolling"
  >
    <div class="ui-scroll-pagination--inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiScrollPagination'
})
export default class UiScrollPagination extends Vue {
  @Prop({ type: String, default: '100%' })
  private readonly maxHeight!: string;

  @Prop({ type: String, default: '100%' })
  private readonly maxWidth!: string;

  @Prop({ type: String, default: '100%' })
  private readonly height!: string;

  private scrollPosition: number = 0;

  scrolling($event: Event) {
    const target: HTMLElement = $event.target as HTMLElement;
    const maxHeight: number = target.scrollHeight;
    const scrollUser:number = target.scrollTop;
    const height: number = target.offsetHeight + scrollUser;

    if (maxHeight === height && scrollUser > this.scrollPosition) {
      this.$emit("scroll");
    }

    this.scrollPosition = scrollUser;
  }
};
</script>

<style lang="scss" scoped>
.ui-scroll-pagination {
  height: 100%;
  overflow-y: auto;
  &--inner {
    width: 100%;
  }
}
</style>
