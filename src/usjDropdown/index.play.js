import { play } from 'vue-play'
import usjDropdown from './index.js'
import usjButton from '../usjButton'
import Vue from 'vue'

Vue.use(usjDropdown)
Vue.use(usjButton)

play('USJ Dropdown')
  .add('basic', {
    template: `
<usj-dropdown>
  <usj-dropdown-button>Button</usj-dropdown-button>
  <usj-dropdown-menu>
    <usj-dropdown-item>Item 1</usj-dropdown-item>
    <usj-dropdown-item>Item 2</usj-dropdown-item>
    <usj-dropdown-item @click="$log('Test action')">
      Test action
    </usj-dropdown-item>
  </usj-dropdown-menu>
</usj-dropdown>
`
  })
