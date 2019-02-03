<template>
  <div class="all">
    <hr>
      <p v-show="pageStyles.titleView"
         :class="{pageTitle: pageStyles.titleView}"
         :style="{fontSize: pageStyles.titleSize}"
         >Page title</p>

      <p v-if="pageStyles.visible">If value: {{ words.first }}</p>
      <p v-else>Else value: {{ words.second }}</p>
      <hr>

      <p class="dynamicText">{{ words.dynamic }}</p>
      <input type="text"
             v-model="words.dynamic"
             placeholder="Some dynamic text"
             @keyup.enter="logKey('Enter')">
      <hr>

      <ul>
        <li v-for="item in list">{{ item.text }}</li>
      </ul>
      <p class="allValues">{{ allValues }}</p>
      <div class="valueInputs"><label>First value: </label><input type="text" v-model="list[0].text"></div>
      <div class="valueInputs"><label>Second value: </label><input type="text" v-model="list[1].text"></div>
      <div class="valueInputs"><label>Third value: </label><input type="text" v-model="list[2].text"></div>
      <hr>

      <p class="buttonExample" @click="boom('Big')">I'm a button</p>
      <hr>

      <p>The word imported from the parent page is: {{ messageHere + "!"}}</p>
  </div>
</template>

<script>

export default {
  name: 'Reference',
  data: function(){
    return{
      pageStyles:{
        titleSize: "60px",
        titleView: true,
        visible: true
      },
      words: {
        first: "fast",
        second: "text",
        dynamic: "Dynamic words"
      },
      list: [
        {text: "Value one"},
        {text: "Value two"},
        {text: "Value three"}
      ]
    }
  },
  methods: {
    boom: function(type){
      alert(type + " boom!")
    },
    logKey: function(key){
      console.log(key)
    }
  },
  computed: {
    allValues: function(){
      return this.list[0].text + " " +  this.list[1].text + " " +  this.list[2].text
    }
  },
  props: { //Short for properties
    messageHere:{
      default: "Error 404" //If no alternative value is given from parent view
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @font-face {
  font-family: "YT sans";
  font-weight: 400;
  src: url("../assets/YT_font.ttf");
 }
 .all {
  font-size: 30px;
  font-family: YT sans;
 }
 .input{
  height: 100px;
  width: 400px;
 }
 .pageTitle{
  font-size: 40px;
 }
 .buttonExample{
  color: black;
  border: 4px solid black;
  border-radius: 20px;
  background-color: #ffff99;
  width: 50%;
  &:hover{
    color: #ffff99;
    border: 4px solid #ffff99;
    border-radius: 20px;
    background-color: black;
  }
 }
 .valueInputs{
  display: block;
 }
 </style>
