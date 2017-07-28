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

<script>
import Vue from 'vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import store from './../../store'
Vue.use(ClientTable, {
  perPage: 25
})
const { state } = store
export default {
  components: {
  },
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
      } else {
        return state.app.caseslist.caseslist
      }
    }
  }
}
</script>



computed: {
personname () {
return state.app.personname
},
opencase () {
return state.app.dash.opencase
},
caseslist () {
return state.app.caseslist.caseslist.filter(function(x){return state.app.clientstate.split(",").indexOf(x.State) >= 0})
},
clientcase () {
return state.app.dash.clientcase
}
}
