<template>
  <component
    :is="link ? (isExternalLink || paginator ? 'a' : 'nuxt-link') : 'button'"
    :type="!link ? type : false"
    :target="link && target ? target : null"
    :to="link && !isExternalLink && !paginator ? localePath(link) : null"
    :href="
      link && isExternalLink
        ? `//${domain}${localePath(link)}`
        : link || (link && paginator)
        ? localePath(link)
        : null
    "
    v-bind="$attrs"
    class="button-full"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot>
      {{ title }}
    </slot>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiButton'
})
export default class UiButton extends Vue {
  @Prop({ type: String, default: '' })
  private readonly domain!: string;

  @Prop({ type: String, default: 'button' })
  private readonly type!: string;

  @Prop({ type: Object, default: () => ({}) })
  private readonly link!: object;

  @Prop({ type: Boolean, default: false })
  private readonly paginator!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isExternalLink!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly disabled!: boolean;

  @Prop({ type: [String, Number], default: '' })
  private readonly title!: string | number;

  @Prop({ type: String, default: null })
  private readonly target!: string;
};
</script>

<style lang="scss">
.button-full {
  min-width: 10px;
  border: none;
  -webkit-font-smoothing: subpixel-antialiased;
  transform: translateZ(0) scale(1, 1);
  cursor: pointer;
}
</style>
