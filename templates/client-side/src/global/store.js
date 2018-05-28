import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Reactive Global Variables
const store = new Vuex.Store({
	state: {
		username: '',
		role: '',
		isAuthenticated: false,
		token: ''
	},
	mutations: {
		setUser (state, user) {
			state.username  = user.username
			state.role      = user.role
			state.isAuthenticated = user.isAuthenticated
			state.token = user.token
		}
	}
})

export default store