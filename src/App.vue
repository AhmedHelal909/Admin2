<template>
  <div class="wrapper" v-if="isLogged">
    <Header />
    <router-view></router-view>
    <Footer />
    <Aside />
  </div>
  <router-view v-else />
</template>
<style></style>
<script>
import Header from "@/components/layouts/Header.vue";
import Aside from "@/components/layouts/Aside.vue";
import Footer from "@/components/layouts/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Aside,
    Footer,
  },
  computed: {
    isLogged() {
      return this.$store.getters.get_loggedIn;
    },
  },

};
</script>
