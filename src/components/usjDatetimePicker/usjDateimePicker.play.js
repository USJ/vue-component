import usjDatetimePicker from './index'
import usjInput from '../usjInputContainer'

import Vue from 'vue'
import { play } from 'vue-play'

Vue.use(usjDatetimePicker)
Vue.use(usjInput)

play('USJ Datetime Picker')
  .add('basic', {
    template: `
      <div>
        <usj-input-container>
        <label>Date time picker</label>
          <usj-datetime-picker :config="config" placeholder="Pick a date" v-model="sampleDate" asDate></usj-datetime-picker>
        </usj-input-container>
        <usj-input-container>
          <usj-datetime-picker :config="config" :disabled="true" placeholder="Pick a date" v-model="sampleDate" asDate></usj-datetime-picker>
        </usj-input-container>
      </div>
    `,
    data () {
      return { sampleDate: new Date(), config: {enableTime: true} }
    },
    watch: {
      sampleDate (newValue) {
        this.$log(newValue)
      }
    }
  })
