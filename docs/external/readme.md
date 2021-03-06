
# lib-resource-path (v0.0.8)


---------------------------------------------------------------------


## Getting Started

Install via NPM:
```bash
npm install @liquicode/lib-resource-path
```

Include the library in your source code:
```javascript
const LibResourcePath = require( '@liquicode/lib-resource-path' );
```


---------------------------------------------------------------------


## Simple Usage

```js
const LibResourcePath = require( '@liquicode/lib-resource-path' );

// An array defining three resource nodes.
let Resources =
[
	// Resource Path  :  Resource Value
	".hello"          : { label: 'hello', test: true },
	".hello.world"    : { label: 'world' },
	".koo.bar"        : { label: 'koo bar' },
];

// Get information about a particular resource node.
item = LibResourcePath.Select( Resources, '.hello.world' );
/*
item === {
	path: '.hello.world',
	parent: '.hello',
	name: '.world',
	info: { label: 'world' },
	exists: true,
	resource: { label: 'world', test: true },
	children: [],
}
*/

// Get information about all resources, including implied ones ('.koo') that are not defined.
items = LibResourcePath.Getall( Resources, { item_type: 'info', list_type: 'full', return_type: 'array'} );
/*
items ===
[
	{ path: '.hello', parent: '', name: '.hello', info: { label: 'hello', test: true } },
	{ path: '.hello.world', parent: '.hello', name: '.world', info: { label: 'world' } },
	{ path: '.koo', parent: '', name: '.koo', info: null },
	{ path: '.koo.bar', parent: '.koo', name: '.bar', info: { label: 'koo bar' } },
]
*/

```

---------------------------------------------------------------------


## More Links

- [Library Source Code](https://github.com/liquicode/lib-resource-path)
- [Library Docs Site](http://lib-resource-path.liquicode.com)
- [Library NPM Page](https://www.npmjs.com/package/@liquicode/lib-resource-path)

