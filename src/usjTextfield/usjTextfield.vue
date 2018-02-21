<template>
  <div ref="root" style="width:100%">
    <span v-if="!float">
      <div class="usj-textfield">
        <input type="text" ref="native" :value="value" :id="id" class="usj-textfield-input" :placeholder="placeholder" @keyup="keyupEvent">
      </div>
    </span>
    <span v-if="float">
      <div ref="textfield" class="usj-textfield" :class="classes">
        <input ref="native" :value="value" type="text" :id="id" class="usj-textfield-input" @keyup="keyupEvent">
        <label ref="label" :class="labelClasses" class="usj-textfield__label" :for="id">
          {{ placeholder }}
        </label>
      </div>
      <p ref="helptext" :class="helptextClasses" :id="id + '-helptext'" class="usj-textfield-helptext"
         aria-hidden="true" slot="usjHelptext">
        <slot name="helptext"></slot>
      </p>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      'id': String,
      'labelId': String,
      'value': String,
      'disabled': {
        type: Boolean,
        default: false
      },
      'float': {
        type: Boolean,
        default: false
      },
      'placeholder': String
    },
    data () {
      return {
        hasValue: false,
        classes: {},
        helptextClasses: {}
      }
    },
    methods: {
      keyupEvent (event) {
        this.hasValue = !!event.target.value
        this.$emit('input', event.target.value)
        this.$emit('change', event.target.value)
      }
    },
    mounted () {
      this.$refs.native.value = this.value
      this.hasValue = !!this.value
    },
    computed: {
      labelClasses () {
        return {
          'usj-textfield__label--float-above': this.hasValue
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/material/variables.scss';

  .usj-textfield {
    input[type="text"] {
      width: 100%;
      border: none;
      border-bottom: 1px solid #9A9A9A;
      background: none;
      font-size: 14px;
    }

    input::placeholder{
      color:white;
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
    }

    input:focus {
      outline: none;
      border-bottom: 1px solid #F6A623;
    }

    input + &__label--float-above {
      transform: translateY(-90%) scale(0.75, 0.75);
    }

    label {
      top: 20px !important;
      color: #4A4A4A !important;
      transform-origin: 0 0;
    }
  }
</style>
