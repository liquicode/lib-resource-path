"use strict";


//=====================================================================
//=====================================================================
//
//		lib-resource-path
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
exports.Select = Select;

exports.Locate = Locate;
exports.Header = Header;
exports.Getall = Getall;

exports.Branch = Branch;
// exports.Splice = Splice;
exports.Copyto = Copyto;
exports.Moveto = Moveto;


//---------------------------------------------------------------------
/**
 * Creates or overwrite a resource and initializes it with values from `Resource`.
 * This function works only on a single resource and has no effect upon child resources.
 * This function will overwrite any existing resource with the same path.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Path The path of the resource.
 * @param {object} Resource A resource object.
 * @returns {object} Returns the updated `Resources` object.
 */
function Create( Resources, Path, Resource )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';
	Resource = Resource ? Resource : {};

	if ( Path.length === 0 ) { throw new Error( `This function does not operate on the path root. The parameter [Path] is required.` ); }
	if ( Path.length === 1 ) { throw new Error( `This function does not operate on namespaces. The parameter [Path] is required.` ); }

	// Set the resource info.
	Resources[ Path ] = JSON.parse( JSON.stringify( Resource ) );

	// Return the reources.
	return Resources;
}


//---------------------------------------------------------------------
/**
 * Updates a resource with values from `Info`.
 * This function works only on a single resource and has no effect upon child resources.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Path The path of the resource.
 * @param {object} Resource A resource object.
 * @returns {object} Returns the updated `Resources` object.
 */
function Update( Resources, Path, Resource )
{
	return Create( Resources, Path, Resource );
}


//---------------------------------------------------------------------
/**
 * Deletes a specific resource.
 * This function also deletes all child resources.
 * @param {array} Resources The map of resource nodes.
 * @param {string} Path The path of the resource.
 * @returns {object} Returns the updated `Resources` object.
 */
function Delete( Resources, Path )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';

	if ( Path.length === 0 ) { throw new Error( `This function does not operate on the path root. The parameter [Path] is required.` ); }
	if ( Path.length === 1 ) { throw new Error( `This function does not operate on namespaces. The parameter [Path] is required.` ); }

	// Remove the node.
	if ( typeof Resources[ Path ] !== 'undefined' )
	{
		delete Resources[ Path ];
	}

	// Return the reources.
	return Resources;
}


//---------------------------------------------------------------------
/**
 * Selects a specific resource and returns information on it.
 * This function works only on a single resource and has no effect upon child resources.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Path The path of the resource.
 * @returns {object} An object containing information about the resource:
 *		- path : the resource path of this resource.
 *		- parent : the parent's resource path.
 *		- name : The name of this resource (used in path, no delimiter).
 *		- info : The info object defined by this resource.
 *		- resource : The info object defined by this resource and all of its ancestors.
 *		- children : An array child resource names.
 */
