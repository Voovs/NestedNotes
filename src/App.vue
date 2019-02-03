<template>
  <div class="page">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import textAnimation from '@/components/Text-animation.vue'

export default {
  name: 'NestedNotes',
  data: function () { // Anything in the document
    return {
    }
  },
  methods: { // Normal function
  },
  computed: { // Functions with cache
  },
  props: { // Short for properties //Props are passed through when component is called
    messageHere: {
      default: 'Error 404' // If no alternative value is given from parent view
    }
  },
  components: {
    textAnimation
  }
}
</script>

<style lang="sass">
body
  width: 100%
  margin: 0
  background-color: #555151

.specialScroll-dark::-webkit-scrollbar, body::-webkit-scrollbar
  width: 10px
  height: 10px
.specialScroll-dark::-webkit-scrollbar-track, body::-webkit-scrollbar-track
  border: 10px solid rgba(255, 255, 255, 0)
.specialScroll-dark::-webkit-scrollbar-track-piece, body::-webkit-scrollbar-track-piece
  border: 10px solid rgba(255, 255, 255, 0)
.specialScroll-dark::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb
  width: 10px
  border-radius: 30px
  background-color: rgba(255, 255, 255, .2)
.specialScroll-dark::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover
  background-color: rgba(255, 255, 255, .4)
.specialScroll-dark::-webkit-scrollbar-thumb:active, body::-webkit-scrollbar-thumb:active
  background-color: rgba(255, 255, 255, .5)
.specialScroll-dark::-webkit-scrollbar-corner, body::-webkit-scrollbar-corner
  background-color: rgba(255, 255, 255, 0)

.specialScroll-light::-webkit-scrollbar
  width: 10px
  height: 10px
.specialScroll-light::-webkit-scrollbar-track
  border: 10px solid rgba(255, 255, 255, 0)
.specialScroll-light::-webkit-scrollbar-track-piece
  border: 10px solid rgba(255, 255, 255, 0)
.specialScroll-light::-webkit-scrollbar-thumb
  width: 10px
  border-radius: 30px
  background-color: rgba(0, 0, 0, .2)
.specialScroll-light::-webkit-scrollbar-thumb:hover
  background-color: rgba(0, 0, 0, .4)
.specialScroll-light::-webkit-scrollbar-thumb:active
  background-color: rgba(0, 0, 0, .5)
.specialScroll-light::-webkit-scrollbar-corner
  background-color: rgba(255, 255, 255, 0)
</style>

<!--
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
-->
