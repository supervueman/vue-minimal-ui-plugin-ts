import { Vue, Component, Prop } from 'vue-property-decorator';

// Types
import { CustomFile } from './../types/CustomFile';

type ValidError = {
  key: string;
  isError: boolean;
  value: number | string;
}

@Component({})
export default class FileInputValid extends Vue {
  @Prop({ type: Array, default: () => [] })
  public readonly value!: CustomFile[];

  @Prop({ type: Boolean, default: false })
  public readonly multiple!: boolean;

  @Prop({ type: Boolean, default: false })
  public readonly showDetails!: boolean;

  @Prop({ type: Array, default: () => [] })
  private readonly validExtensions!: string[];

  @Prop({ type: Number, default: 10 })
  private readonly maxFileSize!: number;

  @Prop({ type: Number, default: 50 })
  private readonly maxTotalSize!: number;

  @Prop({ type: Number, default: 10 })
  private readonly maxFileCount!: number;

  private extensionError: ValidError = {
    key: 'extension-error',
    isError: false,
    value: ''
  }

  private fileSizeError: ValidError = {
    key: 'file-size-error',
    isError: false,
    value: 0
  }

  private fileCountError: ValidError = {
    key: 'file-count-error',
    isError: false,
    value: 0
  }

  private totalSizeError: ValidError = {
    key: 'total-size-error',
    isError: false,
    value: 0
  }

  get validErrors(): ValidError[] {
    return [
      this.extensionError,
      this.fileSizeError,
      this.fileCountError,
      this.totalSizeError
    ];
  }

  filePromiseCollect(uploadFiles: File[] | FileList, files: CustomFile[]): Promise<void>[] {
    const filesPromises: Promise<void>[] = [];

    uploadFiles.forEach((file: File) => {
      this.valid(file);

      // Valid extensions
      if (this.extensionError.isError) return;

      // Valid max file size
      if (this.fileSizeError.isError) return;

      // Valid max total size
      if (this.totalSizeError.isError) return;

      // Valid max files count
      if (filesPromises.length + this.value.length < this.maxFileCount) {
        // Создаем массив из промисов так как reader.onload попадает в очередь
        filesPromises.push(new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            files.push({
              file,
              base64: `${reader.result}`
            });
            resolve();
          };

          reader.onerror = () => reject();
        }));
      } else {
        this.fileCountError.isError = true;
        this.fileCountError.value = filesPromises.length + this.value.length + 1;
      }
    });

    this.checkValid();

    return filesPromises;
  }

  deleteFile(item: CustomFile, index: number) {
    const files = this.value.filter((_, i) => i !== index);
    this.$emit('change', files);
    this.$emit('delete', {
      item,
      index
    });

    this.valid(item.file, 'delete');
  }

  checkValid() {
    this.$emit('valid', this.validErrors);
  }

  /**
   * @function valid
   * @param file
   * @param operation
   * @return void
   * This function called in select file and deleteFile therefore use operation argument
   */

  valid(file: File, operation = "upload") {
    // Valid max files count
    // console.log(file && this.value.length === this.maxFileCount && operation !== 'upload')
    if (file && this.value.length === this.maxFileCount && operation !== 'upload') {
      // console.log(1)
      this.fileCountError.isError = false;
      this.fileCountError.value = this.value.length;
    }

    // Valid extensions
    const extension = file.name ? file.name.toLowerCase().split(".").pop() : file.name;
    if (extension && this.validExtensions.length > 0 && !this.validExtensions.includes(extension) && operation === 'upload') {
      this.extensionError.isError = true;
      this.extensionError.value = extension;
    } else {
      this.extensionError.isError = false;
      this.extensionError.value = '';
    }

    // Valid max file size
    if (file && file.size / 1024 / 1024 > this.maxFileSize && operation === 'upload') {
      this.fileSizeError.isError = true;
      this.fileSizeError.value = file.size / 1024 / 1024;
    } else {
      this.fileSizeError.isError = false;
      this.fileSizeError.value = 0;
    }

    // Valid max total size
    const currentTotalSize = this.value.reduce((acc, el) => (acc + el.file.size), 0) / 1024 / 1024;
    if (currentTotalSize && currentTotalSize >= this.maxTotalSize && operation === 'upload') {
      this.totalSizeError.isError = true;
      this.totalSizeError.value = currentTotalSize + file.size / 1024 / 1024;
    } else {
      this.totalSizeError.isError = false;
      this.totalSizeError.value = currentTotalSize;
    }
  }
};
