<template>
  <div class="ui-card--content">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: "UiCardContent"
})
export default class UiCardContent extends Vue {};
</script>

<style lang="scss" scoped>
.ui-card--content {
  width: 100%;
  padding-right: $gap;
  padding-left: $gap;
  .ui-card {
    &--header {
      padding-right: 0;
      padding-left: 0;
    }

    &--actions {
      padding-right: 0;
      padding-left: 0;
    }

    &--content {
      padding-right: 0;
      padding-left: 0;
    }
  }
}
</style>
