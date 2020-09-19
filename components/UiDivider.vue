<template>
  <div
    class="ui-divider"
    :class="{
      'ui-divider_horizontal': horizontal,
      'ui-divider_vertical': vertical
    }"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiDivider'
})
export default class UiDivider extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly horizontal!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly vertical!: boolean;
};
</script>

<style lang="scss" scoped>
.ui-divider {
  background-color: $gray-color;
  &_horizontal {
    height: 2px;
    width: 100%;
  }
  &_vertical {
    width: 2px;
    /*height: 100%;*/
  }
}
</style>
