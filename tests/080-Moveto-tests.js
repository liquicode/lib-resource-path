"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Moveto Tests`,
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
				it( `should move a resource`,
					async function ()
					{
						App.libResourcePath.Moveto( Resources, '.$.test', '.new.test' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
								".new.test": { label: 'test' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should move child resources`,
					async function ()
					{
						App.libResourcePath.Moveto( Resources, '.$.values', '.$.new' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.new.1": { value: true },
								".$.new.2": { value: 3.14 },
								".$.new.3": { value: 'words' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should move root resources`,
					async function ()
					{
						App.libResourcePath.Moveto( Resources, '.$', '.new' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
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
						App.libResourcePath.Moveto( Resources, '.$.values.2', '.$.values.3' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '.$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.3": { value: 3.14 },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should rename the delimiter`,
					async function ()
					{
						App.libResourcePath.Moveto( Resources, '.$', '/$' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								"/$": { label: 'root', root: '.$' },
								"/$/test": { label: 'test' },
								"/$/values/1": { value: true },
								"/$/values/2": { value: 3.14 },
								"/$/values/3": { value: 'words' },
							} );
						return;
					} );

			} );

	} );
