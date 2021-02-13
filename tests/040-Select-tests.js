"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `lib-resource-path`,
	function ()
	{

		//---------------------------------------------------------------------
		describe( `Select Tests`,
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
				it( `should retrieve root resource info`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: null,
								name: null,
								resource_info: null,
								inherited_info: null,
								children: [ '.$' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '',
								name: '.$',
								resource_info: { label: 'root', root: '.$' },
								inherited_info: { label: 'root', root: '.$' },
								children: [ '.test', '.values' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.test'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$.test' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$',
								name: '.test',
								resource_info: { label: 'test' },
								inherited_info: { label: 'test', root: '.$' },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$.values' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$',
								name: '.values',
								resource_info: null,
								inherited_info: { label: 'root', root: '.$' },
								children: [ '.1', '.2', '.3' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.1'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$.values.1' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.1',
								resource_info: { value: true },
								inherited_info: { label: 'root', root: '.$', value: true },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.2'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$.values.2' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.2',
								resource_info: { value: 3.14 },
								inherited_info: { label: 'root', root: '.$', value: 3.14 },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.3'`,
					async function ()
					{
						let resource = App.libResourcePath.Select( Resources, '.$.values.3' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.3',
								resource_info: { value: 'words' },
								inherited_info: { label: 'root', root: '.$', value: 'words' },
								children: [],
							} );
						return;
					} );

			} );

	} );