function Select( Resources, Path )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';

	// Build the resource info.
	let item =
	{
		path: Path,			// The path of this resource
		parent: '',			// The path of the parent resource
		name: '',			// The name of this resource
		info: null,			// The info for this resource
		exists: false,		// True if this resource exists
		inherited: {},		// The info inherited from the parent
		children: [],		// Names of child resources
	};

	// For root path, return the namespaces.
	if ( Path.length === 0 ) 
	{
		item.path = '';
		item.name = '';
		Object.keys( Resources ).forEach(
			key =>
			{
				let delimiter = key.substr( 0, 1 );
				if ( !item.children.includes( delimiter ) )
				{
					item.children.push( delimiter );
				}
			} );
		return item;
	}

	// Get the path delimiter.
	let path_delimiter = Path.substr( 0, 1 );

	// Return just the namespaces's children when only a delimiter is given.
	if ( Path.length === 1 ) 
	{
		item.path = '';
		item.name = path_delimiter;
		Object.keys( Resources ).forEach(
			key =>
			{
				let delimiter = key.substr( 0, 1 );
				if ( delimiter === path_delimiter )
				{
					let entries = key.split( delimiter );
					// let name = delimiter + entries[ 1 ];
					let name = entries[ 1 ];
					if ( !item.children.includes( name ) )
					{
						item.children.push( name );
					}
				}
			} );
		return item;
	}

	// Parse the path.
	let elements = Path.split( path_delimiter );
	elements.shift(); // Remove the leading empty entry.

	// Build the path and info while traversing the path.
	while ( elements.length > 1 )
	{
		item.parent += path_delimiter + elements[ 0 ];
		let resource_info = Resources[ item.parent ];
		if ( typeof resource_info === 'undefined' ) { }
		else if ( typeof resource_info === 'object' )
		{
			if ( resource_info === null ) { }
			else if ( Array.isArray( resource_info ) ) 
			{
				throw new Error( `A resource value must be an object and not [array].` );
			}
			else
			{
				// Object.keys( resource_info ).forEach( key => item.inherited[ key ] = resource_info[ key ] );
				item.inherited = merge_objects( item.inherited, resource_info );
			}
		}
		else
		{
			throw new Error( `A resource value must be an object and not [${resource_info}].` );
		}
		elements.shift();
	}

	// Set the name.
	// resource_detail.name = path_delimiter + elements[ 0 ];
	item.name = elements[ 0 ];

	// Set the resource info.
	let resource_info = Resources[ Path ];
	if ( typeof resource_info === 'undefined' ) { }
	else if ( typeof resource_info === 'object' )
	{
		item.info = {};
		item.exists = true;
		if ( resource_info === null ) { }
		else if ( Array.isArray( resource_info ) ) 
		{
			throw new Error( `A resource value must be an object and not [array].` );
		}
		else
		{
			// Object.keys( resource_info ).forEach( key => item.inherited[ key ] = resource_info[ key ] );
			item.inherited = merge_objects( item.inherited, resource_info );
			Object.keys( resource_info ).forEach( key => item.info[ key ] = resource_info[ key ] );
		}
	}
	else
	{
		throw new Error( `A resource value must be an object and not [${resource_info}].` );
	}

	// Get the children.
	Object.keys( Resources ).forEach(
		key =>
		{
			if ( key.startsWith( Path ) )
			{
				let sub_path = key.substr( Path.length );
				let sub_entries = sub_path.split( path_delimiter );
				sub_entries.shift(); // Discard the leading empty entry.
				if ( sub_entries.length > 0 )
				{
					// let name = path_delimiter + sub_entries[ 0 ];
					let name = sub_entries[ 0 ];
					if ( !item.children.includes( name ) )
					{
						item.children.push( name );
					}
				}
			}
		} );

	// Return the resource item.
	return item;
}


//---------------------------------------------------------------------
function clone_object( Value )
{
	return JSON.parse( JSON.stringify( Value ) );
};


//---------------------------------------------------------------------
function merge_objects( A, B )
{
	let C = clone_object( A );

	function update_children( ParentA, ParentB )
	{
		Object.keys( ParentB ).forEach(
			key =>
			{
				let value_a = ParentA[ key ];
				let value_b = ParentB[ key ];
				let type_a = typeof value_a;
				let type_b = typeof value_b;
				if ( type_a === 'undefined' )
				{
					// Initialize with the entire value.
					ParentA[ key ] = clone_object( value_b );
				}
				else
				{
					if ( type_b === 'object' )
					{
						if ( Array.isArray( value_a ) )
						{
							// Append the array.
							// ParentA[ key ] = clone_object( value );
							ParentA[ key ].push( ...clone_object( value_b ) );
						}
						else if ( value_b === null )
						{
							// Overwrite with null.
							ParentA[ key ] = null;
						}
						else
						{
							// Merge sub-objects.
							update_children( ParentA[ key ], value_b );
						}
					}
					else
					{
						// Overwrite with value.
						ParentA[ key ] = clone_object( value_b );
					}
				}
			} );
	}

	update_children( C, B );
	return C;
}


//---------------------------------------------------------------------
/**
 * Locates all paths which contain the given resource name.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Name The resource name to search for.
 * @returns {array} Array of resource path string containing `Name`.
 */
function Locate( Resources, Name )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Name ) { throw new Error( `The parameter [Name] is required.` ); }

	let paths = [];

	Object.keys( Resources ).forEach(
		key =>
		{
			let delimiter = key.substr( 0, 1 );
			let elements = key.split( delimiter );
			if ( elements.includes( Name ) )
			{
				paths.push( key );
			}
		} );

	paths.sort();

	return paths;
}


//---------------------------------------------------------------------
/**
 * Lists all the paths contained in `Resources`.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Path The path of the resource.
 * @returns {array} Array of resource path string.
 */
function Header( Resources, Path )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';

	let paths = [];
	Object.keys( Resources ).forEach(
		key =>
		{
			if ( path_includes( Path, key ) )
			{
				paths.push( key );
			}
		} );
	paths.sort();

	return paths;
}


//---------------------------------------------------------------------
function path_includes( path, item_path )
{
	if ( path.length === 0 ) { return true; }
	else if ( ( path.length === 1 ) && item_path.startsWith( path ) ) { return true; }
	else
	{
		if ( item_path === path ) { return true; }
		else if ( item_path.startsWith( path + path.substr( 0, 1 ) ) ) { return true; }
	}
	return false;
}


