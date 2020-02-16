<template>
  <div id="app">
    <h1>Advanced Laravel Vue Paginator</h1>
    <ul>
      <li v-for="(_user, index) in users.data" :key="index">
        {{ _user.name }}
      </li>
    </ul>
    <nav>
      <laravel-vue-paginator
        :data="users"
        @paginateTo="gotoPage"
        useStyle="default"
        :onEachSide="3"
        :showNextPrev="true"
      />
    </nav>
  </div>
</template>
<script>
import LaravelVuePaginator from "@/components/AdvancedLaravelVuePaginate.vue";
export default {
  name: "App",
  components: {
    LaravelVuePaginator
  },
  data() {
    return {
      users: {}
    };
  },
  methods: {
    gotoPage(pageNumber = 1) {
      this.$axios
        .get("users?page=" + pageNumber)
        .then(response => {
          this.users = response.data;
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.gotoPage();
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: none;
}
</style>
