import * as types from '../mutation-types'

const state = {
  caseslist: {
    caseslist: [
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      },
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      },
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      }

    ]
  },
  dash: {
    dashcaseslist: [
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      },
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      },
      { SerNr: '45210',
        CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
        Asignee: 'AC',
        ProblemDesc: 'Margen de Error',
        CaseComment: 'None',
        StatusName: 'Caso Asignado a Programacion',
        TransDate: '31/03/2017',
        TransTime: '11:21:04'
      }

    ],
    opencase: '10',
    clientcase: '5'
  },
  case: {
    client: 'Open Technologies SA',
    type: 'Desarrollo',
    subject: 'Mejoras de Producto',
    problemdesc: 'Requerimiento',
    caserow: [
      { User: 'WEBSERVER',
        Date: '30/03/2017',
        Comment: 'Facturas de Venta: Propongo como opción de mejora que las FC de ventas una vez validadas en el afip, el campo con el CAI quede gravado y visible en la solapa de lega debajo o al costado del numero legal.-',
        Asignee: 'RMY'
      },
      { User: 'YR',
        Date: '31/03/2017',
        Comment: 'Me parece práctico, por favor desarrollarlo en ar.repo y ar para que esté disponible para los clientes de V16 en adelante. Saludos',
        Asignee: 'HR'
      },
      { User: 'HR',
        Date: '31/03/2017',
        Comment: 'Asigno. Desarrollar para ar (develop)',
        Asignee: 'JCOR'
      }
    ]
  },
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, opened) {
    if (state.device.isMobile) {
      state.sidebar.opened = opened
    } else {
      state.sidebar.opened = true
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },
  [types.ADD_CASE] (state, data) {
    console.log(data)
    state.dash.dashcaseslist.push(
      { SerNr: 'dataSerNr',
        CaseTypeComment: data.CaseTypeComment,
        Asignee: data.Asignee,
        ProblemDesc: data.ProblemDesc,
        CaseComment: data.CaseComment,
        StatusName: data.StatusName,
        TransDate: data.TransDate,
        TransTime: data.SeTransTimerNr
      }

    )
    state.case.client = data.tittle
  },
  [types.INIT_DATA] (state, data) {
    console.log('INIT DATA !!')
    console.log(data)
  }
}

export default {
  state,
  mutations
}
