<template>
  <tr class="usj-table__row" :class="classes" @click="autoSelect" :style="{'height': height}">
    <usj-table-cell class="usj-table-selection" v-if="hasSelection">
      <usj-checkbox v-model="checkbox" :disabled="isDisabled" @change="select"></usj-checkbox>
    </usj-table-cell>

    <slot></slot>
  </tr>
</template>

<script>
  import getClosestVueParent from '../../core/utils/getClosestVueParent'
  const transitionClass = 'usj-transition-off'
  export default {
    props: {
      usjAutoSelect: Boolean,
      usjSelection: Boolean,
      usjItem: Object,
      height: ''
    },
    data () {
      return {
        parentTable: {},
        headRow: false,
        checkbox: false,
        index: 0
      }
    },
    computed: {
      isDisabled () {
        return !this.usjSelection && !this.headRow
      },
      hasSelection () {
        return this.usjSelection || this.headRow && this.parentTable.hasRowSelection
      },
      classes () {
        return {
          'usj-selected': this.checkbox
        }
      }
    },
    watch: {
      usjItem (newValue, oldValue) {
        this.parentTable.data[this.index] = this.usjItem
        this.handleMultipleSelection(newValue === oldValue)
      }
    },
    methods: {
      setSelectedRow (value, index) {
        if (value) {
          this.parentTable.selectedRows[index] = this.parentTable.data[index]
          ++this.parentTable.numberOfSelected
        } else {
          delete this.parentTable.selectedRows[index]
          --this.parentTable.numberOfSelected
        }
      },
      handleSingleSelection (value) {
        this.setSelectedRow(value, this.index - 1)
        this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected === this.parentTable.numberOfRows
      },
      handleMultipleSelection (value) {
        if (this.parentTable.numberOfRows > 25) {
          this.parentTable.$el.classList.add(transitionClass)
        }
        this.parentTable.$children.forEach((row, index) => {
          row.checkbox = value
          if (!row.headRow) {
            this.setSelectedRow(value, index - 1)
          }
        })
        if (value) {
          this.parentTable.numberOfSelected = this.parentTable.numberOfRows
        } else {
          this.parentTable.numberOfSelected = 0
        }
        window.setTimeout(() => this.parentTable.$el.classList.remove(transitionClass))
      },
      select (value) {
        if (this.hasSelection) {
          if (this.headRow) {
            this.handleMultipleSelection(value)
          } else {
            this.handleSingleSelection(value)
          }
          this.parentTable.emitSelection()
        }
      },
      autoSelect () {
        this.$emit('click', this.$el)

        if (this.usjAutoSelect && this.hasSelection) {
          this.checkbox = !this.checkbox
          this.handleSingleSelection(this.checkbox)
          this.parentTable.emitSelection()
        }
      }
    },
    mounted () {
      this.parentTable = getClosestVueParent(this.$parent, 'usj-table')
      if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
        this.headRow = true
      } else {
        this.parentTable.numberOfRows++
        this.index = this.parentTable.numberOfRows
        if (this.usjSelection) {
          this.parentTable.hasRowSelection = true
        }
        if (this.usjItem) {
          this.parentTable.data.push(this.usjItem)
        }
      }
    }
  }
</script>
