import Vue from 'vue'

import usjMenu from '../components/usjMenu/index'
import usjList from '../components/usjList'
import usjBackdrop from '../components/usjBackdrop'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjMenu)
Vue.use(usjList)
Vue.use(usjBackdrop)

storiesOf('USJ Menu', module)
  .add('basic', () => ({
    template: `
      <usj-menu>
      <usj-button usj-menu-trigger>Button</usj-button>

        <usj-menu-content>
          <usj-menu-item>Test 1</usj-menu-item>
           <usj-menu-item>Test 2</usj-menu-item>
          <usj-menu-item>Test 3</usj-menu-item>
</usj-menu-content>
</usj-menu>
    `
  }))