<template>
  <div class="ui-card--media" :style="{ 'max-width': maxWidth }">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: "UiCardMedia"
})
export default class UiCardMedia extends Vue {
  @Prop({ type: String, default: '100%' })
  private readonly maxWidth!: string;
};
</script>

<style lang="scss" scoped>
.ui-card--media {
  width: 100%;
  overflow: hidden;
}
</style>
