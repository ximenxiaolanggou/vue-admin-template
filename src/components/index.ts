import SvgIcon from './SvgIcon/index.vue';
import TableTip from './TableTip/index.vue';
import type { App, Component } from 'vue';
import * as ElementPlusIcons from '@element-plus/icons-vue';
const components: { [name: string]: Component } = { SvgIcon, TableTip };
export default {
    install(app: App) {
        // 全局组件
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
        // Element Icons
        for (const [key, component] of Object.entries(ElementPlusIcons)) {
            app.component(key, component);
        }
    }
}