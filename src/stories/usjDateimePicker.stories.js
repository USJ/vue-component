import usjDatetimePicker from '../components/usjDatetimePicker/index'
import usjInput from '../components/usjInputContainer'

import Vue from 'vue'

import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjDatetimePicker)
Vue.use(usjInput)

storiesOf('USJ Datetime Picker', module)
  .add('basic', () => ({
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
    data() {
      return {
        sampleDate: new Date(),
        config: {
          enableTime: true
        }
      }
    },
    watch: {
      sampleDate(newValue) {
        this.$log(newValue)
      }
    }
  }))