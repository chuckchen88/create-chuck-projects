### Vue 3 + TypeScript + Vite
用于快速开始一个vue3+vite的项目，便于组件开发并发布npm.

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