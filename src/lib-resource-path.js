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

exports.Header = Header;
exports.Locate = Locate;
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
		parent: '',
		name: '',
		resource_info: {},
		inherited_info: {},
		children: [],
	};

	// Return just the root's children when no path is given.
	if ( !Path || !Path.length ) 
	{
		resource_detail.parent = null;
		resource_detail.name = null;
		resource_detail.resource_info = null;
		resource_detail.inherited_info = null;
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
			Object.keys( resource_info ).forEach( key => resource_detail.inherited_info[ key ] = resource_info[ key ] );
		}
		elements.shift();
	}

	// Set the name.
	resource_detail.name = path_delimiter + elements[ 0 ];

	// Set the resource info.
	let resource_info = Resources[ Path ];
	if ( typeof resource_info === 'undefined' ) 
	{
		resource_detail.resource_info = null;
	}
	else
	{
		Object.keys( resource_info ).forEach( key => resource_detail.inherited_info[ key ] = resource_info[ key ] );
		Object.keys( resource_info ).forEach( key => resource_detail.resource_info[ key ] = resource_info[ key ] );
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
 * Lists all the paths contained in `Resources`.
 * @returns {array} Array of resource paths.
 */
function Header( Resources )
{
	if ( !Resources ) { throw new Error( `The parameter [Resources] is required.` ); }
	return ( Object.keys( Resources ) );
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

	return paths;
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
