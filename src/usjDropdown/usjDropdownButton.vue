<template>
  <usj-button class="usj-dropdown__button" @click="onClick()">
    <slot></slot>
  </usj-button>
</template>
<script>
  export default {
    methods: {
      onClick () {
        this.$parent.toggleDropdown()
      }
    }
  }
</script>
