<template>
  <div class="header">
    <div>{{ params.displayName }}</div>
    <div class="header__sort"
         v-if="params.enableSorting"
         @click="onSortRequested($event)"
         :class="{'active' : sort}"
    >
      <i class="material-icons">swap_vertical_circle</i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        sort: null
      }
    },
    computed: {
    },
    methods: {
      onSortRequested (event) {
        if (!this.sort) this.sort = 'asc'
        else if (this.sort === 'asc') this.sort = 'desc'
        else if (this.sort === 'desc') this.sort = null

        this.params.setSort(this.sort, event.shiftKey)
      }
    },
    mounted () {
//      this.params.column.addEventListener('sortChanged', this.onSortChanged)
    }
  })
</script>
<style lang="scss" scoped>
  .header {
    & > * { display: inline-block; }
    &__sort {
      right: 5px;
      position: absolute;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }

      &.active {
        color: orange;
      }

      .material-icons {
        font-size: 24px;
      }
    }
  }
</style>
