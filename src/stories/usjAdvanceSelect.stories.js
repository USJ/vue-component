import Vue from 'vue'
import {
  range
} from 'lodash'

import {
  storiesOf
} from '@storybook/vue'

import {
  action
} from '@storybook/addon-actions'

import Select from '../components/usjAdvanceSelect/index.js'
import usjIcon from '../components/usjIcon'
import usjInputContainer from '../components/usjInputContainer'
Vue.use(usjInputContainer)
Vue.use(Select)
Vue.use(usjIcon)

storiesOf('USJ Advance Select', module)
  .add('Basic single select (disabled)', () => ({
    template: `
    <usj-input-container>
    <usj-advance-select :options="sampleOptions" disabled></usj-advance-select>
    </usj-input-container>
    `,
    data() {
      return {
        sampleOptions: [{
          label: 'Option 1',
          value: 'Option 1'
        }]
      }
    }
  }))

  .add('Basic single select', () => ({
    template: `
<div>
<usj-input-container>

    <usj-advance-select :options="sampleOptions" v-model="sampleValue" searchable></usj-advance-select>
    </usj-input-container>

    V-Model: {{ sampleValue }}
</div>
    `,
    data() {
      const options = range(1, 10).map(idx => ({
        label: `Option Label ${idx}`,
        value: `Option Value ${idx}`
      }))

      return {
        sampleValue: options[2].value,
        sampleOptions: options
      }
    }
  }))

  .add('Multiple select', () => ({
    template: `
<div>
<usj-input-container>

    <usj-advance-select :options="sampleOptions" v-model="sampleValue" multiple></usj-advance-select>
    </usj-input-container>

    <br />
    <usj-input-container>

    <usj-advance-select :options="sampleOptions" v-model="sampleValue" multiple searchable></usj-advance-select>
    </usj-input-container>

    V-Model: {{ sampleValue }}
</div>
    `,
    data() {
      const options = range(1, 10).map(idx => ({
        label: `Option Label ${idx}`,
        value: `Option Value ${idx}`
      }))

      return {
        sampleValue: [options[0].value, options[1].value],
        sampleOptions: options
      }
    }
  }))

  .add('Async select (custom template)', () => ({
    template: `
    <div>
    <usj-input-container>
      <usj-advance-select :fetch-function="fetchFunction" searchable v-model="sampleValue">
        <template scope="user">
          <div>{{ user.username }}</div>
        </template>
      </usj-advance-select>
    </usj-input-container>

        v-model: {{ sampleValue }}

    <usj-input-container>
      <usj-advance-select :fetch-function="fetchFunction" searchable v-model="sampleValue2">
        <template scope="user">
          <div>{{ user.username }}</div>
        </template>
      </usj-advance-select>
    </usj-input-container>
        v-model: {{ sampleValue2 }}
    </div>
    `,
    data() {
      const asyncOptions = range(1, 10).map(idx => ({
        id: `${idx}`,
        username: `User ${idx}`
      }))

      return {
        sampleValue: asyncOptions[0],
        sampleValue2: {},
        sampleOptions: asyncOptions
      }
    },
    methods: {
      fetchFunction(data) {
        this.$log('fetch with data ' + data)
        return new Promise((resolve, reject) => {
          let items = this.sampleOptions

          resolve(items.filter(item => JSON.stringify(item).toLowerCase().indexOf(data.toLowerCase()) > -1))
        })
      }
    }
  }))

  .add('Async multiple select (custom template)', () => ({
    template: `
    <div>
      <usj-input-container>
      <usj-advance-select :fetch-function="fetchFunction" searchable multiple v-model="sampleValue">
        <template scope="user">
          {{ user.username }}
        </template>
      </usj-advance-select>
      < /usj-input-container>
        v-model: {{ sampleValue }}
    </div>
    `,
    data() {
      const asyncOptions = range(1, 10).map(idx => ({
        id: `${idx}`,
        username: `User ${idx}`
      }))

      return {
        sampleValue: [asyncOptions[0], asyncOptions[1]],
        sampleOptions: asyncOptions
      }
    },
    methods: {
      fetchFunction(data) {
        return new Promise((resolve, reject) => {
          let items = this.sampleOptions

          resolve(items.filter(item => JSON.stringify(item).toLowerCase().indexOf(data.toLowerCase()) > -1))
        })
      }
    }
  }))
  .add('Emit only select', () => ({
    template: `
<div>
<usj-input-container>
  <usj-advance-select emitOnly :options="sampleOptions" @select="handleSelect"></usj-advance-select>
</usj-input-container>
</div>
    `,
    data() {
      return {
        sampleOptions: [{
          label: 'Option 1',
          value: 'Option 1'
        }]
      }
    },
    methods: {
      handleSelect(val) {
        this.$log(val)
      }
    }
  }))