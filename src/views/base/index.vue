<template>

</template>

<script setup lang="ts" name="Navigation">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {dynamicRoutes} from "@/router/routes.ts";
import router from "@/router";

onMounted(() => {

  router.push(redirectUrl);
})
</script>

<style scoped lang="scss">

</style>