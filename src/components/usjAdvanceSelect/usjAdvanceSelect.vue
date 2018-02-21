<template>
  <div class="usj-select" :class="rootClasses"
       @keydown.up="handleUpKey"
       @keydown.down="handleDownKey"
       @keyup.enter="handleEnterKey"
  >
    <input type="hidden" :id="id" :name="name" ref="hiddenInput" :value="singleItem.value" />
    <div class="usj-select__control" @click="handleControlClick">
      <div class="usj-select__value" v-if="!multiple && showValueEl">
        <slot v-bind="singleLabel" v-if="hasDefaultSlot"></slot>
        <span v-else>{{ singleLabel }}</span>
      </div>
      <div class="usj-select__multiple-value" v-if="showValueEl && multiple">
        <div class="item" v-for="(item, index) in multipleItems">
          <div class="item__label">
            <slot v-bind="item" v-if="hasDefaultSlot"></slot>
            <span v-else>{{ item }}</span>
          </div>
          <div class="item__remove" @click.prevent.stop="removeItem(item, index)">
            <usj-icon>clear</usj-icon>
          </div>
        </div>
      </div>
      <div class="usj-select__placeholder" v-if="!hasSelected || showPlaceholderEl">
        {{ placeholder }}
      </div>
      <div class="usj-select__input" >
        <input type="text" ref="input" id="input-id" v-if="searchable"
               @focus="handleInputFocus"
               v-model="searchValue"
               @input="handleInputInput"
               @blur="handleInputBlur"
        />
        <div class="placeholder"></div>
      </div>
      <div class="usj-select__clear" v-if="clearable" @click.prevent.stop="clear">
        <usj-icon>clear</usj-icon>
      </div>
      <div class="usj-select__dropdown">
        <!--<usj-icon>arrow_drop_down</usj-icon>-->
      </div>
    </div>

    <div class="usj-select__menu-wrapper" v-show="showMenuEl">
      <ul class="usj-select__menu">
        <li class="usj-select__menu-item_disable_option" v-if="menuItems.length < 1 && !loading">
          No options available
        </li>
        <li class="usj-select__menu-item_disable_option" v-if="loading">
          Loading...<usj-spinner></usj-spinner>
        </li>
        <li class="usj-select__menu-item"
            v-for="(item, index) in menuItems"
            :key="item.value"
            @mousedown="handleMenuItemClick(item)"
            @mouseover="handleMenuItemMouseOver(item, index)"
            :class="{ 'highlighted': index === highlightIdx }"
        >
          <slot v-bind="item" v-if="hasDefaultSlot"></slot>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style type="postcss" src="./usjAdvanceSelect.css">

</style>
