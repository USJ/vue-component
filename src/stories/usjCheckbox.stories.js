import Vue from 'vue'


import usjCheckbox from '../components/usjCheckbox/index'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjCheckbox)

storiesOf('USJ Checkbox', module)
  .add('multiple', () => ({
    data() {
      return {
        sampleData: []
      }
    },
    template: `
<div>
  <usj-checkbox usj-value="test1" v-model="sampleData">Test 1</usj-checkbox>
   <usj-checkbox usj-value="test2" v-model="sampleData">Test 2</usj-checkbox>
  <usj-checkbox usj-value="test3" v-model="sampleData">Test 3</usj-checkbox>
  
  <pre>{{ sampleData }}</pre>
</div>
      
    `
  }))