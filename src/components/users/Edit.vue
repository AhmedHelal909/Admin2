<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Users</h1>
      <ol class="breadcrumb">
        <router-link to="/" v-slot="{ href, navigate }" custom>
          <li>
            <a :href="href" @click="navigate"
              ><i class="fa fa-dashboard"></i>Dashboard</a
            >
          </li>
        </router-link>
        <router-link to="/users" v-slot="{ href, navigate }" custom>
          <li>
            <a :href="href" @click="navigate"
              ><i class="fa fa-users"></i> Users</a
            >
          </li>
        </router-link>
        <li class="active">Edit</li>
      </ol>
    </section>

    <section class="content">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-body">
              <div class="col-md-12">
                <div class="alert alert-danger" v-if="errors.length != 0">
                  <span v-for="(error, index) in errors" :key="index">
                    {{ error[0] }}<br />
                  </span>
                </div>
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
                      <span class="error-feedback" v-if="v$.name.$error">{{
                        v$.name.$errors[0].$message
                      }}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">phone</label>
                      <input
                        type="text"
                        name="email"
                        class="form-control w-100"
                        placeholder="phone"
                        id="telephone"
                        v-model="phone"
                      />
                      <span class="error-feedback" v-if="v$.phone.$error">{{
                        v$.phone.$errors[0].$message
                      }}</span>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        v-model="email"
                      />
                      <span class="error-feedback" v-if="v$.email.$error">{{
                        v$.email.$errors[0].$message
                      }}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1"
                        >password_confirmation</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="password_confirmation"
                        v-model="password_confirmation"
                      />
                      <span
                        class="error-feedback"
                        v-if="v$.password_confirmation.$error"
                        >{{
                          v$.password_confirmation.$errors[0].$message
                        }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label>Select</label>
                      <select class="form-control" v-model="selected">
                        <option
                          v-for="(role, index) in roles"
                          :key="index"
                          :value="role.id"
                          :selected="role.id == role_id"
                        >
                          {{ role.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="box-footer">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="EditUser()"
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
import { mapActions } from "vuex";
import router from "../../router";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  numeric,
  sameAs,
} from "@vuelidate/validators";
import Noty from "noty";

export default {
  data() {
    return {
      users: [],
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      roles: [],
      selected: "",
      discription: "",
      role_id: "",
      v$: useValidate(),
      errors: [],
    };
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(10),
      },
      phone: {
        required,
        minLength: minLength(10),
        numeric,
      },
      email: {
        required,
        email,
        minLength: minLength(10),
      },
      password: {
        required,
        minLength: minLength(10),
      },
      password_confirmation: {
        required,
        minLength: minLength(10),
        sameAs: sameAs(this.password),
      },
    };
  },

  methods: {
    ...mapActions(["getUser"]),
    EditUser() {
      // this.v$.$validate();
      this.v$.$validate();
      if (!this.v$.$invalid) {
        this.UpdateUser();
      }
    },
    UpdateUser() {
      this.$store
        .dispatch("updateUser", {
          id: this.$route.params.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          password_confirmation: this.password_confirmation,
          role_id: this.selected,
        })
        .then(() => {
          this.errors = [];
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Edit Succefully",
            timeout: 2000,
            killer: true,
          }).show();
          router.push("/users");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
  mounted() {
    this.$store
      .dispatch("allRoles")
      .then((res) => {
        this.roles = res.data.roles;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store
      .dispatch("getUser", this.$route.params.id)
      .then((res) => {
        this.name = res.data.user.name;
        this.phone = res.data.user.phone;
        this.email = res.data.user.email;
        this.selected = res.data.user.roles[0].id;
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
