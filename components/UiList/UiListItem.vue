<template>
  <li class="ui-list-item">
    <slot />
  </li>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'UiListItem'
})
export default class UiListItem extends Vue {};
</script>

<style lang="scss" scoped>
.ui-list-item {
  list-style-type: none;
  padding-top: $gap;
  padding-bottom: $gap;
  text-transform: uppercase;
}
</style>
