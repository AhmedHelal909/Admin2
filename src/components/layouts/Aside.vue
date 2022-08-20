<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img
            src="/adminlte/dist/img/user2-160x160.jpg"
            class="img-circle"
            alt="User Image"
          />
        </div>
        <div class="pull-left info">
          <p>{{ get_user.name }}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input
            type="text"
            name="q"
            class="form-control"
            placeholder="Search..."
          />
          <span class="input-group-btn">
            <button
              type="submit"
              name="search"
              id="search-btn"
              class="btn btn-flat"
            >
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>

      <ul class="sidebar-menu" data-widget="tree">
        <router-link to="/" v-slot="{ isActive, href, navigate }" custom>
          <li
            :class="[isActive && 'active', !isActive && '']"
            :active="isActive"
          >
            <a class="nav-link" :href="href" @click="navigate">
              <i class="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>
        </router-link>
        <router-link to="/users" v-slot="{ href, navigate }" custom>
          <li
            :class="[
              this.$route.path == '/AddUser' ? 'active' : '',
              this.$route.path == '/users' ? 'active' : '',
              this.$route.path.match(/\/users\/\d+/) ? 'active' : '',
            ]"
          >
            <a class="nav-link" :href="href" @click="navigate">
              <i class="fa fa-users"></i>
              <span>Users</span>
            </a>
          </li>
        </router-link>
        <router-link to="/roles" v-slot="{ href, navigate }" custom>
          <li
            :class="[
              this.$route.path == '/roles/create' ? 'active' : '',
              this.$route.path == '/roles' ? 'active' : '',
              this.$route.path.match(/\/roles\/\d+/) ? 'active' : '',
            ]"
          >
            <a class="nav-link" :href="href" @click="navigate">
              <i class="fa fa-hourglass-half"></i>
              <span>roles</span>
            </a>
          </li>
        </router-link>
        <router-link to="/posts" v-slot="{ href, navigate }" custom>
          <li
            :class="[
              this.$route.path == '/posts/create' ? 'active' : '',
              this.$route.path == '/posts' ? 'active' : '',
              this.$route.path.match(/\/posts\/\d+/) ? 'active' : '',
            ]"
          >
            <a class="nav-link" :href="href" @click="navigate">
              <i class="fa fa-hourglass-half"></i>
              <span>posts</span>
            </a>
          </li>
        </router-link>
      </ul>
    </section>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Aside",
  computed: {
    ...mapGetters(["get_user"]),
  },
};
</script>

<style></style>
