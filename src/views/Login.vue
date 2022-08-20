<template>
  <LoginForm />
</template>

<script>
import LoginForm from "@/components/login/LoginForm.vue";
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style>
body {
  background-color: #d2d6de;
}
</style>
