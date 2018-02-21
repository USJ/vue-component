<template>
  <li class="usj-dropdown__item">
    <span>
      <slot></slot>
    </span>
  </li>
</template>
<script>
  export default {
    name: 'usj-dropdown-item'
  }
</script>

<style lang="scss">
  .usj-dropdown__item {
    transition-property: background-color, color;
    transition-duration: 0.2s;

    cursor: pointer;

    height: 38px;
    width: 100%;

    background: white;

    & > * {
      vertical-align: middle;
      display: inline-block;
      margin-top: 7px;
      text-align: center;
      width: 100%;
    }

    &:hover {
      background-color: #F16832;
      * { color: white; }
    }
  }
</style>
