import usjFile from '../components/usjFile/index'
import usjIcon from '../components/usjIcon'
import usjInputContainer from '../components/usjInputContainer'
import Vue from 'vue'

import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjFile)
Vue.use(usjIcon)
Vue.use(usjInputContainer)

let updateProgress;

storiesOf('USJ File', module)
  .add('basic', () => ({
    template: `
<div>
  <usj-input-container>
    <usj-file v-model="sampleData"></usj-file>
</usj-input-container>
  <pre>{{ sampleData }}</pre>
</div>
    `,
    data() {
      return {
        sampleData: null
      }
    }
  }))
  .add('progress', () => ({
    template: `
    <div>
  <usj-input-container>
    <usj-file v-model="sampleData" @selected="selected" :uploadProgress="uploadProgress" :uploading="uploading"></usj-file>
  </usj-input-container>
  </div>
    `,
    data() {
      return {
        uploadProgress: 0,
        uploading: true,
        sampleData: '123'
      }
    },
    methods: {
      selected(e) {
        setInterval(updateProgress, 1000)
      }
    },
    mounted() {
      updateProgress = () => {
        console.log(this.uploadProgress)
        this.uploadProgress++
      }
    }
  }))