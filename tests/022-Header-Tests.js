"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `022 - Header Tests`,
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
			};
			return;
		} );


		//---------------------------------------------------------------------
		it( `should retrieve the header`,
			async function ()
			{
				let header = LIB_RESOURCE_PATH.Header( Resources );
				LIB_ASSERT.ok( header );
				LIB_ASSERT.strictEqual( header.length, 5 );
				LIB_ASSERT.deepStrictEqual( header,
					[
						'.$',
						'.$.test.item',
						'.$.values.1',
						'.$.values.2',
						'.$.values.3',
					] );
				return;
			} );


	} );
