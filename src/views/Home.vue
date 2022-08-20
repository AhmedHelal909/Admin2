<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Dashboard</h1>
      <!-- <ol class="breadcrumb">
          <li>
            <a href="#"><i class="fa fa-dashboard"></i> Home</a>
          </li>
          <li><a href="#">Examples</a></li>
          <li class="active">Blank page</li>
        </ol> -->
    </section>

    <section class="content">
      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-primary">
            <div class="inner">
              <h3>{{ allUsers.length }}</h3>
              <p>Users</p>
            </div>
            <div class="icon">
              <i class="fa fa-users"></i>
            </div>
            <router-link class="small-box-footer" to="/users">
              More info <i class="fa fa-arrow-circle-right"></i>
            </router-link>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{ allRoles.length }}</h3>
              <p>roles</p>
            </div>
            <div class="icon">
              <i class="fa fa-hourglass-half"></i>
            </div>
            <router-link class="small-box-footer" to="/roles">
              More info <i class="fa fa-arrow-circle-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style></style>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["allUsers", "allRoles"]),
  },
};
</script>