//---------------------------------------------------------------------
/**
 * Lists all paths and info contained in `Resources`.
 * @param {array} Resources The map of resource nodes.
 * @param {object} Options An (optional) options object.
 * - item_type: The type of items to return. Can be one of: 'info' | 'select'.
 * - list_type: The type of list to return. Can be one of: 'sparse' | 'full' | 'tree'
 * - return_type: The type of data to return. Can be one of: 'array' | 'map'
 * @returns {any} An array or map as specified in `Options`.
 */
function Getall( Resources, Options )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }

	// Sort out the options.
	Options = Options ? Options : {};
	Options.item_type = Options.item_type ? Options.item_type : 'info';
	Options.list_type = Options.list_type ? Options.list_type : 'sparse';
	Options.return_type = Options.return_type ? Options.return_type : 'map';
	if ( ![ 'info', 'select' ].includes( Options.item_type ) ) { throw new Error( `Invalid option for item_type, must be one of: 'info', or 'select'.` ); }
	if ( ![ 'sparse', 'full', 'tree' ].includes( Options.list_type ) ) { throw new Error( `Invalid option for list_type, must be one of: 'sparse', 'full', or 'tree'.` ); }
	if ( ![ 'array', 'map' ].includes( Options.return_type ) ) { throw new Error( `Invalid option for return_type, must be one of: 'array', or 'map'.` ); }
	//NOTE: Resources is an [info sparse map]

	// Get the sparse paths.
	let paths = Object.keys( Resources );

	// Check to generate all paths for list and tree modes.
	if ( ( Options.list_type === 'full' ) || ( Options.list_type === 'tree' ) )
	{
		let sparse_paths = JSON.parse( JSON.stringify( paths ) );
		sparse_paths.forEach(
			sparse_path =>
			{
				let delimiter = sparse_path.substr( 0, 1 );
				let elements = sparse_path.split( delimiter );
				elements.shift(); // Remove leading empty element.
				let path = '';
				elements.forEach(
					element =>
					{
						path += delimiter + element;
						if ( !paths.includes( path ) ) { paths.push( path ); }
					} );
			} );
	}

	// Sort the paths.
	paths.sort();

	// Initialize the items array.
	let items = null;
	if ( Options.return_type === 'array' ) { items = []; }
	else if ( Options.return_type === 'map' ) { items = {}; }

	// Build the items array.
	paths.forEach(
		path =>
		{
			// Get the item.
			let item = null;
			let select = Select( Resources, path );
			if ( Options.item_type === 'info' ) 
			{
				item = {
					path: select.path,
					parent: select.parent,
					name: select.name,
					info: Resources[ path ] || null,
				};
			}
			else if ( Options.item_type === 'select' ) 
			{
				item = select;
			}
			// Add the item to the data structure.
			if ( Options.return_type === 'array' )
			{
				items.push( item );
			}
			else if ( Options.return_type === 'map' )
			{
				items[ path ] = item;
			}
		} );

	// Check to convert a flat list to a tree list
	if ( Options.list_type === 'tree' )
	{
		if ( Options.return_type === 'array' ) { items = build_tree_array( Resources, items, Options ); }
		else if ( Options.return_type === 'map' ) { items = build_tree_map( Resources, items, Options ); }
	}

	// Return the items.
	return items;
}


//---------------------------------------------------------------------
function locate_tree_array_item( tree_items, path )
{
	let find = tree_items.find( item => item.path === path );
	if ( !find )
	{
		for ( let index = 0; index < tree_items.length; index++ )
		{
			find = locate_tree_array_item( tree_items[ index ].items, path );
			if ( find ) { break; }
		}
	}
	return find;
}


//---------------------------------------------------------------------
function build_tree_array( Resources, items, Options )
{
	// ASSUMPTION: items is sorted.

	let flat_items = JSON.parse( JSON.stringify( items ) );
	let tree_items = [];
	flat_items.forEach(
		item =>
		{
			// Get the namespace.
			let namespace = item.path.substr( 0, 1 );
			let namespace_item = tree_items.find( item => ( ( !item.path ) && ( item.name === namespace ) ) );
			if ( !namespace_item )
			{
				if ( Options.item_type === 'info' )
				{
					namespace_item = {
						path: '',
						parent: '',
						name: namespace,
						info: null,
					};
				}
				else if ( Options.item_type === 'select' )
				{
					namespace_item = Select( Resources, namespace );
				}
				tree_items.push( namespace_item );
				namespace_item.items = [];
			}

			if ( item.parent === '' )
			{
				namespace_item.items.push( item );
			}
			else
			{
				let parent_item = locate_tree_array_item( namespace_item.items, item.parent );
				parent_item.items.push( item );
			}
			item.items = [];
			return;
		} );
	return tree_items;
}


