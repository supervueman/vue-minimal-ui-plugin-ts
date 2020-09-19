import Vue, { VueConstructor } from 'vue';

/* ==============================================
 * ================= Layouts ====================
 */
// Card
import UiCard from "./layouts/UiCard/UiCard.vue";
import UiCardHeader from "./layouts/UiCard/UiCardHeader.vue";
import UiCardMedia from "./layouts/UiCard/UiCardMedia.vue";
import UiCardContent from "./layouts/UiCard/UiCardContent.vue";
import UiCardActions from "./layouts/UiCard/UiCardActions.vue";
// Dialog
import UiDialog from "./layouts/UiDialog.vue";

/* ==============================================
 * ================= Components =================
 */
import UiAlert from "./components/UiAlert.vue";
import UiButton from "./components/UiButton.vue";
import UiInput from "./components/UiInput.vue";
import UiInputSearch from "./components/UiInputSearch/UiInputSearch.vue";
import UiFileInput from "./components/UiFileInput.vue";
import UiCheckbox from "./components/UiCheckbox.vue";
import UiTextarea from "./components/UiTextarea.vue";
import UiSelect from "./components/UiSelect.vue";
import UiDivider from "./components/UiDivider.vue";
import UiDataTable from "./components/UiDataTable/Main.vue";
import UiPagination from "./components/UiPagination.vue";
import UiTabs from "./components/UiTabs/UiTabs.vue";
import UiExpansionPanels from "./components/UiExpansionPanels/UiExpansionPanels.vue";
import UiExpansionPanel from "./components/UiExpansionPanels/UiExpansionPanel.vue";
import UiMenu from "./components/UiMenu/UiMenu.vue";
import UiSearch from "./components/UiSearch.vue";
import UiDragAndDropFile from "./components/UiDragAndDropFile/Main.vue";
import UiScrollPagination from "./components/UiScrollPagination.vue";
import UiRadioButton from "./components/UiRadioButton.vue";
import UiList from "./components/UiList/UiList.vue";

type Components = {
  [key: string]: VueConstructor<Vue>
}

const components: Components = {
  // Layouts
  // Card
  UiCard,
  UiCardHeader,
  UiCardMedia,
  UiCardContent,
  UiCardActions,
  // Dialog
  UiDialog,
  // Components
  UiAlert,
  UiButton,
  UiInput,
  UiInputSearch,
  UiFileInput,
  UiCheckbox,
  UiTextarea,
  UiSelect,
  UiDivider,
  UiDataTable,
  UiPagination,
  UiTabs,
  UiExpansionPanels,
  UiExpansionPanel,
  UiMenu,
  UiSearch,
  UiDragAndDropFile,
  UiScrollPagination,
  UiRadioButton,
  UiList,
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
