<!--
Properties to pass on call
text {string} -Text to be animated
msbi {number} -Number of milliseconds between characters placed
pbi  {number} -How many iterations will the text pause for upon completeing the string

ex: <textAnimation pbi="200" msbi="30" text="0Start my string on this line1Now there's a single indent" />
NOTE: Numbers in the string will result in a new line with x indents. Start with a 0!!!
-->
<template>
  <div id="mainDiv" class="main-div">
    <div id="textAnimation" class="textAnimation" slot="mainSlot">
     </div>
  </div>
</template>

<script>
export default {
  name: 'Text-animation',
  data: function(){ //Anything in the document
    return{
      characterCount: -1,
      //text:"0Types of learning0-Literary1-Active literary2-Say writing a script or along those lines1-Passive literary2-Reading a written piece of work, like an essay0-Auditory1-Active auditory2-Discussing, maybe debating, with someone about the topic1-Passive auditory2-Listening to a podcast. I guess videos are partially in the category0-Visually1-Active visually2-Drawing up a picture or video graphics of some sort1-Passive visually2-Watching a video, without audio",
      nums : "1234567890",
      pause : -1,
      maxCharacters : -1
    }
  },
  methods: { //Normal function
    /** Increments character index for string iteration
     * @return {[this.characterCount]} Signifies current character in string with index
     */
    characterCounter (){
      this.characterCount += 1
      if (this.characterCount > this.maxCharacters) this.characterCount = 0
    },
    /** Pauses animation for some iterations
     * @return {[Boolean]} True if pause is still active, false if not
     */
    pauseCounter (){
      if (this.pause > this.pbi) {
        this.pause = -1
        return false
      }
      if (this.characterCount == this.maxCharacters){
        this.pause += 1
        return true
      }
    },
    /** Creates child element for new line of content
     * @param  {[Number]} indent Signifies how many indents (tabs) new line needs
     * @return {[Element]}   Adds new child element to parent div
     */
    createElementDiv (indent) {
      indent = Number(indent)
      var element = document.createElement('div')
      if (indent > 0){
      element.setAttribute('style', 'margin-left:' + (indent*30) + 'px;')
      }
      //var parentEl = document.getElementById('textAnimation')
      document.getElementById('textAnimation').appendChild(element)
    },
    /** Removes and replaces animation parent div
     * @return {[Element]} Will .remove() and reinstall the parent div
     */
    refreshParentDiv () {
      var parentEl = document.getElementById('textAnimation')
      parentEl.remove()
      var mainDiv = document.getElementById('mainDiv')
      var element = document.createElement('div')
      element.setAttribute('id', 'textAnimation')
      element.setAttribute('class', 'textAnimation')
      mainDiv.appendChild(element)
    },
    /** Run once to find the total characters in input sting
     * @return {[number]} Increments this.maxCharacters based on character count
     */
    findTotalCharacters () {
      for (var character of this.text){
          this.maxCharacters += 1
      }
    },
    /** Checks if current character is number for new line
     * @param  {[String]} currCharacter Found as one character in text string
     * @return {[Boolean]}              True if number was detected, false if not
     */
    checkForNumbers (currCharacter) {
      if (this.nums.includes(currCharacter)){
        this.createElementDiv(currCharacter)
        this.runAnimation()
        return true
      }
      else return false
    },
    /** Runs through animation
     * @return {[Appends string]} Appeneds one character to string per iteration
     */
    runAnimation () {
      if ( this.pauseCounter() ) return                     // Pauses animation when complete
      this.characterCounter()                               // Updates current character index
      this.characterCount != 0 || this.refreshParentDiv()   // Removes are replaces parent div at end of animation

      var currCharacter = this.text.charAt(this.characterCount)  // Current UTF character
      if ( this.checkForNumbers(currCharacter) ) return               //Checks if currCharacter is a number
      document.getElementById("textAnimation").lastChild.innerHTML += currCharacter
      return
    }
  },
  computed: { //Functions with cache
    addLeadingZero () {
      for (var number in this.nums){
        if (this.text[0] != number) continue
        else return
        return this.text = '0' + this.text
      }

    }
  },
  props: { //Short for properties //Props are passed through when component is called
    text: {
      default: "0Error1Error2Error"
    },
    msbi: {       // Miliseconds between iterations
      default: 30
    },
    pbi: {          // Pause between iterations- how may iterations is the pause for
      default: 200
    }
  },
  mounted (){
    this.findTotalCharacters()
    setInterval(this.runAnimation, this.msbi)
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
  background-color: #555151;
  margin: 0;
  padding: 0;
  padding-left: 50px;
  font-family: Declarative;
  font-size: 22px;
  letter-spacing: 1px;
}
</style>



<!-- [
  "0Types of learning",
  "0-Literary",
  "1-Active literary",
  "2-Say writing a script or along those lines",
  "1-Passive literary",
  "2-Reading a written piece of work, like an essay",
  "0-Auditory",
  "1-Active auditory",
  "2-Discussing, maybe debating, with someone about the topic",
  "1-Passive auditory",
  "2-Listening to a podcast. I guess videos are partially in the category",
  "0-Visually",
  "1-Active visually",
  "2-Drawing up a picture or video graphics of some sort",
  "1-Passive visually",
  "2-Watching a video, without audio"] -->

<!-- 0Types of learning0-Literary1-Active literary2-Say
 writing a script or along those lines1-Passive li
 terary2-Reading a written piece of work, like an
 essay0-Auditory1-Active auditory2-Discussing, may
 be debating, with someone about the topic1-Passiv
 e auditory2-Listening to a podcast. I guess video
 s are partially in the category0-Visually1-Active
  visually2-Drawing up a picture or video graphics
   of some sort1-Passive visually2-Watching a vide
   o, without audio -->

<!-- Find current node.lastChild
this.characterCounter
this.characterCount != 0 || this.refreshParentDiv()
Find the current character we're on
if this.nums.includes(character){
  this.createElementDiv(character)
  this.directive()
}
node.lastChild.innerHTML += character
return -->
