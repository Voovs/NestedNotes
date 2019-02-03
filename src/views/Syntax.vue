<template>
  <div class="main-div">
    <h1>Basic structure</h1>
      <h2>Hyphenation</h2>
        <p>
          Nested notes are most similar in structure to jot notes or bullet points. Hyphens are
          used to indicate the start of a new line. These should not be omitted, as other syntaxes
          leverges hyphens
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30":text="typeWriterText['hyph0']" />
      <h2>Indentation</h2>
        <p>
          Indentation in lines indicates relation between topics. Between 4 spaces and 1 Tab are
          recommended for digital notes. Keep indents deliberate. Overuse will result in clutter
          and confusion
          </p>
        <p>
          Relation between topics can be anything that makes sense to you. Usually if a point is
          a direct extension of the point above, it should be indented
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30":text="typeWriterText['inde0']" />
        <p>
          Points that are related, though don’t explain each other should not be indented this way.
          In the case of both points explaining an above topic, indentation between both points should be equal
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30":text="typeWriterText['inde1']" />
        <p>
          Attempt to keep less than 5 indentations per point. Too many will create difficulties reading.
          Creating too many consecutive indentations will limit line length, so try creating a new topic
          in these situations
          </p>
      <h2>Lines</h2>
        <p>
          A line consists of one string of information. Lines may not exceed one line in a word processor.
          Use indentation to split lines instead. Lines should only include one independent clause
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30":text="typeWriterText['line0']"/>
      <h2>Headings</h2>
        <p>
          The first line placed should be a heading. These forego hyphen notation and will never be indented.
          No information, other than the notes’ name should be presented here. No advanced notation may be used
          </p>
        <typeWriter pauseTime="12000" textColor="#ECF4F3" msPerLetter="15":text="typeWriterText['head0']"/>
    <h1>Advanced notation</h1>
      <h2>Listsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</h2>
        <p>
          Long lists use colons to compress otherwise extensive indentation.
          Colons should have spaces separating them from both list items. Lists
          can be explained through standard indentation
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30":text="typeWriterText['list0']" />
        <p>
          Lists of 3 or fewer elements should use indentation instead. If each
          list item requires a separate and discrete explanation, indentation is
          recommended. Attempt to group into related shorter lists, if one line is
          not an option
          </p>
        <typeWriter pauseTime="12000" textColor="#ECF4F3" msPerLetter="15":text="typeWriterText['list1']" />
      <h2>Topic subset</h2>
        <p>
          An @ symbol should be used to indicate a subordinating topic, that has
          less indentations. These prevent extensive indentation, through breaking into
          another upper topic. Hyphens should still be kept on such lines
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30"/>
      <h2>Comments</h2>
        <p>
          Use sets {} to place in your personal comments. These still extent the line,
          so short comments are recommended. Longer comments may be indented onto a new line
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30"/>
      <h2>Double independent clauses</h2>
        <p>
          Two short independent clauses may be used in one line, when separated by a
          comma. Only upper topics should be notated this way. Line length limits prevent
          highly indented lines from comma notation. Use indentation to split independent
          clauses instead
          </p>
        <typeWriter pauseTime="6000" textColor="#ECF4F3" msPerLetter="30"/>
      <h2>Extending explaination</h2>
        <p>
          In cases where a topic must be explained further, without relating to another
          topic, a caret, or ⤷, may extend the explanation of a point. Extended explanations
          will still be indented, swapping will swap a hyphen for a caret and space. Only
          one can be used per topic and should only serve for technical definitions. Hyphens
          must be used for indentation elsewhere, to use carets
          </p>
        <typeWriter pauseTime="12000" textColor="#ECF4F3" msPerLetter="15":text="typeWriterText['exte0']"/>
  </div>
</template>

<script>
// @ is an alias to /src
import typeWriter from '@/components/typeWriter.vue'
import upAnimation from '@/components/MoveUp-Animation.vue'

