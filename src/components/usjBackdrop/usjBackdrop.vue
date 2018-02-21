<template>
  <div class="usj-backdrop" @click="close" @keyup.esc="close"></div>
</template>

<style lang="scss">
.usj-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  pointer-events: none;
  background-color: rgba(#000, .41);
  transform: translate3d(0, 0, 0);
  opacity: 0;

  &.usj-active {
    opacity: 1;
    pointer-events: auto;
  }

  &.usj-transparent {
    background: rgba(#000, .005);
  }
}
</style>

<script>
  export default {
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>
