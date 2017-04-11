import lazyLoading from './lazyLoading'

export default {
  name: 'Cases',
  meta: {
    icon: 'fa-table',
    expanded: false
  },

  children: [
    {
      name: 'Listado de Casos',
      path: '/cases/basic',
      meta: {
        label: 'Casos',
        link: 'cases/Basic.vue'
      },
      component: lazyLoading('cases/Basic')
    },
    {
      name: 'Crear Caso',
      path: '/createcase/basic',
      meta: {
        label: 'Crear Caso',
        link: 'createcase/Basic.vue'
      },
      component: lazyLoading('createcase/Basic')
    },
    {
      name: 'Ver Caso',
      path: '/case/basic',
      meta: {
        label: 'Ver Caso',
        link: 'case/Basic.vue'
      },
      component: lazyLoading('case/Basic')
    }

  ]
}
