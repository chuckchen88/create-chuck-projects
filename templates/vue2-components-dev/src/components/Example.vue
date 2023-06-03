  <template>
    <div>
      我是示例1组件
      <div class="box"></div>
    </div>
  </template>
  
  <script>
    export default {
      name:'Example'
    };
  </script>
  <style scoped lang="less">
    @color:red;
    @k:100px;
    .box{
      height:@k;
      background: @color;
    }
  </style>