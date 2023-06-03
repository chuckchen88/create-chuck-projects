/**
 * 存在复杂业务逻辑处理，并且对dom更新相对较少，此时就会用到自定义指令
 * 简化组件内部代码，此时就会用到自定义指令
 * 当需要对普通 DOM 元素进行底层操作，此时就会用到自定义指令
 * 需要减少代码改动，且存在多个相同业务逻辑的，此时就会用到自定义指令
 */
import autoFocus from "./autoFocus"
import clickCopy from "./clickCopy"

export {
    autoFocus,
    clickCopy
}
