import * as UsjComponents from './src/components/index.js'

export default Vue => {
  Object.values(UsjComponents).forEach(Component => {
    Vue.use(Component)
  })
}
