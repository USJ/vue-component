<template>
  <li class="usj-list-item" :class="classes">
    <a class="usj-list-item-container usj-button" :href="href" :target="target" :disabled="disabled">
      <slot />
    </a>

    <!--<usj-ink-ripple :disabled="disabled" />-->
  </li>
</template>

<script>
  export default {
    name: 'usj-list-item',
    props: {
      href: String,
      target: String,
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
