import { App } from 'vue';
import Test from "./Test.vue"; // 引入封装好的组件
 
export { Test } //实现按需引入*
 
 
const components = [Test];
const install = function(app: App, _options) {
    components.forEach((component) => {
        app.component(component.name,component);
    });
};
export default { install } // 批量的引入*