"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `021 - Locate Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		let Resources = null;


		//---------------------------------------------------------------------
		beforeEach( function ()
		{
			Resources =
			{
				".$": { label: 'root', root: '.$' },
				".$.test.item": { label: 'test' },
				".$.values.1": { value: true },
				".$.values.2": { value: 3.14 },
				".$.values.3": { value: 'words' },
				"/test/values": { value: 'test values' },
			};
			return;
		} );


		//---------------------------------------------------------------------
		it( `should locate all resources by default (empty path)`,
			async function ()
			{
				let paths = LIB_RESOURCE_PATH.Locate( Resources, '' );
				LIB_ASSERT.ok( paths );
				LIB_ASSERT.deepStrictEqual( paths,
					[
						".$",
						".$.test.item",
						".$.values.1",
						".$.values.2",
						".$.values.3",
						"/test/values",
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should require a name (single delimiter)`,
			async function ()
			{
				let paths = LIB_RESOURCE_PATH.Locate( Resources, '.' );
				LIB_ASSERT.ok( paths );
				LIB_ASSERT.deepStrictEqual( paths, [] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should locate a resource name accross namespaces`,
			async function ()
			{
				let paths = LIB_RESOURCE_PATH.Locate( Resources, 'values' );
				LIB_ASSERT.ok( paths );
				LIB_ASSERT.deepStrictEqual( paths,
					[
						".$.values.1",
						".$.values.2",
						".$.values.3",
						"/test/values",
					] );
				return;
			} );


	} );
