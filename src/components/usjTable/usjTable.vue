<template>
  <table class="usj-table" :class="classes">
    <slot></slot>
  </table>
</template>

<style lang="scss">
  //@import '../../style/material/material.scss';
  @import '../../style/variables.scss';

  .usj-table {
    font-family: $usj-font-family;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: hidden;
    box-sizing: content-box;

    .usj-warning {
      color: red;
    }

    &.usj-table-hover {
      $row-hover-border-color: $usj-theme-orange;
      $row-hover-border-size: 3px;

      tbody .usj-table__row:hover {
        background: lighten($usj-theme-orange, 50);
        border-left: $row-hover-border-size * 2 solid $usj-theme-orange;
        border-right: $row-hover-border-size * 2 solid $usj-theme-orange;
        border-top: $row-hover-border-size solid $usj-theme-orange;
        border-bottom: $row-hover-border-size solid $usj-theme-orange;
      }
    }

    &--scrollable {
      width: 100%;
      .usj-table__body {
        display: block;
        overflow-y: auto;
        width: 100%;
      }
      td,
      th {
        float: left;
      }
      thead,
      tbody,
      tr,
      td,
      th {
        display: block;
      }
      thead {
        width: calc(100% - 16px);
      }

      td > .usj-table-cell-container {
        padding: 17px 18px;
      }
      tbody tr {
        height: 68px;
      }
      //debug
      //thead th { border-right: 1px solid black; margin-right: -1px; }
      //tbody td { border-right: 1px solid black; margin-right: -1px; }
    }

    &__row {
      border-top: 1px solid #e0e0e0;

      &.usj-selected .usj-table-cell {
        background-color: #f5f5f5;
      }

      &:hover .usj-table-cell {
        background-color: #eee;
      }

      &--bg-grey {
        background-color: grey;
        & * {
          color: white;
        }
      }

      &--bg-yellow {
        background-color: #ffae00;
        & * {
          color: white;
        }
      }

      &--centered > td {
        text-align: center;
      }

      &--footer .usj-table__cell {
        padding: 0;
      }
    }

    &__head {
      padding: 0;
      position: relative;
      color: rgba(#000, 0.54);
      line-height: 16px;

      &:last-child .usj-table-head-container .usj-table-head-text {
        padding-right: 24px;
      }

      &.usj-numeric {
        text-align: right;
      }

      //.usj-icon {
      //  $size: 16px;
      //
      //  width: $size;
      //  min-width: $size;
      //  height: $size;
      //  min-height: $size;
      //  font-size: $size;
      //  color: rgba(#000, .54);
      //
      //  &:not(.usj-sortable-icon) {
      //    margin: 0 4px;
      //  }
      //
      //  &:first-child {
      //    margin-left: 0;
      //  }
      //
      //  &:last-child {
      //    margin-right: 0;
      //  }
      //}
    }

    &__cell {
      height: 48px;
      position: relative;
      transition: $swift-ease-out;
      color: rgba(#000, 0.87);
      line-height: 18px;

      padding: 10px 0 10px 0;

      &--top {
        vertical-align: top;
      }

      &--top-v-center {
        vertical-align: top;
        text-align: center;
      }

      &:last-child .usj-table-cell-container {
        padding-right: 24px;
      }

      &.usj-numeric {
        text-align: right;

        .usj-table-cell-container {
          justify-content: flex-end;
        }
      }

      &.usj-has-action {
        .usj-table-cell-container {
          //display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      .usj-table-cell-container {
        padding: 6px 32px 6px 24px;
        text-align: center;
      }
      //
      //.usj-button {
      //  $size: 36px;
      //
      //  width: $size;
      //  min-width: $size;
      //  height: $size;
      //  min-height: $size;
      //
      //  &:last-child {
      //    margin: 0 -10px 0 0;
      //  }
      //
      //  .usj-icon {
      //    $size: 18px;
      //
      //    width: $size;
      //    min-width: $size;
      //    height: $size;
      //    min-height: $size;
      //    margin: 0;
      //    color: rgba(#000, .54);
      //    font-size: $size;
      //  }
      //}
    }

    &.usj-transition-off {
      .usj-table-cell,
      .usj-checkbox .usj-checkbox-container,
      .usj-checkbox .usj-checkbox-container:after {
        transition: none !important;
      }
    }

    .usj-table__head-container {
      //height: 23px;
      //padding: 14px 0;
      padding-top: 14px;
      padding-bottom: 10px;
      transition: $swift-ease-out;
    }

    .usj-table__head-text {
      height: 28px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      line-height: 28px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .usj-sortable {
      cursor: pointer;

      &:first-of-type {
        .usj-sortable-icon {
          left: auto;
          right: 10px;
        }
      }

      &:hover,
      &.usj-sorted {
        color: rgba(#000, 0.87);

        .usj-sortable-icon {
          opacity: 1;
        }
      }

      &.usj-sorted {
        .usj-sortable-icon {
          color: rgba(#000, 0.87);
        }
      }

      &.usj-sorted-descending {
        .usj-sortable-icon {
          transform: translateY(-50%) rotate(180deg);
        }
      }

      .usj-sortable-icon {
        position: absolute;
        top: 50%;
        left: 2px;
        transition: $swift-ease-out;
        transform: translateY(-50%);
        opacity: 0;
        color: rgba(#000, 0.38);
      }

      .usj-ink-ripple {
        color: rgba(#000, 0.87);
      }

      .usj-table__head-text {
        padding-right: 32px;
        padding-left: 24px;
      }
    }

    .usj-table-selection {
      width: 60px;
      position: relative;
      vertical-align: middle;

      +  {
        .usj-table-cell .usj-table-cell-container,
        .usj-table-head .usj-table-head-container .usj-table-head-text {
          padding-left: 8px;
        }
      }

      .usj-table-cell-container {
        padding-right: 16px;
        padding-left: 24px;
      }

      .usj-checkbox {
        margin: 0;
      }

      .usj-checkbox-container {
        width: 18px;
        height: 18px;
        margin-top: 1px;

        &:after {
          top: -1px;
          left: 4px;
        }
      }
    }

    .usj-select {
      min-width: 84px;
    }

    .usj-select-value,
    .usj-option {
      font-size: 13px;
    }
  }

  .usj-table-card {
    overflow: visible;

    .usj-toolbar {
      padding-left: 16px;
      background-color: #fff;
    }

    .usj-title {
      flex: 1;
      font-size: 20px;
    }

    .usj-table-pagination {
      height: 56px;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid #e0e0e0;
      color: rgba(#000, 0.54);
      font-size: 12px;

      .usj-table-pagination-previous {
        margin-right: 2px;
        margin-left: 18px;
      }

      .usj-select {
        width: auto;
        min-width: 36px;
        margin: 0 32px;

        &:after {
          margin-top: 0;
        }

        .usj-select-value {
          padding: 0;
          border: none;
          font-size: 13px;
        }
      }

      .usj-button {
        &:not([disabled]) {
          color: rgba(#000, 0.87);
        }

        &[disabled] {
          .usj-icon {
            color: rgba(#000, 0.26);
          }
        }
      }
    }
  }
</style>

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
