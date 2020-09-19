<template>
  <div class="ui-card--header">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'UiCardHeader'
})
export default class UiCardHeader extends Vue {};
</script>

<style lang="scss" scoped>
.ui-card--header {
  width: 100%;
  padding-right: $gap;
  padding-left: $gap;
  padding-top: $gap;
}
</style>
