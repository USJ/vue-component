import Vue from 'vue'
import usjListView from '../components/usjListView/index'
import {
  range
} from 'lodash'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjListView)

function sampleItems() {
  return range(1, 20).map(i => {
    return {
      id: i,
      title: 'Subject ID #' + i
    }
  })
}

storiesOf('USJ ListView', module)
  .add('basic', () => ({
    data() {
      return {
        sampleItems
      }
    },
    methods: {
      goToItem(data) {
        this.$log(data)
      }
    },
    template: `
<usj-list-view :usj-items="sampleItems">
  <usj-list-view-list>
    <template scope="item">
      <usj-list-view-item>
        <div @click="goToItem(item.data)">
         Item content: 
         {{ item }}
        </div>
      </usj-list-view-item>
    </template>
  </usj-list-view-list>
  <usj-list-view-details>
    Details content     Details content
   
  </usj-list-view-details>
</usj-list-view>
    `
  }))

  .add('has actions', () => ({
    data() {
      return {
        sampleItems
      }
    },
    methods: {
      goToItem(data) {
        this.$log(data)
      },
      localLog() {
        this.$log('local log')
      },
      detailsLog() {
        this.$log('Click details actions')
      }
    },
    template: `
<usj-list-view :usj-items="sampleItems">
  <usj-list-view-list>
    <template scope="item">
      <usj-list-view-item>
        <div @click="goToItem(item.data)">
         Item content: 
         {{ item }}
        </div>
      </usj-list-view-item>
    </template>
  </usj-list-view-list>
   
   <usj-list-actions>
      <usj-button @click="localLog()">Paginate or any action</usj-button>
   </usj-list-actions>
   
   <usj-details-actions>
      <usj-button @click="detailsLog()">Details action</usj-button>
   </usj-details-actions>
   
  <usj-list-view-details>
    Details content     Details content
  </usj-list-view-details>
</usj-list-view>
    `
  }))