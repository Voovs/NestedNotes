<!--
-->
<template>
  <div id="mainDiv" class="main-div">
    <!-- <div id="trial" class="trial" slot="mainSlot">
      {{ inputMessage }}
     </div> -->
     <div class="topWords">
      <div>
        <img :src="'https://image-charts.com/chart?'
                 + 'cht=bvg'
                 + '&chs=500x185'
                 + '&chco=FFC6A5'
                 + '&chan=1200,easeOutBack'
                 + '&chxt=y'
                 + '&chd=t:'
        + topList[0]['percent'] + '|'
        + topList[1]['percent'] + '|'
        + topList[2]['percent'] + '|'
        + topList[3]['percent'] + '|'
        + topList[4]['percent']
                 + '&chl='
        + topList[0]['word'] + '|'
        + topList[1]['word'] + '|'
        + topList[2]['word'] + '|'
        + topList[3]['word'] + '|'
        + topList[4]['word']
        ">
      </div>
      <div class="topList"><!-- No horizontal bars with one side being word and other side is link-->
        <!-- Will generate anchors based on number of over-used words-->
        <!-- Of course left side will just be a span element
https://image-charts.com/chart?
chxt=x,y
&cht=bhg
&chls=1
&chds=a

      -->
        <div class="innerTopList">
          <div v-for="(value, index) in topList">
            <span>{{ topList[index]["percent"] + "%"}} {{ topList[index]["word"] }}</span><a :href="'https://www.thesaurus.com/browse/' + topList[index]['word']" target="_blank">Thesaurus link</a>
          </div>
        </div>
      </div>
     </div>

     <div class="search">
       <textarea v-on:keyup.delete="checkTimeSinceLastWord" v-on:keyup="logPrevWord()" v-model="word" class="searchArea" name="name" rows="1" cols="15" placeholder="Search word..."></textarea>
     </div>

     <div id="cardSet" class="cardset">

       <div class="wordCard">
         <span v-if="word" class="wordOnWordCard">{{ word }}</span>
         <span v-if="!word" class="wordOnWordCard">...</span>
           <span class="numerical" v-if="this.wordOccurrence[this.Uword]">Occurrence: {{ this.wordOccurrence[this.word] + '#'}}</span>
           <span class="numerical" v-if="!this.wordOccurrence[this.Uword]">Occurrence: ...</span>
           <span class="numerical" v-if="this.wordPercentage[this.Uword]">Percentage: {{ this.wordPercentage[this.word] + '%' }}</span>
           <span class="numerical" v-if="!this.wordPercentage[this.Uword]">Percentage: ...</span>
         <span class="numerical">Partitions: 30_</span>
         <hr>
         <a target="_blank" :href="'https://www.thesaurus.com/browse/' + word" v-if="word">Thesaurus<span> ></span></a>
         <a target="_blank" v-else>Thesaurus<span> ></span></a>
       </div>

     </div>
  </div>
</template>

