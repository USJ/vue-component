import { play } from 'vue-play'

const load = requireContext => requireContext.keys().map(requireContext)
// load(require.context('../src/apps', true, /.play.js$/))
load(require.context('../src/components', true, /.play.js$/))
load(require.context('../src/components', true, /.play.scss$/))
