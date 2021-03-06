
# Getall

### **Getall( Resources, Options )**

Gets all data in `Resources`.

The `Options` object controls the content and format of the returned items.


---------------------------------------------------------------------
---------------------------------------------------------------------


### **Parameters**

| Parameter       | Type       | Description
|-----------------|------------|------------------------------------
| `Resources`     | object     | The map of resource nodes.
| `Options`       | object     | The (optional) options settings.
| returns         | any        | A map or array of resource nodes.


### ***Options.item_type (string)***

The type of item that will be returned.

Can be one of: `'info'` | `'select'`.
Defaults to `'info'`.

- `'info'`   : return simple objects containing the resource `'info'` property
- `'select'` : return rich objects describing all aspects of the resource

Using `'info'` will return items containg hierarchical information (`path`, `parent`, and `name`) and the `info` property.

The `'select'` items contain all of the information that is returned from the `Select` function.
This will include hierarchical properties as well as the final inherited `resource` property.


### ***Options.list_type (string)***

The type of list that will be returned.

Can be one of: `'sparse'` | `'full'` | `'tree'`.
Defaults to `'sparse'`.

- `'sparse'` : returns a list that contains only defined (not implied) resources
- `'full'`   : returns a list that contains all resources, including implied nodes
- `'tree'`   : returns all resources in a hierarchical structure

When getting a `'sparse'` or `'full'` list, you will be getting back a flat map or array.
An array will be a single array of all resource nodes.
A map will be an object containing all resource nodes mapped by the resource's `path`.

For a `'tree'` list, you will also get all resources (including implied) but child nodes are stored in the array/map `items` of the parent.


### ***Options.return_type (string)***

The type of value that will be returned.

Can be one of: `'array'` | `'map'`.
Defaults to `'map'`.

- `'array'`  : return value will be an array of objects
- `'map'`    : return value will be a single object


---------------------------------------------------------------------
---------------------------------------------------------------------


### **Examples**

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
