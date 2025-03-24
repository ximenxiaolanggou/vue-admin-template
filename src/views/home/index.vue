<template>
  <div class="home">
    <div v-for="i in 100">Home {{i}}</div>
  </div>

</template>

<script setup lang="ts" name="Home">

</script>

<style scoped lang="scss">
.home {
  background-color: pink;
}
</style>