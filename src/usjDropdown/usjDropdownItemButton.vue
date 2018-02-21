<template>
  <li class="usj-dropdown__item usj-dropdown__item--button" @click="$emit('click', $event)">
    <div class="usj-dropdown__item-container">
      <slot></slot>
    </div>
    <!--<button @click="$emit('click', $event)"></button>-->
  </li>
</template>
<script></script>
<style lang="scss">
  .usj-dropdown__item--button {
    /*cursor: pointer;*/
    /*position: relative;*/
    /*button {*/
      /*position: absolute;*/
      /*top: 0;*/
      /*width: 100%;*/
    /*}*/
  }
</style>
