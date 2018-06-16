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
import AddFeature from './components/pieces/AddFeature.vue'
import AdminLeftMenu from './components/pieces/AdminLeftMenu.vue'
import MapEditMenu from './components/pieces/MapEditMenu.vue'
import SearchMenu from './components/pieces/SearchMenu.vue'
import GetServerData from './components/pieces/GetData.vue'
import GetMaps from './components/pieces/GetMaps.vue'
import GetFiles from './components/pieces/GetFiles.vue'
import ShowData from './components/pieces/ShowData.vue'
import InstaMap from './components/pieces/Map.vue'
import UploadFile from './components/pieces/UploadFile.vue'
import NewMap from './components/pieces/NewMap'
import NewLayer from './components/pieces/NewLayer'
import EditLayer from './components/pieces/EditLayer'
import Styler from './components/pieces/StyleSelector'

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
Vue.component('cted-nav-bar', NavBar)
Vue.component('cted-add-user', AddUser)
Vue.component('cted-add-feature', AddFeature)
Vue.component('cted-left-menu', AdminLeftMenu)
Vue.component('cted-map-edit', MapEditMenu)
Vue.component('cted-search-menu', SearchMenu)
Vue.component('cted-get-data', GetServerData)
Vue.component('cted-get-maps', GetMaps)
Vue.component('cted-get-files', GetFiles)
Vue.component('cted-show-data', ShowData)
Vue.component('cted-map-view', InstaMap)
Vue.component('cted-upload-file', UploadFile)
Vue.component('cted-new-map', NewMap)
Vue.component('cted-new-layer', NewLayer)
Vue.component('cted-edit-layer', EditLayer)
Vue.component('cted-style-selector', Styler)

new Vue({
	el: '#app',
	router,
	store,
	components: { App, NavBar, AddUser, AddFeature, AdminLeftMenu, MapEditMenu,SearchMenu, GetServerData, GetMaps,
		GetFiles, ShowData, InstaMap, UploadFile, NewMap, NewLayer, EditLayer, Styler },
	template: '<App/>'
}).$mount('#app')
