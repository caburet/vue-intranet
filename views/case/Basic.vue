<template>
  <div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
        <div class="wysiwyg">
        <h1>Caso #{{sernr}}</h1>
        <p><strong>Cliente:</strong> {{client}}</p>
        <p><strong>Tipo de Caso:</strong> {{type}}</p>
        <p><strong>Tema:</strong> {{subject}}</p>
        <p><strong>Titulo:</strong> {{problemdesc}}</p>
        <p></p>
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
                <td>{{item.Date}}</td>
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
import Chart from 'vue-bulma-chartjs'
import store from './../../store'
var { state } = store
import { REFRESH_CASE } from 'vuex-store/mutation-types'
export default {
  components: {
    Chart
  },
  data () {
    return {
    }
  },
  computed: {
    sernr () {
        return state.app.case.sernr;
    },
    client () {
        return state.app.case.client;
    },
    type () {
        return state.app.case.type;
    },
    subject () {
        return state.app.case.subject;
    },
    problemdesc () {
        return state.app.case.problemdesc;
    },
    caserow () {
        return state.app.case.caserow;
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
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
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
