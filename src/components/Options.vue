<template>
  <div class="card">
    <div class="card-header">
      Props
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <on-each-side />
      </li>
      <li class="list-group-item">
        <show-next-prev />
      </li>
      <li class="list-group-item">
        <dots />
      </li>
    </ul>
  </div>
</template>

<script>
import OnEachSide from "@/components/OnEachSideComponent.vue";
import ShowNextPrev from "@/components/ShowNextPrevComponent.vue";
import Dots from "@/components/DotsComponent.vue"
export default {
  name: "Options",
  components: {
    OnEachSide,
    ShowNextPrev,
    Dots
  },
  data() {
    return {};
  }
};
</script>