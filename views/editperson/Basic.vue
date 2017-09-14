<template>
  <div>
    <div class="tile is-ancestor"  v-if="personname===''">
    No estas logeado
    </div>
    <div class="tile is-ancestor"  v-else>
    <div class='tile is-parent'>
      <article class='tile is-child box'>
        <h1 class='title'>Cambiar Constraseña</h1>
        <div class='block'>
          <div class='control is-horizontal'>
            <div class='control-label'>
              <label class='label'>Actual Contraseña</label>
            </div>
            <div class='control is-grouped'>
              <p class='control is-expanded'>
                <input class='input' type='password' v-model='actualpassword' >
              </p>
            </div>
          </div>
          <div class='control is-horizontal'>
            <div class='control-label'>
              <label class='label'>Nueva Contraseña</label>
            </div>
            <div class='control is-grouped'>
              <p class='control is-expanded'>
                <input class='input' type='password' v-model='password' >
              </p>
            </div>
          </div>
          <div class='control is-horizontal'>
            <div class='control-label'>
              <label class='label'>Repetir Contraseña</label>
            </div>
            <div class='control is-grouped'>
              <p class='control is-expanded'>
                <input class='input' type='password' v-model='password2'  >
              </p>
            </div>
          </div>
          <div class='control is-horizontal'>
            <div class='control-label'>
              <label class='label'></label>
            </div>

            <div class='control'>
              <button class='button is-primary' v-on:click='onclickfn()'>Salvar</button>
              <button class='button is-link' v-on:click='onclickcan()'>Cancel</button>
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
var $ = window.jQuery = require('jquery');
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
      actualpassword: '',
      password: '',
      password2: ''
    }
  },
  stated: {},
  computed: {
    personname () {
      return state.app.personname
    },
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
      if (!this.password || !this.password2 ) {
        openNotification({
          message: 'Debe completar todos los campos.',
          type: 'warning',
          duration: 4500
        })
        this.disable = 0
        return false
      }
      if (this.password != this.password2 ) {
        openNotification({
          message: 'Los password no coinciden.',
          type: 'warning',
          duration: 4500
        })
        this.disable = 0
        return false
      }
      this.$http({
        url: '/intranet/api/savepassword',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          parameters: {
            password: this.password,
            actualpassword : this.actualpassword
          }
        }
      }).then((response) => {
        openNotification({
          message: 'Se ha cambiado el password correctamente.',
          type: 'success',
          duration: 4500
        })
        this.password = ''
        this.password2 = ''
        this.actualpassword = ''
        return false
      }).catch((error) => {
        openNotification({
          message: 'Ha ocurrido un error.',
          type: 'danger',
          duration: 4500
        })
        console.log(error)
      })
    }
  }
}
</script>
<style lang='scss'>
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
