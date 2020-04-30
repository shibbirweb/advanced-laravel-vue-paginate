
[![npm](https://img.shields.io/npm/v/advanced-laravel-vue-paginate.svg)](https://www.npmjs.com/package/advanced-laravel-vue-paginate) [![Downloads](https://img.shields.io/npm/dt/advanced-laravel-vue-paginate.svg)](https://www.npmjs.com/package/advanced-laravel-vue-paginate)

# Advanced-Laravel-Vue-Paginate
A advanced, smart, highly customizable vue pagination component for Laravel Pagination


## Demo & Playground
See [https://shibbirweb.github.io/advanced-laravel-vue-paginate](https://shibbirweb.github.io/advanced-laravel-vue-paginate/)


## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Laravel](http://laravel.com/docs/) 5.x or higher

## Install

```bash
npm install advanced-laravel-vue-paginate --save
```

## Usage

Register the component:

```javascript
// register as a global Vue component
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css'
Vue.use(require('advanced-laravel-vue-paginate'));

// or, import as a single Vue component
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css'

// register in vue component
export default {
	components: {
		AdvancedLaravelVuePaginate
	}
}
```

Use the component:

```html
<ul>
    <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
</ul>

<advanced-laravel-vue-paginate :data="laravelData" @paginateTo="getResults"/>
```

```javascript
export default {

	data() {
		return {
			// Our data object that holds the Laravel paginator data
			laravelData: {},
		}
	},
	mounted() {
		// Fetch initial results
		this.getResults();
	},
	methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			axios.get('example/results?page=' + page)
				.then(response => {
					this.laravelData = response.data;
				});
		}
	}
}
```


## API

### Props

| Name | Type | Parameter |  Default | Description |
|:---:|:---:|:---:|:---:| --- |
| `data` | `Object` (required) | [Laravel paginate](https://laravel.com/docs/pagination) default object |  | An object containing the structure of a [Laravel paginator](https://laravel.com/docs/pagination) response.|
| `onEachSide` | `Number` (optional) | Any `Integer` number | `3` | Number of page number show each side of current page. Any negative value show all page links. |
| `showNextPrev`  | `Boolean` (optional) | <ul><li>`true`</li><li>`false`</li></ul> | `true` | Show next/previous button. `true` for show Next/Previous button and `false` for hide next/previous button |
| `dots` | `String` (optional) | Any `String ` value | `...` | Symbol for hidden page numbers |
|`previousText` | `String` (optional) | Any `String` value | `Previous` | Text for previous button|
|`nextText` | `String` (optional) | Any `String` value | `Next` | Text for next button|
|`useStyle` | `String` (optional) | <ul><li>`default`</li><li>`bootstrap`</li><li>`custom`</li></ul> | `default` | <ul><li>`default` for default component style.</li><li>`bootstrap` for bootstrap style (required [Bootstrap](https://getbootstrap.com/)).</li><li>`custom` for custom style. Use &#8601; below  props to style as you want.</li></ul>|
|`alignment`| String (optional) | <ul><li>`null`</li><li>`left`</li><li>`center`</li><li>`right`</li></li></ul> | `null` | Custom alignment of pagination. `null` for default style, `left` for align to left, `center` for align to center, `right` for align to right |
| `activeClass` | `String` (optional) | Any `String` value | `active` | Class for current pagination page |
| `activeClassIn` | `String` (optional) | <ul><li>`li`</li><li>`a`</li></ul> | `li` | Active class placement |
|`listClass` | `String` (optional) | Any `String` value | `pagination` | List (`ul`) class|
|`listItemClass` | `String` (optional) | Any `String` value | `page-item` | Class for List item (`li`)|
|`contentAlignClass` | `String` (optional)| Any `String` value | `justify-content-center` | Content align class|
|`linkClass` | `String` (optional) |  Any `String` value | `page-link` | Anchor link (`a`) class|
|`disableClass` | `String` (optional) | Any `String` value | `disabled` | Disable class name|
| `disableClassIn` | `String` (optional) | <ul><li>`li`</li><li>`a`</li></ul> | `li` | Disable class placement |


###Events
|Name|Return | Description|
|:---:|:---:|---|
|`paginateTo`| `Number` | Invoked when user click on a pagination link and return clicked page number|



----
For Development
----
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
