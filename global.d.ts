import { VueRouter } from 'vue-router/types/router';
import { Store } from 'vuex';

export {}

declare global {
  interface FileList {
    forEach(callback: (f: File) => void) : void;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>;
    $router: VueRouter;
  }
}
