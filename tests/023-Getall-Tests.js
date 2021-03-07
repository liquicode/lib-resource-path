"use strict";


const LIB_ASSERT = require( 'assert' );
const LIB_RESOURCE_PATH = require( '../src/lib-resource-path.js' );


//---------------------------------------------------------------------
describe( `023 - Getall Tests`,
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

		// item_type: The type of items to return. Can be one of: 'info' | 'select'.
		// list_type: The type of list to return. Can be one of: 'flat' | 'tree'
		// tree_type: The type of tree to return. Can be one of: 'sparse' | 'full'
		// return_type: The type of data to return. Can be one of: 'array' | 'map'


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      sparse    array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'sparse', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.strictEqual( items.length, 5 );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{ path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' } },
						// { path: '.$.test', parent: '.$', name: 'test', info: null },
						{ path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' } },
						// { path: '.$.values', parent: '.$', name: 'values', info: null },
						{ path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true } },
						{ path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 } },
						{ path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' } },
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    sparse    array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'sparse', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.strictEqual( items.length, 5 );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{
							path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
							exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
						},
						// {
						// 	path: '.$.test', parent: '.$', name: 'test', info: null,
						// 	exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
						// },
						{
							path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
							exists: true, children: [], inherited: { label: 'test', root: '.$' },
						},
						// {
						// 	path: '.$.values', parent: '.$', name: 'values', info: null,
						// 	exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
						// },
						{
							path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
						},
						{
							path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
						},
						{
							path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
						},
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      full      array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'full', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{ path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' } },
						{ path: '.$.test', parent: '.$', name: 'test', info: null },
						{ path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' } },
						{ path: '.$.values', parent: '.$', name: 'values', info: null },
						{ path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true } },
						{ path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 } },
						{ path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' } },
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    full      array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'full', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{
							path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
							exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
						},
						{
							path: '.$.test', parent: '.$', name: 'test', info: null,
							exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
						},
						{
							path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
							exists: true, children: [], inherited: { label: 'test', root: '.$' },
						},
						{
							path: '.$.values', parent: '.$', name: 'values', info: null,
							exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
						},
						{
							path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
						},
						{
							path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
						},
						{
							path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
						},
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      tree      array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'tree', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{
							path: '', parent: '', name: '.', info: null,
							// exists: false, children: [ '$' ], inherited: {},
							items:
								[
									{
										path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
										// exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
										items:
											[
												{
													path: '.$.test', parent: '.$', name: 'test', info: null,
													// exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
													items:
														[
															{
																path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
																// exists: true, children: [], inherited: { label: 'test', root: '.$' },
																items: [],
															},
														],
												},
												{
													path: '.$.values', parent: '.$', name: 'values', info: null,
													// exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
													items:
														[
															{
																path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
																// exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
																items: [],
															},
															{
																path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
																// exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
																items: [],
															},
															{
																path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
																// exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
																items: [],
															},
														],
												},
											],
									},
								],
						}
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    tree      array`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'tree', return_type: 'array' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					[
						{
							path: '', parent: '', name: '.', info: null,
							exists: false, children: [ '$' ], inherited: {},
							items:
								[
									{
										path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
										exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
										items:
											[
												{
													path: '.$.test', parent: '.$', name: 'test', info: null,
													exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
													items:
														[
															{
																path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
																exists: true, children: [], inherited: { label: 'test', root: '.$' },
																items: [],
															},
														],
												},
												{
													path: '.$.values', parent: '.$', name: 'values', info: null,
													exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
													items:
														[
															{
																path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
																exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
																items: [],
															},
															{
																path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
																exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
																items: [],
															},
															{
																path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
																exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
																items: [],
															},
														],
												},
											],
									},
								],
						}
					] );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      sparse    map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'sparse', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.$':
							{ path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' } },
						// '.$.test':
						// 	{ path: '.$.test', parent: '.$', name: 'test', info: null },
						'.$.test.item':
							{ path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' } },
						// '.$.values':
						// 	{ path: '.$.values', parent: '.$', name: 'values', info: null },
						'.$.values.1':
							{ path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true } },
						'.$.values.2':
							{ path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 } },
						'.$.values.3':
							{ path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' } },
					} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    sparse    map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'sparse', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.$':
						{
							path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
							exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
						},
						// '.$.test':
						// {
						// 	path: '.$.test', parent: '.$', name: 'test', info: null,
						// 	exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
						// },
						'.$.test.item':
						{
							path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
							exists: true, children: [], inherited: { label: 'test', root: '.$' },
						},
						// '.$.values':
						// {
						// 	path: '.$.values', parent: '.$', name: 'values', info: null,
						// 	exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
						// },
						'.$.values.1':
						{
							path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
						},
						'.$.values.2':
						{
							path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
						},
						'.$.values.3':
						{
							path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
						},
					} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      full      map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'full', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.$':
							{ path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' } },
						'.$.test':
							{ path: '.$.test', parent: '.$', name: 'test', info: null },
						'.$.test.item':
							{ path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' } },
						'.$.values':
							{ path: '.$.values', parent: '.$', name: 'values', info: null },
						'.$.values.1':
							{ path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true } },
						'.$.values.2':
							{ path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 } },
						'.$.values.3':
							{ path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' } },
					} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    full      map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'full', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.$':
						{
							path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
							exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
						},
						'.$.test':
						{
							path: '.$.test', parent: '.$', name: 'test', info: null,
							exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
						},
						'.$.test.item':
						{
							path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
							exists: true, children: [], inherited: { label: 'test', root: '.$' },
						},
						'.$.values':
						{
							path: '.$.values', parent: '.$', name: 'values', info: null,
							exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
						},
						'.$.values.1':
						{
							path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
						},
						'.$.values.2':
						{
							path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
						},
						'.$.values.3':
						{
							path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
							exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
						},
					} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    info      tree      map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'info', list_type: 'tree', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.':
						{
							path: '', parent: '', name: '.', info: null,
							// exists: false, children: [ '$' ], inherited: {},
							items:
							{
								'$':
								{
									path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
									// exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
									items:
									{
										'test':
										{
											path: '.$.test', parent: '.$', name: 'test', info: null,
											// exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
											items:
											{
												'item':
												{
													path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
													// exists: true, children: [], inherited: { label: 'test', root: '.$' },
													items: {},
												},
											},
										},
										'values':
										{
											path: '.$.values', parent: '.$', name: 'values', info: null,
											// exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
											items:
											{
												'1':
												{
													path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
													// exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
													items: {},
												},
												'2':
												{
													path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
													// exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
													items: {},
												},
												'3':
												{
													path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
													// exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
													items: {},
												},
											},
										},
									},
								},
							},
						}
					} );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should retrieve items with:    select    tree      map`,
			async function ()
			{
				let items = LIB_RESOURCE_PATH.Getall( Resources,
					{ item_type: 'select', list_type: 'tree', return_type: 'map' } );
				LIB_ASSERT.ok( items );
				LIB_ASSERT.deepStrictEqual( items,
					{
						'.':
						{
							path: '', parent: '', name: '.', info: null,
							exists: false, children: [ '$' ], inherited: {},
							items:
							{
								'$':
								{
									path: '.$', parent: '', name: '$', info: { label: 'root', root: '.$' },
									exists: true, children: [ 'test', 'values' ], inherited: { label: 'root', root: '.$' },
									items:
									{
										'test':
										{
											path: '.$.test', parent: '.$', name: 'test', info: null,
											exists: false, children: [ 'item' ], inherited: { label: 'root', root: '.$' },
											items:
											{
												'item':
												{
													path: '.$.test.item', parent: '.$.test', name: 'item', info: { label: 'test' },
													exists: true, children: [], inherited: { label: 'test', root: '.$' },
													items: {},
												},
											},
										},
										'values':
										{
											path: '.$.values', parent: '.$', name: 'values', info: null,
											exists: false, children: [ '1', '2', '3' ], inherited: { label: 'root', root: '.$' },
											items:
											{
												'1':
												{
													path: '.$.values.1', parent: '.$.values', name: '1', info: { value: true },
													exists: true, children: [], inherited: { label: 'root', root: '.$', value: true },
													items: {},
												},
												'2':
												{
													path: '.$.values.2', parent: '.$.values', name: '2', info: { value: 3.14 },
													exists: true, children: [], inherited: { label: 'root', root: '.$', value: 3.14 },
													items: {},
												},
												'3':
												{
													path: '.$.values.3', parent: '.$.values', name: '3', info: { value: 'words' },
													exists: true, children: [], inherited: { label: 'root', root: '.$', value: 'words' },
													items: {},
												},
											},
										},
									},
								},
							},
						}
					} );
				return;
			} );


	} );
