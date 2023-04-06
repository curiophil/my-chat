<template>
  <h4>当前时间：{{ nowTime }}</h4>
</template>

<script>
export default {
  name: "NowTime",
  data() {
    return {
      nowTime: new Date().toLocaleString()
    }
  },
  methods: {
    getTime() {
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowTime = new Date().toLocaleString();
      }, 500)
    }
  },
  created() {
    this.getTime();
  }
}
</script>

<style scoped>

</style>
