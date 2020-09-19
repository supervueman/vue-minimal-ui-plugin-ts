<template>
  <div class="ui-file-input" :class="{ 'ui-file-input_error': false }">
    <input
      ref="file"
      type="file"
      :multiple="multiple"
			@change="selectFiles"
    >
    <div class="ui-file-input--item">
      <button class="ui-file-input--button" @click="openFileWindow">
        Загрузить документ<span v-if="multiple">ы</span>
      </button>

      <slot name="errors" :error="validErrors">
        <div v-if="showDetails" class="ui-file-input--footer">
          <div v-for="(item, i) in validErrors" :key="`error-${i}`">
            <div v-if="item.isError">
              <span v-if="item.key === 'extension-error'">
                Недопустимый формат файла: {{ item.value }}. Допустимые форматы
                файлов:
                <span v-for="(format, j) in validExtensions" :key="format">
                  {{ format }}
                  <span v-if="j !== validExtensions.length - 1">, </span> </span>.
              </span>
              <span
                v-if="item.key === 'file-size-error'"
              >
                Размер файла: {{ Math.round(item.value * 100) / 100 }}Мб.
                Допустимый размер файла: {{ maxFileSize }}Мб.
              </span>
              <span
                v-if="item.key === 'total-size-error'"
              >
                Общий размер файлов: {{ Math.round(item.value) / 100 }}Мб.
                Максимально допустимый размер файлов: {{ maxTotalSize }}Мб.
              </span>
              <span
                v-if="item.key === 'file-count-error'"
              >
                Количество файлов: {{ item.value }}. Допустимое количество
                файлов: {{ maxFileCount }}Мб.
              </span>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div v-if="showContent" class="ui-file-input--list">
      <div
        v-for="(item, i) in value"
        :key="`${item.name}-${i}`"
        class="ui-file-input--list-item"
      >
        <div
          class="ui-file-input--list-item--icon"
          @click="deleteFile(item, i)"
        >
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path
              d="M2.99999 18C1.89499 18 0.999997 17.105 0.999997 16V4H13V16C13 17.105 12.105 18 11 18H2.99999ZM0 3V1H3.49999L4.49999 0H9.49997L10.5 1H14V3H0Z"
              fill="#BFBFBF"
            />
          </svg>
        </div>
        <div class="ui-file-input--list-item--text">
          <slot name="file" :item="item">
            {{ item.file.name }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import valid from "../mixins/fileInputValid";

// Types
import { CustomFile } from '../types/CustomFile';

@Component({
  name: 'UiFileInput'
})
export default class UiFileInput extends mixins(valid) {
  @Model('change', { type: [String, Number, Object, Array] })

  private count: number = 1; // Мы не идиоты, просто нужна была поддержка IE11, а этот супер-пупер браузер вызывает функцию selectFiles 2 раза по событию change!!!

  openFileWindow(): void {
    this.count = 1;

    const refFile: HTMLElement = this.$refs.file as HTMLElement;

    refFile.click();
  }

  selectFiles($event: Event): void {
    if (this.count === 1) {
      const files: CustomFile[] = [];

      if (this.multiple) {
        files.push(...this.value);
      }

      const target: HTMLInputElement = $event.target as HTMLInputElement;

      if (!target.files) return;

      Promise.all(this.filePromiseCollect(target.files, files)).then(
        () => {
          this.$emit("change", files);

          // Если value не очищать, то функция в IE вызывается 2 раза, если очищать, то функция отработает 1 раз, но нарушится логика
          // Извините, но иначе ВООБЩЕ не получалось :(
          target.value = "";
        }
      );

      this.count++;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-file-input {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  input {
    display: none;
  }
  &--item {
    width: 216px;
    margin-right: $gap / 2;
  }
  &--footer {
    font-size: 12px;
    width: 100%;
  }
  &--button {
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 $gap 0 $gap;
    border: 1px solid $brand-color;
    color: $brand-color;
    text-decoration: none;
    outline: none;
    letter-spacing: 0.5px;
    cursor: pointer;
    border-radius: $border-radius;
    background-color: $light-color;
    transition: border-color 0.5s, background-color 0.5s, color 0.5s;
    transition-timing-function: $cubic;
    @include on-event {
      border-color: $brand-lighten-color-1;
      color: $brand-lighten-color-1;
    }
  }
  &--list {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding-top: $gap / 2;
    max-width: 814px;
    &-item {
      display: flex;
      align-items: center;
      width: 33.33%;
      margin-bottom: $gap / 2;
      padding-right: $gap / 2;
      &--icon {
        margin-right: $gap / 2;
        cursor: pointer;
      }
      &--text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  &_error {
    .ui-file-input--button {
      border-color: $error-color;
    }
  }
}
</style>
