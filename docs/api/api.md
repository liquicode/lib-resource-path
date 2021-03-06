
# Library API


---------------------------------------------------------------------


## Create( Resources, Path, Info )

Create a new resource at `Path` and set it's `info` property.

If a resource already exists at `Path`, then it's `info` property is updated.
This does not affect any child resources.

Returns: The `Resources` object.


---------------------------------------------------------------------


## Update( Resources, Path, Info )

Updates the `info` property of the resource at `Path`.

Returns: The `Resources` object.


---------------------------------------------------------------------


## Delete( Resources, Path )

Deletes the resource at `Path`.

Returns: The `Resources` object.


---------------------------------------------------------------------


## Select( Resources, Path )

Selects the resource information at `Path`.

Returns the full resource object:
```js
let select = {
	path: '',			// The path of this resource
	parent: '',			// The path of the parent resource
	name: '',			// The name of this resource
	info: {},			// The info for this resource
	exists: false,		// True if this resource exists
	resource: {},		// The info inherited from the parent
	children: [],		// Names of child resources
}
```

The three main properties of the resource item are `path`, `parent`, and `name`.
With these properties, there is enough information to model resources in a hierarchy using the `path`-`parent` relationship.
The `children` array will also contain the `name` property of all child items for this resource.

Since `lib-resource-path` supports missing segments in a path, the `exists` property indicates whether this resource actually exists or not.

The `info` and `resource` properties are objects storing related information.
The `info` property is directly set by calling `Update`.
If this resource does not exist, its `info` property will be `null`.
The `resource` property is a combination of this resource's `info` property and the `info` properties of all of its parents/ancestors.
The `resource` objects are merged together such that a child's setting will override any value for that setting in the parent/ancestor.

```js
// Example
Resources =
[
	".hello": { label: 'hello', value: true },
	".hello.world": { label: 'world' },
	".koo.bar": { label: 'koo bar' },
];

item = LibResourcePath.Select( Resources, '.hello' );
/*
item === {
	path: '.hello',
	parent: '',
	name: '.hello',
	info: { label: 'hello', test: true },
	exists: true,
	resource: { label: 'hello', test: true },
	children: [ '.world' ],
}
*/

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

item = LibResourcePath.Select( Resources, '.koo' );
/*
item === {
	path: '.koo',
	parent: '',
	name: '.koo',
	info: null,
	exists: false,
	resource: {},
	children: [],
}
*/
```


---------------------------------------------------------------------


## Locate( Resources, Name )

Locates a name within `Resources`.

The given `Name` will be matched against the entire name of path elements.
You cannot do partial matches.

Returns an array of paths (strings) where `Name` was found.


---------------------------------------------------------------------


## Getall( Resources, Options )

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
	".hello": { label: 'hello', value: true },
	".hello.world": { label: 'world' },
	".koo.bar": { label: 'koo bar' },
];

// Get an 'info sparse array'. This should mimic the structure is Resources closely.
items = LibResourcePath.Getall( Resources, { item_type: 'info', list_type: 'sparse', return_type: 'array'} );
/*
items ===
[
	{ path: '.hello', parent: '', name: '.hello', info: { label: 'hello', value: true } },
	{ path: '.hello.world', parent: '.hello', name: '.world', info: { label: 'world' } },
	{ path: '.koo.bar', parent: '.koo', name: '.bar', info: { label: 'koo bar' } },
]
*/

// If we ask for an 'info full array', we will get all missing path segments (.koo) as well.
items = LibResourcePath.Getall( Resources, { item_type: 'info', list_type: 'full', return_type: 'array'} );
/*
items ===
[
	{ path: '.hello', parent: '', name: '.hello', info: { label: 'hello', value: true } },
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
		path: '.hello', parent: '', name: '.hello', info: { label: 'hello', value: true },
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


---------------------------------------------------------------------


## Copyto( Resources, Path, NewPath )

Copies a resource to a new location.

Makes a copy of the resource at `Path` and stores it at `NewPath`.


---------------------------------------------------------------------


## Moveto( Resources, Path, NewPath )

Moves a resource to a new location.

Moves the resource at `Path` to a new location at `NewPath`.

