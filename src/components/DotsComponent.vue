<template>
  <div>
    <div class="form-row">
      <label for="dots" class="col-sm-6 col-form-label-sm">dots</label>
      <div class="col-sm-6">
        <input
          type="string"
          :value="dots"
          @input="actionDots"
          class="form-control form-control-sm"
          id="dots"
        />
      </div>
    </div>
    <small class="form-text text-muted">
      Symbol for hidden page numbers
    </small>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DotsComponent",
  computed: {
    ...mapState(["dots"])
  },
  methods: {
    ...mapActions(["actionDots"])
  }
};
</script>