<template>
  <div class="ui-expansion-panels">
    <slot />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: "UiExpansionPanels"
})
export default class UiExpansionPanels extends Vue {};
</script>

<style lang="scss" scoped>
.ui-expansion-panels {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
