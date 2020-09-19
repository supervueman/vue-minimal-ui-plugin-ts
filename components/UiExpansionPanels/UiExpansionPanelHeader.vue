<template>
  <div
    class="ui-expansion-panels--item-header"
    :class="{ 'ui-expansion-panels--item-header_active': isActive }"
    @click="$emit('click', $event)"
  >
    <slot />
    <div class="ui-expansion-panels--item-header--icon">
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        class="ui-select--icon_default"
      >
        <path
          d="M15.6056 1.29714C15.6056 1.42225 15.5426 1.56337 15.4495 1.65646L8.16213 8.94386C8.06805 9.03795 7.92793 9.1 7.80282 9.1C7.67771 9.1 7.53659 9.03694 7.44351 8.94386L0.156136 1.65646C0.0620541 1.56237 0 1.42225 0 1.29714C0 1.17203 0.063055 1.03091 0.156136 0.937824L0.93782 0.156136C1.0319 0.0620537 1.15701 0 1.29713 0C1.42224 0 1.56337 0.0630546 1.65645 0.156136L7.80282 6.30254L13.9492 0.156136C14.0433 0.0620537 14.1834 0 14.3085 0C14.4336 0 14.5747 0.0630546 14.6678 0.156136L15.4495 0.937824C15.5436 1.03191 15.6056 1.17203 15.6056 1.29714Z"
          fill="#1FA5FF"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiExpansionPanelsItemHeader'
})
export default class UiExpansionPanelsItemHeader extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly isActive!: boolean;
};
</script>

<style lang="scss" scoped>
.ui-expansion-panels--item-header {
  width: 100%;
  padding: $gap / 2;
  background-color: $brand-lighten-color-2;
  // color: $light-color;
  position: relative;
  transition: background-color 0.3s $cubic;
  cursor: pointer;

  &--icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin-top: auto;
    margin-bottom: auto;
    width: 19px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transform-origin: 50% 50%;
    transition: transform 0.3s $cubic;
  }

  &--icon_default {
    width: 100%;
    height: 100%;
  }

  &_active {
    .ui-expansion-panels--item-header {
      &--icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
