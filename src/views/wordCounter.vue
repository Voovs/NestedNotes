<!--
-->
<template>
  <div id="mainDiv" class="main-div" :class="darkMode ? 'main-div-dark': 'main-div-light'">
    <svg height="100" width="100" id="light-toggle" @click="darkMode = !darkMode">
      <title>Turn dark mode {{ darkMode ? 'OFF':'ON' }}</title>
      <circle class="toggle-button" cx="50" cy="50" r="30" stroke-width="10" />
    </svg>
    <router-link to="/" class="page-title">Word Counter</router-link>
    <textarea class="input-area"
      :class="darkMode ? 'specialScroll-dark' : 'specialScroll-light'"
      name="input-area"
      v-model="inputText"
      placeholder="Your writing here..."></textarea>
    <textarea class="search-area"
      name="search-area"
      ref="searchArea"
      v-model="searchWord"
      rows="1" cols="15"
      @keyup.delete="addToSearchList('delete')"
      @keyup.enter="addToSearchList('enter')"
      placeholder="Search word..."></textarea>
    <!-- <span>
      <input type="range" value="1" min="0" max="6">
      <label for=""></label>
    </span> -->
    <div class="user-settings">
      <span>
        <input type="checkbox" name="search-type" id="search-type" checked>
        <label for="search-type">Auto search</label>
      </span>
      <span>
        <input type="checkbox" name="punc" id="punc">
        <label for="punc">Punctuation</label>
      </span>
      <hr class="line">
    </div> <!-- Auto search, punctuation, percent accuracy -->
    <div class="search-list" :class="darkMode ? 'specialScroll-dark' : 'specialScroll-light'">
      <div class="word-card" v-for="wordObj in currSearchArray">
        <span class="word-column">
          <span :title="titleCase(wordObj.word)">{{ titleCase(wordObj.word) }}</span>
        </span>
        <span class="stats-column">
          <div class="labels">
            <span>Rank: </span>
            <span>Appeared: </span>
            <span>Percent of text: </span>
          </div>
          <div class="numbers">
            <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span>
            <span class="number">{{ wordObj.occur }}</span>
            <span class="number">{{ wordObj.percent }}%</span>
          </div>
          <!-- <span>Rank: <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span></span>
          <span>Appeared: <span class="number">{{ wordObj.occur }}</span></span>
          <span>Percent of text: <span class="number">{{ wordObj.percent }}%</span></span> -->
        </span>
        <a class="link" :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
      </div>
      <div class="word-card past-search" v-for="wordObj in pastSearchArray">
        <span class="word-column">
          <span :title="titleCase(wordObj.word)">{{ titleCase(wordObj.word) }}</span>
        </span>
        <span class="stats-column">
          <div class="labels">
            <span>Rank: </span>
            <span>Appeared: </span>
            <span>Percent of text: </span>
          </div>
          <div class="numbers">
            <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span>
            <span class="number">{{ wordObj.occur }}</span>
            <span class="number">{{ wordObj.percent }}%</span>
          </div>
        </span>
        <a class="link" :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
      </div>
    </div>
    <div class="top-words-title">Top Words:</div>
    <div class="top-list-setting">
      <label for="toOccur">Number of appearances</label>
      <input v-model="userSetting.topWordsPercent" type="checkbox" name="toOccur" id="toOccur">
      <hr class="line">
    </div>
    <div class="top-words" :class="darkMode ? 'specialScroll-dark' : 'specialScroll-light'">
      <div class="top-list">
        <div v-for="(wordArray, index) in sortedWordsArray">
          <div class="pairs" >
            <span class="percent" v-if="userSetting.topWordsPercent === true">{{ wordArray[2] }}</span>
            <span class="percent" v-else>{{ wordArray[1] }}%</span>
            <span class="words">{{ titleCase(wordArray[0]) }}</span>
            <!-- wordArray[0].slice(0,1).toUpperCase() + wordArray[0].slice(1, wordArray[0].length) -->
          </div>
          <hr class="line" v-if="index < sortedWordsArray.length - 1"> <!-- Not shown at very bottom -->
        </div>
      </div>
    </div>
    <div class="total-words">Total words: {{ allWordsArray.length }}</div>
  </div>
</template>

