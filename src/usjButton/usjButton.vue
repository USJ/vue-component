<template lang="html">
  <button ref="root" class="usj-button" @click="fireEvent">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['usjValue'],
  methods: {
    fireEvent: function (e) {
      this.$emit('click', e)
    },
    getValue () {
      return this.usjValue
    }
  }
}
</script>

<style lang="scss" src="./usjButton.scss">

