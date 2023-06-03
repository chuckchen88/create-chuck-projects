import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from '@/store';

// 移动端适配
import 'lib-flexible/flexible.js';

// 引入全局样式
import '@/assets/scss/index.scss';

// 引入vant4支持的函数组件样式 toast、dialog、notify、imagePreview
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant.js';

//全局公共组件
import components from './plugins/components.js';

const app = createApp(App)

// 挂载状态管理
setupStore(app);

app.use(router).use(vantPlugins).use(components).mount('#app');