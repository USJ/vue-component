import { play } from 'vue-play'
import Vue from 'vue'

import usjLayout from './index'

Vue.use(usjLayout)

play('USJ Layout')
  .add('basic', {
    template: `
<div>
<usj-layout :usj-gutter="16">
  <usj-layout usj-flex="50">1</usj-layout>
  <usj-layout>2</usj-layout>
  <usj-layout>3</usj-layout>
  <usj-layout>4</usj-layout>
</usj-layout>

<usj-layout usj-gutter>
  <usj-layout usj-flex="33">1</usj-layout>
  <usj-layout>2</usj-layout>
</usj-layout>

<usj-layout usj-gutter>
  <usj-layout>1</usj-layout>
  <usj-layout usj-flex="33" usj-flex-offset="33">2</usj-layout>
</usj-layout>

<usj-layout usj-gutter>
  <usj-layout usj-flex="75">1</usj-layout>
  <usj-layout>2</usj-layout>
</usj-layout>

<usj-layout usj-gutter>
  <usj-layout usj-flex="50">1</usj-layout>
  <usj-layout>2</usj-layout>
  <usj-layout>3</usj-layout>
</usj-layout>

<usj-layout usj-gutter>
  <usj-layout usj-flex="25" usj-flex-offset="25">1</usj-layout>
  <usj-layout usj-flex="25">2</usj-layout>
</usj-layout>
</div>
    
    `
  })
