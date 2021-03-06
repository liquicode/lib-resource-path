"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `031 - Branch Tests`,
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
				"/test/namespace": { value: 'namespace' },
			};
			return;
		} );


		//---------------------------------------------------------------------
		it( `should clone the resources map`,
			async function ()
			{
				let map = LIB_RESOURCE_PATH.Branch( Resources, '' );
				LIB_ASSERT.ok( map );
				LIB_ASSERT.deepStrictEqual( map, Resources );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should clone a namespace`,
			async function ()
			{
				let map = LIB_RESOURCE_PATH.Branch( Resources, '.' );
				LIB_ASSERT.ok( map );
				LIB_ASSERT.deepStrictEqual( map, {
					".$": { label: 'root', root: '.$' },
					".$.test.item": { label: 'test' },
					".$.values.1": { value: true },
					".$.values.2": { value: 3.14 },
					".$.values.3": { value: 'words' },
				} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should clone a branch`,
			async function ()
			{
				let map = LIB_RESOURCE_PATH.Branch( Resources, '.$.values' );
				LIB_ASSERT.ok( map );
				LIB_ASSERT.deepStrictEqual( map, {
					".$.values.1": { value: true },
					".$.values.2": { value: 3.14 },
					".$.values.3": { value: 'words' },
				} );
				return;
			} );


	} );
