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
		it( `should locate a resource`,
			async function ()
			{
				let paths = LIB_RESOURCE_PATH.Locate( Resources, 'item' );
				LIB_ASSERT.ok( paths );
				LIB_ASSERT.deepStrictEqual( paths,
					[
						".$.test.item",
					] );
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
