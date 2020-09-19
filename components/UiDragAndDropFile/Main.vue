<template>
  <div>
    <!--  Validation start  -->
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
            Количество файлов: {{ item.value }}. Допустимое количество файлов:
            {{ maxFileCount }}Мб.
          </span>
        </div>
      </div>
    </div>
    <!--  Validation end  -->

    <label
      :style="{
        'min-width': minWidth,
        'max-width': maxWidth,
        'min-height': minHeight,
        'max-height': maxHeight
      }"
      class="ui-drag-and-drop"
      :class="{ 'ui-drag-and-drop-hover': isHoverFiles }"
      for="fileDrag"
      @drop.prevent="addFile"
      @dragover.prevent
      @dragenter="fileEnter"
      @dragleave="fileLeave"
    >
      <span
        class="ui-drag-and-drop--label"
        :class="{ 'ui-drag-and-drop--label-hover': isHoverFiles }"
      >
        {{ message }}
      </span>
      <input
        type="file"
        :multiple="multiple"
        class="ui-drag-and-drop--input"
        @change="addFile"
      >
    </label>
    <div class="ui-drag-and-drop--list" :style="{ 'max-width': maxWidthList }">
      <div
        v-for="(item, index) in value"
        :key="`index: ${index}`"
        class="ui-drag-and-drop--list-item"
        :style="getColumns"
      >
        <DeleteIcon
          class="ui-drag-and-drop--list-item--icon"
          @click="deleteFile(item, index)"
        />
        <div class="ui-drag-and-drop--list-item--text">
          <slot name="file" :item="item">
            {{ item.file.name }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

// Mixins
import valid from "../../mixins/fileInputValid";

// Types
import { CustomFile } from '../../types/CustomFile';

@Component({
  name: 'UiDragAndDropFile'
})
export default class UiDragAndDropFile extends mixins(valid) {
  @Model('change', { type: [String, Number, Object, Array] })

  @Prop({ type: String, default: '' })
  private readonly minWidth!: string;

  @Prop({ type: String, default: '' })
  private readonly maxWidth!: string;

  @Prop({ type: String, default: '' })
  private readonly minHeight!: string;

  @Prop({ type: String, default: '' })
  private readonly maxHeight!: string;

  @Prop({ type: Number, default: null })
  private readonly columns!: number;

  @Prop({ type: String, default: '500px' })
  private readonly maxWidthList!: string;

  @Prop({ type: String, default: 'Перетащите файлы в данную область' })
  private readonly message!: string;

  private files: [] = [];

  private isHoverFiles: boolean = false;

  private count: number = 1;

  get getColumns(): string {
    return `width: calc(100% / ${this.columns})`;
  }

  addFile($event: CustomEvent & {dataTransfer?: DataTransfer}): void {
    const files: CustomFile[] = [];
    const uploadFiles: File[] = [];

    const dataTransfer: DataTransfer = $event.dataTransfer as DataTransfer;
    const target: HTMLInputElement = $event.target as HTMLInputElement;

    if (dataTransfer && dataTransfer.files) {
      uploadFiles.push(...dataTransfer.files);
    } else {
      if (target.files) {
        uploadFiles.push(...target.files);
      }
    }

    if (this.multiple) {
      files.push(...this.value);
    }

    Promise.all(this.filePromiseCollect(uploadFiles, files)).then(() => {
      this.$emit("change", files);
      target.value = "";
    });

    this.isHoverFiles = false;
  }

  fileLeave(): void {
    this.isHoverFiles = false;
  }

  fileEnter(): void {
    this.isHoverFiles = true;
  }
};
</script>

<style lang="scss" scoped>
.ui-drag-and-drop {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $brand-color;
  width: 100%;
  border: 1px dashed $brand-color;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  &--label {
    font-size: 14px;
    color: $brand-color;
    pointer-events: none;
    &-hover {
      opacity: 0.5;
    }
  }
  &--input {
    display: none;
  }
  &-hover {
    border: 1px solid $brand-color;
  }
  &--list {
    margin-top: $gap / 2;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: $gap / 2;
      padding-right: $gap / 2;
      &--text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &--icon {
        flex-shrink: 0;
        margin-right: $gap / 2;
        cursor: pointer;
      }
    }
  }
}
</style>
