import usjDialog from './usjDialog.vue'
import usjDialogContent from './usjDialogContent.vue'
import usjDialogTitle from './usjDialogTitle.vue'
import usjDialogActions from './usjDialogActions.vue'

import usjDialogPrompt from './presets/usjDialogPrompt.vue'
import usjDialogConfirm from './presets/usjDialogConfirm.vue'

export default function install (Vue) {
  Vue.component('usj-dialog', usjDialog)
  Vue.component('usj-dialog-content', usjDialogContent)
  Vue.component('usj-dialog-title', usjDialogTitle)
  Vue.component('usj-dialog-actions', usjDialogActions)

  Vue.component('usj-dialog-prompt', usjDialogPrompt)
  Vue.component('usj-dialog-confirm', usjDialogConfirm)
}

export { usjDialog, usjDialogContent, usjDialogTitle, usjDialogActions, usjDialogPrompt, usjDialogConfirm }

