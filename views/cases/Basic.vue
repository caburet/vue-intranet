<template>
  <div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
          <h4 class='title'>Table</h4>
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
              <th>Hora{{client}}</th>
              </tr>
            </tfoot>
            <tbody>
            <tr v-for='item in this.caseslist' >
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.SerNr}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.CaseTypeComment}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.Asignee}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.ProblemDesc}}</router-link></td>
                <td width="30%"><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.CaseComment}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.StatusName}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.TransDate}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.TransTime}}</router-link></td>
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
  props: ['client'],
  data () {
    return {
    }
  },
  computed: {
    caseslist () {
      if (this.client) {
        return state.app.caseslist.caseslist.filter(function (row) { return row.Asignee === 'CLIENTE' })
      } else {
        return state.app.caseslist.caseslist
      }
    }
  }
}
</script>
