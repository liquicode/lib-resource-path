
# Getall

### Getall( Resources, Options )

Gets all data in `Resources`.

The `Options` object controls the content and format of the returned items.

```js
Options = {
	item_type: 'info', // The type of items to return.
	list_type: 'sparse', // The type of list to return.
	return_type: 'array', // The type of data to return.
}
```

***item_type***

Can be one of: `info` | `select`

- `info`   : return simple objects containing the resource `info` property
- `select` : return rich objects describing all aspects of the resource

Using `info` will return items containg hierarchical information (`path`, `parent`, and `name`) and the `info` property.

The `select` items contain all of the information that is returned from the `Select` function.
This will include hierarchical properties as well as the final inherited `resource` property.


***list_type***

Can be one of: `sparse` | `full` | `tree`

- `sparse` :
- `full`   :
- `tree`   :


***return_type***

Can be one of: `array` | `map`

- `array`  : return value will be an array of objects
- `map`    : return value will be a single object


### Example
```js
Resources = [
	".hello"        : { label: 'hello', test: true },
	".hello.world"  : { label: 'world' },
	".koo.bar"      : { label: 'koo bar' },
];

// Get an 'info sparse array'. This should mimic the structure is Resources closely.
items = LibResourcePath.Getall( Resources, { item_type: 'info', list_type: 'sparse', return_type: 'array'} );
/*
items ===
[
	{ path: '.hello', parent: '', name: '.hello', info: { label: 'hello', test: true } },
	{ path: '.hello.world', parent: '.hello', name: '.world', info: { label: 'world' } },
	{ path: '.koo.bar', parent: '.koo', name: '.bar', info: { label: 'koo bar' } },
]
*/

// If we ask for an 'info full array', we will get all missing path segments (.koo) as well.
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

// For 'info tree array', we get all missing path segments and the items are stored in embedded arrays.
items = LibResourcePath.Getall( Resources, { item_type: 'info', list_type: 'tree', return_type: 'array'} );
/*
items ===
[
	{
		path: '.hello', parent: '', name: '.hello', info: { label: 'hello', test: true },
		items:
		[
			{
				path: '.hello.world', parent: '.hello', name: '.world', info: { label: 'world' },
				items: [];
			},
		]
	},
	{
		path: '.koo', parent: '', name: '.koo', info: null,
		items: 
		[
			{
				path: '.koo.bar', parent: '.koo', name: '.bar', info: { label: 'koo bar' },
				items: [],
			},
		],
	),
]
*/
```
