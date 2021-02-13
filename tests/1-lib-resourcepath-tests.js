"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `libResourcePath Tests`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `CreateResource Tests`,
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
						LIB_RESOURCE_PATH.CreateResource( Resources, '$' );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": {} } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create a resource from an empty object`,
					async function ()
					{
						LIB_RESOURCE_PATH.CreateResource( Resources, '$', {} );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": {} } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create a resource from a simple object`,
					async function ()
					{
						LIB_RESOURCE_PATH.CreateResource( Resources, '$', { value: true } );
						LIB_ASSERT.deepStrictEqual( Resources, { ".$": { value: true } } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create multiple resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.CreateResource( Resources, '$', { label: 'root', value: true } );
						LIB_RESOURCE_PATH.CreateResource( Resources, '$.test', { label: 'test' } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', value: true },
								".$.test": { label: 'test' },
							} );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create missing resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.CreateResource( Resources, '$.test', { label: 'test', value: true }, { CreatePath: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": {},
								".$.test": { label: 'test', value: true },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should create multiple missing resources`,
					async function ()
					{
						LIB_RESOURCE_PATH.CreateResource( Resources, '$.test.value', { label: 'test', value: true }, { CreatePath: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": {},
								".$.test": {},
								".$.test.value": { label: 'test', value: true },
							} );
						return;
					} );

			} );

		//---------------------------------------------------------------------
		describe( `UpdateResource Tests`,
			function ()
			{
				//---------------------------------------------------------------------
				let Resources = null;

				beforeEach( function ()
				{
					Resources =
					{
						".$": { label: 'root', root: '$' },
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
						LIB_RESOURCE_PATH.UpdateResource( Resources, '$.values.2', { value: 42, done: true } );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 42, done: true },
								".$.values.3": { value: 'words' },
							} );
						return;
					} );

			} );

		//---------------------------------------------------------------------
		describe( `DeleteResource Tests`,
			function ()
			{
				//---------------------------------------------------------------------
				let Resources = null;

				beforeEach( function ()
				{
					Resources =
					{
						".$": { label: 'root', root: '$' },
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
						LIB_RESOURCE_PATH.DeleteResource( Resources, '$.values.2' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '$' },
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
						LIB_RESOURCE_PATH.DeleteResource( Resources, '$.values' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '$' },
								".$.test": { label: 'test' },
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should do nothing for a non-existant resource`,
					async function ()
					{
						LIB_RESOURCE_PATH.DeleteResource( Resources, 'doesnt.exist' );
						LIB_ASSERT.deepStrictEqual( Resources,
							{
								".$": { label: 'root', root: '$' },
								".$.test": { label: 'test' },
								".$.values.1": { value: true },
								".$.values.2": { value: 3.14 },
								".$.values.3": { value: 'words' },
							} );
						return;
					} );

			} );


		//---------------------------------------------------------------------
		describe( `SelectResource Tests`,
			function ()
			{
				//---------------------------------------------------------------------
				let Resources = null;

				beforeEach( function ()
				{
					Resources =
					{
						".$": { label: 'root', root: '$' },
						".$.test": { label: 'test' },
						".$.values.1": { value: true },
						".$.values.2": { value: 3.14 },
						".$.values.3": { value: 'words' },
					};
					return;
				} );

				//---------------------------------------------------------------------
				it( `should retrieve root resource info`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$' );
						LIB_ASSERT.deepStrictEqual( resource, { label: 'root', root: '$' } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve child resource info`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$.test' );
						LIB_ASSERT.deepStrictEqual( resource, { label: 'test' } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should inherit parent resource info`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$.test', { InheritInfo: true } );
						LIB_ASSERT.deepStrictEqual( resource, { label: 'test', root: '$' } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should return undefined for missing resource info`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$.values' );
						LIB_ASSERT.strictEqual( typeof resource, 'undefined' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should return resource info when some parts of the path are missing`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$.values.1' );
						LIB_ASSERT.deepStrictEqual( resource, { value: true } );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should inherit parent resource info when some parts of the path are missing`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.SelectResource( Resources, '$.values.1', { InheritInfo: true } );
						LIB_ASSERT.deepStrictEqual( resource, { label: 'root', root: '$', value: true } );
						return;
					} );

			} );


	} );
