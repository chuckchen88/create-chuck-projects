<template>
  <div id="app">
    <Example />
    <hr />
    <Example2 :msg="msg" @custom-event="customEvent"/>
    <hr />
    <img :src="logo" />
    <hr />
    <hr />
    <input type="text" v-autoFocus>
    <hr />
    <button v-clickCopy="copyInfo">一件复制</button>
    <hr />
    <button @click="historyBack()"> 返回</button>
    <hr />
    <!-- 全局方法 必须全局注册才能用 -->
    <!-- <button @click="$hello">全局方法</button> -->
  </div>
</template>
<script>
  // 局部引入
  import { Example, reverse, autoFocus, clickCopy, mixins as hb  } from './plugins'

  export default {
    name: "app",
    data(){
      return {
        logo: require('./assets/logo.png'),
        str: '1234567',
        msg: '我是传递到Example2的数据',
        copyInfo: '我是复制的信息'
      }
    },
    components: {
      Example
    },
    mixins: [ hb ],
    filters:{
      reverse
    },
    directives: {
      autoFocus,
      clickCopy
    },
    methods:{
      customEvent(v){
        console.log(v)
      }
    }
  };
</script>