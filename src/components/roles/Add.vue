<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Roles</h1>
      <ol class="breadcrumb">
        <router-link to="/" v-slot="{ href, navigate }" custom>
          <li>
            <a :href="href" @click="navigate"
              ><i class="fa fa-dashboard"></i>Dashboard</a
            >
          </li>
        </router-link>
        <router-link to="/roles" v-slot="{ href, navigate }" custom>
          <li>
            <a :href="href" @click="navigate"
              ><i class="fa fa-hourglass-half"></i> Roles</a
            >
          </li>
        </router-link>
        <li class="active">Add</li>
      </ol>
    </section>

    <section class="content">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-body">
              <div class="col-md-12">
                <form role="form" @submit.prevent>
                  <div class="box-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="User Name"
                        v-model="name"
                      />
                    </div>

                    <div class="form-group">
                      <label>discription</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="discription"
                        v-model="discription"
                      ></textarea>
                    </div>
                    <div
                      class="list-group col-md-3"
                      v-for="(model, index) in allModels"
                      :key="index"
                    >
                      <a href="#" class="list-group-item active">
                        {{ model }}
                      </a>
                      <div v-for="(map, index) in allMaps" :key="index">
                        <label>
                          <input
                            type="checkbox"
                            :value="map + '-' + model"
                            v-model="permissions"
                          />
                          {{ map }}
                        </label>
                        <hr />
                      </div>
                    </div>
                  </div>

                  <div class="box-footer">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="AddRole()"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import store from '@/store';
import router from "../../router";
export default {
  name: "Add",
  computed: {
    ...mapGetters(["allModels", "allMaps"]),
  },
  data() {
    return {
      name: "",
      discription: "",
      is_active: false,
      permissions: [],
    };
  },
  methods: {
    AddRole() {
      this.$store
        .dispatch("addRole", {
          name: this.name,
          description: this.discription,
          permissions: this.permissions,
        })
        .then(() => {
          router.push("/roles");
        })
        .catch((err) => {
          console.log(err);
        });
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
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
</style>
