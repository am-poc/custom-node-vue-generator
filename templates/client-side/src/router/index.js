import Vue from 'vue'
import Router from 'vue-router'

import loginPage from '@/components/pages/Login'
import homePage from '@/components/pages/Home'
import adminPage from '@/components/pages/Admin'
import mapPage from '@/components/pages/MapView'
import accessErrorPage from '@/components/pages/ErrorAccess'
import loginErrorPage from '@/components/pages/ErrorLogin'

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			component: loginPage
		},
		{
			path: '/access-error',
			name: 'AccessError',
			component: accessErrorPage
		},
		{
			path: '/login-error',
			name: 'LoginError',
			component: loginErrorPage
		},
		{
			path: '/home',
			name: 'HomePage',
			component: homePage,
			meta: {requiresAuth: true, adminAuth: false, othersAuth: true}
		},
		{
			path: '/admin',
			name: 'AdminPage',
			component: adminPage,
			meta: {requiresAuth: true, adminAuth: true, othersAuth: true}
		},
		{
			path: '/map-view',
			name: 'MapPage',
			component: mapPage,
			meta: {requiresAuth: true, adminAuth: false, othersAuth: true}
		}
	]
})

router.beforeEach((to, from, next)=>{
	//console.log(to)
	
	// This is manual access management, using meta tags and vuex and Navigation Guards
	if (to.name == 'Login' || to.name == 'AccessError' || to.name == 'LoginError') {
		next()
	}else{
		const user = JSON.parse(sessionStorage.getItem('user'))
		//console.log(user)
		if (user){
			to.meta.adminAuth   = user.role == 'admin'? true : false
			to.meta.othersAuth  = user.isAuthenticated   // dont care condition right now
			to.meta.requiresAuth = user.isAuthenticated
			//console.log(to.meta)
			if (to.name == 'AdminPage' && to.meta.adminAuth && to.meta.othersAuth){
				next()
			}else if (to.name== 'HomePage' || to.name== 'MapPage' && to.meta.othersAuth){
				next()
			}else{
				next('access-error')
			}
		}else{
			next('access-error')
		}
	}
})

Vue.use(Router)
export default router