<template>
  <div id="tree">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "Tree",
  data() {
    return {}
  },
  props: {
    message: {
      type: String,
      default: '这一棵是枣树！'
    }
  }
}
</script>

<style scoped>

</style>