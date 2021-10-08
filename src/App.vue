<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Vue-Resource</h3>
        <div class="form-group">
          <input type="text" class="form-control" v-model="userName" />
        </div>
        <button @click="saveUser" class="primary btn-primary">Kaydet</button>
        <button @click="getUser" class="primary btn-success">
          Verileri Getir
        </button>
        <hr />
        <ul class="group-list">
          <li class="list-group-item" v-for="user in userList">
            {{ user.data.userName }}
            <button
              class="button btn-xs btn-danger"
              @click="deleteUser(user.key)"
            >
              Sil
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: null,
      userList: [],
      resource: {},
    };
  },
  methods: {
    saveUser() {
      /*
      this.$http
        .post("users.json", { userName: this.userName })
        .then((responce) => console.log(responce));
        this.$resource("users.json").save({}, { userName: this.userName });
        */
      this.resource.kaydet({}, { userName: this.userName });
    },
    getUser() {
      this.$http
        .get("users.json")
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          for (let key in data.userList) {
            this.userList.push({
              key: key,
              data: data.userList[key],
            });
          }
        });
    },
    deleteUser(userKey) {
      this.$http.delete("users/" + userKey + ".json").then((responce) => {
        console.log(responce);
      });
    },
  },
  created() {
    const customActions = {
      kaydet: { method: "POST", url: "users.json" },
    };
    this.resource = this.$resource("users.json", {}, customActions);
  },
};
</script>

<style>
</style>
