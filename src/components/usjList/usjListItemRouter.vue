<template>
  <li class="usj-list-item" :class="classes" :disabled="disabled">
    <slot />
    <!--<usj-ink-ripple :disabled="disabled" />-->
  </li>
</template>

<script>
  export default {
    name: 'usj-list-item',
    props: {
      disabled: Boolean
    },
    computed: {
      classes () {
        return {
          'usj-disabled': this.disabled
        }
      }
    }
  }
</script>
