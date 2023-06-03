// 组件
import { Example, Example2 } from "../components"
// 过滤器
import { reverse, tel2asterisk  } from "../filters"
// 指令
import { autoFocus, clickCopy } from "../directives";
// 混入
import mixins from "../mixins";

// 实现按需引入*
export { 
  Example, 
  Example2, 
  reverse, 
  tel2asterisk,
  autoFocus,
  clickCopy,
  mixins
} 

// 我觉得这里还可以进行代码优化
const components = [ Example, Example2 ];
const filters = { reverse, tel2asterisk }
const directives = { autoFocus, clickCopy }

// 当Vue.use时候，会自动调用暴露出去的install
const install = function(App, options) {
    // 全局添加组件
    components.forEach((component) => {
        App.component(component.name, component);
    });
    // 全局过滤器
    Object.keys(filters).map( item => {
      App.filter(item, filters[item])
    })
    // 全局指令
    Object.keys(directives).map( item => {
      App.directive(item, directives[item])
    })
    // 全局混入
    App.mixin(mixins)
    // 扩展Vue原型
    App.prototype.$hello = () => { console.log('hello') }
};

// 批量的引入*
export default { install }
