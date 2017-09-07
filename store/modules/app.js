import * as types from '../mutation-types'

const state = {
  casestypes:{},
  caseslist: {
    caseslist: [
    ]
  },
  dash: {
    dashcaseslist: [
    ],
    opencase: 0,
    clientcase: 0
  },
  case: {
    sernr: '',
    client: '',
    type: '',
    subject: '',
    problemdesc: '',
    state: '',
    caserow: [
    ]
  },
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: true
  },
  effect: {
    translate3d: true
  },
  personname: ''
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
        State: data.State,
        CaseComment: data.CaseComment,
        StatusName: data.StatusName,
        TransDate: data.TransDate,
        TransTime: data.SeTransTimerNr
      }

    )
    state.case.client = data.tittle
  },
  [types.INIT_DATA] (state, data) {
    console.log(data);



    state.personname = data.personname
    if (!data.personname){
      state.sidebar.hidden = true
    }
    else {
      state.sidebar.hidden = false
    }
    state.casestypes = data.casestypes
    data = data.data
    state.dash.opencase = data.length
    console.log(state.dash.opencase)
    var casedata = ''
    for (casedata in data) {
      // console.log(data[casedata])
      var CaseComment = data[casedata].CaseComment
      if (CaseComment) {
        if (CaseComment.length > 40) {
          CaseComment = CaseComment.substring(0, 40) + '...'
        }
      }
      if ( data[casedata].State == 'CLIENTE') {
        state.dash.dashcaseslist.push(
          { SerNr: data[casedata].SerNr,
            CaseTypeComment: data[casedata].CaseTypeComment,
            Asignee: data[casedata].Asignee,
            ProblemDesc: data[casedata].ProblemDesc,
            State: data[casedata].State,
            CaseComment: CaseComment,
            StatusName: data[casedata].StatusName,
            TransDate: data[casedata].TransDate.split('T')[0],
            TransTime: data[casedata].TransTime
          })
        state.dash.clientcase += 1
      }
      state.caseslist.caseslist.push(
        { SerNr: data[casedata].SerNr,
          CaseTypeComment: data[casedata].CaseTypeComment,
          Asignee: data[casedata].Asignee,
          ProblemDesc: data[casedata].ProblemDesc,
          State: data[casedata].State,
          CaseComment: CaseComment,
          StatusName: data[casedata].StatusName,
          TransDate: data[casedata].TransDate.split('T')[0],
          TransTime: data[casedata].TransTime
        })
      console.log(state.dash.clientcase)
    }
    console.log('INIT DATA !!')
    console.log(data)
  },
  [types.REFRESH_CASE] (state, casedata) {
    console.log('adentro del refreshcase')
    console.log(JSON.parse(casedata.data.case))
    let casedataparse = JSON.parse(casedata.data.case)
    console.log(casedataparse)
    state.case.sernr = casedataparse.fields.SerNr
    state.case.client = casedataparse.fields.CustName
    state.case.type = casedataparse.fields.Type
    state.case.subject = casedataparse.fields.Subject
    state.case.problemdesc = casedataparse.fields.ProblemDesc
    state.case.state = casedataparse.fields.State
    state.case.caserow = []
    for (let r in casedata.data.records) {
      state.case.caserow.push(JSON.parse(casedata.data.records[r]))
    }
    console.log(state.case)
  }
}

export default {
  state,
  mutations
}
