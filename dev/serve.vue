<script lang="ts">
import { defineComponent } from 'vue';
import AdvancedLaravelVuePaginate from '@/advanced-laravel-vue-paginate.vue';
import axios from "axios";
const url = 'http://frontend-api.oporajito.test/api/v1/questions'

export default defineComponent({
  name: 'ServeDev',
  components: {
    AdvancedLaravelVuePaginate
  },
  data: () => ({
    data: {},
  }),
  methods: {
    paginateTo(pageNumber: number = 1) {
      console.log(pageNumber)
      axios.get(`${url}?page=${pageNumber}`).then((response) => {
        this.data = response.data
      })
    },
  },
  mounted() {
    this.paginateTo()
  }
});
</script>

<template>
  <div id="app">
    <advanced-laravel-vue-paginate :data="data" @paginateTo="paginateTo" alignment="center" />
  </div>
</template>

<style lang="scss">
body{
  font-family: Arial,serif;
}
</style>