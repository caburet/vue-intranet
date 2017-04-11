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
{{stated}}
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
            <tr v-for='item in this.caseslist' v-on:click="onclickfn(1)">

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

export default {
  components: {
    Chart
  },
  data () {
    return {
      caseslist: [
        { SerNr: '45210',
          CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
          Asignee: 'AC',
          ProblemDesc: 'Margen de Error',
          CaseComment: 'None',
          StatusName: 'Caso Asignado a Programacion',
          TransDate: '31/03/2017',
          TransTime: '11:21:04'
        },
        { SerNr: '45210',
          CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
          Asignee: 'AC',
          ProblemDesc: 'Margen de Error',
          CaseComment: 'None',
          StatusName: 'Caso Asignado a Programacion',
          TransDate: '31/03/2017',
          TransTime: '11:21:04'
        },
        { SerNr: '45210',
          CaseTypeComment: 'Producto / Funcionalidades Nuevas / Oppen 2',
          Asignee: 'AC',
          ProblemDesc: 'Margen de Error',
          CaseComment: 'None',
          StatusName: 'Caso Asignado a Programacion',
          TransDate: '31/03/2017',
          TransTime: '11:21:04'
        }

      ],
      data: [300, 50, 100],
      opencase: '10',
      clientcase: '5'
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
    }
  },
  mounted () {
    setInterval(() => {
      // https://github.com/vuejs/vue/issues/2873
      // Array.prototype.$set/$remove deprecated (use Vue.set or Array.prototype.splice instead)
      this.data.forEach((item, i) => {
        this.data.splice(i, 1, Math.ceil(Math.random() * 1000))
      })
    }, 10240)
  }
}
</script>

<style lang="scss" scoped>
</style>
