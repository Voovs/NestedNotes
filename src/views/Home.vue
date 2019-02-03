<template>
  <div class="page">
    <div class="page-left">
      <Page-title v-pre class="page-title" id="pageTitle">
        Nested<br>
        <span>-Notes</span>
        </page-title>
      <div class="animationNest"><textAnimation stopRetype msPerLetter="10" textColor="#ECF4F3" text="Types of learning{0}-Literary{1}-Active literary{2}-Say writing a script or along those lines{1}-Passive literary{2}-Reading a written piece of work, like an essay{0}-Auditory{1}-Active auditory{2}-Discussing, maybe debating, with someone about the topic{1}-Passive auditory{2}-Listening to a podcast. I guess videos are partially in the category{0}-Visually{1}-Active visually{2}-Drawing up a picture or video graphics of some sort{1}-Passive visually{2}-Watching a video, without audio"/></div>
    </div>

    <div class="page-right">
      <router-link to="/wc" class="buttons"><a>Word 2</a></router-link>
      <hr class="doc_hr">
      <router-link to="/Syntax" class="buttons"><a>Syntax</a></router-link>
      <hr class="doc_hr">
      <router-link to="/wordcount" class="buttons"><a>Word</a></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import textAnimation from '@/components/typeWriter.vue'

export default {
  name: 'Nested-Notes',
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

<style scoped lang="sass">
@font-face
  font-family: Declarative
  src: url('../assets/Fonts/YT_font.ttf')
@font-face
  font-family: GT Walsheim
  src: url('../assets/Fonts/GT-Walsheim-Pro-Trial-Condensed-Medium.ttf')
@font-face
  font-family: Super display
  src: url('../assets/Fonts/GT-Super-Display-Trial-Bold.ttf')

/* General styles */
.page
  background-color: #555151
  color: #ECF4F3
  height: 100vh
  /* Flex */
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  align-items: stretch
.page-left
  cursor: default
  background-color: #555151
  height: 100%
  /* Flex */
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  flex-grow: 2
  flex-shrink: 0
  flex-basis: 0
  align-items: stretch
.page-right
  background-color: #ecf4f3
  height: 100%
  /* Flex */
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  flex-grow: 1
  flex-shrink: 0
  flex-basis: 0
  align-items: stretch
  align-content: center

/* Text styles*/
.page-title
  line-height: .8
  padding-top: 20px
  padding-left: 60px
  font-family: GT Walsheim, Declarative, sans-serif
  font-weight: 500
  font-size: 160px
  //color: #76dbd1;
  span
    display: inline
    padding-left: 70px
.buttons
  background-color: #57a99a
  color: #ecf4f3
  text-decoration: none
  font-size: 100px
  font-family: Super display
  /* Flex styles
  display: flex
  flex-direction: row
  align-items: center
  flex-grow: 1
  align-self: auto
  flex-basis: 100%
  a
    color: #ecf4f3
    text-decoration: none
    width: 100%
    text-align: center
  &:hover
    background-color: rgba(87, 169, 154, 0.85)
    cursor: pointer

/* Extra styles */
.doc_hr
  width: 95%
  background-color: #ECF4F3
  border: 2px solid #ECF4F3
  margin: 0
.animationNest
  height: 100%
  display: flex
  flex-direction: row
  padding-top: 6%

</style>
