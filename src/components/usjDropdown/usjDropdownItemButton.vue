<template>
  <li class="usj-dropdown__item usj-dropdown__item--button" @click="$emit('click', $event)">
    <div class="usj-dropdown__item-container">
      <slot></slot>
    </div>
    <!--<button @click="$emit('click', $event)"></button>-->
  </li>
</template>
