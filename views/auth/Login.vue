<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Login</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form method="post" action="/oo/api/personLogin">
          <label class="label">Usuario</label>
          <p class="control">
            <input name="username" class="input" type="text" placeholder="email@example.org">
          </p>
          <label class="label">Password</label>
          <p class="control">
            <input name="password" class="input" type="password" placeholder="password">
          </p>
          <p class="control" style="display:none">
            <input v-model="redirect_on_success" name="redirect_on_success" class="input" type="text" value="dashboard">
          </p>
          <p class="control" style="display:none">
            <input name="mode" class="input" type="text" value="person">
          </p>
        <hr>
          <p class="control">
            <button type="submit" class="button is-primary">Login</button>
            <button class="button is-default">Cancel</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from './../../router'
export default {

  data () {
    return {
      redirect_on_success: router.resolve('dashboard').href
    }
  },
  mounted () {
    let url = router.resolve('dashboard')
    console.log(url)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
