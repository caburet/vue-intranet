import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

function dynamicPropsFn (route) {
  const mostrar = route.query.client || false
  return {
    client: mostrar
  }
}
const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      props: ['message'],
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    {
      name: 'Listado de Casos',
      path: '/cases/basic',
      meta: {
        label: 'Listado de Casos',
        link: 'cases/Basic.vue'
      },
      component: lazyLoading('cases/Basic'),
      props: dynamicPropsFn
    },
    {
      name: 'Crear Caso',
      path: '/createcase/basic',
      meta: {
        label: 'Crear Caso',
        link: 'createcase/Basic.vue'
      },
      component: lazyLoading('createcase/Basic')
    }

    // {
    //   name: 'Login',
    //   path: '/axiosDemo',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-rocket',
    //     link: 'axios/index.vue'
    //   },
    //   component: lazyLoading('axios', true)
    // },
    // cases
    // charts,
    // uifeatures,
    // components,
    // tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
