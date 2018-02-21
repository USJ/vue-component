import {play} from 'vue-play'
import usjAutocomplete from './usjAutocomplete.vue'
import usjInputContainer from '../usjInputContainer/usjInputContainer.vue'

play('USJ Autocomplete')
  .add('call server for data', {
    components: {usjAutocomplete, usjInputContainer},
    template: `
    <usj-input-container>
      <usj-autocomplete :fetch="fetchFromServer" @select="selected">
	<template scope="item">
	  <div @click="item.onClick(item.data)">
	    <div class="item-name">{{item.data.name}}</div>
	    <div class="item-id">{{item.data.id}}</div>
	  </div>
	</template>
      </usj-autocomplete>
      
    </usj-input-container>
    `,
    data() {
      return {

        sampleData: [
          {
            name: 'Chan Dan Wen',
            id: 12345678,
          },
          {
            name: 'Rivka Fong',
            id: 22222222,
          },
          {
            name: 'XXXXXXXXX',
            id: 11111111,
          }
        ]
      }
    },
    methods: {
      selected: function (val1, val2) {
        this.$log(val1)
        this.$log(val2)
      },
      fetchFromServer: function (param) {
        const promise = new Promise((resolve, reject)=>{
           setTimeout(function(){
             resolve(
             [
               {
                 name: 'Chan Dan Wen',
                 id: 33333333,
               },
               {
                 name: 'Rivka Fong',
                 id: 22222222,
               },
               {
                 name: 'XXXXXXXXX',
                 id: 11111111,
               }
             ]
             )
           }, 1000)
        })
        return promise
      }
    }
  })

