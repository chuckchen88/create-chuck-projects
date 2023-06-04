<script setup lang="ts">
import Test from './components/Test.vue'
import { ref } from 'vue'

const value = ref(true)

</script>

<template>
  <Test v-model="value" color="red" :childChecked="false"/>
</template>

<style scoped lang="less">
</style>
