import * as types from '../mutation-types'

const state = {
  caseslist: {
    caseslist: [
    ]
  },
  dash: {
    dashcaseslist: [
    ],
    opencase: '10',
    clientcase: '3'
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
    console.log(state.dash.clientcase)
    state.dash.clientcase = 0
    state.dash.opencase = data.length
    var casedata = ''
    for (casedata in data) {
      console.log(data[casedata])
      var CaseComment = data[casedata].CaseComment
      if (CaseComment) {
        if (CaseComment.length > 40) {
          CaseComment = CaseComment.substring(0, 40) + '...'
        }
      }
      if (casedata < 5) {
        state.dash.dashcaseslist.push(
          { SerNr: data[casedata].SerNr,
            CaseTypeComment: data[casedata].CaseTypeComment,
            Asignee: data[casedata].Asignee,
            ProblemDesc: data[casedata].ProblemDesc,
            CaseComment: CaseComment,
            StatusName: data[casedata].StatusName,
            TransDate: data[casedata].TransDate.split('T')[0],
            TransTime: data[casedata].TransTime
          })
      }
      state.caseslist.caseslist.push(
        { SerNr: data[casedata].SerNr,
          CaseTypeComment: data[casedata].CaseTypeComment,
          Asignee: data[casedata].Asignee,
          ProblemDesc: data[casedata].ProblemDesc,
          CaseComment: CaseComment,
          StatusName: data[casedata].StatusName,
          TransDate: data[casedata].TransDate.split('T')[0],
          TransTime: data[casedata].TransTime
        })
      if (data[casedata].Asignee === 'CLIENTE') {
        state.dash.clientcase += 1
      }
      console.log(state.dash.clientcase)
    }
    console.log('INIT DATA !!')
    console.log(data)
  },
  [types.REFRESH_CASE] (state, casedata) {
    console.log('adentro del refreshcase')
    console.log(JSON.parse(casedata.data.case))
    let casedataparse = JSON.parse(casedata.data.case)

    state.case.client = casedataparse.fields.CustName
    for (let r in casedata.data.records) {
      console.log(casedata.data.records[r])
    }
  }
}

export default {
  state,
  mutations
}
