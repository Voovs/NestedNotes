<template>
  <div class="main-div">
  </div>
</template>

<script>
export default {
  name: 'Example',
  data: function(){ //Anything in the document
    return {
    }
  },
  methods: { //Normal function
  },
  computed: { //Functions with cache
  },
  watch: {

  },
  props: { //Short for properties //Props are passed through when component is called
    messageHere:{
      default: "Error 404" //If no alternative value is given from parent view
    }
  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {

  },
  beforeUpdate () {

  },
  updated () {

  },
  beforeDestroy () {

  },
  destroyed () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* General styles */
.main-div{
  margin: 0;
  padding: 0;
}
</style>
