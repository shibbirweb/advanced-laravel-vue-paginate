import { DefineComponent, Plugin } from 'vue';

declare const AdvancedLaravelVuePaginate: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default AdvancedLaravelVuePaginate;
