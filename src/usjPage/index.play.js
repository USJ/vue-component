import { play } from 'vue-play'
import Vue from 'vue'
import usjPage from './index'
import usjListView from '../usjListView'
import { range } from 'lodash'

Vue.use(usjPage)
Vue.use(usjListView)

play('USJ Page')
  .add('basic', {
    methods: {
      range (start, finish) {
        return range(start, finish)
      }
    },
    template: `
  <usj-page>
    <header>
     <usj-page-menu>
        Top menu
      </usj-page-menu>
      <usj-page-header>
        Header
      </usj-page-header>
    </header>
     
    <section>
      <usj-page-content>
        <p v-for="count in range(1, 100)">content line {{ count }}</p>
      </usj-page-content>
    </section>
     <usj-page-footer>
      Footer
     </usj-page-footer>
  </usj-page>
    `
  })
