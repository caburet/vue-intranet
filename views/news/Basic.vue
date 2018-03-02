<template>
  <div>
    <div class="tile is-ancestor"  v-if="personname===''">
    No estas logeado
    </div>
    <div class="tile is-ancestor"  v-else v-for="new1 in newslist">
      <div class='tile is-parent'>
        <article class='tile is-child box' >
          <p class="title" v-html="new1.title">
          </p>
          <div class="content">
            <p v-html="new1.text">
            </p>
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
export default {
  components: {  },
  props: [''],
  data () {
    return {

    }
  },
  methods: {
  },
  computed: {
    personname () {
      return state.app.personname
    },
    newslist () {
        return state.app.news
    }
  }
}
</script>
