<template>
  <div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
        <div class="wysiwyg">
        <h1>Caso #{{sernr}}</h1>
        <div class='table-responsive'>
          <table>
            <tbody>
              <tr>
                <td style="width:50%">
                <p><strong>Cliente:</strong> {{client}}</p>
                </td>
                <td>
                <p><strong>Tipo de Caso:</strong> {{type}}</p>
                </td
              </tr>
              <tr>
                <td style="width:50%">
                <p><strong>Tema:</strong> {{subject}}</p>
                </td>
                <td>
                <p><strong>Titulo:</strong> {{problemdesc}}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>




        <p></p>
        <textarea v-model="comment" class="textarea" placeholder="Explica en que te podemos ayudar"></textarea>
        <button class="button is-primary" v-on:click="onclickfn()" :disabled="disablebutton == 1 ? true : false">Enviar</button>
        </div>
          <div class='table-responsive'>
          <table class='table'>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Descripcion</th>
                <th>Asignado</th>
              </tr>
            </thead>

            <tbody>
            <tr v-for='item in this.caserow'>
                <td>{{item.User}}</td>
                <td>{{item.NiceDate}}</td>
                <td>{{item.Comment}}</td>
                <td>{{item.Asignee}}</td>

              </tr>
            </tbody>
          </table>
          </div>

        </article>

      </div>
    </div>

  </div>
</template>

<style lang='scss'>
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
<script>
import store from './../../store'
var { state } = store
import { REFRESH_CASE } from 'vuex-store/mutation-types'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}
export default {
  components: {
    Notification
  },
  data () {
    return {
      disable: 0,
      comment: ''
    }
  },
  computed: {
    disablebutton () {
      return this.disable
    },
    sernr () {
      return state.app.case.sernr
    },
    client () {
      return state.app.case.client
    },
    type () {
      return state.app.case.type
    },
    subject () {
      return state.app.case.subject
    },
    problemdesc () {
      return state.app.case.problemdesc
    },
    caserow () {
      return state.app.case.caserow
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    onclickfn () {
      this.disable = 1
      if (!this.comment) {
        openNotification({
          message: 'Debe ingresar texto.',
          type: 'warning',
          duration: 4500
        })
        this.disable = 0
        return false
      }
      this.$http({
        url: '/intranet/api/savecomment/' + this.$route.params.id + '/',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          comment: this.comment
        }
      }).then((response) => {
        this.disable = 0
        this.loadData()
      }).catch((error) => {
        this.disable = 0
        console.log(error)
      })
    },
    loadData () {
      console.log(this.$route.params)
      this.$http({
        url: '/intranet/api/getcase/' + this.$route.params.id + '/',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
        }
      }).then((response) => {
        store.commit(REFRESH_CASE, response)
        this.comment = ''
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
