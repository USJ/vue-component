import Vue from 'vue'
import usjList from '../components/usjList/index'
import usjButton from '../components/usjButton'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjList)
Vue.use(usjButton)

storiesOf('USJ List', module)
  .add('basic, expandable', () => ({
    template: `
<div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<usj-list>
        <usj-list-item @click="$log('Test 1')">Test 1</usj-list-item>
        <usj-list-item>Test 1</usj-list-item>
        <usj-list-item>Test 1</usj-list-item>
        <usj-list-item @click="$log('Test 1')">Test2<span class="badge">13</span></usj-list-item>
        <usj-list-item>
          Expandable
          <usj-list-expand>
            <usj-list>
              <usj-list-item>Test sub 1</usj-list-item>
            </usj-list>
          </usj-list-expand>
          </usj-list-item>
      </usj-list>
</div>
    `
  }))