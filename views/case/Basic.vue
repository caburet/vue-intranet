<template>
  <div>
    <div class='tile is-ancestor'>
      <div class='tile is-parent'>
        <article class='tile is-child box'>
        <div class="wysiwyg">
        <h1>Caso #45205</h1>
        {{ $route.params.id }}
        <p><strong>Cliente:</strong> Open Technologies SA</p>
        <p><strong>Tipo de Caso:</strong> Desarrollo</p>
        <p><strong>Tema:</strong> Mejoras de Producto</p>
        <p><strong>Titulo:</strong> Requerimiento</p>
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

export default {
  components: {
    Chart
  },
  data () {
    return {
      caserow: [
        { User: 'WEBSERVER',
          Date: '30/03/2017',
          Comment: 'Facturas de Venta: Propongo como opción de mejora que las FC de ventas una vez validadas en el afip, el campo con el CAI quede gravado y visible en la solapa de lega debajo o al costado del numero legal.-',
          Asignee: 'RMY'
        },
        { User: 'YR',
          Date: '31/03/2017',
          Comment: 'Me parece práctico, por favor desarrollarlo en ar.repo y ar para que esté disponible para los clientes de V16 en adelante. Saludos',
          Asignee: 'HR'
        },
        { User: 'HR',
          Date: '31/03/2017',
          Comment: 'Asigno. Desarrollar para ar (develop)',
          Asignee: 'JCOR'
        }

      ]
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
  }

}
</script>
