<template>
  <div>
    <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Formulario Para la Creacion de Casos</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Titulo</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="tittle" placeholder="Titulo">
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" v-model="who"  placeholder="¿Quien lo Solicita?">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Tipo de Caso</label>
            </div>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="type" >
                 <option v-for="casetype in casestypes" :value="casetype.Code">{{ casetype.Comment }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Descripción</label>
            </div>
            <div class="control">
              <textarea v-model="comment" class="textarea" placeholder="Comente aquí su consulta."></textarea>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary" v-on:click="onclickfn()" :disabled="disablebutton == 1 ? true : false">Enviar</button>
              <button class="button is-link" v-on:click="onclickcan()">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from './../../store'
const { state } = store
import { INIT_DATA } from 'vuex-store/mutation-types'
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
      tittle: '',
      who: '',
      type: '',
      comment: '',
      disable: 0
    }
  },
  stated: {},
  computed: {
    disablebutton () {
      return this.disable
    },
    casestypes () {
      return state.app.casestypes
    }
  },
  methods: {
    ...mapActions([
      'addCase'
    ]),
    onclickcan () {
      this.$router.push('/cases/basic')
    },
    onclickfn () {
      this.disable = 1
      if (!this.tittle || !this.who || !this.type || !this.comment) {
        openNotification({
          message: 'Debe completar todos los campos.',
          type: 'warning',
          duration: 4500
        })
        this.disable = 0
        return false
      }
      this.$http({
        url: '/intranet/api/savecase',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          parameters: {
            title: this.tittle,
            who: this.who,
            type: this.type,
            comment: this.comment
          }
        }
      }).then((response) => {
        this.disable = 0
        this.tittle = ''
        this.who = ''
        this.type = ''
        this.comment = ''
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
            dic.CaseComment = obj.CaseComment
            dic.StatusName = obj.StatusName
            dic.TransDate = obj.TransDate
            dic.TransTime = obj.TransTime
            data.push(dic)
          }
          store.commit(INIT_DATA, {data: data, casestypes: response.data.casetype, personname: response.data.personname})
          openNotification({
            message: 'Se ha creado el caso.',
            type: 'success',
            duration: 4500
          })
        }).catch((error) => {
          openNotification({
            message: 'Ha ocurrido un error.',
            type: 'danger',
            duration: 4500
          })
          console.log(error)
        })
        this.$router.push('/cases/basic/')
        // alert('Se ha creado el caso.') // eslint-disable-line no-alert
      }).catch((error) => {
        openNotification({
          message: 'Ha ocurrido un error.',
          type: 'danger',
          duration: 4500
        })
        // alert(error) // eslint-disable-line no-alert
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
