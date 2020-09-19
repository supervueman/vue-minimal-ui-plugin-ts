<template>
  <ul class="ui-list" :class="classProp" :style="{ 'max-height': maxHeight }">
    <li
      v-for="(item, index) in items"
      :key="`item-list-${index}`"
      :class="{
        'ui-list--item_active':
          selectedItem === item ||
          indexSelected === index ||
          (selectedItem &&
            selectedItem.id &&
            item.id &&
            selectedItem.id === item.id),
        'ui-list--item': isHover,
        'ui-list--item-no-hover': !isHover,
      }"
    >
      <div class="d-flex justify-between align-center">
        <div
          class="d-flex align-center flex-2"
          @click="$emit('click-item', { item, index })"
        >
          <span v-if="iconStatus" class="ui-list--item--icon">
            <slot name="icon-status" />
          </span>
          <slot name="item" :item="item" :index="index">
            {{ `${item.val ? item.val : item.name}` }}
          </slot>
        </div>

        <span v-if="iconAction" class="p-half cursor-pointer">
          <slot name="icon-action" :item="item" :index="index" />
        </span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiList'
})
export default class UiList extends Vue {
  @Prop({ type: Array, default: () => ([]) })
  private readonly items!: any[];

  @Prop({ type: Object, default: () => ({}) })
  private readonly selectedItem!: object;

  @Prop({ type: Number, default: null })
  private readonly indexSelected!: number;

  @Prop({ type: Boolean, default: false })
  private readonly iconStatus!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly iconAction!: boolean;

  @Prop({ type: String, default: '' })
  private readonly classProp!: string;

  @Prop({ type: Boolean, default: true })
  private readonly isHover!: boolean;

  @Prop({ type: String, default: '' })
  private readonly maxHeight!: string;
};
</script>

<style scoped lang="scss">
.ui-list {
  /*overflow-x: hidden;*/
  border-radius: $border-radius;
  height: 100%;
  &--item {
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;
    transition-timing-function: $cubic;
    @include on-event {
      color: $light-color;
      background: $brand-color;
    }
    &:last-child {
      border-bottom: none;
    }
    &--icon {
      margin-right: $gap/2;
    }
    &_active {
      color: $light-color;
      background: $brand-color;
    }
  }
  &--item-no-hover {
    &:last-child {
      border-bottom: none;
    }
    &--icon {
      margin-right: $gap/2;
    }
    &_active {
      color: $light-color;
      background: $brand-color;
    }
  }
}
</style>
