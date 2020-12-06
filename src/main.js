import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as faStars } from '@fortawesome/free-solid-svg-icons'
import { faStar }  from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './components/bus'

library.add(faStar)
library.add(faStars)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,  
  render: h => h(App)
}).$mount('#app')



