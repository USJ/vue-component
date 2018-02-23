<template>
  <div class="usj-list-view" :class="[listActionsClass]">
    <slot></slot>
  </div>
</template>
<script>
const LIST_CLASS = 'usj-list-view-list'
const LIST_ACTIONS_CLASS = 'usj-list-actions'
const DETAILS_CLASS = 'usj-list-view-details'
const DETAILS_ACTIONS_CLASS = 'usj-details-actions'

export default {
  props: ['usjItems'],
  data() {
    return {
      listActionComponent: null,
      listComponent: null,
      detailsComponent: null
    }
  },
  mounted() {
    this.listComponent = this.$children.filter(child =>
      child.$el.classList.contains(LIST_CLASS)
    )[0]
    this.detailsComponent = this.$children.filter(child =>
      child.$el.classList.contains(DETAILS_CLASS)
    )[0]

    this.listActionComponent = this.$el.querySelectorAll(
      '.' + LIST_ACTIONS_CLASS
    )[0]
    this.detailsActionComponent = this.$el.querySelectorAll(
      '.' + DETAILS_ACTIONS_CLASS
    )[0]

    // add only <usj-list-actions> exists
    if (this.listActionComponent)
      this.listComponent.setBottomEl(this.listActionComponent)

    // add only <usj-details-actions> exists
    if (this.detailsActionComponent)
      this.detailsComponent.setBottomEl(this.detailsActionComponent)

    this.updateItems()
  },
  methods: {
    updateItems() {
      this.listComponent.items = this.usjItems || new Array(5)
    }
  },
  watch: {
    usjItems: function() {
      this.updateItems()
    }
  },
  computed: {
    listActionsClass: function() {
      return {
        'usj-list-view--has-list-actions': this.listActionComponent
      }
    }
  }
}
</script>
<style lang="scss" src="./usjListView.scss">

</style>
