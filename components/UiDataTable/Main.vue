<template>
  <div class="ui-data-table" v-bind="$attrs">
    <table v-if="compareItems.length">
      <slot v-if="showSearchBar" name="search-bar" />

      <thead>
        <tr>
          <th
            v-if="showSelect && !singleSelect && showSelectAll && items.length"
            class="check-td"
          >
            <label>
              <UiCheckbox
                :checked="value.length === items.length"
                @change="toggleAll"
              />
            </label>
          </th>

          <slot name="header-additional-row-start" />

          <th v-for="(item, i) in headers" :key="`text-${i}`">
            <slot name="header-row" :item="item.text">
              <div v-if="showHeader">
                {{ item.text }}
              </div>
            </slot>
          </th>
          <slot name="header-additional-row-end" />
        </tr>
      </thead>

      <tbody v-for="(item, i) in compareItems" :key="`tbody-${i}`">
        <tr v-if="showRowHeader" class="ui-data-table--body-row--header">
          <slot name="body-row-header" :item="item" />
        </tr>

        <tr
          class="ui-data-table--body-row pointer"
          :class="{
            'pl-half': showSelectRow
          }"
        >
          <td v-if="showSelect && items.length" class="check-td">
            <UiCheckbox
              v-if="showCheckbox(item)"
              :data-value="item"
              :checked="!!itemKeys.find(el => el === item[itemKey])"
              @change="toggleItem"
            />
          </td>

          <slot name="body-row" :item="item" :index="i">
            <td v-for="(innerItem, j) in item" :key="`innerItem${j}`">
              {{ innerItem }}
            </td>
          </slot>
        </tr>
      </tbody>
    </table>

    <div v-else class="table_empty text-center">
      <h3 class="text-uppercase">
        {{ noDataMessage }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

// Types
import { UiDataTableHeaderInterface } from './types';

type UiDataTableItem = {
  [key: string]: any;
}

type UiDataTableEvent = {
  value: UiDataTableItem;
  checked: boolean
}

@Component({
  name: 'UiDataTable'
})
export default class UiDataTable extends Vue {
  @Model('change', { type: Array })
  private readonly value!: any[];

  @Prop({ type: Array, default: () => [] })
  private readonly headers!: UiDataTableHeaderInterface[];

  @Prop({ type: Array, default: () => [] })
  private readonly items!: any[];

  @Prop({ type: Boolean, default: false })
  private readonly useBuffer!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly singleSelect!: boolean;

  @Prop({ type: String, default: '' })
  private readonly itemKey!: string;

  @Prop({ type: Boolean, default: false })
  private readonly showSelect!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly showSelectAll!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly showSelectRow!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly showSearchBar!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly showHeader!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly showRowHeader!: boolean;

  @Prop({ type: Function, default: () => true })
  private readonly showCheckboxIf!: Function;

  @Prop({ type: Boolean, default: false })
  private readonly useCheckboxIf!: boolean;

  @Prop({ type: String, default: 'Нет данных' })
  private readonly noDataMessage!: string;

  @Prop({ type: Boolean, default: true })
  private readonly isCompare!: boolean;

  private buffer: UiDataTableItem[] = [];

  get itemKeys(): string[] {
    return this.value.map(el => el[this.itemKey]);
  }

  get compareItems(): UiDataTableItem[] {
    if (this.isCompare) {
      const compareItems: UiDataTableItem[] = [];
      let items: UiDataTableItem[] = [];
      let value: UiDataTableItem[] = [];

      if (this.items) {
        items = this.items;
      }

      if (this.value) {
        value = this.value;
      }

      items.forEach(el => {
        const existEl: UiDataTableItem | undefined = value.find(
          val => val[this.itemKey] === el[this.itemKey]
        );

        if (existEl) {
          compareItems.push(existEl);
        } else {
          compareItems.push({ ...el });
        }
      });

      if (compareItems.length === 0) {
        return value;
      }
      return compareItems;
    }

    return this.items;
  }

  toggleItem($event: UiDataTableEvent) {
    let value: UiDataTableItem[] = this.value;

    if (!this.singleSelect) {
      if ($event.checked) {
        if (this.useBuffer) {
          const existCachedItem: UiDataTableItem | undefined = this.buffer.find(
            (el: UiDataTableItem) => el[this.itemKey] === $event.value[this.itemKey]
          );

          if (existCachedItem) {
            value.push({ ...existCachedItem });
            this.buffer = this.buffer.filter(
              (el: UiDataTableItem) => el[this.itemKey] !== existCachedItem[this.itemKey]
            );
          } else {
            value.push({ ...$event.value });
          }
        } else {
          value.push({ ...$event.value });
        }
      } else {
        if (this.useBuffer) {
          const existCachedItem: UiDataTableItem | undefined = this.buffer.find(
            (el: UiDataTableItem) => el[this.itemKey] === $event.value[this.itemKey]
          );

          if (!existCachedItem) {
            this.buffer.push({ ...$event.value });
          }
        }
        value = this.value.filter(
          el => el[this.itemKey] !== $event.value[this.itemKey]
        );
      }
    } else {
      if ($event.checked) {
        value = [{ ...$event.value }];
      } else {
        value = [];
      }
    }

    this.$emit("change", value);
  }

  toggleAll($event: UiDataTableEvent) {
    if ($event.checked) {
      if (this.useCheckboxIf) {
        if (this.useBuffer) {
          const items: UiDataTableItem[] = [];
          let compareItems: UiDataTableItem[] = this.compareItems;

          this.compareItems.forEach((el: UiDataTableItem) => {
            const showItem: UiDataTableItem | undefined = compareItems.find(() => this.showCheckbox(el));

            const existCachedItem: UiDataTableItem | undefined = this.buffer.find(() =>
              this.showCheckbox(el)
            );

            if (existCachedItem) {
              items.push({ ...existCachedItem });

              this.buffer = this.buffer.filter(
                (el: UiDataTableItem) => el[this.itemKey] !== existCachedItem[this.itemKey]
              );
            } else {
              if (showItem) {
                items.push({ ...showItem });

                compareItems = compareItems.filter(
                  (el: UiDataTableItem) => el[this.itemKey] !== showItem[this.itemKey]
                )
              }
            }
          });

          this.$emit("change", items);
        } else {
          this.$emit(
            "change",
            this.items.filter((item: UiDataTableItem) => this.showCheckbox(item))
          );
        }
        this.buffer = [];
      } else {
        this.$emit(
          "change",
          this.items.map((el: UiDataTableItem) => ({ ...el }))
        );
      }
    } else {
      this.buffer = this.compareItems.map((el: UiDataTableItem) => ({ ...el }));
      this.$emit("change", []);
    }
  }

  showCheckbox(item: UiDataTableItem) {
    return this.useCheckboxIf ? this.showCheckboxIf(item) : true;
  }
};
</script>

<style scoped lang="scss">
.ui-data-table {
  width: 100%;
  text-align: left;

  &--tr-head {
    display: block;
  }
  table {
    width: 100%;
    border-spacing: 0;
  }
  tr {
    position: relative;
  }
  td,
  th {
    padding: $gap / 2 $gap / 3 $gap / 2 7px;
  }
}
.table_empty {
  width: 100%;
  background-color: $light-gray-color-2;
  color: $light-gray-color;
  padding: $gap;
}
</style>
