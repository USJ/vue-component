import usjTable from '../components/usjTable/index'
import usjCheckbox from '../components/usjCheckbox'

import Vue from 'vue'

import {
  range
} from 'lodash'
import {
  storiesOf
} from '@storybook/vue';

Vue.use(usjTable)
Vue.use(usjCheckbox)

function tableData() {
  const COL = 10

  let tableData = []

  range(0, 10).forEach(i => {
    let row = {}
    range(0, COL).forEach(k => {
      row['header' + k] = `H${k} ${i}`
    })
    tableData.push(row)
  })

  return {
    tableData,
    colRange: range(0, COL)
  }
}

storiesOf('USJ Table', module)
  .add('basic', () => ({
    template: `
 <usj-table>
    <usj-table-header>
      <usj-table-row>
        <usj-table-head v-for="col in colRange">Header {{ col }}</usj-table-head>
      </usj-table-row>
    </usj-table-header>
    <usj-table-body>
      <usj-table-row v-for="(row, index) in tableData" :key="index">
        <usj-table-cell v-for="col in colRange">{{ row['header'+col] }}</usj-table-cell>
      </usj-table-row>
    </usj-table-body>
  </usj-table>
`,
    data() {
      return tableData()
    }
  }))

  .add('scroll', () => ({
    template: `

<div style="width:80%;">
 <usj-table :usj-scroll-height="'500px'">
    <usj-table-header>
      <usj-table-row>
        <usj-table-head v-for="col in colRange" style="width: 10%;">Header {{ col }}</usj-table-head>
      </usj-table-row>
    </usj-table-header>
    <usj-table-body>
      <usj-table-row v-for="(row, index) in tableData" :key="index">
        <usj-table-cell v-for="col in colRange" style="width: 10%;">{{ row['header'+col] }}</usj-table-cell>
      </usj-table-row>
    </usj-table-body>
  </usj-table>
</div>
 
    `,
    data() {
      return tableData()
    }
  }))

  .add('select', () => ({
    template: `

<div style="width:80%;">
 <usj-table :usj-scroll-height="'500px'" @select="onSelect">
    <usj-table-header>
      <usj-table-row>
        <usj-table-head v-for="col in colRange" style="width: 10%;">Header {{ col }}</usj-table-head>
      </usj-table-row>
    </usj-table-header>
    <usj-table-body>
      <usj-table-row v-for="(row, index) in tableData" :key="index" usj-selection>
        <usj-table-cell v-for="col in colRange" style="width: 10%;">{{ row['header'+col] }}</usj-table-cell>
      </usj-table-row>
    </usj-table-body>
  </usj-table>
</div>
 
    `,
    data() {
      return tableData()
    },
    methods: {
      onSelect(value) {
        this.$log(value)
      }
    }
  }))