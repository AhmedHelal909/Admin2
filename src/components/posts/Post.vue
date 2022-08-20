<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Users</h1>

      <ol class="breadcrumb">
        <li class="active">
          <router-link to="/">
            <i class="fa fa-dashboard"></i> Dashboard
          </router-link>
        </li>
        <li class="active">Users</li>
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
                  <router-link custom to="AddUser" v-slot="{ href, navigate }">
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
                    <th scope="col">title</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(post, index) in filterList" :key="index">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ post.title }}</td>
                    <td>
                      <button
                        class="btn btn-warning btn-sm"
                        @click="EditUser(post.id)"
                      >
                        edit 
                      </button>
                      &nbsp;
                      <button
                        class="btn btn-danger btn-sm"
                        @click="alertDelete(post)"
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
import Noty from "noty";
export default {
  name: "User",
  data() {
    return {
      search: "",
    };
  },
  computed: {
   
    ...mapGetters(["allUsers", "hasRole","getPosts"]),
    filterList() {
      return this.getPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(this.search.toLowerCase()) 
        ); //search is the name of the input field
      });
    },
  },
  mounted() {
    this.$store.dispatch("getPosts");
    
  },
  methods: {
    EditUser(id) {
      this.$router.push(`/users/${id}/edit`);
    },

    DeletePost(post) {
      this.$store.dispatch("deletePost", post);
    },
    alertDelete(post) {
      var that = this;
      var n = new Noty({
        text: "Are your sure you want to delete?",
        type: "warning",
        killer: false,
        animation: {},
        buttons: [
          Noty.button("yes", "btn btn-success ", function () {
            that.DeletePost(post);
            n.close();
          }),

          Noty.button("no", "btn btn-primary myButton", function () {
            n.close();
          }),
        ],
      });

      n.show();
    },
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
button.myButton {
  margin-left: 5px !important;
}
</style>
