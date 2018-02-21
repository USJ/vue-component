<template>
  <usj-dialog class="usj-dialog-confirm" ref="dialog" @close="fireCloseEvent('cancel')">
    <usj-dialog-title v-if="usjTitle">{{ usjTitle }}</usj-dialog-title>

    <usj-dialog-content v-if="usjContentHtml" v-html="usjContentHtml"></usj-dialog-content>
    <usj-dialog-content v-else>{{ usjContent }}</usj-dialog-content>

    <usj-dialog-actions>
      <usj-button class="usj-primary" @click="close('cancel')">{{ usjCancelText }}</usj-button>
      <usj-button class="usj-primary" @click="close('ok')">{{ usjOkText }}</usj-button>
    </usj-dialog-actions>
  </usj-dialog>
</template>

<script>
  export default {
    name: 'usj-dialog-confirm',
    props: {
      usjTitle: String,
      usjContent: String,
      usjContentHtml: String,
      usjOkText: {
        type: String,
        default: 'Ok'
      },
      usjCancelText: {
        type: String,
        default: 'Cancel'
      }
    },
    data: () => ({
      debounce: false
    }),
    methods: {
      fireCloseEvent (type) {
        if (!this.debounce) {
          this.$emit('close', type)
        }
      },
      open () {
        this.$emit('open')
        this.debounce = false
        this.$refs.dialog.open()
      },
      close (type) {
        this.fireCloseEvent(type)
        this.debounce = true
        this.$refs.dialog.close()
      }
    },
    mounted () {
      if (!this.usjContent && !this.usjContentHtml) {
        throw new Error('Missing usj-content or usj-content-html attributes')
      }
    }
  }
</script>
