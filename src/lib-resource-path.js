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
 * Creates a resource and initializes it with values from `Info`.
 * This function works only on a single resource and has no effect upon child resources.
 * This function will overwrite any existing resource with the same path.
 * @param {array} Resources The array of resources.
 * @param {string} Path The path of the resource.
 * @param {object} Info A resource object.
 * @param {object} Options An options object:
 * 		- CreatePaths {boolean} : When `true`, also creates any intermediate parent paths that do not already exist.
 * 			This option is optional and defaults to `false`.
 * @returns {object} Returns the updated `Resources` object.
 */
function Create( Resources, Path, Info, Options )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }
	if ( Path.length < 2 ) { throw new Error( `The [Path] parameter contains an invalid value.` ); }
	if ( typeof Info === 'undefined' ) { Info = {}; }

	Options = Options ? Options : {};
	Options.CreatePaths = Options.CreatePaths ? Options.CreatePaths : false;

	if ( Options.CreatePaths )
	{
		// Get the path delimiter.
		let path_delimiter = Path.substr( 0, 1 );

		// Parse the path.
		let elements = Path.split( path_delimiter );
		elements.shift(); // Remove the leading empty entry.
		elements.pop(); // Remove the last entry, which is created below.

		// Build the path.
		let path = '';
		for ( let index = 0; index < elements.length; index++ )
		{
			// Get the resource, create if needed.
			path += path_delimiter + elements[ index ];
		}
	}

	// Set the resource info.
	Resources[ Path ] = JSON.parse( JSON.stringify( Info ) );

	// Return the reources.
	return Resources;
};


//---------------------------------------------------------------------
/**
 * Updates a resource with values from `Info`.
 * This function works only on a single resource and has no effect upon child resources.
 * @param {array} Resources The array of resources.
 * @param {string} Path The path of the resource.
 * @param {object} Info A resource object.
 * @returns {object} Returns the updated `Resources` object.
 */
function Update( Resources, Path, Info )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }
	if ( Path.length < 2 ) { throw new Error( `The [Path] parameter contains an invalid value.` ); }
	if ( typeof Info === 'undefined' ) { Info = {}; }

	// Update the resource info.
	Resources[ Path ] = JSON.parse( JSON.stringify( Info ) );

	// Return the reources.
	return Resources;
};


//---------------------------------------------------------------------
/**
 * Deletes a specific resource.
 * This function also deletes all child resources.
 * @param {array} Resources The array of resources.
 * @param {string} Path The path of the resource.
 * @returns {object} Returns the updated `Resources` object.
 */
function Delete( Resources, Path )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }
	if ( Path.length < 2 ) { throw new Error( `The [Path] parameter contains an invalid value.` ); }

	// Remove the path.
	let keys = Object.keys( Resources );
	for ( let index = 0; index < keys.length; index++ )
	{
		if ( keys[ index ].startsWith( Path ) )
		{
			delete Resources[ keys[ index ] ];
		}
	}

	// Return the reources.
	return Resources;
};


//---------------------------------------------------------------------
/**
 * Selects a specific resource and returns information on it.
 * This function works only on a single resource and has no effect upon child resources.
 * @param {array} Resources The array of resources.
 * @param {string} Path The path of the resource.
 * @returns {object} An object containing information about the resource:
 *		- path : the resource path of this resource.
 *		- parent : the resource path of the parent.
 *		- name : The name of this resource (used in path).
 *		- resource_info : The info object defined by this resource.
 *		- inherited_info : The info object defined by this resource and all of its ancestors.
 *		- children : An array child resource names.
 */
