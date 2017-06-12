import lazyLoading from './lazyLoading'

export default {
  name: 'Casos',
  meta: {
    icon: 'fa-table',
    expanded: false
  },

  children: [
    {
      name: 'Listado de Casos',
      path: '/cases/basic',
      meta: {
        label: 'Listado de Casos',
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
    }

  ]
}
