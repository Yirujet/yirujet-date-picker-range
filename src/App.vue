<template>
  <div id="app">
    <xw-date v-model="dt" @change="test"></xw-date>
  </div>
</template>

<script>
// import XwDate from './components/Index.vue'

export default {
  name: 'App',
  data() {
    return {
      dt: []
    }
  },
  // components: {
  //   XwDate
  // },
  created() {
    let start = new Date(2021, 5, 1, 14, 30, 0)
    let end = new Date(2021, 7, 29, 15, 27, 10)
    this.dt = [start, end]
  },
  methods: {
    test(val) {
      console.log(val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
