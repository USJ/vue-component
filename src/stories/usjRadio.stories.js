import usjRadio from '../components/usjRadio/index.js'
import Vue from 'vue'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjRadio)

storiesOf('USJ Radio')
  .add('basic', () => ({
    data() {
      return {
        radioValue: 'a',
        radioValue1: 'a'
      }
    },
    template: `
      <div>
        <usj-radio name="radio-choose" usj-value="a" v-model="radioValue">Radio A</usj-radio>
        <usj-radio name="radio-choose" usj-value="b" v-model="radioValue">Radio B</usj-radio>
        <usj-radio name="radio-choose" usj-value="a" v-model="radioValue1" :disabled="true">Radio A</usj-radio>
        <usj-radio name="radio-choose" usj-value="b" v-model="radioValue1" :disabled="true">Radio B</usj-radio>
      </div>
    `
  }))