<template>
  <div>
    <advanced-laravel-vue-paginate
      :data="laravelData"
      :on-each-side="onEachSide"
      :show-next-prev="showNextPrev"
      :dots="dots"
      @paginateTo="paginateTo"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Preview",
  computed: {
    ...mapState(["laravelData", "onEachSide", "showNextPrev", "dots"])
  },
  methods: {
    ...mapActions(["actionUpdateCurrentPage"]),
    paginateTo(pageNumber) {
      this.actionUpdateCurrentPage(pageNumber);
    },
    onEachSideChange(value) {
      this.onEachSide = value;
    }
  },
  mounted() {}
};
</script>
