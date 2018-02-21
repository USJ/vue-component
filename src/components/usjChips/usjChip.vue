<template>
  <div class="usj-chip" :class="[classes]" tabindex="0">
    <div class="usj-chip-container" @click="!disabled && usjEditable && $emit('edit')">
      <slot></slot>
    </div>

    <usj-button
      class="usj-icon-button usj-dense usj-delete"
      v-if="usjDeletable"
      @click="!disabled && $emit('delete')"
      @keyup.native.delete="!disabled && $emit('delete')"
      tabindex="-1">
      <usj-icon class="usj-icon-delete">cancel</usj-icon>
    </usj-button>
  </div>
</template>

<script>
  export default {
    name: 'usj-chip',
    props: {
      disabled: Boolean,
      usjDeletable: Boolean,
      usjEditable: Boolean
    },
    computed: {
      classes () {
        return {
          'usj-deletable': this.usjDeletable,
          'usj-disabled': this.disabled,
          'usj-editable': this.usjEditable
        }
      }
    }
  }
</script>
