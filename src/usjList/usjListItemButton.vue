<template>
  <li class="usj-list-item" :class="classes">
    <div class="usj-list-item-container usj-button">
      <slot></slot>
    </div>

    <usj-button type="button" class="usj-button-ghost" @click="$emit('click', $event)" :disabled="disabled"></usj-button>
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
