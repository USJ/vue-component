<template>
  <td class="usj-table__cell" :class="classes" :style="style">
    <div class="usj-table-cell-container">
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    props: {
      usjNumeric: Boolean
    },
    data: () => ({
      hasAction: false,
      style: {
        width: 'inherit'
      }
    }),
    computed: {
      classes () {
        return {
          'usj-numeric': this.usjNumeric,
          'usj-has-action': this.hasAction
        }
      }
    },
    mounted () {
      if (this.$children.length > 0) {
        this.hasAction = true
      }
    }
  }
</script>
