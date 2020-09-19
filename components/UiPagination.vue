<template>
  <div v-if="items.length" class="ui-pagination">
    <ul class="ui-pagination--list">
      <li
        v-for="(item, i) in items"
        :key="`${item}-${i}`"
        class="ui-pagination--list-item"
        :class="{
          'ui-pagination--list-item_active': item === value,
          'ui-pagination--list-item_disable': item === '...'
        }"
        @click="$emit('input', item)"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="ui-pagination--actions">
      <li
        class="ui-pagination--nav"
        :class="{ 'ui-pagination--nav_disable': value === 1 }"
        @click="$emit('input', value - 1)"
      >
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none">
          <path
            d="M8.69995 0L-4.90722e-05 8.69992L8.69995 17.3998L8.69995 0Z"
            fill="#1FA5FF"
          />
        </svg>
      </li>
      <li
        class="ui-pagination--nav"
        :class="{ 'ui-pagination--nav_disable': value === length }"
        @click="$emit('input', value + 1)"
      >
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none">
          <path
            d="M0 17.3999L8.7 8.69998L0 6.1209e-05L0 17.3999Z"
            fill="#1FA5FF"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'UiPagination'
})
export default class UiPagination extends Vue {
  @Prop({ type: Number, default: 0 })
  private readonly length!: number;

  @Prop({ type: Number, default: 10 })
  private readonly limit!: number;

  @Prop({ type: Number, default: 1 })
  private readonly currentPage!: number;

  @Prop({ type: Number, default: 10 })
  private readonly totalVisible!: number;

  @Prop({ type: Number, default: 0 })
  private readonly value!: number;

  private maxButtons: number = 0;
  private selected: number | null = null;

  get items(): Array<number | string> {
    const totalVisible: number = this.totalVisible;

    const maxLength: number = Math.min(
      Math.max(0, totalVisible) || this.length,
      Math.max(0, this.maxButtons) || this.length,
      this.length
    );

    if (this.length <= maxLength) {
      return this.range(1, this.length);
    }

    const even: number = maxLength % 2 === 0 ? 1 : 0;
    const left: number = Math.floor(maxLength / 2);
    const right: number = this.length - left + 1 + even;

    if (this.value > left && this.value < right) {
      const start: number = this.value - left + 2;
      const end: number = this.value + left - 2 - even;

      return [1, "...", ...this.range(start, end), "...", this.length];
    } else if (this.value === left) {
      const end: number = this.value + left - 1 - even;

      return [...this.range(1, end), "...", this.length];
    } else if (this.value === right) {
      const start: number = this.value - left + 1;

      return [1, "...", ...this.range(start, this.length)];
    } else {
      return [
        ...this.range(1, left),
        "...",
        ...this.range(right, this.length)
      ];
    }
  }

  range(from: number, to: number): number[] {
    const range: number[] = [];

    from = from > 0 ? from : 1;

    for (let i: number = from; i <= to; i++) {
      range.push(i);
    }

    return range;
  }
};
</script>

<style scoped lang="scss">
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid $brand-color;
  // border-radius: $border-radius;
  height: 40px;
  &--list {
    display: flex;
    &-item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-right: 1px solid $brand-color;
      transition: background-color 0.3s $cubic, color 0.3s $cubic;
      @include on-event {
        background-color: $brand-color;
        color: $light-color;
      }
      &_active {
        background-color: $brand-color;
        color: $light-color;
      }
      &_disable {
        user-select: none;
        pointer-events: none;
      }
    }
  }
  &--actions {
    display: flex;
  }
  &--nav {
    width: 30px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s $cubic;
    &_disable {
      user-select: none;
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
