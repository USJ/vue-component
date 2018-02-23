<template>
  <div class="usj-dropdown" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
let onClickWindow

export default {
  data() {
    return {
      opened: false
    }
  },
  computed: {
    classes() {
      let classes = []

      if (this.opened) classes.push('usj-dropdown--opened')

      return classes.join(' ')
    }
  },
  methods: {
    toggleDropdown() {
      this.opened = !this.opened
    },
    closeDropdown() {
      this.opened = false
    }
  },
  mounted() {
    onClickWindow = e => {
      if (this.opened) this.closeDropdown()
    }
    window.addEventListener('mouseup', onClickWindow)
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', onClickWindow)
  }
}
</script>
<style lang="scss">
@import '../../style/variables.scss';

$_raised-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
$min-width: 100px;

.usj-dropdown {
  font-family: $font-family;

  position: relative;
  display: inline-block;

  z-index: 1;
  opacity: 0.99;

  &__button {
    min-width: $min-width;
    box-shadow: $_raised-box-shadow;
    margin: 0;
    padding: 0;
  }

  &--opened {
    .usj-dropdown__menu {
      display: block;
    }
  }

  &__menu {
    display: none;
    position: absolute;
    background-color: white;
    min-width: $min-width;
    box-shadow: $_raised-box-shadow;
    padding: 0;
    list-style: none;
    margin: 0;
  }
}
</style>
