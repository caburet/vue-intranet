<template>
  <div>
    <div class="tile is-ancestor"  v-if="personname===''">
    No estas logeado
    </div>
    <div class="tile is-ancestor"  v-if="personname!=''">
      <div class="tile is-parent">

        <article class="tile is-child box">
        <router-link to="/cases/basic">
          <p class="title">Abiertos</p>
          <p class="subtitle">{{this.opencases}}</p>
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
    <div class="tile is-ancestor"  v-if="personname!=''">
      <div class="tile is-parent">

        <article class="tile is-child box">
          <p class="title" v-html="firstnew.title">
          </p>
          <div class="content">
            <p v-html="firstnew.text">
            </p>
          </div>
        </article>

      </div>
    </div>
    <div class='tile is-ancestor' v-if="this.caseslist.length>0">
      <div class='tile is-parent'>
        <article class='tile is-child box'>
          <h4 class='title'>Casos que necesitan atencion</h4>
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
      firstnew () {
        return state.app.news[0]
      },
      caseslist () {
	       if (state.app.clientstate){
            return state.app.caseslist.caseslist.filter(function(x){return state.app.clientstate.split(",").indexOf(x.State) >= 0})
           }
          else {
            let clientstate = 'CLIENTE'
            return state.app.caseslist.caseslist.filter(function(x){return clientstate.split(",").indexOf(x.State) >= 0})
	         }
      },
      clientcase () {
        return this.caseslist.length
      },
      opencases () {
        return state.app.dash.opencase
      },
    }
}
</script>
