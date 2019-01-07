import usjDropdown from '../components/usjDropdown/index.js'
import usjButton from '../components/usjButton'
import Vue from 'vue'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjDropdown)
Vue.use(usjButton)

storiesOf('USJ Dropdown', module)
  .add('basic', () => ({
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
  }))