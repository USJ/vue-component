<template>
  <div class="usj-button-toggle">
    <slot></slot>
  </div>
</template>


<script>
  let onClick
  let toggleClass = 'usj-toggle'
  let newValue

  export default {
    props: {
      usjSingle: Boolean,
      usjModel: {}
    },
    mounted () {
      this.$children.forEach((child) => {
        let element = child.$el
        onClick = () => {
          if (this.usjSingle) {
            this.$children.forEach((child) => {
              child.$el.classList.remove(toggleClass)
            })
            element.classList.add(toggleClass)
            newValue = child.getValue()
          } else {
            element.classList.toggle(toggleClass)
            newValue = this.$children
              .filter(child => child.$el.classList.contains(toggleClass))
              .map(child => child.getValue())
          }

          this.$emit('update:usjModel', newValue)
        }

        if (element && element.classList.contains('usj-button')) {
          element.addEventListener('click', onClick)
        }
      })
    },
    beforeDestroy () {
      this.$children.forEach((child) => {
        let element = child.$el
        if (element && element.classList.contains('usj-button')) {
          element.removeEventListener('click', onClick)
        }
      })
    }
  }
</script>

<style lang="scss">
  $border-color: #ADACAD;

  .usj-button-toggle {
    /** { color: white; }*/

    .usj-toggle {
      background: orange;
      * { color: white; }
      &:hover { background: orange !important; }
      border-color: orange;
    }

    .usj-icon-button {
      position: relative;
      display: inline-block;
      border-radius: 0px;
      left: 0px;
      margin: 0px 0px 0px -5px;
      border: 1px $border-color solid;

      &:first-child {
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        border-radius: 0 4px 4px 0;
      }

      /*&:hover {*/
        /*background-color: rgba(0, 0, 0, 0.2) !important;*/
      /*}*/

      /*&:hover * {*/
        /*color: white;*/
      /*}*/
    }
  }
</style>
