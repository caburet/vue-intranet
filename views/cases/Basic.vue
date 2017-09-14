<template>
  <div>
    <div class="tile is-ancestor"  v-if="personname===''">
    No estas logeado
    </div>
    <div class="tile is-ancestor"  v-else>
      <div class='tile is-parent'>
        <article class='tile is-child box'>

          <div class='table-responsive'>
            <v-client-table :data="caseslist" :columns="columns" :options="options" @row-click="opencase"></v-client-table>
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
import Vue from 'vue'
import store from './../../store'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
const { state } = store
Vue.use(ClientTable, {
  perPage: 25
})
export default {
  components: {  },
  props: ['client'],
  data () {
    return {
      itemsperpage: 20,
      paginate: ['cases'],
      columns: ['SerNr', 'CaseTypeComment', 'Asignee', 'ProblemDesc', 'CaseComment', 'StatusName', 'TransDate', 'TransTime'],
      options: {
        sortable: ['SerNr', 'CaseTypeComment', 'Asignee', 'ProblemDesc', 'CaseComment', 'StatusName', 'TransDate', 'TransTime'],
        headings: {
          SerNr: 'Nro',
          'CaseTypeComment': 'Tipo',
          'Asignee': 'Asignado',
          'ProblemDesc': 'Problema',
          'CaseComment': 'Resumen',
          'StatusName': 'Estado',
          'TransDate': 'Fecha',
          'TransTime': 'Hora'
        }
      }
    }
  },
  methods: {
    opencase(row) {
      this.$router.push('/case/basic/'+row.row.SerNr);
    }
  },
  computed: {
    personname () {
      return state.app.personname
    },
    caseslist () {
      if (this.client) {
        return state.app.caseslist.caseslist.filter(function(x){return state.app.clientstate.split(",").indexOf(x.State) >= 0})
        //return state.app.caseslist.caseslist.filter(function (row) { return row.State === 'CLIENTE' })
      } else {
        return state.app.caseslist.caseslist
      }
    }
  }
}
</script>
