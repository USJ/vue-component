import Vue from 'vue'

import usjDialog from '../components/usjDialog/index'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjDialog)

storiesOf('USJ Dialog', module)
  .add('basic', () => ({
    template: `
    <div>
      <usj-button @click="$refs['dialog'].open()">dialog</usj-button>
      <usj-dialog ref="dialog">
        <usj-dialog-title>title</usj-dialog-title>
        <usj-dialog-content>
          text
        </usj-dialog-content>
        <usj-dialog-actions>
            <usj-button>Cancel</usj-button>
            <usj-button>OK</usj-button>
        </usj-dialog-actions>
      </usj-dialog>
    </div>
    `
  }))