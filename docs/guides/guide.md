
# lib-resource-path


## Resources

All function in this library require a `Resources` object as its first parameter.
A `Resources` object stores nodes as top level sub-objects, keyed by the resource's `path`.
Furthermore, the value pointed at by the resource's `path` will be the resource's actual value (i.e. the resource itself).

```js
let Resources =
{
	// Resource Path  :  Resource Value
	".hello"          : { label: 'hello', test: true },
	".hello.world"    : { label: 'test' },
	".koo.bar"        : { label: 'read me' },
};
```


## Path Names

Many functions in this library require you to supply a `Path` argument to indicate
	which resource node you are referring to.

All resource nodes have a `path` which uniquely identifies that node.
Like a file system path, a resource path is simply a resource's name combined with
	the names of it's parents/ancestors, seperated by a delimiter character
	(like the file system's '/' or '\' character).

A resource path also uses a delimiter character to seperate resource names.
However, rather than using a predefined delimiter character,
	we always specify the delimiter character to use as the
	first character of a resource path.
This gives full freedom over your naming conventions and also allows us to
	group resources into namespaces.


## Path Namespaces

Every resource path starts off with a single delimiter character.
Since we have control over the which delimiter character to use, we can create
	different resources with similar names:	`'.hello.world'`, `'/hello/world'`,
	and `'$hello$world'` all refer to different resources.
In effect, we create a new namespace when we change the delimiter character used.

Many functions in this library will allow you to specify only a delimiter character
	for the `Path` argument to represent that you want to work with an entire
	namespace of nodes.

Functions and their namespace behavior:

- `Create` : Not allowed.
- `Update` : Not allowed.
- `Delete` : Not allowed.
- `Select` : Returns `{ path: '', parent: '', name: '.' }`

- `Locate` : Not applicable.
- `Header` : List the paths of all the nodes in the namespace.
- `Getall` : Get information for all nodes in the namespace.

- `Branch` : Retrieve a branch containing all nodes in the namespace.
- `Copyto` : Create a copy of all nodes in the namespace.
- `Moveto` : Move all nodes in the namespace.


## Root Path

An empty `Path` value (i.e. `''`) is considered the root path and refers to all
	resource nodes regardless of namespace.
It represents the entirety of a `Resources` object.

Many functions in this library will allow you to specify a root path for the `Path`
	argument to represent that you want to work with all nodes in all namespaces.

Functions and their root path behavior:

- `Create` : Not allowed.
- `Update` : Not allowed.
- `Delete` : Not allowed.
- `Select` : Returns `{ path: '', parent: '', name: '' }`

- `Locate` : Not applicable.
- `Header` : List the paths of all the nodes in all namespaces.
- `Getall` : Get information for all nodes in all namespaces.

- `Branch` : Retrieve a branch containing all nodes in all namespaces.
- `Copyto` : Copies all nodes in all namespaces.
- `Moveto` : Moves all nodes in all namespaces.


## Implied Resource Nodes

A `Resources` object does not need to define every part of a path in order to use it.
In a file system, you have to create a folder before you can use it.
With `Resources` you can create any kind of path you want and any missing or skipped
	over portions of the path are implied.

Even though they are not defined, you can still use the library functions to perform
	operations on them as if they were.

When calling `Select` with an implied path, the return item's `exists` flag will be
	set to `false`.
Otherwise `Select` will set it to `true` if it was defined and has resource values.

Functions and their implied node behavior:

- `Create` : Functions normally, will actually create the resource.
- `Update` : Functions normally, will actually create the resource.
- `Delete` : Functions normally, no effect.
- `Select` : Functions normally, returns item with `exists` = `false`.

- `Locate` : Not applicable.
- `Header` : Functions normally.
- `Getall` : Functions normally.

- `Branch` : Functions normally.
- `Copyto` : Functions normally.
- `Moveto` : Functions normally.