<script>
export default {
  name: 'wordCounterApp',
  data: function () { //  Anything in the document
    return {
      word: '',
      wordOccurrence: {}, // Each property is a word with number for occurrence
      wordPercentage: {}, // Each property is a word with number for percentage
      wordPartitions: {},
      fixedArray: [],     // An array with words seperated on spaces
      letters: "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
      timeSinceLastWord: undefined,
      previousWord: {word: '', occurrence: '', percentage: '', partitions: ''},
      topList: [{percent: 37.5, word: "Here"},{percent: 12.5, word: "Something"},{percent: 12.5, word: "Or"},{percent: 12.5, word: "What"},{percent: 12.5, word: "About"}]
    }
  },
  methods: {
    /** Stores array without punctuation in this.fixedArray
     * @received      watch: { inputMessage () }
     * @return {[Array]} this.fixedArray stores items including only letters
     * @link   this.findOccurrenceAndLog()
     */
    checkForPuctuation () {
      this.fixedArray = []
      var newApart = []
      for (var portion of this.apart){
        var newPortion = ''
        for (var character in portion){
          if (this.letters.includes(portion[character])) newPortion += portion[character]
          else continue
        }
        newPortion = newPortion.charAt(0).toUpperCase() + newPortion.slice(1)
        newApart.push(newPortion)
      }
      this.fixedArray = newApart
      this.findOccurrenceAndLog()
    },
    /** Finds occurrence of each word and stores in this.wordOccurrence
     * @received    this.checkForPuctuation() at end
     * @return {[Object]}  Assigns object property word to number of times word appears
     * @link  this.findPercentageAndLog(this.percentAccuracy(), this.totalWords())
     */
    findOccurrenceAndLog () {
      this.wordOccurrence = {}
      for (var word of this.fixedArray){
        if (this.wordOccurrence[word] !== undefined){
          this.wordOccurrence[word] += 1
        } else {
          this.wordOccurrence[word] = 1
          }
      }
      this.findPercentageAndLog(this.percentAccuracy, this.totalWords)
    },
    /** Finds percentage of each word and stores in this.wordPercentage
     * @received    this.findOccurrenceAndLog(this.percentAccuracy, this.totalWords) at end
     * @return {[Object]}   Logs the percentage into a percentage obj with word as property
     */
    findPercentageAndLog (accuracy, totalWords) {
      this.wordPercentage = {}
      for (var word in this.wordOccurrence){
        var wordNum = this.wordOccurrence[word]
        var currWordPercentage = Math.round(((wordNum / totalWords) * 100) * accuracy) / accuracy
        this.wordPercentage[word] = currWordPercentage
      }
    },
    /**
     * @return {Array nested objects} this.topList has nested objects
     * Properties: "percent" and "word"
     */
    topListFunc () {
      this.topList = []
      var wordsLoggedCounter = 0
      for (var currPercent of this.percentageInOrder){
        if (wordsLoggedCounter === 5){
          console.log(this.topList)
          console.log("Other: " + this.topList[0]["percent"])
          return
        }
        var currArrayItem = 0
        while (this.IwordPercentage[currPercent].length > currArrayItem && wordsLoggedCounter < 5){
          var currNestedObject = {}
          currNestedObject["percent"] = currPercent
          currNestedObject["word"] = this.IwordPercentage[currPercent][currArrayItem]
          this.topList.push(currNestedObject)
          currArrayItem += 1
          wordsLoggedCounter += 1
        }
      }
      console.log(this.topList)
      console.log("Next is other:")
      console.log(this.topList[0]["word"])
    },
    /** Creates new card element with set word and numerical values
     * @param  {[String]} word       The word that this card is about
     * @param  {[String]} occurrence How many time the word appears in text
     * @param  {[String]} percentage Percentage of text is this word
     * @param  {[String]} partitions Average spacing between word iterations
     * @return {[Element]}           Card div inserted in childNodes[1]
     */
    generateWordCard (word, occurrence, percentage, partitions) {
      var wordCard = document.createElement('Div')
        wordCard.setAttribute('class', 'wordCard')              // Create div wordCard
      var wordOnWordCard = document.createElement('Span')
        wordOnWordCard.setAttribute('class', 'wordOnWordCard')  // Span for word
        wordOnWordCard.innerHTML = word
        wordCard.appendChild(wordOnWordCard)

        for (var i=0; i < 3; i++) {
          wordCard.appendChild(document.createElement('span'))
          wordCard.childNodes[i + 1].setAttribute('class', 'numerical') // Create 3 spans for numerical values
        }
        wordCard.childNodes[1].innerHTML = 'Occurrence: ' + occurrence + '#'
        wordCard.childNodes[2].innerHTML = 'Percentage: ' + percentage + '%'
        wordCard.childNodes[3].innerHTML = 'Partitions: ' + partitions
        wordCard.appendChild(document.createElement('hr'))
      var tLink = document.createElement('a')
        tLink.setAttribute('target', '_blank')
        tLink.setAttribute('href', "https://www.thesaurus.com/browse/" + word)
        tLink.innerHTML = 'Thesaurus'
          tLink.appendChild(document.createElement('span'))
          tLink.childNodes[1].innerHTML = ' >'
        wordCard.appendChild(tLink)
      var cardSet = document.getElementById('cardSet')
        cardSet.insertBefore(wordCard, cardSet.childNodes[1])
    },
    /** Will generate new word card on backspace over 3 seconds of delay
     * Consecutive backspacing will not be logged
     * Words < 2 letters will not be logged
     * @return {[Element]} Returns identical card copy through generateWordCard()
     */
    checkTimeSinceLastWord () {
      var time = new Date().getTime()
      if (this.timeSinceLastWord === null) return // this.timeSinceLastWord = time // Prevent consecutive backspace logs
      if (this.word === '') return
      if (this.timeSinceLastWord + 700 <= time){         // number is milliseconds of delay between last key press and backspace hit
        if (this.wordOccurrence[this.previousWord.word] !== undefined && this.wordPercentage[this.previousWord.word] !== undefined){ // Checks if word is in text, before card generation
          this.generateWordCard (this.previousWord.word, this.previousWord.occurrence, this.previousWord.percentage, '4')
        }
        this.timeSinceLastWord = null
        return
      }
    },
    logPrevWord () {
      this.timeSinceLastWord = new Date().getTime()
      this.previousWord.word = this.word
      this.previousWord.occurrence = this.wordOccurrence[this.word]
      this.previousWord.percentage = this.wordPercentage[this.word]
      this.previousWord.partitions = this.wordPartitions[this.word]
    },
  },
  computed: { //Functions with cache
    /** Returns text array
     * @return {[Array]} Each word apart on space (punctuation not parsed)
     */
    apart () {
      var apart = this.inputMessage.split(' ')
      while (apart.includes('')) {
         apart.splice(apart.indexOf(''), 1)
       }
      return apart
    },
    /** Changes this.word first letter to upper case
     * @received    v-model in .searchArea
     * @return {[String]}      this.word in data will be changed to an uppercase-starting string
    Explanation:
     *v-if in main card:  Display will be the first update for this.word to upper. This is iterated before any other
                          functions have time to run, effectively standardizing what the upper case version of this.word.
                    > > > Note that this means the card's v-if attribute actually runs Uword to correct this.word!!!
                          Returns on Uword are either an empty or filled string, toggling the "..." spans on false
     */
    Uword () { // Uword == Upper(case) word
      if (this.word === ''){
        this.word = ''
        return this.word
      } else {
        this.word = this.word.charAt(0).toUpperCase() + this.word.slice(1)
        return this.word
      }
    },

    /** Takes in this.wordPercentage and reverses properties and property values
     * @param this.wordPercentage
     * @return this.IwordPercentage (Inverted word percentage)
     * Note: All property values of output are arrays
     Ex:
      Input: {Here: 2, There: 2, Goat: 1}
     Output: {2: ["Here", "There"], 1: ["Goat"]}
     */
    IwordPercentage () {
      var IwordPercentage = {}
      for (var word in this.wordPercentage){
        var numProp = this.wordPercentage[word]       // numProp == Number Property
        if (IwordPercentage[numProp] === undefined){  // In case value has not been defined yet
          IwordPercentage[numProp] = []
        }
          IwordPercentage[numProp].push(word)     // Pushes current word into array, even if it's only one
      }
      return IwordPercentage
    },
    /** Organizes current percentage values into decending order
     * @param  {Object} this.IwordPercentage percentage values are properties
     * @return {Array} Numbers in decending order of current percentage values
     */
    percentageInOrder () {
      var percentageInOrder = []
      for (var num in this.IwordPercentage){  // Receives all currect percentage values
        percentageInOrder.push(num)
      }
      percentageInOrder.sort(function(a, b){return b - a}) // Sorts in decending order
      return percentageInOrder
    },
    /** Finds accuracy of percentages based on text length
     * @return {[Number]} Number of decimal places for percentage rounding
     */
    totalWords () {
      return this.fixedArray.length
    },
    percentAccuracy () {
      if (this.totalWords > 7500) {
        return 10**6
      } else if (this.totalWords > 2500){
        return 10**5
      } else if (this.totalWords > 1500){
        return 10**4
      } else if (this.totalWords > 700){
        return 10**3
      } else {
        return 10**2
      }
    },
    // Sort of doughnut graph /10 to find
    // urgencyScale () {
    //   var colourArray = ['rgb(0,150,0)', 'rgb(40,150,0)', 'rgb(70,150,0)', 'rgb(105,150,0)', 'rgb(140,150,0)', 'rgb(150,140,0)', 'rgb(150,105,0)', 'rgb(150,70,0)', 'rgb(150,40,0)', 'rgb(150,0,0)']
    // },
  },
  props: { //Short for properties //Props are passed through when component is called
    inputMessage: {
      default: 'Your writing here...'
    }
  },
  watch: {
    inputMessage: function (){
      this.checkForPuctuation()
      this.topListFunc()
    }
  },
  mounted () {
    this.generateWordCard ("Hey", 30, 30, 4)
    this.checkForPuctuation ()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src='@/assets/word-counter-component.scss'>
</style>
<!--
<div class="search-list specialScroll">
  <div class="word-card" v-for="wordObj in currSearchArray">
    <span class="word-column">
      <span>{{ titleCase(wordObj.word) }}</span>
      <a :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
    </span>
    <span class="stats-column">
      <span>Rank: {{ sortedOccurObj[wordObj.occur] }}</span>
      <span>Appeared: {{ wordObj.occur }}</span>
      <span>Percent of text: {{ wordObj.percent }}%</span>
    </span>
  </div>
  <div class="word-card past-search" v-for="wordObj in pastSearchArray" v-if="searchList.length > 0">
    <span class="word-column">
      <span>{{ titleCase(wordObj.word) }}</span>
      <a :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
    </span>
    <span class="stats-column">
      <span>Rank: {{ sortedOccurObj[wordObj.occur] }}</span>
      <span>Appeared: {{ wordObj.occur }}</span>
      <span>Percent of text: {{ wordObj.percent }}%</span>
    </span>
  </div>
</div>

<div class="word-card" v-for="wordObj in currSearchArray">
  <span class="word-column">
    <span :title="titleCase(wordObj[word])">{{ titleCase(wordObj.word) }}</span>
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
      <span class="number">{{ wordObj.percent }}</span>
    </div>
  </span>
  <a class="link" :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
</div>
