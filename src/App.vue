<template>
  <div id="app">
    <now-time></now-time>
    <router-view></router-view>
  </div>
</template>

<script>
import NowTime from "@/components/common/nowTime/NowTime";

export default {
  name: 'App',
  components: {
    NowTime
  }

}
</script>

<style>

</style>
