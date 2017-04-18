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
              <th>Hora</th>
              </tr>
            </tfoot>
            <tbody>
            <tr v-for='item in this.caseslist'>
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
      caseslist: state.app.caseslist.caseslist
    }
  }

}
</script>
