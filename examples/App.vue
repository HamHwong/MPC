<template>
  <div>
    <MPCarousel
      @click="handleClick"
      :value="data"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    handleClick: (a, b, c) => { console.log(a, b, c) }
  },
  data () {
    return {
      data: [{
        order: 0,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 3,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 1,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, { 
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }, {
        order: 2,
        label: '1',
        pic: require('./assets/images/img.jpg'),
      }]
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
