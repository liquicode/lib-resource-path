
# Select

### Select( Resources, Path )

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
	".hello"        : { label: 'hello', test: true },
	".hello.world"  : { label: 'world' },
	".koo.bar"      : { label: 'koo bar' },
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
