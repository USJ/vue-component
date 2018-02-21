<template>
  <usj-dialog class="usj-dialog-prompt" ref="dialog" @close="fireCloseEvent('cancel')">
    <usj-dialog-title v-if="usjTitle">{{ usjTitle }}</usj-dialog-title>

    <usj-dialog-content v-if="usjContentHtml" v-html="usjContentHtml"></usj-dialog-content>
    <usj-dialog-content v-if="usjContent">{{ usjContent }}</usj-dialog-content>

    <usj-dialog-content>
      <usj-input-container>
        <usj-input
          ref="input"
          :id="usjInputId"
          :name="usjInputName"
          :maxlength="usjInputMaxlength"
          :placeholder="usjInputPlaceholder"
          :value="value"
          @keydown.enter.native="confirmValue"></usj-input>
      </usj-input-container>
    </usj-dialog-content>

    <usj-dialog-actions>
      <usj-button class="usj-primary" @click="close('cancel')">{{ usjCancelText }}</usj-button>
      <usj-button class="usj-primary" @click="confirmValue">{{ usjOkText }}</usj-button>
    </usj-dialog-actions>
  </usj-dialog>
</template>

<script>
  export default {
    name: 'usj-dialog-prompt',
    props: {
      value: {
        type: [String, Number],
        required: true
      },
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
      },
      usjInputId: String,
      usjInputName: String,
      usjInputMaxlength: [String, Number],
      usjInputPlaceholder: String
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
        window.setTimeout(() => {
          this.$refs.input.$el.focus()
        })
      },
      close (type) {
        this.fireCloseEvent(type)
        this.debounce = true
        this.$refs.dialog.close()
      },
      confirmValue () {
        this.$emit('input', this.$refs.input.$el.value)
        this.close('ok')
      }
    }
  }
</script>
