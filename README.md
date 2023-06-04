## 简介

- 基于npm create原理封装的脚手架
- 目前支持四套模板


## 使用

``` bash
# 创建基于vue2的可用于npm包开发的模板，可以通过它实现组件、插件等npm包开发并发布。
$ npm create chuck-projects my-project --template vue2-components-dev

# 创建基于vue3+TS的可用于npm包开发的模板，可以通过它实现组件、插件等npm包开发并发布。
$ npm create chuck-projects my-project --template vue3-components-dev

# 创建基于vue3+TS+vant的移动端h5模板，改模板支持了rem适配、mock数据等。
$ npm create chuck-projects my-project --template vue3-h5-vant

# 创建基于vue3+TS+naiveUI的后管端模板，改模板封装了基础的admin后台管理框架。
$ npm create chuck-projects my-project --template vue3-admin-naive
```
