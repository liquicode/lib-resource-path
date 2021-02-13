"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Delete Tests`,
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
				it( `should remove a single resource`,
					async function ()
					{
						LIB_RESOURCE_PATH.Delete( Resources, '.$.values.2' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.3": { value: 'words' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should remove a child resource`,
					async function ()
					{
						LIB_RESOURCE_PATH.Delete( Resources, '.$.values' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should do nothing for a non-existant resource`,
					async function ()
					{
						LIB_RESOURCE_PATH.Delete( Resources, 'doesnt.exist' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
							} );
						return;
					} );

			} );

	} );
