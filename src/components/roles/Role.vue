<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Roles</h1>
      <ol class="breadcrumb">
        <li class="active">
          <router-link to="/">
            <i class="fa fa-dashboard"></i> Dashboard
          </router-link>
        </li>
        <li class="active">Roles</li>
      </ol>
    </section>

    <section class="content">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Users</h3>
              <div class="row">
                <div class="col-md-4">
                  <input
                    type="text"
                    name="search"
                    class="form-control"
                    id="data-table-search"
                    v-model="search"
                  />
                </div>

                <div class="col-md-4">
                  <button class="btn btn-primary" type="submit" id="search">
                    <i class="fa fa-search"></i> search
                  </button>
                  <router-link
                    custom
                    to="/roles/create"
                    v-slot="{ href, navigate }"
                  >
                    <a :href="href" @click="navigate" class="btn btn-primary"
                      ><i class="fa fa-plus"></i> Add</a
                    >
                  </router-link>
                </div>
              </div>
            </div>

            <div class="box-body">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">discription</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(role, index) in filterList" :key="index">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>
                    <td>
                      <button
                        class="btn btn-warning btn-sm"
                        @click="EditRole(role.id)"
                      >
                        edit
                      </button>
                      &nbsp;
                      <button
                        class="btn btn-danger btn-sm"
                        @click="DeleteRole(role)"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["allRoles"]),
    filterList() {
      return this.allRoles.filter((role) => {
        return (
          role.name.toLowerCase().includes(this.search.toLowerCase()) ||
          role.description.toLowerCase().includes(this.search.toLowerCase())
        ); //search is the name of the input field
      });
    },
  },
  methods: {
    EditRole(id) {
      this.$router.push(`/roles/${id}/edit`);
    },
    DeleteRole(role) {
      this.$store.dispatch("deleteRole", role);
    },
  },
  mounted() {
    this.$store.dispatch("allRoles");

    console.log(this.allRoles);
  },
};
</script>

<style></style>
