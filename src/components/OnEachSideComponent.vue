<template>
  <div>
    <div class="form-row">
      <label for="onEachSide" class="col-sm-6 col-form-label-sm"
        >onEachSide</label
      >
      <div class="col-sm-6">
        <input
          type="number"
          :value="onEachSide"
          @input="actionOnEachSide"
          class="form-control form-control-sm"
          id="onEachSide"
        />
      </div>
    </div>
    <small class="form-text text-muted">
      Number of page number show each side of current page. Any negative value
      show all page links.
    </small>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "OnEachSideComponent",
  computed: {
    ...mapState(["onEachSide"])
  },
  methods: {
    ...mapActions(["actionOnEachSide"])
  }
};
</script>
