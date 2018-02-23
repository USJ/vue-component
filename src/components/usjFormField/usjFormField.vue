<template>
<div class="usj-form-field" :class="{'mdc-form-field--align-end': alignEnd}">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: ['alignEnd']
}
</script>
