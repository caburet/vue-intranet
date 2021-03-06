import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
import lazyLoading from '../store/modules/menu/lazyLoading'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Dashboard',
      path: '/',
      component: require('../views/dashboard/')
    },
    {
      name: 'Login',
      path: '/login',
      component: require('../views/auth/Login')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: 'Ver Caso',
      path: '/case/basic/:id',
      meta: {
        label: 'Ver Caso',
        link: 'case/Basic.vue'
      },
      component: require('../views/case/Basic')
    },
    {
      name: 'Ver Noticia',
      path: '/new/basic/:id',
      meta: {
        label: 'Ver Noticia',
        link: 'new/Basic.vue'
      },
      component: require('../views/new/Basic')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
