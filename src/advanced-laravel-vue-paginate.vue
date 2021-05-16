<script lang="ts">
import {defineComponent, PropType} from 'vue'

interface Meta {
  current_page: number
  from?: number
  last_page: number
  links?: unknown[]
  per_page: number
  to: number
  total: number
}

// resource data type
interface ResourceData {
  data: unknown[]
  meta: Meta
}

// data type
interface Data {
  data: unknown[]
  current_page: number
  from?: number
  last_page: number
  links?: unknown[]
  per_page: number
  to: number
  total: number
}

function isResourceData(object: any): object is ResourceData {
  return 'meta' in object
}

export default defineComponent({
  name: 'advanced-laravel-vue-paginate',
  props: {
    data: {
      // laravel pagination data object
      type: Object as PropType<Data | ResourceData>,
      required: true,
      validator: (value: any) => {
        const isObject: boolean = !!value && value.constructor === Object
        if (!isObject) {
          console.error('Only object value is valid for data prop')
        }
        return isObject
      },
    },
    onEachSide: {
      // number of pages each side of current page
      type: Number,
      default: 3,
    },
    showNextPrev: {
      // show next previous button
      type: Boolean,
      default: true,
    },
    dots: {
      // dots of hidden numbers
      type: String,
      default: '...',
    },
    useStyle: {
      // pagination style
      type: String,
      default: 'default',
      validator: (value: string) => {
        const validValues: string[] = ['default', 'bootstrap', 'custom']
        const isValid = validValues.indexOf(value) !== -1
        if (!isValid) {
          console.error(
              `Only ${validValues.join('|')} value is valid for useStyle prop`
          )
        }
        return isValid
      },
    },
    alignment: {
      // custom alignment
      type: String,
      default: null,
      validator: (value: string | null): boolean => {
        const validValues: (string | null)[] = [null, 'left', 'center', 'right']
        const isValid = validValues.indexOf(value) !== -1
        if (!isValid) {
          console.error(
              `Only ${validValues.join('|')} value is valid for alignment prop`
          )
        }
        return isValid
      },
    },
    activeClass: {
      // pagination active class
      type: String,
      default: 'active',
    },
    activeClassIn: {
      // active class placement
      type: String,
      default: 'li',
      validator: (value: string) => {
        const validValues = ['li', 'a']
        const isValid = validValues.indexOf(value) !== -1
        if (!isValid) {
          console.error(
              `Only ${validValues.join(
                  '|'
              )} value is valid for activeClassIn prop`
          )
        }
        return isValid
      },
    },
    listClass: {
      // list (ul) class
      type: String,
      default: 'pagination',
    },
    listItemClass: {
      // lit item (li) class
      type: String,
      default: 'page-item',
    },
    contentAlignClass: {
      // content align class
      type: String,
      default: 'justify-content-center',
    },
    linkClass: {
      // link class
      type: String,
      default: 'page-link',
    },
    disabledClass: {
      // disabled class
      type: String,
      default: 'disabled',
    },
    disabledClassIn: {
      // disable class placement
      type: String,
      default: 'li',
      validator: (value: string) => {
        const validValues = ['li', 'a']
        const isValid = validValues.indexOf(value) !== -1
        if (!isValid) {
          console.error(
              `Only ${validValues.join('|')} value is valid for alignment prop`
          )
        }
        return isValid
      },
    },
    previousText: {
      // previous button text
      type: String,
      default: 'Previous',
    },
    nextText: {
      // next  button text
      type: String,
      default: 'Next',
    },
    autoHidePaginate: {
      // auto hide paginate if has not more then one page
      type: Boolean,
      default: true,
    },
  },
  computed: {
    shouldShowPaginate(): boolean {
      // if auto hide paginator

      // if has not data hide paginate
      if (!this.data.data) {
        return false
      }

      // if total page = 1. then depends on user props value
      return this.totalPage === 1 ? !this.autoHidePaginate : true
    },
    isResourceApi(): boolean {
      return isResourceData(this.data)
      //return !!this.data.meta
    },
    hasPrevious(): boolean {
      // has previous page
      return this.currentPage > 1
    },
    previousPage(): number {
      // previous page
      return this.currentPage - 1
    },
    currentPage(): number {
      // current page
      return this.isResourceApi
          ? (this.data as ResourceData).meta.current_page
          : (this.data as Data).current_page
    },
    nextPage(): number {
      // next page number
      return this.currentPage + 1
    },
    hasNext(): boolean {
      // has next page
      return this.nextPage <= this.totalPage
    },
    totalPage(): number {
      // total pages
      return this.isResourceApi
          ? (this.data as ResourceData).meta.last_page
          : (this.data as Data).last_page
    },
    pages(): string[] | number {
      // if less
      if (this.onEachSide <= -1) {
        return this.totalPage
      }

      // pages
      let pages: string[] = []

      for (let i = 1; i <= this.totalPage; i++) {
        if (
            i == 1 ||
            (this.currentPage - this.onEachSide <= i &&
                this.currentPage + this.onEachSide >= i) ||
            i == this.currentPage ||
            i == this.totalPage
        ) {
          pages.push(i.toString())
        } else if (
            i == this.currentPage - (this.onEachSide + 1) ||
            i == this.currentPage + (this.onEachSide + 1)
        ) {
          pages.push(this.dots)
        }
      }

      return pages
    },
    customAlign() {
      // custom align

      let _align = ''

      if (this.alignment == 'left') {
        _align = 'default-left'
      } else if (this.alignment == 'center') {
        _align = 'default-center'
      } else if (this.alignment == 'right') {
        _align = 'default-right'
      }

      return _align
    },
  },
  methods: {
    isActive(pageNumber: number): boolean {
      // is active
      return pageNumber == this.currentPage
    },
    isDot(content: string): boolean {
      return content == this.dots
    },
    paginateTo(pageNumber: number) {
      // if page number is not valid
      if (pageNumber < 1 || pageNumber > this.totalPage) {
        return
      }
      // goto page
      this.$emit('paginateTo', pageNumber)
    },
  },
})
</script>

<template>
  <ul
      v-if="shouldShowPaginate"
      :class="[
      useStyle === 'default' ? 'default-style' : '',
      listClass,
      contentAlignClass,
      customAlign,
    ]"
  >
    <li
        v-if="showNextPrev"
        :class="[
        listItemClass,
        !hasPrevious ? (disabledClassIn === 'li' ? disabledClass : '') : '',
      ]"
    >
      <a
          :class="[
          linkClass,
          !hasPrevious ? (disabledClassIn === 'a' ? disabledClass : '') : '',
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
        isDot(_page) ? disabledClass : '',
      ]"
    >
      <a
          :class="[
          linkClass,
          activeClassIn === 'a' ? (isActive(_page) ? activeClass : '') : '',
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
        !hasNext ? (disabledClassIn === 'li' ? disabledClass : '') : '',
      ]"
    >
      <a
          :class="[
          linkClass,
          !hasNext ? (disabledClassIn === 'a' ? disabledClass : '') : '',
        ]"
          href="#"
          @click.prevent="paginateTo(nextPage)"
      >{{ nextText }}</a
      >
    </li>
  </ul>
</template>

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