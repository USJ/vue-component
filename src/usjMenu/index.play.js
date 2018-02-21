import { play } from 'vue-play'
import Vue from 'vue'

import usjMenu from './index'
import usjList from '../usjList'
import usjBackdrop from '../usjBackdrop'

Vue.use(usjMenu)
Vue.use(usjList)
Vue.use(usjBackdrop)

play('USJ Menu')
  .add('basic', {
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
  })
