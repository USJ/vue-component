<template>
  <th class="usj-table__head" :class="classes" @click="changeSort">
    <div class="usj-table__head-container">
      <div class="usj-table__head-text">
        <usj-icon class="usj-sortable-icon" v-if="usjSortBy">arrow_downward</usj-icon>
        <slot></slot>

        <usj-tooltip v-if="usjTooltip">{{ usjTooltip }}</usj-tooltip>
      </div>

      <!-- <usj-ink-ripple :usj-disabled="!usjSortBy" /> -->
    </div>
  </th>
</template>

<script>
  import { usjIcon } from '../usjIcon'
  import getClosestVueParent from '../../core/utils/getClosestVueParent'
  export default {
    components: { usjIcon },
    props: {
      usjNumeric: Boolean,
      usjSortBy: String,
      usjTooltip: String
    },
    data () {
      return {
        sortType: null,
        sorted: false,
        parentTable: {}
      }
    },
    computed: {
      classes () {
        const matchSort = this.hasMatchSort()
        if (!matchSort) {
          this.sorted = false
        }
        return {
          'usj-numeric': this.usjNumeric,
          'usj-sortable': this.usjSortBy,
          'usj-sorted': matchSort && this.sorted,
          'usj-sorted-descending': matchSort && this.sortType === 'desc'
        }
      }
    },
    methods: {
      hasMatchSort () {
        return this.parentTable.sortBy === this.usjSortBy
      },
      changeSort () {
        if (this.usjSortBy) {
          if (this.sortType === 'asc' && this.sorted) {
            this.sortType = 'desc'
          } else {
            this.sortType = 'asc'
          }
          this.sorted = true
          this.parentTable.sortType = this.sortType
          this.parentTable.emitSort(this.usjSortBy)
        }
      }
    },
    mounted () {
      this.parentTable = getClosestVueParent(this.$parent, 'usj-table')
      if (this.hasMatchSort()) {
        this.sorted = true
        this.sortType = this.parentTable.sortType
      }
    }
  }
</script>
