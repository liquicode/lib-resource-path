"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Copyto Tests`,
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
				it( `should copy a resource`,
					async function ()
					{
						App.libResourcePath.Copyto( Resources, '.$.test', '.new.test' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
								".new.test": { label: 'test' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should copy child resources`,
					async function ()
					{
						App.libResourcePath.Copyto( Resources, '.$.values', '.$.new' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
								".$.new.1": { value: true },
								".$.new.2": { value: 3.14 },
								".$.new.3": { value: 'words' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should copy root resources`,
					async function ()
					{
						App.libResourcePath.Copyto( Resources, '.$', '.new' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
								".new": { label: 'root', root: '.$' },
								".new.test": { label: 'test' },
								".new.values.1": { value: true },
								".new.values.2": { value: 3.14 },
								".new.values.3": { value: 'words' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should overwrite existing resources`,
					async function ()
					{
						App.libResourcePath.Copyto( Resources, '.$.values.2', '.$.values.3' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 3.14 },
							} );
						return;
					} );

			} );

	} );
