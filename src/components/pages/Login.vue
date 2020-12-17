<template>
  <div class="container">
    <Alert />
    <form
      class="card  box mx-auto"
      @submit.prevent="signin"
    >
      <h1>Login</h1>
      <p class="text-muted">
        Please enter your login and password!
      </p>
      <input
        v-model="user.username"
        type="text"
        name="username"
        placeholder="Username"
      >
      <input
        v-model="user.password"
        type="password"
        name="password"
        placeholder="Password"
      >
      <a
        class="forgot text-muted"
        href="#"
      >Forgot password?
      </a>
      <input
        type="submit"
        name=""
        value="Login"
        href="#"
      >
    </form>
  </div>
</template>

<script>
import Alert from '../AlertMessage'
export default {
  name: 'Login',
  components: {
    Alert
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }

    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_API}/admin/signin`
      const vm = this
      this.$http.post(api, vm.user).then(response => {
        if (response.data.success) {
          vm.$router.push('/admin/products')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }

  }
}
</script>

<style scoped>
.box {
    width: 500px;
    padding: 40px;
    background: #191919;
    text-align: center;
    transition: 0.25s;
    margin-top: 100px
}

.box input[type="text"],
.box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
    width: 300px;
    border-color: #2ecc71
}

.box input[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.box input[type="submit"]:hover {
    background: #2ecc71
}

.forgot {
    text-decoration: underline
}

</style>
