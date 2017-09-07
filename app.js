import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR, INIT_DATA } from 'vuex-store/mutation-types'
Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      // Get Token from response body
      return res.data
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  refreshData: { enabled: false }
})
Vue.use(NProgress)
// Enable devtools
Vue.config.devtools = true
sync(store, router)
const { state } = store
router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const app = new Vue({
  router,
  store,
  created () {
    this.$nextTick(function () {
       // initialize store data structure by submitting action.
      this.$http({
        url: '/intranet/api/datafetch',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          parameters: {
            Normalized: false,
            NumberOfDays: false,
            DataPeriod: false,
            Elements: []
          }
        }
      }).then((response) => {
        var arrayLength = response.data.records.length
        var data = []
        for (var i = 0; i < arrayLength; i++) {
          let obj = JSON.parse(response.data.records[i])
          let dic = {}
          dic.SerNr = obj.SerNr
          dic.CaseTypeComment = obj.CaseTypeComment
          dic.Asignee = obj.Asignee
          dic.ProblemDesc = obj.ProblemDesc
          dic.State = obj.State
          dic.CaseComment = obj.CaseComment
          dic.StatusName = obj.StatusName
          dic.TransDate = obj.TransDate
          dic.TransTime = obj.TransTime
          data.push(dic)
        }
        store.commit(INIT_DATA, {data: data, casestypes: response.data.casetype, personname: response.data.personname})
      }).catch((error) => {
        this.$router.push('/login')
      })
    })
  },
  ...App

})

export { app, router, store }
