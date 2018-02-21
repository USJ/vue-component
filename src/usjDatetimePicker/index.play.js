import usjDatetimePicker from './index'
import usjInput from '../usjInputContainer'

import Vue from 'vue'
import { play } from 'vue-play'

Vue.use(usjDatetimePicker)
Vue.use(usjInput)

play('USJ Datetime Picker')
  .add('basic', {
    template: `
      <usj-input-container>
         <usj-datetime-picker :config="config" placeholder="Pick a date" v-model="sampleDate"></usj-datetime-picker>
       </usj-input-container>
    `,
    data () {
      return { sampleDate: new Date(), config: {enableTime: true} }
    },
    watch: {
      'sampleDate' : function(newValue){
        this.$log(newValue)
      }
    }
  })