function Select( Resources, Path )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	// if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }

	// Build the resource info.
	let resource_detail =
	{
		path: Path,			// The path of this resource
		parent: '',			// The path of the parent resource
		name: '',			// The name of this resource
		info: null,			// The info for this resource
		exists: false,		// True if this resource exists
		resource: {},		// The info inherited from the parent
		children: [],		// Names of child resources
	};

	// Return just the root's children when no path is given.
	if ( !Path || ( Path.length === 0 ) ) 
	{
		resource_detail.path = '';
		resource_detail.name = '';
		Object.keys( Resources ).forEach(
			key =>
			{
				let delimiter = key.substr( 0, 1 );
				let entries = key.split( delimiter );
				let name = delimiter + entries[ 1 ];
				if ( !resource_detail.children.includes( name ) )
				{
					resource_detail.children.push( name );
				}
			} );
		return resource_detail;
	}

	// Get the path delimiter.
	let path_delimiter = Path.substr( 0, 1 );

	// Return just the namespaces's children when only a delimiter is given.
	if ( Path.length === 1 ) 
	{
		resource_detail.path = '';
		resource_detail.name = Path;
		Object.keys( Resources ).forEach(
			key =>
			{
				let delimiter = key.substr( 0, 1 );
				if ( delimiter === path_delimiter )
				{
					let entries = key.split( delimiter );
					let name = delimiter + entries[ 1 ];
					if ( !resource_detail.children.includes( name ) )
					{
						resource_detail.children.push( name );
					}
				}
			} );
		return resource_detail;
	}

	// Parse the path.
	let elements = Path.split( path_delimiter );
	elements.shift(); // Remove the leading empty entry.

	// Build the path and info while traversing the path.
	while ( elements.length > 1 )
	{
		resource_detail.parent += path_delimiter + elements[ 0 ];
		let resource_info = Resources[ resource_detail.parent ];
		if ( resource_info )
		{
			// Copy the ancestor resource info.
			Object.keys( resource_info ).forEach( key => resource_detail.resource[ key ] = resource_info[ key ] );
		}
		elements.shift();
	}

	// Set the name.
	resource_detail.name = path_delimiter + elements[ 0 ];

	// Set the resource info.
	let resource_info = Resources[ Path ];
	if ( typeof resource_info !== 'undefined' ) 
	{
		resource_detail.info = {};
		resource_detail.exists = true;
		Object.keys( resource_info ).forEach( key => resource_detail.resource[ key ] = resource_info[ key ] );
		Object.keys( resource_info ).forEach( key => resource_detail.info[ key ] = resource_info[ key ] );
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
					let name = path_delimiter + sub_entries[ 0 ];
					if ( !resource_detail.children.includes( name ) )
					{
						resource_detail.children.push( name );
					}
				}
			}
		} );

	// Return the resource info.
	return resource_detail;
};


//---------------------------------------------------------------------
/**
 * Locates all paths which contain the given resource name.
 * @param {string} Name The resource name to search for.
 * @returns {array} Array of resource paths containing `Name`.
 */
 function Locate( Resources, Name )
 {
	 if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	 if ( !Name || !Name.length ) { Name = ''; }
 
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
 };
 
 
 //---------------------------------------------------------------------
/**
 * Lists all the paths contained in `Resources`.
 * @param {array} Resources The array of resources.
 * @returns {array} Array of resource paths.
 */
function Header( Resources )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	let header = Object.keys( Resources );
	header.sort();
	return header;
};


//---------------------------------------------------------------------
/**
 * Lists all paths and info contained in `Resources`.
 * @param {array} Resources The array of resources.
 * @param {object} Options An (optional) options object.
 * - item_type: The type of items to return. Can be one of: 'info' | 'select'.
 * - list_type: The type of list to return. Can be one of: 'sparse' | 'full' | 'tree'
 * - return_type: The type of data to return. Can be one of: 'array' | 'map'
 * @returns {any} An array or map as specified in `Options`.
 */
