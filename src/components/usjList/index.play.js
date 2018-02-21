import { play } from 'vue-play'
import Vue from 'vue'
import usjList from './index'

Vue.use(usjList)

play('USJ List')
  .add('basic, expandable', {
    template: `
      <usj-list>
        <usj-list-item>Test 1</usj-list-item>
        <usj-list-item>Test 1</usj-list-item>
        <usj-list-item>Test 1</usj-list-item>
        <usj-list-item>
          Expandable
          <usj-list-expand>
            <usj-list>
              <usj-list-item>Test sub 1</usj-list-item>
            </usj-list>
          </usj-list-expand>
          </usj-list-item>
      </usj-list>
    `
  })
