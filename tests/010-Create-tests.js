"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path Tests`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Create Tests`,
			function ()
			{

				//---------------------------------------------------------------------
				let Resources = null;

				beforeEach( function ()
				{
					Resources = {};
					return;
				} );

				//---------------------------------------------------------------------
				it( `should create a resource from a missing object info`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$' );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": {} } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create a resource from an empty object`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$', {} );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": {} } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create a resource from a simple object`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$', { value: true } );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": { value: true } } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create multiple resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$', { label: 'root', value: true } );
						LIB_RESOURCE_PATH.Create( Resources, '.$.test', { label: 'test' } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', value: true },
								".$.test": { label: 'test' },
							} );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should not create missing resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$.test', { label: 'test', value: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$.test": { label: 'test', value: true },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should not create multiple missing resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.Create( Resources, '.$.test.value', { label: 'test', value: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$.test.value": { label: 'test', value: true },
							} );
						return;
					} );

			} );

	} );
