<template>
  <div class="ui-expansion-panels--item">
    <UiExpansionPanelHeader :is-active="isActive" @click="toggle">
      <slot name="header" />
    </UiExpansionPanelHeader>

    <UiExpansionPanelContent
      ref="content"
      :height="height"
      :flat="$parent.flat"
      :class="{ is_init: isInit }"
    >
      <slot name="content" />
    </UiExpansionPanelContent>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

// Components
import UiExpansionPanelHeader from "./UiExpansionPanelHeader.vue";
import UiExpansionPanelContent from "./UiExpansionPanelContent.vue";

@Component({
  name: 'UiExpansionPanelItem',
  components: {
    UiExpansionPanelContent,
    UiExpansionPanelHeader
  }
})
export default class UiExpansionPanelItem extends Vue {
  @Prop({ type: [String, Number, Array, Object], default: null })
  private readonly watchItem!: any;

  @Prop({ type: Boolean, default: false })
  private readonly active!: boolean;

  private height: number | null = null;

  private isActive: boolean = false;

  private isInit: boolean = true;

  @Watch('watchItem')
  private isWatchItemChange() {
    this.setSize();
  }

  mounted() {
    this.isActive = this.active;
    this.setSize();
  }

  setSize(): void {
    setTimeout(() => {
      this.togglePanel();
      this.isInit = false;
    }, 0);
  }

  togglePanel(): void {
    if (this.isActive && process.client) {
      const el: HTMLElement = (this.$refs.content as Vue).$el as HTMLElement;
      const contentInner: HTMLElement = el.querySelector(".ui-expansion-panels--item-content--inner") as HTMLElement;

      this.height = contentInner.clientHeight || null;
    } else {
      this.height = 0;
    }
  }

  toggle(): void {
    this.isActive = !this.isActive;

    this.togglePanel();
    this.$emit("toggle", this.isActive);
  }
};
</script>

<style lang="scss" scoped>
.ui-expansion-panels--item {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &:last-child {
    border-bottom: none;
  }
}
.is_init {
  position: absolute;
  opacity: 0;
}
</style>
