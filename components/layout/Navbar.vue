<template>
  <section class="app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="">
      <nav class="nav">
        <div class="nav-burger">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!sidebar.opened)">
            <i class="icon fa fa-bars" aria-hidden="true"></i>
          </a>
        </div>
        <div class="nav-brand">
          <a class="nav-item" href="http://www.openorange.com">
            <div class="is-hidden-mobile">
              <span class="oo-logo">öppen</span>
            </div>
          </a>
        </div>
        <div class="nav-right is-flex">
          <router-link v-if="!personname" to="/login" class="nav-item">Login</router-link>
          <a v-if="personname" @click="logout" class="nav-item">{{personname}}</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import { mapGetters, mapActions } from 'vuex'

export default {

  components: {
    Tooltip
  },

  props: {
    show: Boolean
  },

  computed: mapGetters({
    pkginfo: 'pkg',
    sidebar: 'sidebar',
    personname: 'personname'
  }),

  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),
    logout () {
      this.$auth.logout({
        redirect: 'Home',
        makeRequest: false
        // params: {},
        // success: function () {},
        // error: function () {},
        // etc...
      })
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .nav {
    background: #293a56;
  }

  .container {
    margin: auto 10px;
  }

  .oo-logo {
    color: #d85c81;
    font-size: 24px;
    line-height: 35px;
    margin: 0;
  }

  .nav-item {
    color: #eee;
    font-size: 1.1rem;
    &.is-active,
    &:hover {
      color: #ccc;
    }
    .icon {
      font-size: 2rem;
      margin-top: 3px;
    }
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
