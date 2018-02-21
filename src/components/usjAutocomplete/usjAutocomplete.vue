<template>
  <div class="usj-autocomplete">
    <div class="usj-autocomplete__input">
      <usj-textfield v-if="fetch" :placeholder="placeholder" v-model="searchTerm" @change="onChange()"></usj-textfield>
      <usj-textfield v-else :placeholder="placeholder" v-model="searchTerm"></usj-textfield>
    </div>
    <div class="usj-autocomplete__list-wrapper" v-show="searchTerm">
      <slot v-for="item in filtered()" :data="item" :onClick="onClick"></slot>
    </div>
  </div>
</template>

<script>
import usjTextfield from '../usjTextfield/usjTextfield.vue'
import debounce from 'lodash/debounce'

let debounceTime = 1000

export default {
  components: { usjTextfield },
  props: {
    itemsList: {
      type: Array,
      default: function() {
        return []
      }
    },
    fetch: Function,
    debounce: {
      type: Number,
      default: 1000
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchTerm: '',
      serverList: []
    }
  },
  methods: {
    filtered: function() {
      if (this.fetch) {
        return this.serverList
      }

      let result = this.itemsList.filter(item => {
        return JSON.stringify(item)
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      })

      return result
    },
    onClick: function(value) {
      this.searchTerm = ''

      this.$emit('select', value)
    },
    onChange: debounce(function() {
      this.fetch({ query: this.searchTerm }).then(data => {
        this.serverList = data
      })
    }, debounceTime)
  },
  mounted() {
    debounceTime = this.debounce
  }
}
</script>

<style lang="scss">
.usj-autocomplete {
  position: relative;

  &__list-wrapper {
    position: absolute;
    z-index: 1;
    width: 100%;
    /*background: white;*/
    margin: 10px 0;

    &-inside {
      padding: 10px;
    }
  }
}
</style>
