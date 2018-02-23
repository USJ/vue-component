import { play } from 'vue-play'

import usjTextfield from './usjTextfield.vue'
import usjInputContainer from '../usjInputContainer/usjInputContainer.vue'

play('USJ TextField')
  .add('basic', {
    components: { usjTextfield , usjInputContainer },
    data () { return {modelValue: null} },
    template: `
      <div>
      <usj-input-container>
        <usj-textfield placeholder="English name" v-model="modelValue" :float="true"></usj-textfield>
      </usj-input-container>
</div>
      
    `
  })
