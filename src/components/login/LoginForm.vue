<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>Admin</b>LTE</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form @click.prevent>
        <div class="form-group has-feedback">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
          />
          <span
            class="glyphicon glyphicon-envelope form-control-feedback"
          ></span>
          <span class="error-feedback" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <span class="error-feedback" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <button
              type="submit"
              class="btn btn-primary btn-block btn-flat"
              @click="signIn()"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "LoginForm",
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
      error: "",
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  props: ["exist"],
  methods: {
    signIn() {
      this.v$.$validate();
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.error = "Invalid email or password";
        });
    },
  },
};
</script>

<style></style>
