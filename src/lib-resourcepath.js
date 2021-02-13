"use strict";


//=====================================================================
//=====================================================================
//
//		lib-resource-path
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.CreateResource = CreateResource;
exports.UpdateResource = UpdateResource;
exports.DeleteResource = DeleteResource;
exports.SelectResource = SelectResource;


//---------------------------------------------------------------------
function CreateResource( Resources, ResourcePath, Info, Options )
{
	if ( !Resources ) { throw new Error( `Resources is required.` ); }
	if ( !ResourcePath || !ResourcePath.length ) { throw new Error( `ResourcePath is required.` ); }
	if ( typeof Info === 'undefined' ) { Info = {}; }

	Options = Options ? Options : {};
	Options.PathDelimiter = Options.PathDelimiter ? Options.PathDelimiter : '.';
	Options.CreatePath = Options.CreatePath ? Options.CreatePath : false;

	// Parse the path.
	let elements = ResourcePath.split( Options.PathDelimiter );

	// Build the path.
	let path = '';
	for ( let index = 0; index < elements.length; index++ )
	{
		// Get the resource, create if needed.
		path += Options.PathDelimiter + elements[ index ];
		if ( typeof Resources[ path ] === 'undefined' )
		{
			if ( Options.CreatePath )
			{
				Resources[ path ] = {};
			}
		}
	}

	// Set the resource info.
	Resources[ path ] = JSON.parse( JSON.stringify( Info ) );

	// Return
	return;
};


//---------------------------------------------------------------------
function UpdateResource( Resources, ResourcePath, Info, Options )
{
	if ( !Resources ) { throw new Error( `Resources is required.` ); }
	if ( !ResourcePath || !ResourcePath.length ) { throw new Error( `ResourcePath is required.` ); }
	if ( typeof Info === 'undefined' ) { Info = {}; }

	Options = Options ? Options : {};
	Options.PathDelimiter = Options.PathDelimiter ? Options.PathDelimiter : '.';

	// Update the resource info.
	Resources[ Options.PathDelimiter + ResourcePath ] = JSON.parse( JSON.stringify( Info ) );

	// Return
	return;
};


//---------------------------------------------------------------------
function DeleteResource( Resources, ResourcePath, Options )
{
	if ( !Resources ) { throw new Error( `Resources is required.` ); }
	if ( !ResourcePath || !ResourcePath.length ) { throw new Error( `ResourcePath is required.` ); }

	Options = Options ? Options : {};
	Options.PathDelimiter = Options.PathDelimiter ? Options.PathDelimiter : '.';

	// Remove the path.
	let path = Options.PathDelimiter + ResourcePath;
	let keys = Object.keys( Resources );
	for ( let index = 0; index < keys.length; index++ )
	{
		if ( keys[ index ].startsWith( path ) )
		{
			delete Resources[ keys[ index ] ];
		}
	}

	// Return
	return;
};


//---------------------------------------------------------------------
function SelectResource( Resources, ResourcePath, Options )
{
	if ( !Resources ) { throw new Error( `Resources is required.` ); }
	if ( !ResourcePath || !ResourcePath.length ) { throw new Error( `ResourcePath is required.` ); }

	Options = Options ? Options : {};
	Options.PathDelimiter = Options.PathDelimiter ? Options.PathDelimiter : '.';
	Options.CreatePath = Options.CreatePath ? Options.CreatePath : false;
	Options.InheritInfo = Options.InheritInfo ? Options.InheritInfo : false;
	// Options.FieldForParent = Options.FieldForParent ? Options.FieldForParent : null;
	Options.FieldForPath = Options.FieldForPath ? Options.FieldForPath : null;

	// Build the resource info.
	let info = {};

	// Parse the path.
	let elements = ResourcePath.split( Options.PathDelimiter );

	// Build the path.
	let path = '';
	for ( let index = 0; index < elements.length; index++ )
	{
		// Get the resource, create if needed.
		path += Options.PathDelimiter + elements[ index ];
		let resource_info = Resources[ path ];
		if ( typeof resource_info === 'undefined' )
		{
			if ( Options.CreatePath )
			{
				resource_info = {};
			}
		}
		if ( resource_info && Options.InheritInfo )
		{
			// Copy the ancestor resource info.
			Object.keys( resource_info ).forEach( key => info[ key ] = resource_info[ key ] );
		}
	}

	// Copy the resource info.
	let resource_info = Resources[ path ];
	if ( typeof resource_info === 'undefined' ) { return /* undefined */; }
	Object.keys( resource_info ).forEach( key => info[ key ] = resource_info[ key ] );

	if ( Options.FieldForPath )
	{
		info[ Options.FieldForPath ] = ResourcePath;
	}

	// Return the resource info.
	return info;
};

