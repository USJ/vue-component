import { play } from 'vue-play'
import Vue from 'vue'
import { range } from 'lodash'

import Select from './index.js'
import usjIcon from '../usjIcon'
import usjInputContainer from '../usjInputContainer'
Vue.use(usjInputContainer)
Vue.use(Select)
Vue.use(usjIcon)

play('USJ Advance Select')
  .add('Basic single select (disabled)', {
    template: `
    <usj-input-container>
    <usj-advance-select :options="sampleOptions" disabled></usj-advance-select>
    </usj-input-container>
    `,
    data () {
      return {
        sampleOptions: [
          { label: 'Option 1', value: 'Option 1' }
        ]
      }
    }
  })

  .add('Basic single select', {
    template: `
<div>
<usj-input-container>

    <usj-advance-select :options="sampleOptions" v-model="sampleValue" searchable></usj-advance-select>
    </usj-input-container>

    V-Model: {{ sampleValue }}
</div>
    `,
    data () {
      const options = range(1, 10).map(idx => ({ label: `Option Label ${idx}`, value: `Option Value ${idx}` }))

      return {
        sampleValue: options[2].value,
        sampleOptions: options
      }
    }
  })

  .add('Multiple select', {
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
    data () {
      const options = range(1, 10).map(idx => ({ label: `Option Label ${idx}`, value: `Option Value ${idx}` }))

      return {
        sampleValue: [ options[0].value, options[1].value ],
        sampleOptions: options
      }
    }
  })

  .add('Async select (custom template)', {
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
    </div>
    `,
    data () {
      const asyncOptions = range(1, 10).map(idx => ({ id: `${idx}`, username: `User ${idx}` }))

      return {
        sampleValue: asyncOptions[0],
        sampleOptions: asyncOptions
      }
    },
    methods: {
      fetchFunction (data) {
        return new Promise((resolve, reject) => {
          let items = this.sampleOptions

          resolve(items.filter(item => JSON.stringify(item).toLowerCase().indexOf(data.toLowerCase()) > -1))
        })
      }
    }
  })

  .add('Async multiple select (custom template)', {
    template: `
    <div>
      <usj-advance-select :fetch-function="fetchFunction" searchable multiple v-model="sampleValue">
        <template scope="user">
          {{ user.username }}
        </template>
      </usj-advance-select>
        v-model: {{ sampleValue }}
    </div>
    `,
    data () {
      const asyncOptions = range(1, 10).map(idx => ({ id: `${idx}`, username: `User ${idx}` }))

      return {
        sampleValue: [asyncOptions[0], asyncOptions[1]],
        sampleOptions: asyncOptions
      }
    },
    methods: {
      fetchFunction (data) {
        return new Promise((resolve, reject) => {
          let items = this.sampleOptions

          resolve(items.filter(item => JSON.stringify(item).toLowerCase().indexOf(data.toLowerCase()) > -1))
        })
      }
    }
  })