<script>
export default {
  name: 'wordCounter',
  data: function () { //  Anything in the document
    return {
      inputText: "It is my opinion that balance fosters success when considering the translation of works between languages. However, if I had to choose between the importance of preserving either precision or artistry in a text, I would lean towards precision. \n To create a poem, story or any other written work, an author must pour themselves into it. Words and phrases are picked and arranged meticulously in order to perfectly manufacture feelings and images in a reader’s mind. In the case of\nJabberwocky, Lewis Carroll even combined and invented new words to convey certain actions and emotions to his readers. An example of this is the word “chortled,” first coined by Carroll in his poem and is still in use today. This term conveys a sort of laugh in between a snort and a chuckle, and Carroll’s attention to detail when creating this new word allowed him to paint a more vivid picture in his reader’s mind. These new terms were able to describe the characters in such a way that\nhadn’t been done before. This kind of precision in writing needs to carry through into its translation.\nI also believe that in a sense, precision and artistry are the same thing. To be precise in one's use of artistry is what writers do. They pick the perfect words and phrases to convey an emotion or an image to the reader. A translator’s job is very similar-to be precise in their translation in order to convey the mood and images that the original author intended to be placed in the reader’s mind. There is always going to be a loss of both precision and artistry in any translation between languages. No work can be perfectly translated, and in a sense can never be appreciated in the same way once it has undergone such a loss of meaning, or even completely credited to the original author. An author's intentions are lost when another writer takes too much artistic license with their piece, and language differences can result in a lack of a precise translation. However, for a translation to be successful, the key is balance because either way, a key part of someone's text is going to be lost in translation. A translator's job is to minimize this damage and to try to stay true to what the author was trying to say.",
      allWordsArray: [],     // An array with words seperated on spaces
      wordOccur: {}, // Each property is a word with number for occurrence
      userSetting: {decim: 3, topWordsPercent: false},
      searchWord: '',
      prevSearchWord: '',
      currSearchArray: [],   // {word: x, occur: x, percent: x}
      searchList: [],       // ["Some", "Here", "Voovs"]
      darkMode: true,      // Refers to page style mode
    }
  },
  methods: {
    // Updates this.allWordsArray in lowercase
    identifyAllWords () {
      var text = this.inputText + ' ', s0 = 0, s1 = 1, currWordArray
      this.allWordsArray = []
      while (s1 <= text.length) {
        currWordArray = text.slice(s0, s1).match(/[\w-'’]+[\s.,!?<>())\[\]%":;]/g)
        if (s0 + 1 === s1 && !text.slice(s0, s1).match(/[\w-]/)) {     // Removes irregular starting characters
          s0++; s1++
        }
        else if (currWordArray === null) {      // Not a word, then continue loop
          s1++
        }
        else if (currWordArray.length === 1) {    // If it's a word
          var currWord = (currWordArray[0].slice(0, currWordArray[0].length - 1)).toLowerCase()
          this.allWordsArray.push(currWord)   // Adds lowercase word to array
          s0 = s1; s1++
        }
        else {
          console.warn("defineWordCounts hit else")
        }
      }
    },
    // Updates this.wordOccur
    findWordOccur () {
      var wordArray = this.allWordsArray
      this.wordOccur = {}
      for (let word of this.allWordsArray) {    // Sets occurrence values
        if (this.wordOccur[word]) {
          this.wordOccur[word] += 1
        }
        else {
          this.wordOccur[word] = 1
        }
      }
    },
    // Updates currSearchArray, based on search
    updateCurrSearch (input) {
        if (input.match(/[\/\(\)\[\]\{\}\*\^\$\!\@\?\.\|\+\\]/gi)) {
          this.currSearchArray = []
          return
        }
        var matchedWordsObj = [],
            input = input.toLowerCase(),
            inputRegex = new RegExp(input, "gi"),
            fullInputMatch = new RegExp('^' + input + '$', "gi"),   // `/^${input}$/gi`
            prevSearchWord = this.searchList[0];
        if (input === '') {                    // Search is blank, no temporary words displayed
          this.currSearchArray = []
        }
        else if (input === prevSearchWord) {  // Fully match to previously logged word, no temporary words displayed
          this.currSearchArray = []
        }
        else {
          for (let currWord in this.wordOccur) {
            if (currWord.match(fullInputMatch)) {   // Full match to regex, it's the only one returned
              matchedWordsObj = []
              this.prevSearchWord = currWord
              matchedWordsObj.push({word: currWord, percent: this.wordPercent[currWord], occur: this.wordOccur[currWord]})
              break
            }
            else if (currWord === prevSearchWord) {     // Skips previously logged word
              continue
            }
            else if (currWord.match(inputRegex)) {      // Will detect partial matches
              matchedWordsObj.push({word: currWord, percent: this.wordPercent[currWord], occur: this.wordOccur[currWord]})
            }
          }
          this.currSearchArray = matchedWordsObj
        }
    },
    // Searched word obj at the front of searchList array
    addToSearchList (key) {
      var prevWord = this.prevSearchWord,
          prevLoggedWord = true,
          pushWordObj = (prevWord) => {
            this.searchList.unshift(prevWord);
            this.prevSearchWord = false
          };
      if (key === 'enter') this.searchWord = ''       // Clears search area on enter key
      if (prevWord === '') return;
      else if (this.searchList.length === 0) {  // Prevents the error of reading searchList[0].word, when it's empty
        pushWordObj(prevWord)
      }
      else if (prevWord && this.searchList[0].word !== prevWord) {
        pushWordObj(prevWord)
      }
    },
    titleCase: word => word.slice(0,1).toUpperCase() + word.slice(1, word.length),
  },
  computed: {
    allCapsArray () {       // Array with title cased words
      var allCapsArray = []
      this.allWordsArray.forEach( word => {
        allCapsArray.push(this.titleCase(word))
      })
      return allCapsArray   // All words in array start with a capital letter
    },
    wordPercent () {      // Object with word property and percent value
      var wordPercent = {},
          decim = 10 * (this.userSetting.decim - 2),
          totalWords = this.allWordsArray.length;
      for (let word in this.wordOccur) {
        let currOccur = this.wordOccur[word]
        wordPercent[word] = Math.round(currOccur / totalWords * 100 * decim) / decim // Changes accuracy
      }
      return wordPercent
    },
    sortedWordsArray () { // Nested arrays in decending percent ex: [["some", 2.4, 15], ["here", 2.1, 14]]
      var sortedWordsArray = [],
          wordPercent = this.wordPercent;
      for (let word in wordPercent) {
        sortedWordsArray.push([word, wordPercent[word], this.wordOccur[word]])    // Ex: ["Some", 2.4, 15]
      }
      sortedWordsArray.sort((a, b) => b[1] - a[1])    // Sorts based on percent value. Higher percent towards front
      return sortedWordsArray
    },
    sortedOccurObj () {   // Array with unique ocurr nums from greatest to least
      var arrayOfOccur = [], sortedOccurArray = [], sortedOccurObj = {};
      for (let word in this.wordOccur) {
        arrayOfOccur.push(this.wordOccur[word])    // Logs all occur numbers
      }
      sortedOccurArray = [...new Set(arrayOfOccur)]
      sortedOccurArray.sort((a, b) => b - a)
      for (let index in sortedOccurArray) {
        sortedOccurObj[sortedOccurArray[index]] = parseInt(index, 10) + 1  // Flips array: {44: 1, 21: 2}...
      }
      return sortedOccurObj
    },
    pastSearchArray () {  // Array with nested word objects in chronological order
      var searchArray = []
      for (let index in this.searchList) {
        let currWord = this.searchList[index]
        if (this.wordOccur[currWord]) {
          searchArray.push({
            word: currWord,
            occur: this.wordOccur[currWord],
            percent: this.wordPercent[currWord]
          })
        }
        else {
          this.searchList.splice(index, 1)
        }
      }
      return searchArray
    },
  },
  watch: {
    inputText: function () {
      this.identifyAllWords()
      this.findWordOccur()
      this.updateCurrSearch(this.searchWord)
      // this.pastSearchArray
    },
    searchWord: function () {
      this.searchWord = this.titleCase(this.searchWord)   // Title-case Bug: backspace on first letter
      this.updateCurrSearch(this.searchWord)
    },
  },
  mounted () {
    this.identifyAllWords()
    this.findWordOccur()
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


// Grid-area: start-row / start-column / end-row / end-column

/* Wireframe styles */
.main-div
  display: grid
  grid-template-columns: 2vw 29vw 29vw 2vw 36vw 2vw
  grid-template-rows: 116px 75px 40px 1fr 94px 1fr
  height: 100vh
  width: 100vw
  overflow: hidden
  padding: 0
  .page-title
    grid-area: 1 / 1 / 2 / 7
    width: 100%
  #light-toggle
    position: absolute
    left: calc(99vw - 100px)
    top: 8px
  .input-area
    grid-area: 2 / 2 / 5 / 4
    resize: none
  .search-area
    grid-area: 2 / 5 / 3 / 6
    white-space: nowrap
    overflow-x: hidden
    overflow-y: hidden
  .user-settings
    grid-area: 3 / 5 / 4 / 6
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-around
    .input
      padding-right: 1vw
    .line
      width: 100%
  .search-list
    grid-area: 4 / 5 / 7 / 6
    overflow: auto
    .word-card
      display: flex
      flex-direction: row
      justify-content: space-around
      flex-wrap: wrap
      margin: 5px
      overflow: visible
      .word-column
        display: flex
        flex-direction: row
        flex-basis: 15vw
        justify-content: flex-start
        align-items: center
        overflow: hidden
        // flex-grow: 1
      .stats-column
        display: flex
        flex-direction: row
        overflow: hidden
        .labels
          display: flex
          flex-direction: column
          align-items: flex-end
          margin-right: 1vw
        .numbers
          display: flex
          flex-direction: column
      .link
        width: 100%
  .top-words-title
    grid-area: 5 / 2 / 6 / 3
  .top-list-setting
    grid-area: 5 / 2 / 6 / 3
    align-self: end
    overflow: hidden
    input
      height: 20px
      width: 20px
      margin-bottom: 0
      margin-left: 10px
    .line
      height: 1px
      margin: 0
      margin-top: 6px
  .top-words
    grid-area: 6 / 2 / 7 / 3
    overflow-y: auto
    overflow-x: hidden
    .top-list
      // display: flex
      // flex-direction: column
      overflow-y: visible
      .pairs
        display: flex
        flex-direction: row
        flex-wrap: nowrap
        justify-content: space-around
        align-items: center
        align-content: flex-start
      .line
      .percent
        flex-grow: 1
      .words
        flex-grow: 1
        overflow-x: hidden
  .total-words
    grid-area: 5 / 3 / 6 / 4
    align-self: center
    justify-self: center
    // No syntax support from Atom, yet above works

/* Static aesthetic styles */
.main-div
  transition: 300ms
  transition-timing-function: ease-in-out
  .search-area
    padding-left: 10px
.main-div-light
  transition: 300ms
  transition-timing-function: ease-in-out
  background-color: white
  .page-title
    // background-color: white
  #light-toggle
    .toggle-button
      fill: white
      stroke: #555151
  .input-area
    background-color: white
    border-radius: 10px
  .search-area
    background-color: white
    border-radius: 10px
  .user-settings
    color: #555151
    .line
      background-color: rgba(0, 0, 0, 1)
      height: 1px
      // box-shadow: 0 0px 2px 0 black
  .top-words-title
    font-size: 60px
  .search-list
    .word-card
      // border: 2px solid rgba(255, 255, 255, .6)
      // border-radius: 7px 7px 20px 20px
      .word-column
      .stats-column
      .link
        background-color: rgba(87, 169, 154, .2)
        border-radius: 0 0 20px 20px
    .past-search
      // border: 2px solid rgba(255, 255, 255, .2)
  .top-list-setting
    input
      border-radius: 50px
    .line
      background-color: rgba(0, 0, 0, 1)
  .top-words
    .pairs
    .line
      border: 1px solid rgba(0, 0, 0, .4)
      border-radius: 50px
      width: 98%
    .percent
      margin-right: 1.5vw
      // border-right: .3vw solid rgba(255, 255, 255, .4)
    .words
.main-div-dark
  transition: 300ms
  transition-timing-function: ease-in-out
  background-color: #555151
  .page-title
    // background-color: #555151
  #light-toggle
    .toggle-button
      fill: #555151
      stroke: white
  .input-area
    background-color: #555151
    border-radius: 10px
    border: 1px solid rgba(255, 255, 255, .5)
  .search-area
    background-color: #555151
    border-radius: 10px
    border: 1px solid rgba(255, 255, 255, .5)
  .user-settings
    color: white
    .line
      background-color: rgba(255, 255, 255, .4)
      height: 1px
      // box-shadow: 0 0px 2px 0 black
  .top-words-title
    font-size: 60px
  .search-list
    .word-card
      // border: 2px solid rgba(0, 0, 0, .6)
      // border-radius: 7px 7px 20px 20px
      .word-column
      .stats-column
      .link
        background-color: rgba(87, 169, 154, .2)
        border-radius: 0 0 20px 20px
    .past-search
      // border: 2px solid rgba(0, 0, 0, .2)
  .top-list-setting
    input
      border-radius: 50px
    .line
      background-color: rgba(255, 255, 255, .4)
  .top-words
    .pairs
    .line
      border: 1px solid rgba(255, 255, 255, .4)
      border-radius: 50px
      width: 98%
    .percent
      margin-right: 1.5vw
      // border-right: .3vw solid rgba(255, 255, 255, .4)
    .words

/* Text styles */
.main-div
  transition: 300ms
  transition-timing-function: ease-in-out
  .input-area
    font-size: 1.78125vw
  .search-list
    font-size: 1.875vw
    .past-search
      .word-column
        span
          text-decoration: underline
          text-decoration-color: #57a99a
    .word-card
      .word-column
        span
          font-size: 2.8vw
      .stats-column
        .number
          // text-decoration: underline
          text-decoration-color: #57a99a
  .total-words
    font-size: 40px
.main-div-light
  transition: 300ms
  transition-timing-function: ease-in-out
  color: #555151
  .page-title
    font-family: GT Super
    font-size: 100px
    text-align: center
    text-decoration: none
    color: #555151
  .input-area
    font-family: GT Super
    // font-size: 20px
    color: #555151
  .search-area
    font-family: GT Super
    font-size: 60px
    color: #555151
    resize: none
  .search-list
    font-size: 1.875vw
    // background-color: #57a99a
    .word-card
      color: #555151
      .link
        text-align: center
        text-decoration: none
        color: #555151
  .top-words-title
    color: #555151
    line-height: .9
  .top-list-setting
    label
      color: #555151
      font-size: 25px
  .top-words
    color: #555151
    .percent
      font-size: 3vw
    .words
      font-size: 3vw
  .total-words
    color: #555151
.main-div-dark
  transition: 300ms
  transition-timing-function: ease-in-out
  color: #555151
  .page-title
    font-family: GT Super
    font-size: 100px
    text-align: center
    text-decoration: none
    color: #ecf4f3
  .input-area
    font-family: GT Super
    // font-size: 20px
    color: #ecf4f3
  .search-area
    font-family: GT Super
    font-size: 60px
    color: #ecf4f3
    resize: none
  .search-list
    .word-card
      color: #ecf4f3
      .link
        text-align: center
        text-decoration: none
        color: #ecf4f3
  .top-words-title
    color: #ecf4f3
    line-height: .9
  .top-list-setting
    label
      color: #ecf4f3
      font-size: 25px
  .top-words
    color: #ecf4f3
    .percent
      font-size: 3vw
    .words
      font-size: 3vw
  .total-words
    color: #ecf4f3

/* Pseudo styles */
.main-div
  transition: 300ms
  transition-timing-function: ease-in-out
  .page-title
    user-select: none
  .top-words-title
    &:hover
        cursor: default
  .top-list-setting
    user-select: none
  .top-words
    &:hover
        cursor: default
  .user-settings
    user-select: none
  .search-list
    .word-card
      .word-column
        &:hover
            cursor: default
      .stats-column
        &:hover
          cursor: default
.main-div-light
  transition: 300ms
  transition-timing-function: ease-in-out
  .page-title
    &::selection
      background-color: rgba(0, 0, 0, .1)
  #light-toggle
    .toggle-button
      &:hover
        transition: 300ms
        transition-timing-function: ease-in-out
        fill: #555151
        stroke: white
        cursor: pointer
  .input-area
    &::selection
      background-color: #555151
      color: white
    &:focus
      outline: none
      -webkit-box-shadow: 0px 0px 5px 2px #57a99a
      box-shadow: 0px 0px 5px 2px #57a99a
  .user-settings
    label
      &::selection
        background-color: #555151
        color: white
  .search-area
    &:focus
      outline: none
      -webkit-box-shadow: 0px 0px 5px 2px #57a99a
      box-shadow: 0px 0px 5px 2px #57a99a
    &::selection
      background-color: #555151
      color: white
  .search-list
    .word-card
      .word-column
        span
          &::selection
            background-color: #555151
            color: white
      .stats-column
        span
          &::selection
            background-color: #555151
            color: white
        .number
          &::selection
            background-color: #555151
            color: white
      .link
        user-select: none
        &:hover
          background-color: rgba(87, 169, 154, .4)
  .top-words-title
    &::selection
      background-color: #555151
      color: white
  .top-list-setting
    label
      &::selection
        background-color: #555151
        color: white
    input
      &:focus
        outline: 1px solid #57a99a
        -webkit-box-shadow: 0px 0px 5px  #57a99a
        box-shadow: 0px 0px 5px  #57a99a
  .top-words
    .percent
      &::selection
        background-color: #555151
        color: white
    .words
      &::selection
        background-color: #555151
        color: white
  .total-words
    &::selection
      background-color: #555151
      color: white
.main-div-dark
  transition: 300ms
  transition-timing-function: ease-in-out
  .page-title
    &::selection
      background-color: rgba(255, 255, 255, .3)
  #light-toggle
    .toggle-button
      &:hover
        transition: 300ms
        transition-timing-function: ease-in-out
        fill: white
        stroke: #555151
        cursor: pointer
  .input-area
    &::selection
      background-color: white
      color: black
    &:focus
      outline: none
      -webkit-box-shadow: 0px 0px 5px 2px #57a99a
      box-shadow: 0px 0px 5px 2px #57a99a
  .user-settings
    label
      &::selection
        background-color: white
        color: black
  .search-area
    &:focus
      outline: none
      -webkit-box-shadow: 0px 0px 5px 2px #57a99a
      box-shadow: 0px 0px 5px 2px #57a99a
    &::selection
      background-color: white
      color: black
  .search-list
    .word-card
      .word-column
        span
          &::selection
            background-color: white
            color: black
      .stats-column
        span
          &::selection
            background-color: white
            color: black
        .number
          &::selection
            background-color: white
            color: black
      .link
        user-select: none
        &:hover
          background-color: rgba(87, 169, 154, .4)
  .top-words-title
    &::selection
      background-color: white
      color: black
  .top-list-setting
    label
      &::selection
        background-color: white
        color: black
    input
      &:focus
        outline: 1px solid #57a99a
        -webkit-box-shadow: 0px 0px 5px  #57a99a
        box-shadow: 0px 0px 5px  #57a99a
  .top-words
    .percent
      &::selection
        background-color: white
        color: black
    .words
      &::selection
        background-color: white
        color: black
  .total-words
    &::selection
      background-color: white
      color: black


</style>


<!--
DOM by class

.main-div
.left-div
  .left-upper
    .input-area
  .left-lower
    .left-lower-left
    .left-lower-right
.right-div
  .search-area-div
    .search-area
  .search-list
    .search-list-left
      .word-column
    .search-list-right
      .stats-column

<div id="mainDiv" class="main-div">
  <div @click="routing()" class="page-title">Word Counter</div>
  <div class="lower-div">
    <div class="left-div">
      <div class="left-upper">
        <textarea
          name="input-area"
          class="input-area specialScroll"
          v-model="inputText"
          placeholder="Your writing here..."></textarea>
      </div>
      <div class="left-lower">
        <div class="left-lower-left">

        </div>
        <div class="left-lower-right">

        </div>
      </div>
    </div>
    <div class="right-div">
      <div class="search-area-div">
        <textarea
          name="search-area"
          rows="1" cols="15"
          class="search-area"
          placeholder="Search word..."></textarea>
      </div>
      <div class="search-list specialScroll">
        <div class="search-list-left">
          mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
          <div v-for="wordObj in searchList" class="word-column">
            <span>{{ wordObj.word }}</span>
            <a :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
          </div>
        </div>
        <div class="search-list-right">
          <div v-for="wordObj in searchList" class="stats-column">
            <span>Appeared: {{ wordObj.occur }}</span>
            <span>Percent of text: {{ wordObj.percent }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


-->