function Getall( Resources, Options )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }

	// Sort out the options.
	Options = Options ? Options : {};
	Options.item_type = Options.item_type ? Options.item_type : 'info';
	Options.list_type = Options.list_type ? Options.list_type : 'sparse';
	Options.return_type = Options.return_type ? Options.return_type : 'array';
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
		if ( Options.return_type === 'array' ) { items = build_tree_array( items ); }
		else if ( Options.return_type === 'map' ) { items = build_tree_map( items ); }
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
function build_tree_array( items )
{
	let flat_items = JSON.parse( JSON.stringify( items ) );
	let tree_items = [];
	flat_items.forEach(
		item =>
		{
			item.items = [];
			if ( item.parent === '' )
			{
				tree_items.push( item );
			}
			else
			{
				let parent_item = locate_tree_array_item( tree_items, item.parent );
				parent_item.items.push( item );
			}
		} );
	return tree_items;
}


//---------------------------------------------------------------------
function build_tree_map( items )
{
	let flat_items = JSON.parse( JSON.stringify( items ) );
	let tree_items = {};
	Object.keys( flat_items ).forEach(
		key =>
		{
			let item = flat_items[ key ];

			let delimiter = item.parent.substr( 0, 1 );
			let elements = item.parent.split( delimiter );
			elements.shift(); // Remove leading empty entry.

			let parent_item = tree_items;
			elements.forEach(
				( element, element_index ) =>
				{
					parent_item = parent_item[ delimiter + element ];
				} );
			parent_item[ item.name ] = item;

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
	 if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	 let items = [];
	 let paths = Object.keys( Resources );
	 paths.forEach(
		 path =>
		 {
			 let node = Resources[ path ];
			 if ( !Path )
			 {
				 items.push( node );
			 }
			 else if ( ( Path.length === 1 ) && ( path.startsWith( Path ) ) )
			 {
				 items.push( node );
			 }
			 else 
			 {
				 if ( path === Path )
				 {
					 items.push( node );
				 }
				 else if ( path.startsWith( Path + Path.substr( 0, 1 ) ) )
				 {
					 items.push( node );
				 }
			 }
		 }
	 );
	 items.sort();
	 return items;
 };
 
 
 //---------------------------------------------------------------------
/**
 * Copies a resource from one path to another.
 * This function also copies all child resources.
 * This function will overwrite any resources that exist with the same new name.
 * @param {array} Resources The array of resources.
 * @param {string} Path The resource path.
 * @param {string} NewPath The new resource path.
 * @returns {object} Returns the updated `Resources` object.
 */
function Copyto( Resources, Path, NewPath )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }
	if ( Path.length < 2 ) { throw new Error( `The [Path] parameter contains an invalid value.` ); }
	if ( !NewPath || !NewPath.length ) { throw new Error( `The parameter [NewPath] is required.` ); }
	if ( NewPath.length < 2 ) { throw new Error( `The [NewPath] parameter contains an invalid value.` ); }

	let path_delimiter = Path.substr( 0, 1 );
	let newpath_delimiter = NewPath.substr( 0, 1 );
	let newpath_base_elements = NewPath.split( newpath_delimiter );

	Object.keys( Resources ).forEach(
		key =>
		{
			if ( key.startsWith( Path ) )
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
};


//---------------------------------------------------------------------
/**
 * Moves a resource from one path to another.
 * This function also moves all child resources.
 * This function will overwrite any resources that exist with the same new name.
 * @param {array} Resources The array of resources.
 * @param {string} Path The resource path.
 * @param {string} NewPath The new resource path.
 * @returns {object} Returns the updated `Resources` object.
 */
function Moveto( Resources, Path, NewPath )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	if ( !Path || !Path.length ) { throw new Error( `The parameter [Path] is required.` ); }
	if ( Path.length < 2 ) { throw new Error( `The [Path] parameter contains an invalid value.` ); }
	if ( !NewPath || !NewPath.length ) { throw new Error( `The parameter [NewPath] is required.` ); }
	if ( NewPath.length < 2 ) { throw new Error( `The [NewPath] parameter contains an invalid value.` ); }

	let path_delimiter = Path.substr( 0, 1 );
	let newpath_delimiter = NewPath.substr( 0, 1 );
	let newpath_base_elements = NewPath.split( newpath_delimiter );

	Object.keys( Resources ).forEach(
		key =>
		{
			if ( key.startsWith( Path ) )
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
};
