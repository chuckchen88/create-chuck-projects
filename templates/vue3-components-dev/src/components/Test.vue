<script>
export default {
  name: 'Test'
}
</script>
<script setup lang="ts">

defineProps<{ msg: string }>()

</script>

<template>
  <h1 class="read-the-docs">{{ msg }}</h1>
</template>

<style scoped lang="less">
.read-the-docs {
  color: #888;
}
</style>
