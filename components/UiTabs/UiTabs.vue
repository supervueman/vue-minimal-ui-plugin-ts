<template>
  <div class="ui-tabs" v-bind="$attrs">
    <div class="ui-tabs--bar">
      <div
        v-if="headersTabs.length && isHiddenTabs && isLastHidden"
        class="ui-tabs__arrow"
        @click="$emit('next', 'next')"
      >
        <ArrowIcon />
      </div>
      <div
        v-if="headersTabs.length && headersTabs[0].hidden && isHiddenTabs"
        class="ui-tabs__arrow ui-tabs__arrow--left"
        @click="$emit('prev', 'prev')"
      >
        <ArrowIcon />
      </div>
      <div
        v-for="(tab, i) in count"
        :key="`tab-${i}`"
        class="ui-tabs--bar-item"
        :class="{
          'ui-tabs--bar-item_active': i + 1 === value,
          hidden: headersTabs.length ? headersTabs[i].hidden : false,
          'ui-tabs--bar-item_disabled': headersTabs.length
            ? headersTabs[i].disabled
            : false
        }"
        @click="changeItem(i + 1)"
      >
        <slot name="tab" :tab="tab">
          {{ i + 1 }}
        </slot>
      </div>
    </div>

    <div class="ui-tabs--body">
      <transition-group name="tab-slide-right" tag="div">
        <slot name="tabs-body" />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component({
  name: 'UiTabs'
})
export default class UiTabs extends Vue {
  @Model('change', { type: Number })
  private readonly value!: number;

  @Prop({ type: Array, default: () => [] })
  private readonly headersTabs!: any[];

  private count: number = 0;
  private index: number = 1;

  get isHiddenTabs(): boolean {
    return !!(this.headersTabs.length && this.headersTabs.some(v => v.hidden));
  }

  get isLastHidden(): boolean {
    return (
      this.headersTabs.length &&
      this.headersTabs[this.headersTabs.length - 1].hidden
    );
  }

  created() {
    this.index = this.value;
  }

  mounted() {
    if (this.$slots["tabs-body"]) {
      this.count = this.$slots["tabs-body"].length;
    }
  }

  changeItem(index: number): void {
    this.index = index;
    this.$emit("change", this.index);
  }
};
</script>

<style lang="scss">
.hidden {
  display: none;
}
.ui-tabs {
  width: 100%;
  &--bar {
    margin-bottom: $gap;
    display: flex;
    align-items: center;

    &-item {
      padding: $gap / 2 $gap;
      border: 1px solid $brand-color;
      border-right: none;
      flex: 1;
      text-align: center;
      transition: color 0.3s, background-color 0.3s;
      transition-timing-function: $cubic;
      cursor: pointer;
      white-space: nowrap;

      &_active {
        color: $light-color;
        background-color: $brand-color;
      }
      &:hover {
        background-color: $brand-color;
        color: $light-color;
      }
      &:last-child {
        border-right: 1px solid $brand-color;
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
      &:first-child {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      &_disabled {
        background-color: $light-gray-color-2;
        color: $gray-color;
        border-color: $light-gray-color;
        pointer-events: none;
        &:last-child {
          border-right-color: $light-gray-color;
        }
        @include on-event {
          background-color: $light-gray-color-2;
          color: $gray-color;
        }
      }
    }
  }
  &--body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
    & > * {
      width: 100%;
    }
  }
  &__arrow {
    width: 28px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    right: -5px;
    cursor: pointer;

    &--left {
      transform: translateY(-50%) rotate(-90deg);
      left: -4px;
    }
  }
}
.tab-slide-right-enter-active,
.tab-slide-right-leave-active {
  transition: transform 0.3s;
  position: static;
}
.tab-slide-right-enter,
.tab-slide-right-leave-to {
  transform: translateX(100%);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
