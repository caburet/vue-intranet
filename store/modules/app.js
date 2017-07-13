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
    caserow: [
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
  },
  personname: '',
  clientstate: ''
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

    state.case.client = data.tittle
  },
  [types.INIT_DATA] (state, data) {
    console.log(data);


    state.clientstate = data.clientstate
    state.personname = data.personname
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
      state.caseslist.caseslist.push(
        { SerNr: data[casedata].SerNr,
          CaseTypeComment: data[casedata].CaseTypeComment,
          Asignee: data[casedata].Asignee,
          ProblemDesc: data[casedata].ProblemDesc,
          CaseComment: CaseComment,
          StatusName: data[casedata].StatusName,
          TransDate: data[casedata].TransDate.split('T')[0],
          TransTime: data[casedata].TransTime,
          State:data[casedata].State
        })

      //
    }
    state.dash.clientcase=0
    for (let eachstate in state.clientstate.split(",")){
       state.dash.clientcase += state.caseslist.caseslist.filter(function(x){return x.State===state.clientstate.split(",")[eachstate]}).length
    }
    console.log('INIT DATA !!')
  },
  [types.REFRESH_CASE] (state, casedata) {
    let casedataparse = JSON.parse(casedata.data.case)
    state.case.sernr = casedataparse.fields.SerNr
    state.case.client = casedataparse.fields.CustName
    state.case.type = casedataparse.fields.Type
    state.case.subject = casedataparse.fields.Subject
    state.case.problemdesc = casedataparse.fields.ProblemDesc
    state.case.caserow = []
    for (let r in casedata.data.records) {
      state.case.caserow.push(JSON.parse(casedata.data.records[r]))
    }
  }
}

export default {
  state,
  mutations
}
