<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <!-- Greetings -->
      <div class="col-md-12">
        <greetings />
      </div>

      <div class="col-md-12">
        <preview />
      </div>

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <options />
          </div>
          <div class="col-md-8">
            <code-preview />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <documentation-processing/>
      </div>
    </div>
  </div>
</template>
<script>
import Greetings from "@/components/Greetings.vue";
import Options from "@/components/Options.vue";
import Preview from "@/components/Preview.vue";
import CodePreview from "@/components/CodePreview.vue";
import DocumentationProcessing from "@/components/DocumentationProcessingComponent";

export default {
  name: "App",
  components: {
    DocumentationProcessing,
    Greetings,
    Options,
    Preview,
    CodePreview
  }
};
</script>