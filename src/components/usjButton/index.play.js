import { play } from 'vue-play'

import usjButton from './usjButton.vue'

play('USJ Button')
  .add('basic', {
    components: { usjButton },
    template: `
<div>
<usj-button class="usj-primary" :disabled="true">Primary Disabled button</usj-button>
<usj-button :disabled="true">Default Disabled button</usj-button>
<usj-button class="usj-button--raised usj-button--accent" @click="$log('Clicked !')">Click me</usj-button>
</div>
    `
  })
