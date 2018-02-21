<template>
  <table class="usj-table" :class="classes">
    <slot></slot>
  </table>
</template>

<style lang="scss" src="./usjTable.scss"></style>

<script>
import getClosestVueParent from '../../core/utils/getClosestVueParent'

let updateBodyCellWidth

export default {
  props: {
    usjSortType: String,
    usjSort: String,
    usjScrollHeight: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sortType: this.usjSortType,
      sortBy: this.usjSort,
      hasRowSelection: false,
      data: [],
      numberOfRows: 0,
      numberOfSelected: 0,
      selectedRows: {}
    }
  },
  methods: {
    emitSort(name) {
      this.sortBy = name
      this.$emit('sort', {
        name,
        type: this.sortType
      })
    },
    emitSelection() {
      this.$emit('select', this.selectedRows)
    },
    getScrollHeight() {
      return this.usjScrollHeight
    }
  },
  computed: {
    classes() {
      return { 'usj-table--scrollable': this.usjScrollHeight }
    }
  },
  watch: {
    data() {
      this.numberOfRows = this.data.length
    },
    selectedRows() {
      this.numberOfSelected = Object.keys(this.selectedRows).length
    }
  },
  mounted() {
    this.parentCard = getClosestVueParent(this.$parent, 'usj-table-card')
    if (this.parentCard) {
      this.parentCard.tableInstance = this
    }

    updateBodyCellWidth = () => {
      this.$el.querySelector('tbody').style.height = this.usjScrollHeight
      //
      //        let elHead = this.$children
      //          .filter(child => child.headRow)[0]
      //
      //        let widthList = elHead.$children
      //          .map(child => {
      //            return child.$el.style.width
      //          })
      //
      //        this.$children
      //          .filter(child => !child.headRow)
      //          .forEach(child => {
      //            widthList.forEach((widthValue, index) => {
      //              let tdComponent = child.$children[index]
      //              tdComponent.style.width = widthValue
      //            })
      //          })
    }

    if (this.usjScrollHeight) {
      updateBodyCellWidth()
      window.addEventListener('resize', updateBodyCellWidth)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', updateBodyCellWidth)
  }
}
</script>
