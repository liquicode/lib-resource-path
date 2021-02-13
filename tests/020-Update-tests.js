"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Update Tests`,
			function ()
			{
				//---------------------------------------------------------------------
				let Resources = null;

				beforeEach( function ()
				{
					Resources =
					{
						".$": { label: 'root', root: '.$' },
						".$.test": { label: 'test' },
						".$.values.1": { value: true },
						".$.values.2": { value: 3.14 },
						".$.values.3": { value: 'words' },
					};
					return;
				} );

				//---------------------------------------------------------------------
				it( `should update a single resource`,
					async function ()
					{
						LIB_RESOURCE_PATH.Update( Resources, '.$.values.2', { value: 42, done: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 42, done: true },
								".$.values.3": { value: 'words' },
							} );
						return;
					} );

			} );

	} );
