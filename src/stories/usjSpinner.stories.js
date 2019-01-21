import Vue from 'vue'

import usjSpinner from '../components/usjSpinner/index'
import usjButton from '../components/usjButton'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjSpinner)
Vue.use(usjButton)

storiesOf('USJ Spinner', module)
  .add('default', () => ({
    data() {
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
  }))

  .add('spinner', () => ({
    template: '<usj-spinner></usj-spinner>'
  }))