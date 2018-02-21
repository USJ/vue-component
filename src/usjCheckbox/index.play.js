
import Vue from 'vue'
import { play } from 'vue-play'

import usjCheckbox from './index'

Vue.use(usjCheckbox)

play('USJ Checkbox')
  .add('multiple', {
    data () {
      return { sampleData: [] }
    },
    template: `
<div>
  <usj-checkbox usj-value="test1" v-model="sampleData">Test 1</usj-checkbox>
   <usj-checkbox usj-value="test2" v-model="sampleData">Test 2</usj-checkbox>
  <usj-checkbox usj-value="test3" v-model="sampleData">Test 3</usj-checkbox>
  
  <pre>{{ sampleData }}</pre>
</div>
      
    `
  })
