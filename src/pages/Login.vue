<template>
  <card class="card" title="Login">
    <div>
      <form @submit.prevent class="p-4">
        <div class="row">
          <div class="col">
            <fg-input
              type="text"
              label="Username"
              placeholder="Username"
              v-model="username"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <fg-input
              type="password"
              label="Password"
              placeholder="Password"
              v-model="password"
            >
            </fg-input>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="login">
            Login
          </p-button>
          <p-button type="info" round @click.native.prevent="back">
            Back
          </p-button>
        </div>
      </form>
    </div>
  </card>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios.post('https://bruharmy.sdc.cpp:8080/account/login', 
          { 
            username: this.username, 
            password: this.password 
          }
        ).then((response) => {
          console.log(response)
          localStorage.setItem('jwtToken', response.data.message);
          this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        console.log(error)
        this.$notify(
          {
            message: error.response.data.message,
            type: 'danger',
            horizontalAlign: 'center',
            verticalAlign: 'bottom'
          })
      });
    },
    back() {
      this.$router.push({ name: 'home' })
    },
  }
};
</script>
