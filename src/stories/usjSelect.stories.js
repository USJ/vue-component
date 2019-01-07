import Vue from 'vue'

import usjSelect from '../components/usjSelect/index'
import usjMenu from '../components/usjMenu'
import usjInputContainer from '../components/usjInputContainer'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjSelect)
Vue.use(usjMenu)
Vue.use(usjInputContainer)

storiesOf('USJ Select', module)
  .add('basic', () => ({
    template: `
<usj-input-container>
  <label>Country</label>
  <usj-select @change="$log('on change')" @input="$log('on input')">
    <usj-option>Test option 1</usj-option>
  </usj-select>
</usj-input-container>
    `
  }))
  .add('multiple', () => ({
    data() {
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
  }))