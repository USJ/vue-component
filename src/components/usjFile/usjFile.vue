<template>
  <div class="usj-file" @click="openPicker">
    <usj-input
      readonly
      v-model="filename"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="textInput">
    </usj-input>

    <usj-icon>attach_file</usj-icon>

    <input
      type="file"
      :id="id"
      :name="name"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onFileSelected"
      ref="fileInput">
  </div>
</template>

<style lang="scss" src="./usjFile.scss">

</style>

<script>
import getClosestVueParent from '../../core/utils/getClosestVueParent'
export default {
  name: 'usj-file',
  props: {
    value: String,
    id: String,
    name: String,
    disabled: Boolean,
    required: Boolean,
    placeholder: String,
    accept: String,
    multiple: Boolean,
    uploadProgress: Number,
    uploading: Boolean
  },
  data() {
    return {
      filename: this.value
    }
  },
  watch: {
    value() {
      this.filename = this.value
    }
  },
  methods: {
    getMultipleName(files) {
      let names = []
      console.log(files)
      //        [...files].forEach((file) => {
      //          names.push(file.name)
      //        })
      return names.join(', ')
    },
    openPicker() {
      if (!this.disabled) {
        this.resetFile()
        this.$refs.fileInput.click()
        this.$refs.textInput.$el.focus()
      }
    },
    resetFile() {
      this.parentContainer.value = ''
      this.$refs.fileInput.value = ''
    },
    onFileSelected($event) {
      const files = $event.target.files || $event.dataTransfer.files
      if (files) {
        if (files.length > 1) {
          this.filename = this.getMultipleName(files)
        } else if (files.length === 1) {
          this.filename = files[0].name
        } else {
          this.filename = null
        }
      } else {
        this.filename = $event.target.value.split('\\').pop()
      }
      this.$emit('selected', files || $event.target.value)
      this.$emit('input', this.filename)
    }
  },
  mounted() {
    this.parentContainer = getClosestVueParent(
      this.$parent,
      'usj-input-container'
    )
    if (!this.parentContainer) {
      this.$destroy()
      throw new Error('You should wrap the usj-file in a usj-input-container')
    }
    this.parentContainer.hasFile = true
  },
  beforeDestroy() {
    this.parentContainer.hasFile = false
  }
}
</script>
