import { play } from 'vue-play'
import usjButtonToggle from './index.js'
import usjIcon from '../usjIcon'
import Vue from 'vue'

Vue.use(usjButtonToggle)
Vue.use(usjIcon)

play('USJ Button Toggle')
  .add('basic', {
    template: `
<usj-button-toggle>
  <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
</usj-button-toggle>
`
  })

  .add('single', {
    template: `
<usj-button-toggle usj-single>
  <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
   <usj-button class="usj-icon-button">
    <usj-icon>done</usj-icon>
  </usj-button>
</usj-button-toggle>
`
  })

  .add('model binding - single', {
    data () {
      return {
        modelValue: {}
      }
    },
    template: `
<section>
  <usj-button-toggle :usj-model.sync="modelValue" usj-single>
    <usj-button class="usj-icon-button" usj-value="value 1">
      <usj-icon>done</usj-icon>
    </usj-button>
     <usj-button class="usj-icon-button" usj-value="value 2">
      <usj-icon>done</usj-icon>
    </usj-button>
     <usj-button class="usj-icon-button" usj-value="value 3">
      <usj-icon>done</usj-icon>
    </usj-button>
     <usj-button class="usj-icon-button" usj-value="value 4">
      <usj-icon>done</usj-icon>
    </usj-button>
  </usj-button-toggle>
  <span>Model value: {{ modelValue }}</span>
</section>

`
  })

  .add('model binding - multiple', {
    data () {
      return {
        modelValue: {}
      }
    },
    template: `
  <section>
    <usj-button-toggle :usj-model.sync="modelValue">
      <usj-button class="usj-icon-button" usj-value="value 1">
        <usj-icon>done</usj-icon>
      </usj-button>
       <usj-button class="usj-icon-button" usj-value="value 2">
        <usj-icon>done</usj-icon>
      </usj-button>
       <usj-button class="usj-icon-button" usj-value="value 3">
        <usj-icon>done</usj-icon>
      </usj-button>
       <usj-button class="usj-icon-button" usj-value="value 4">
        <usj-icon>done</usj-icon>
      </usj-button>
    </usj-button-toggle>
    <span>Model value: {{ modelValue }}</span>
  </section>
  
  `
})
