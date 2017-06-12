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
              <button class="button is-primary" v-on:click="onclickfn()">Enviar</button>
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
      tittle: '',
      who: '',
      type: '',
      comment: ''
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
        url: '/intranet/api/savecase',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          parameters: {
            title: this.tittle,
            who: this.who,
            type: this.type,
            comment: this.comment
          }
        }
      }).then((response) => {
        this.tittle = ''
        this.who = ''
        this.type = ''
        this.comment = ''
        // alert("Se ha creado el caso.")
        this.$router.push('/dasboard')
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
