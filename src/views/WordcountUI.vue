<template>
  <div class="page">
    <router-link class="pageTitle" to="/">Word Counter</router-link>
    <textarea v-model="userInput" name="word-input" rows="2" cols="10" class="inputArea" placeholder="Your writing here..."></textarea>
    <wordCountApp :inputMessage="userInput" />
  </div>
</template>

<script>
// @ is an alias to /src
import textAnimation from '@/components/Text-animation.vue'
import wordCountApp from '@/components/Word-count-app.vue'

export default {
  name: 'Word-count',
  data: function() { //Anything in the document
    return {
      userInput: "Something here here or what about here this"
    }
  },
  methods: { //Normal function
  },
  computed: { //Functions with cache
  },
  props: { //Short for properties //Props are passed through when component is called
    messageHere:{
      default: "Error 404" //If no alternative value is given from parent view
    }
  },
  components: {
    textAnimation,
    wordCountApp
  }
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,500')
@font-face
  font-family: YT_font
  src: url('../assets/Fonts/YT_font.ttf')
@font-face
  font-family: GT Walsheim
  src: url('../assets/Fonts/GT-Walsheim-Pro-Trial-Condensed-Medium.ttf')
@font-face
  font-family: GT Super
  src: url('../assets/Fonts/GT-Super-Display-Trial-Bold.ttf')

/* General styles */
.page
  background-color: white
  display: flex
  flex-direction: column
.inputArea
  font-family: GT Super
  font-size: 40px
  color: #ecf4f3
  background-color: #555151
  height: 300px
.pageTitle
  font-family: GT Super
  font-size: 100px
  text-align: center
  text-decoration: none
  color: #555151
  width: 100%
.trial2
  font-family: Declarative


</style>
