<template>
  <i class="usj-icon" v-html="svgContent" v-if="svgContent"></i>

  <usj-image class="usj-icon" :usj-src="imageSrc" v-else-if="imageSrc"></usj-image>

  <i class="usj-icon" :class="[usjIconset]" :aria-hidden="!!usjIconset" v-else>
    <slot></slot>
  </i>
</template>

<style lang="scss" src="./usjIcon.scss">

</style>

<script>
let registeredIcons = {}

export default {
  props: {
    usjSrc: String,
    usjIconset: {
      type: String,
      default: 'material-icons'
    }
  },
  data: () => ({
    svgContent: null,
    imageSrc: null
  }),
  watch: {
    usjSrc() {
      this.svgContent = null
      this.imageSrc = null
      this.checkSrc()
    }
  },
  methods: {
    isImage(mimetype) {
      return mimetype.indexOf('image') >= 0
    },
    isSVG(mimetype) {
      return mimetype.indexOf('svg') >= 0
    },
    setSVGContent(value) {
      this.svgContent = value

      this.$nextTick(() => {
        this.$el.children[0].removeAttribute('fill')
      })
    },
    loadSVG() {
      if (!registeredIcons[this.usjSrc]) {
        const request = new XMLHttpRequest()
        const self = this

        request.open('GET', this.usjSrc, true)

        request.onload = function() {
          const mimetype = this.getResponseHeader('content-type')

          if (
            this.status >= 200 &&
            this.status < 400 &&
            self.isImage(mimetype)
          ) {
            if (self.isSVG(mimetype)) {
              registeredIcons[self.usjSrc] = this.response
              self.setSVGContent(this.response)
            } else {
              self.loadImage()
            }
          } else {
            console.warn(`The file ${self.usjSrc} is not a valid image.`)
          }
        }

        request.send()
      } else {
        this.setSVGContent(registeredIcons[this.usjSrc])
      }
    },
    loadImage() {
      this.imageSrc = this.usjSrc
    },
    checkSrc() {
      if (this.usjSrc) {
        if (this.usjSrc.indexOf('.svg') >= 0) {
          this.loadSVG()
        } else {
          this.loadImage()
        }
      }
    }
  },
  mounted() {
    this.checkSrc()
  }
}
</script>