//---------------------------------------------------------------------
function build_tree_map( Resources, items, Options )
{
	let flat_items = JSON.parse( JSON.stringify( items ) );
	let tree_items = {};
	Object.keys( flat_items ).forEach(
		key =>
		{
			let item = flat_items[ key ];
			let parent_items = tree_items;

			// Get the namespace
			let namespace = key.substr( 0, 1 );
			if ( typeof parent_items[ namespace ] === 'undefined' )
			{
				if ( Options.item_type === 'info' )
				{
					parent_items[ namespace ] = {
						path: '',
						parent: '',
						name: namespace,
						info: null,
					};
				}
				else if ( Options.item_type === 'select' )
				{
					parent_items[ namespace ] = Select( Resources, namespace );
				}
				parent_items[ namespace ].items = {};
			}
			parent_items = parent_items[ namespace ].items;

			// Walk down the path.
			let elements = item.parent.split( namespace );
			elements.shift(); // Remove leading empty entry.
			elements.forEach(
				( element, element_index ) =>
				{
					if ( typeof parent_items[ element ] === 'undefined' )
					{
						debugger;
					}
					parent_items = parent_items[ element ].items;
				} );
			parent_items[ item.name ] = item;
			parent_items[ item.name ].items = {};

		} );
	return tree_items;
}


//---------------------------------------------------------------------
/**
 * Creates a copy of `Resources` that contains only the node specified by `Path` and its children.
 * The specified node will appear at the root of the returned object.
 * Call this function with an empty `Path` to clone the `Resources` map.
 * Call this function with a single delimiter for `Path` to clone a namespace within the `Resources` map.
 * @param {object} Resources The map of resource nodes.
 * @param {string} Path The path of the node to branch from.
 * @returns {object} Map of resource nodes.
 */
function Branch( Resources, Path )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';

	let nodes = {};
	Object.keys( Resources ).forEach(
		key =>
		{
			if ( path_includes( Path, key ) )
			{
				nodes[ key ] = Resources[ key ];
			}
		} );

	return nodes;
}


//---------------------------------------------------------------------
/**
 * Copies a resource from one path to another.
 * This function also copies all child resources.
 * This function will overwrite any resources that exist with the same new name.
 * @param {array} Resources The map of resource nodes.
 * @param {string} Path The resource path.
 * @param {string} NewPath The new resource path.
 * @returns {object} Returns the updated `Resources` object.
 */
function Copyto( Resources, Path, NewPath )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';
	NewPath = NewPath ? NewPath : '';

	if ( Path === NewPath ) { throw new Error( `The parameters [Path] and [NewPath] cannot be the same path.` ); }

	let path_delimiter = Path.substr( 0, 1 );
	let newpath_delimiter = NewPath.substr( 0, 1 );
	let newpath_base_elements = NewPath.split( newpath_delimiter );

	Object.keys( Resources ).forEach(
		key =>
		{
			if ( path_includes( Path, key ) )
			{
				let childpath = key.substr( Path.length );
				let childpath_elements = childpath.split( path_delimiter );
				childpath_elements.shift();
				let newpath_elements = [ ...newpath_base_elements, ...childpath_elements ];
				let newpath = newpath_elements.join( newpath_delimiter );
				let value = Resources[ key ];
				Resources[ newpath ] = JSON.parse( JSON.stringify( value ) );
			}
		} );

	// Return the reources.
	return Resources;
}


//---------------------------------------------------------------------
/**
 * Moves a resource from one path to another.
 * This function also moves all child resources.
 * This function will overwrite any resources that exist with the same new name.
 * @param {array} Resources The map of resource nodes.
 * @param {string} Path The resource path.
 * @param {string} NewPath The new resource path.
 * @returns {object} Returns the updated `Resources` object.
 */
function Moveto( Resources, Path, NewPath )
{
	// Validate Parameters
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	Path = Path ? Path : '';
	NewPath = NewPath ? NewPath : '';

	if ( Path === NewPath ) { throw new Error( `The parameters [Path] and [NewPath] cannot be the same path.` ); }

	let path_delimiter = Path.substr( 0, 1 );
	let newpath_delimiter = NewPath.substr( 0, 1 );
	let newpath_base_elements = NewPath.split( newpath_delimiter );

	Object.keys( Resources ).forEach(
		key =>
		{
			if ( path_includes( Path, key ) )
			{
				let childpath = key.substr( Path.length );
				let childpath_elements = childpath.split( path_delimiter );
				childpath_elements.shift();
				let newpath_elements = [ ...newpath_base_elements, ...childpath_elements ];
				let newpath = newpath_elements.join( newpath_delimiter );
				let value = Resources[ key ];
				Resources[ newpath ] = JSON.parse( JSON.stringify( value ) );
				delete Resources[ key ];
			}
		} );

	// Return the reources.
	return Resources;
}
