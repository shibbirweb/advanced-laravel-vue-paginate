<template>
  <ul
    v-if="shouldShowPaginate"
    :class="[
      ,
      useStyle === 'default' ? 'default-style' : '',
      listClass,
      contentAlignClass,
      customAlign
    ]"
  >
    <li
      v-if="showNextPrev"
      :class="[
        listItemClass,
        !hasPrevious ? (disableClassIn === 'li' ? disableClass : '') : ''
      ]"
    >
      <a
        :class="[
          linkClass,
          !hasPrevious ? (disableClassIn === 'a' ? disableClass : '') : ''
        ]"
        href="#"
        @click.prevent="paginateTo(previousPage)"
        >{{ previousText }}</a
      >
    </li>
    <li
      v-for="(_page, index) in pages"
      :key="index"
      :class="[
        listItemClass,
        activeClassIn === 'li' ? (isActive(_page) ? activeClass : '') : '',
        isDot(_page) ? disableClass : ''
      ]"
    >
      <a
        :class="[
          linkClass,
          activeClassIn === 'a' ? (isActive(_page) ? activeClass : '') : ''
        ]"
        href="#"
        @click.prevent="paginateTo(_page)"
      >
        {{ _page }}
      </a>
    </li>
    <li
      v-if="showNextPrev"
      :class="[
        listItemClass,
        !hasNext ? (disableClassIn === 'li' ? disableClass : '') : ''
      ]"
    >
      <a
        :class="[
          linkClass,
          !hasNext ? (disableClassIn === 'a' ? disableClass : '') : ''
        ]"
        href="#"
        @click.prevent="paginateTo(nextPage)"
        >{{ nextText }}</a
      >
    </li>
  </ul>
</template>
<script>
export default {
  name: "AdvancedLaravelVuePaginate",
  props: {
    data: {
      // laravel pagination data object
      type: Object,
      required: true
    },
    onEachSide: {
      // number of pages each side of current page
      type: Number,
      default: 3
    },
    showNextPrev: {
      // show next previous button
      type: Boolean,
      default: true
    },
    dots: {
      // dots of hidden numbers
      type: String,
      default: "..."
    },
    useStyle: {
      // pagination style
      type: String,
      default: "default",
      validator: value => {
        return ["default", "bootstrap", "custom"].indexOf(value) !== -1;
      }
    },
    alignment: {
      // custom alignment
      type: String,
      default: null,
      validator: value => {
        return [null, "left", "center", "right"].indexOf(value) !== -1;
      }
    },
    activeClass: {
      // pagination active class
      type: String,
      default: "active"
    },
    activeClassIn: {
      // active class placement
      type: String,
      default: "li",
      validator: value => {
        return ["li", "a"].indexOf(value) !== -1;
      }
    },
    listClass: {
      // list (ul) class
      type: String,
      default: "pagination"
    },
    listItemClass: {
      // lit item (li) class
      type: String,
      default: "page-item"
    },
    contentAlignClass: {
      // content align class
      type: String,
      default: "justify-content-center"
    },
    linkClass: {
      // link class
      type: String,
      default: "page-link"
    },
    disableClass: {
      // disable class
      type: String,
      default: "disabled"
    },
    disableClassIn: {
      // disable class placement
      type: String,
      default: "li",
      validator: value => {
        return ["li", "a"].indexOf(value) !== -1;
      }
    },
    previousText: {
      // previous button text
      type: String,
      default: "Previous"
    },
    nextText: {
      // next  button text
      type: String,
      default: "Next"
    },
    autoHidePaginate: {
      // auto hide paginate if has not more then one page
      type: Boolean,
      default: true
    }
  },
  computed: {
    shouldShowPaginate() {
      // if auto hide paginator

      // if has not data hide paginate
      if (!this.data.data) {
        return false;
      }

      // if total page = 1. then depends on user props value
      return this.totalPage === 1 ? this.autoHidePaginate : true;
    },
    isResourceApi() {
      return this.data.meta ? true : false;
    },
    hasPrevious() {
      // has previous page
      return this.currentPage > 1;
    },
    previousPage() {
      // previous page
      return this.currentPage - 1;
    },
    currentPage() {
      // current page
      return this.isResourceApi
        ? this.data.meta.current_page
        : this.data.current_page;
    },
    nextPage() {
      // next page number
      return this.currentPage + 1;
    },
    hasNext() {
      // has next page
      return this.nextPage <= this.totalPage;
    },
    totalPage() {
      // total pages
      return this.isResourceApi
        ? this.data.meta.last_page
        : this.data.last_page;
    },
    pages() {
      // if less
      if (this.onEachSide <= -1) {
        return this.totalPage;
      }

      // pages
      let pages = [];

      for (let i = 1; i <= this.totalPage; i++) {
        if (
          i == 1 ||
          (this.currentPage - this.onEachSide <= i &&
            this.currentPage + this.onEachSide >= i) ||
          i == this.currentPage ||
          i == this.totalPage
        ) {
          pages.push(i);
        } else if (
          i == this.currentPage - (this.onEachSide + 1) ||
          i == this.currentPage + (this.onEachSide + 1)
        ) {
          pages.push(this.dots);
        }
      }

      return pages;
    },
    customAlign() {
      // custom align

      let _align = "";

      if (this.alignment == "left") {
        _align = "default-left";
      } else if (this.alignment == "center") {
        _align = "default-center";
      } else if (this.alignment == "right") {
        _align = "default-right";
      }

      return _align;
    }
  },
  methods: {
    isActive(pageNumber) {
      // is active
      return pageNumber == this.currentPage;
    },
    isDot(content) {
      return content == this.dots ? true : false;
    },
    paginateTo(pageNumber) {
      // if page number is not valid
      if (pageNumber < 1 || pageNumber > this.totalPage) {
        return;
      }
      // goto page
      this.$emit("paginateTo", pageNumber);
    }
  }
};
</script>
<style lang="scss" scoped>
.default-style {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;

  &.default-center {
    justify-content: center !important;
  }

  &.default-left {
    justify-content: flex-start !important;
  }

  &.default-right {
    justify-content: flex-end !important;
  }

  li {
    a {
      position: relative;
      display: block;
      padding: 0.5rem 0.75rem;
      margin-left: -1px;
      line-height: 1.25;
      color: #007bff;
      background-color: #fff;
      border: 1px solid #dee2e6;
      text-decoration: none;
    }

    &.active {
      a {
        z-index: 3;
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
      }
    }

    &.disabled {
      a {
        color: #6c757d;
        pointer-events: none;
        cursor: auto;
        background-color: #fff;
        border-color: #dee2e6;
      }
    }
  }
}
</style>
