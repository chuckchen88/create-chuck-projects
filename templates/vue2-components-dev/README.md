# <%= name %>

>  <%= description %>

## Build Setup 

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

yarn build
```
### vue组件或插件开发

> 可以参考该项目中的代码示例。

### npm发布
``` bash
# 登录npm
$ npm login

# 调试 -- 可跳过
$ npm link # 创建包缓存
$ npm link packageName  # 其他项目用引用这个包
$ npm unlink packageName # 其他项目中解除引用这个包（必须）

# 发布
$ npm publish

# 删除已发布的包(只能删除72小时内上传的包，且24小时内无法重新上传同名的包)
$ npm unpublish packageName --force
```