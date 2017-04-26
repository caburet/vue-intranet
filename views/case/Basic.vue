<template>
  <div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
        <div class="wysiwyg">
        <h1>Caso #45205</h1>
        {{ $route.params.id }}
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
const { state } = store
export default {
  components: {
    Chart
  },
  data () {
    return {
      caserow: state.app.case.caserow,
      client: state.app.case.client,
      type: state.app.case.type,
      subject: state.app.case.subject,
      problemdesc: state.app.case.problemdesc
    }
  },
  methods: {
    loadData () {
      this.$http({
        url: 'localhost:8080/intranet/cases',
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
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
