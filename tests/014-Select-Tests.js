"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `014 - Select Tests`,
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
		it( `should list namespaces for root path`,
			async function ()
			{
				let resource = LIB_RESOURCE_PATH.Select( Resources, '' );
				LIB_ASSERT.deepStrictEqual( resource,
					{
						path: '',
						parent: '',
						name: '',
						info: null,
						exists: false,
						inherited: {},
						children: [ '.' ],
					} );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should list top level nodes for namespace`,
			async function ()
			{
				let resource = LIB_RESOURCE_PATH.Select( Resources, '.' );
				LIB_ASSERT.deepStrictEqual( resource,
					{
						path: '',
						parent: '',
						name: '.',
						info: null,
						exists: false,
						inherited: {},
						children: [ '$' ],
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
						path: '.$',
						parent: '',
						name: '$',
						info: { label: 'root', root: '.$' },
						exists: true,
						inherited: { label: 'root', root: '.$' },
						children: [ 'test', 'values' ],
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
						path: '.$.test',
						parent: '.$',
						name: 'test',
						info: { label: 'test' },
						exists: true,
						inherited: { label: 'test', root: '.$' },
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
						path: '.$.values',
						parent: '.$',
						name: 'values',
						info: null,
						exists: false,
						inherited: { label: 'root', root: '.$' },
						children: [ '1', '2', '3' ],
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
						path: '.$.values.1',
						parent: '.$.values',
						name: '1',
						info: { value: true },
						exists: true,
						inherited: { label: 'root', root: '.$', value: true },
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
						path: '.$.values.2',
						parent: '.$.values',
						name: '2',
						info: { value: 3.14 },
						exists: true,
						inherited: { label: 'root', root: '.$', value: 3.14 },
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
						path: '.$.values.3',
						parent: '.$.values',
						name: '3',
						info: { value: 'words' },
						exists: true,
						inherited: { label: 'root', root: '.$', value: 'words' },
						children: [],
					} );
				return;
			} );

	} );
