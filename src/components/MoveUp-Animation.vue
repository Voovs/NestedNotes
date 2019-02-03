<!--
 Props:
 * inputMessage -Text you want to display. Use inline style on component for extras
 * size         -Size of font in px
 * font         -Font-family, though may not be available
 * fontWeight   -Weight of font
 * percentFromBottom -How many percent of the screen does it have to be above the bottom
 * pixelsUp -How far the text moves up
  -->
<template>
  <div class="main-div">
    <div class="text" :id="id">{{ inputMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'upAnimation',
  data: function(){ //Anything in the document
    return {
    }
  },
  methods: { //Normal function
    // window.innerHeight element.getBoundingClientRect() window.pageYOffset

    /** Adds certain styles to the text
     * @return {Style} Applies an inline style to text
     */
    styleText () {
      var el = document.getElementById(this.id)
      el.style.cssText = 'transform: translateY (' + this.pixelsUp + 'px);'
    },
    /** Finds how many pixels from viewport top are in a percentage
     * @param  {Number} percentFromBottom What percentage of the viewport from the bottom
     * @return {Number}                   Discrete pixels from the top will match that percent from the bottom
     */
    staticPixelsFromTop (percentFromBottom) {
      return Math.round(window.innerHeight * (percentFromBottom - 100) / 100 * -1)
    },
    /** Checks how far element currently from top of viewport
     * @return {Class} Will enable class when element is close enough to the viewport
     */
    currXfromBottom () {
      var el = document.getElementById(this.id)
      if (el.classList.contains('moveText')) {
        window.removeEventListener('scroll', this.currXfromBottom)
        return
      }
      var elFromTop = document.getElementById(this.id).getBoundingClientRect().top
      if (elFromTop <= this.staticPixelsFromTop(this.percentFromBottom)) {
        el.setAttribute('class', 'text moveText')
      }
    }
  },
  computed: { //Functions with cache
    /** Returns how many pixels down the top of the viewport is
     */
    currWindowTop () {
      return window.pageYOffset
    }
  },
  props: { //Short for properties //Props are passed through when component is called
    inputMessage: {
      default: "Default message" //If no alternative value is given from parent view
    },
    percentFromBottom: {
      default: 30
    },
    pixelsUp: {
      default: 20
    },
    id: {
      default: function () {
        return setTimeout(
          function() {
          }, 1)
      }
    }
    // id: {
    //   default: function () {
    //     setTimeout(
    //       () => {
    //         var date = new Date
    //         this.id = 'id' + date.getTime()
    //       }
    //     )
    //   }
    // }
  },
  created () {
    window.addEventListener('scroll', this.currXfromBottom)
  },
  mounted () {
    this.styleText()
    this.currXfromBottom()
  },
  destroyed () {
    window.removeEventListener('scroll', this.currXfromBottom)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@font-face {
  font-family: Declarative;
  src: url('../assets/Fonts/YT_font.ttf');
}
/* General styles */
.main-div{
  margin: 0;
  padding: 0;
  color: black;
  padding-top: 20px;
}
.text {
  transition-delay: 100ms, 300ms;
  transition-property: transform, opacity;
  transition-duration: 1s, 1s;
  transition-timing-function: cubic-bezier(0.3, 0.68, 0.51, 0.97), ease;
  display: block;
  opacity: .2;
}
.moveText {
    opacity: 1;
    transform: translateY(-20px);
}
</style>
