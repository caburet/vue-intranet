<template>
  <div>
    <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Formulario Para la Creacion de Casos</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Titulo</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="tittle" placeholder="Titulo">
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" v-model="who"  placeholder="¿Quien lo Solicita?">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Tipo de Caso</label>
            </div>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="type" >
                  <option value="CONSULTORIA">Analítico</option>
                  <option value="SOPORTE">Básico</option>
                  <option value="DATOBOX">Datobox</option>
                  <option value="PROGRAMACION">Desarrollo</option>
                  <option value="WEB">Pendiente de Asignar</option>
                  <option value="PRODUCTO">Producto / Funcionalidades Nuevas / Oppen 2</option>
                </select>
              </div>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Descripción</label>
            </div>
            <div class="control">
              <textarea v-model="comment" class="textarea" placeholder="Explica en que te podemos ayudar"></textarea>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary" v-on:click="onclickfn()">Submit</button>
              <button class="button is-link" v-on:click="onclickcan()">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import { mapActions } from 'vuex'
export default {
  components: {
    Chart
  },
  data () {
    return {
    }
  },
  stated: {},
  methods: {
    ...mapActions([
      'addCase'
    ]),
    onclickfnbkp () {
      let dic = {}
      dic.tittle = this.tittle
      dic.who = this.who
      dic.tittle = this.tittle
      dic.type = this.type
      this.addCase(dic)
    },
    onclickcan () {
      this.$router.push('/cases/basic')
    },
    onclickfn () {
      this.$http({
        url: 'http://localhost:8080/intranet/api/datafetch',
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
        console.log(response.data)
        console.log(response.data.records)
        var arrayLength = response.data.records.length
        for (var i = 0; i < arrayLength; i++) {
          let obj = JSON.parse(response.data.records[i])
          console.log('####################################')
          console.log(obj)
          let dic = {}
          dic.SerNr = obj.SerNr
          dic.CaseTypeComment = obj.CaseTypeComment
          dic.Asignee = obj.Asignee
          dic.ProblemDesc = obj.ProblemDesc
          dic.CaseComment = obj.CaseComment
          dic.StatusName = obj.StatusName
          dic.TransDate = obj.TransDate
          dic.TransTime = obj.TransTime
          this.addCase(dic)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
