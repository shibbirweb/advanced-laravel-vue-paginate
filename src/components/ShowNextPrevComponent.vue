<template>
  <div>
    <div class="form-row">
      <label for="showNextPrev" class="col-sm-6 col-form-label-sm"
      >showNextPrev</label
      >
      <div class="col-sm-6">
        <select
                @change="actionShowNextPrev"
                class="form-control form-control-sm"
                id="showNextPrev"
        >
          <option :value="true">true</option>
          <option :value="false">false</option>
        </select>
      </div>
    </div>
    <small class="form-text text-muted">
      Show next/previous button. <code>true</code> for show Next/Previous button and <code>false</code> for hide next/previous button
    </small>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ShowNextPrevComponent",
  methods: {
    ...mapActions(["actionShowNextPrev"])
  }
};
</script>
