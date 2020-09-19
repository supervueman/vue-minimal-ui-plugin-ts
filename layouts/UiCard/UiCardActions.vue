<template>
  <div class="ui-card--actions">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: "UiCardActions"
})
export default class UiCardActions extends Vue {};
</script>

<style lang="scss" scoped>
.ui-card--actions {
  width: 100%;
  padding-right: $gap;
  padding-left: $gap;
  padding-bottom: $gap;
}
</style>
