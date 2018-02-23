// import { play } from 'vue-play'

// import { AgGridVue } from 'ag-grid-vue'
// import HeaderComponent from './HeaderComponent.vue'

// import 'ag-grid/dist/styles/ag-grid.css'
// import './grid.scss'

// play('USJ Grid')
//   .add('basic', {
//     components: {
//       AgGridVue
//     },
//     data () {
//       return {
//         gridOptions: null,
//         columnDefs: null,
//         rowData: null,
//         showGrid: false,
//         showToolPanel: false,
//         rowCount: null
//       }
//     },
//     methods: {
//       createColumnDefs () {
//         let columnDefs = []
//         let range = [...Array(5).keys()]
//         range.forEach(i => {
//           columnDefs.push({
//             headerName: 'Test ' + i,
//             field: 'col' + i,
//             headerComponentFramework: HeaderComponent
//           })
//         })

//         this.columnDefs = columnDefs
//       },
//       createRowData () {
//         let rowData = []
//         let colRange = [...Array(5).keys()]
//         let rowRange = [...Array(5).keys()]
//         rowRange.forEach(i => {
//           let row = {}
//           colRange.forEach(c => {
//             row['col' + c] = `${i}${c} Row ${i} Col ${c}`
//           })
//           rowData.push(row)
//         })
//         this.rowData = rowData
//       }
//     },
//     beforeMount () {
//       this.gridOptions = {}

//       this.gridOptions.rowHeight = 48
//       this.gridOptions.headerHeight = 48
//       this.gridOptions.enableFilter = true
//       this.gridOptions.enableSorting = true
//       this.createRowData()
//       this.createColumnDefs()
//       this.showGrid = true
//     },
//     template: `
// <div>
// <AgGridVue style="width: 100%; height: 350px;" class="ag-material ag-usj"
//   :gridOptions="gridOptions"
//   :columnDefs="columnDefs"
//   :rowData="rowData">
// </AgGridVue>
// <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
// <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
// </div>
// `
//   })
