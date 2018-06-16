import Vue from 'vue'
import Router from 'vue-router'

import loginPage from '@/components/pages/Login'
import homePage from '@/components/pages/Home'
import adminPage from '@/components/pages/Admin'
import mapPage from '@/components/pages/MapView'
import mapEditPage from '@/components/pages/MapEdit'
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
		},
		{
			path: '/map-edit',
			name: 'MapEditPage',
			component: mapEditPage,
			props: true,        // needed for the router-link url params to work
			meta: {requiresAuth: true, adminAuth: true, othersAuth: true}
		}
	]
})

router.beforeEach((to, from, next)=>{
	//console.log(to)
	const adminPages = ['AdminPage', 'MapEditPage']
	const userPages  = ['HomePage', 'MapPage']
	const allowedPages = ['Login', 'AccessError','LoginError']
	
	// This is manual access management, using meta tags and vuex and Navigation Guards
	if (allowedPages.indexOf(to.name) > -1) {
		next()
	}else{
		const user = JSON.parse(sessionStorage.getItem('user'))
		//console.log(user)
		if (user){
			to.meta.adminAuth   = user.role == 'admin'? true : false
			to.meta.othersAuth  = user.isAuthenticated   // dont care condition right now
			to.meta.requiresAuth = user.isAuthenticated
			//console.log(to.meta)
			if (adminPages.indexOf(to.name) > -1 && to.meta.adminAuth && to.meta.othersAuth){
				next()
			}else if (userPages.indexOf(to.name) > -1 && to.meta.othersAuth){
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
