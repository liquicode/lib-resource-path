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
						let resource = LIB_RESOURCE_PATH.Select( Resources, '' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: null,
								name: null,
								info: null,
								resource: null,
								children: [ '.$' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '',
								name: '.$',
								info: { label: 'root', root: '.$' },
								resource: { label: 'root', root: '.$' },
								children: [ '.test', '.values' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.test'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$.test' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$',
								name: '.test',
								info: { label: 'test' },
								resource: { label: 'test', root: '.$' },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$.values' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$',
								name: '.values',
								info: null,
								resource: { label: 'root', root: '.$' },
								children: [ '.1', '.2', '.3' ],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.1'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$.values.1' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.1',
								info: { value: true },
								resource: { label: 'root', root: '.$', value: true },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.2'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$.values.2' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.2',
								info: { value: 3.14 },
								resource: { label: 'root', root: '.$', value: 3.14 },
								children: [],
							} );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should retrieve '.$.values.3'`,
					async function ()
					{
						let resource = LIB_RESOURCE_PATH.Select( Resources, '.$.values.3' );
						LIB_ASSERT.deepStrictEqual( resource,
							{
								parent: '.$.values',
								name: '.3',
								info: { value: 'words' },
								resource: { label: 'root', root: '.$', value: 'words' },
								children: [],
							} );
						return;
					} );

			} );

	} );