export default {
  name: 'Syntax',
  data: function(){ //Anything in the document
    return{
      typeWriterText: {
        hyph0: "-Mechanical{0}-Membrane{0}-Mecha-membrane",
        inde0: "-Types of key switches{1}-Mechanical{2}-Cost a lot",
        inde1: "-Types of key switches{1}-Mechanical{2}-Cost a lot{1}-Membrane{2}-Usually pretty cheap",
        line0: "-International situation{1}-Russia is upset with Austria{2}-Austria won’t defend German states{3}-Has other military problems{1}-Britain doesn’t mind the German states getting central European power{2}-France and Russia were larger threats to Britain{1}-Prussian military quickly destroys smaller German states",
        head0: "Class notes{0}-Congress of Vienna is hosted by Mettrinic{1}-Very conservative views{2}-They’re all powerful in the current structure{1}-Germany is still very split up{0}-Current powers of Europe don’t include Germany{1}-They might want to unite to compete with other powers{0}-Realism{1}-One of Bismarck’s main ideologies{1}-The end justifies the means",
        list0: "Powers of Europe 1850s{0}-Britain | France | Austria | Sweden | Poland | Spain | Portugal | Prussia",
        list1: "Powers of Europe 1850s{0}-Some share a common official language today{1}-German{2}-Prussia | Austria | Switzerland|  Lots of small states{1}-English{2}-Britain | Netherlands{1}-French{2}-France | Switzerland{0}-Others are unique{1}-Spain | Portugal | Denmark",
        exte0: "-Photosynthesis{1}-Light dependant{2}-In and around thylakoid{3}⤷ Little disks in chloroplast stroma{3}-ETC occurs in thylakoid membrane{3}-Hydrogen for chemosynthesis in lumen{1}-Light independent{2}-Part of the Calvin cycle{3}⤷Cycle that happens in stroma",
      },
    }
  },
  methods: { //Normal function
  },
  computed: { //Functions with cache
  },
  components: {
    typeWriter,
    upAnimation
  }
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=PT+Mono')
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,700')
@font-face
  font-family: GT Walsheim
  src: url('../assets/Fonts/GT-Walsheim-Pro-Trial-Condensed-Medium.ttf')


.main-div
  background-color: #555151
  height: 100%

h1, h2, p, .typeWriter
  background-color: #555151
  color: #ECF4F3

.main-div h1
  font-family: 'GT Walsheim', ubuntu, sans-serif
  font-weight: 700
  letter-spacing: 2.5px
  border-top: 2px solid #57a99a
  width: calc(95vw - 20px)
  padding-left: 10px
  margin-left: 20px

.main-div h2
  font-family: ubuntu, sans-serif
  font-weight: 700
  letter-spacing: .5px
  padding-left: 30px

.main-div p
  width: 40vw
  padding-left: 40px

.main-div .typeWriter
  font-family: 'PT Mono', sans-serif

</style>




<!-- # Nested Notes' Syntax
## Headings
___
Starting off any Note will require a heading. A simple and short phrase, sort of like a title, that should be used rarely. Insert a line break above headings
""example""
## Inherance
___
The inherence structure uses indents to show relation between lines. Begin your first line at zero indents and add one, every time the new line streams off its predecessor
""example""

Multiple lines can stream off a single topic
## Line length
___
Line breaks are not permitted. In the case of long lines, split them across multiple different lines, streaming off one main line. Line limits force creative thinking and compression
Initial:
""example""
Proper:
""example""
## Why
___
Nested Notes is a literary compression standard. Compression is built to more easily organize your notes. However, compression must attempt to balance information, speed, with learning modes.
Colums---
Clearly Nested is able to hit that literary aspect, though it also has some visual components through the positional data storage. You'll have to talk these over with someone to get the communicative category
Nested Notes are exeptionaly fast. They can be easily created on keyboard or paper devices, while not requireing more than a hyphen for syntax purposes
Through its dense design, Nested Notes are able to store exeptional amounts of literary information. Few note systems can complete with quite this density
## Official Beta Syntax
___
# Reflexive extention:
Comma placed in line indicates everything to thr right is an extention
```
-Cows indirectly harm the Earth, through humans abusing reasources to raise them
```
# Nested topics:
When a whole topic streams from an inner line, shorthand sytax can be used for the link
```
-Cows are some of the most delicous animals, for humans
    ~~~Human meat love~~~
    -Humans keep their steaks in high supply, diverting reasources for cows
        -Heavy pollution of the enviroment
        -Some third world countries lack water supplies to sustain this

Human meat love
-Hitorically, meat has been considered a delicacy
    -Now we expect meat at every meal
        -Extremely wastful consumption
    -Pretty cheap burgers in many cases
```
# Extened explaination:
Linking arrow syntax can be used to further explain a topic directly
```
-Cow meat incudes lots of water
    -Uses up local freshwater supply
        -Problamatic for dry countries, for residence
# Special fonts:
Sans Forgetica is a new font that's supposed to assist in remembering content.
The option to export your notes in this font will be shortly available in the
redactor
       -->
