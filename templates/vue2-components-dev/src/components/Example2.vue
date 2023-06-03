  <template>
    <div>
      我是示例2组件
      <div class="box" @click="handleClick">{{msg}}</div>
    </div>
  </template>
  
  <script>
    export default {
      name:'Example2',
      props: ['msg'],
      methods:{
        handleClick(){
          this.$emit('custom-event','我是Example2传递的参数')
        }
      }
    };
  </script>
  <style scoped lang="less">
    @color:green;
    @k:100px;
    .box{
      height:@k;
      background: @color;
    }
  </style>