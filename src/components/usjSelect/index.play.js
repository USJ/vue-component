import { play } from 'vue-play'
import Vue from 'vue'

import usjSelect from './index'
import usjMenu from '../usjMenu'
import usjInputContainer from '../usjInputContainer'

Vue.use(usjSelect)
Vue.use(usjMenu)
Vue.use(usjInputContainer)

play('USJ Select')
  .add('basic', {
    template: `
<usj-input-container>
  <label>Country</label>
  <usj-select>
    <usj-option>Test option 1</usj-option>
  </usj-select>
</usj-input-container>
    `
  })
  .add('multiple', {
    data () {
      return {
        selected: []
      }
    },
    template: `
<usj-input-container>
  <label>Country</label>
  <usj-select multiple v-model="selected">
    <usj-option id="macau" value="Macau">Macau</usj-option>
    <usj-option id="hk" value="Hong Kong">Hong Kong</usj-option>
  </usj-select>
</usj-input-container>
    `
  })
