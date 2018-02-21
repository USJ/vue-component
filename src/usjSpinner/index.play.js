
import Vue from 'vue'
import { play } from 'vue-play'

import usjSpinner from './index'
import usjButton from '../usjButton'

Vue.use(usjSpinner)
Vue.use(usjButton)

play('USJ Spinner')
  .add('default', {
    data () {
      return {
        disabled: false
      }
    },
    template: `
<div>
<usj-button class="usj-primary" :disabled="disabled" @click="disabled = true">
  <span v-if="!disabled">Before loading</span>
  <usj-spinner v-if="disabled"></usj-spinner>
 </usj-button>
</div>
`
  })
