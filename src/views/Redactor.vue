<template>
  <div class="main-div">
    <textarea rows="8" cols="80" v-model="orgIndentText"></textarea>
    <upAnimation :inputMessage="orgIndentText" class="bigTitle" />
    <typewriterAnim style="display: inline-block" pauseTime="1000" msPerLetter="30" textColor="#ECF4F3" text="Types of learning{0}-Literary{1}-Active literary{2}-Say writing a script or along those lines{1}-Passive literary{2}-Reading a written piece of work, like an essay{0}-Auditory{1}-Active auditory{2}-Discussing, maybe debating, with someone about the topic{1}-Passive auditory{2}-Listening to a podcast. I guess videos are partially in the category{0}-Visually{1}-Active visually{2}-Drawing up a picture or video graphics of some sort{1}-Passive visually{2}-Watching a video, without audio"/>
    <typewriterAnim style="display: inline-block" pauseTime="1000" msPerLetter="30" textColor="#ECF4F3" text="Types of learning{0}-Literary{1}-Active literary{2}-Say writing a script or along those lines{1}-Passive literary{2}-Reading a written piece of work, like an essay{0}-Auditory{1}-Active auditory{2}-Discussing, maybe debating, with someone about the topic{1}-Passive auditory{2}-Listening to a podcast. I guess videos are partially in the category{0}-Visually{1}-Active visually{2}-Drawing up a picture or video graphics of some sort{1}-Passive visually{2}-Watching a video, without audio"/>
    <typewriterAnim stopRetype msPerLetter="30" textColor="#ECF4F3" text="-New empire had a lot of cultures{1}-10% weren’t German, only 60% were protestant{1}-Minorities that could destroy stability got a lot of discrimination{2}-Suppressed a lot of minority voices, as that would suggest a democracy{1}-Catholic Centre Party, from 40% of people being catholic, potential for instability{2}-Bismark removed Catholic influence in schools"
/>
  </div>
</template>

<script>
import upAnimation from '@/components/MoveUp-Animation.vue'
import typewriterAnim from '@/components/typeWriter.vue'
export default {
  name: 'Example',
  data: function(){ //Anything in the document
    return{
      orgIndentText: "Some words",
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
    upAnimation,
    typewriterAnim
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@font-face
  font-family: YT_font
  src: url('../assets/Fonts/YT_font.ttf')


/* General styles */
.main-div
  margin: 0
  padding: 0
.bigTitle
  font-family: YT_font
  font-size: 60px
  font-weight: 900
</style>
