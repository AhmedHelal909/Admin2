<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Simple Tables
        <small>preview of simple tables</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li><a href="#">Tables</a></li>
        <li class="active">Simple</li>
      </ol>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      search: "",
    };
  },
  mounted() {
    console.log(this.$router.options);
    this.$store
      .dispatch(`allUsers`)
      .then(() => {
        this.users = this.$store.getters.allUsers.users;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.thead-dark {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
}
button.btn-primary {
  margin-right: 3px !important;
}
</style>
