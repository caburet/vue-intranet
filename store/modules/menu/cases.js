import lazyLoading from './lazyLoading'
function dynamicPropsFn (route) {
  const mostrar = route.query.client || false
  return {
    client: mostrar
  }
}
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
    },
    {
      name: 'Editar Password',
      path: '/edit/password',
      meta: {
        label: 'Editar Password',
        link: 'editperson/Basic.vue'
      },
      component: lazyLoading('createcase/Basic')
    }

  ]
}
