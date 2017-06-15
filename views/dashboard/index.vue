<template>
  <div>
    <div class="tile is-ancestor"  v-if="personname===''">
    No estas logeado
    </div>
    <div class="tile is-ancestor"  v-else>
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
        <router-link to="/cases/basic?client=true">
          <p class="title">Atencion</p>
          <p class="subtitle">{{this.clientcase}}</p>
          </router-link>
        </article>
      </div>
    </div>
    <div class='tile is-ancestor' v-if="this.caseslist.length>0">
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
            <tr v-for='item in this.caseslist'>

                <td>  <router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.SerNr}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.CaseTypeComment}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.Asignee}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.ProblemDesc}}</router-link></td>
                <td><router-link :to="{ path : '/case/basic/' + item.SerNr}">{{item.CaseComment}}</router-link></td>
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

<script>
import store from './../../store'
const { state } = store
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    personname () {
      return state.app.personname
    },
    opencase () {
      return state.app.dash.opencase
    },
    caseslist () {
      return state.app.dash.dashcaseslist
    },
    clientcase () {
      return state.app.dash.clientcase
    }
  },
  stated: {},
  methods: {
    clickcase (index) {
      console.log('VAAAA')
      let a = 123
      let url = 'cases/basic/' + a
      console.log(url)
      this.$router.push('/cases/basic/1234')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
