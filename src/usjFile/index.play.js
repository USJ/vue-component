
import usjFile from './index'
import usjIcon from '../usjIcon'
import usjInputContainer from '../usjInputContainer'
import Vue from 'vue'
import { play } from 'vue-play'

Vue.use(usjFile)
Vue.use(usjIcon)
Vue.use(usjInputContainer)

let updateProgress;

play('USJ File')
  .add('basic', {
    template: `
<div>
  <usj-input-container>
    <usj-file v-model="sampleData"></usj-file>
</usj-input-container>
  <pre>{{ sampleData }}</pre>
</div>
    `,
    data () {
      return { sampleData: null }
    }
  })
  .add('progress', {
    template: `
    <div>
  <usj-input-container>
    <usj-file v-model="sampleData" @selected="selected" :uploadProgress="uploadProgress" :uploading="uploading"></usj-file>
  </usj-input-container>
  </div>
    `,
    data () {
      return {
        uploadProgress: 0,
        uploading: true,
        sampleData: '123'
      }
    },
    methods: {
      selected (e) {
        setInterval(updateProgress, 1000)
      }
    },
    mounted () {
      updateProgress = () => {
        console.log(this.uploadProgress)
        this.uploadProgress++
      }
    }
  })
