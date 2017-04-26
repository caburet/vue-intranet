<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">

        <article class="tile is-child box">
        <router-link to="/cases/basic">
          <p class="title">Abiertos</p>
          <p class="subtitle">{{this.opencase}}</p>
          </router-link>
        </article>

      </div>
      <div class="tile is-parent">
        <article class="tile is-child box ">
        <router-link to="/cases/basic">
          <p class="title">Atencion</p>
          <p class="subtitle">{{this.clientcase}}</p>
          </router-link>
        </article>
      </div>
    </div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
          <h4 class='title'>Casos que necesitan atencion</h4>
          <div class='table-responsive'>
          <table class='table'>
            <thead>
              <tr>
                <th>Nro</th>
                <th>Tipo</th>
                <th>Asignado</th>
                <th>Problema</th>
                <th>Resumen</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th>Nro</th>
              <th>Tipo</th>
              <th>Asignado</th>
              <th>Problema</th>
              <th>Resumen</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Hora</th>
              </tr>
            </tfoot>
            <tbody>
            <tr v-for='item in this.caseslist' v-on:click="loadData()">

                <td>{{item.SerNr}}</td>
                <td>{{item.CaseTypeComment}}</td>
                <td>{{item.Asignee}}</td>
                <td>{{item.ProblemDesc}}</td>
                <td>{{item.CaseComment}}</td>
                <td>{{item.StatusName}}</td>
                <td>{{item.TransDate}}</td>
                <td>{{item.TransTime}}</td>

              </tr>
            </tbody>
          </table>
          </div>
        </article>
      </div>
    </div>



  </div>
</template>

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
      caseslist: state.app.dash.dashcaseslist,
      data: [300, 50, 100],
      opencase: state.app.dash.opencase,
      clientcase: state.app.dash.clientcase
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          data: this.data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }
    }
  },
  stated: {},
  methods: {
    onclickfn (index) {
      this.$router.push('/cases/basic')
    },
    loadData () {
      this.$http({
        url: 'http://httpbin.org/ip',
        transformResponse: [(data) => {
          return data
        }],
        params: {
          parameters: {
            Normalized: false,
            NumberOfDays: false,
            DataPeriod: false,
            Elements: [false]
          }
        }
      }).then((response) => {
        let dates = response.data.Dates
        let price = response.data.Elements[0].DataSeries.close.values
        this.data.push(...price)
        this.labels.push(...dates)
        this.isloading = false
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
