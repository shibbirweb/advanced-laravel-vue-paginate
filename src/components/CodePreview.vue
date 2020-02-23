<template>
  <pre class="codePreview">
		<code>
		    &lt;advanced-laravel-vue-paginate 
		    :data="laravelData"
			{{ propsOnEachSide }}
			{{ propsShowNextPrev }}
			{{ propsDots }}
		    @paginateTo="getResults"/&gt;
		</code>
	</pre>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CodePreview",
  computed: {
    ...mapState(["onEachSide", "showNextPrev", "dots"]),
    propsOnEachSide() {
      if (this.onEachSide == null) {
        return "";
      } else {
        return ':onEachSide="' + this.onEachSide + '"';
      }
    },
    propsShowNextPrev() {
      if (this.showNextPrev) {
        return ':onEachSide="true"';
      } else {
        return ':onEachSide="false"';
      }
    },
	  propsDots(){
		  return ':dots="' + this.dots +'"';

	  }
  }
};
</script>

<style lang="scss" scoped>
.codePreview {
  background-color: #f6f8fa;
}
</style>
