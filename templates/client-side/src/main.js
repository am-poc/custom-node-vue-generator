// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import router from './router'
import App from './App'
import store from './global/store'


import NavBar from './components/pieces/TopNav.vue'
import AddUser from './components/pieces/AddUser.vue'
import AdminLeftMenu from './components/pieces/AdminLeftMenu.vue'
import SearchMenu from './components/pieces/SearchMenu.vue'
import GetServerData from './components/pieces/GetData.vue'
import ShowData from './components/pieces/ShowData.vue'
import InstaMap from './components/pieces/Map.vue'

import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/leaflet/dist/leaflet.css'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// Read-only Global variables
Vue.prototype.$hostname = 'http://localhost:3000/'   // TODO: this needs to be updated for the production

// Components
// for building components: https://www.youtube.com/watch?v=FWQSuskE5UA
Vue.component('aa-nav-bar', NavBar)
Vue.component('aa-add-user', AddUser)
Vue.component('aa-left-menu', AdminLeftMenu)
Vue.component('aa-search-menu', SearchMenu)
Vue.component('aa-get-data', GetServerData)
Vue.component('aa-show-data', ShowData)
Vue.component('aa-map-view', InstaMap)

new Vue({
	el: '#app',
	router,
	store,
	components: { App, NavBar, AddUser, AdminLeftMenu, SearchMenu, GetServerData, ShowData, InstaMap },
	template: '<App/>'
}).$mount('#app')
