<template>
  <div id="home">
    <tree :message="'这还是一颗枣树！'"></tree>
    <h1>xxxxxxxxxxxxxxxxxxxxxxx</h1>

  </div>
</template>

<script>
import Tree from "@/components/common/tree/Tree";

export default {
  name: "Home",
  components: {
    Tree
  }
}
</script>

<style scoped>

</style>
