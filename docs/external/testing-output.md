# Testing Output


```


  010 - Create Tests
    ✓ should create a resource from a missing object info
    ✓ should create a resource from an empty object
    ✓ should create a resource from a simple object
    ✓ should create multiple resources
    ✓ should not create missing resources
    ✓ should not create multiple missing resources
    ✓ should not remove existing children

  020 - Update Tests
    ✓ should update a single resource

  030 - Delete Tests
    ✓ should remove a single resource
    ✓ should remove a child resource
    ✓ should do nothing for a non-existant resource

  040 - Select Tests
    ✓ should retrieve empty path (root resource info)
    ✓ should retrieve '.' (namespace's root info)
    ✓ should retrieve '.$'
    ✓ should retrieve '.$.test'
    ✓ should retrieve '.$.values'
    ✓ should retrieve '.$.values.1'
    ✓ should retrieve '.$.values.2'
    ✓ should retrieve '.$.values.3'

  050 - Locate Tests
    ✓ should locate all resources by default (empty path)
    ✓ should require a name (single delimiter)
    ✓ should locate a resource name accross namespaces

  060 - Header Tests
    ✓ should retrieve the header

  070 - Getall Tests
    ✓ should retrieve items with:    info      sparse    array
    ✓ should retrieve items with:    select    sparse    array
    ✓ should retrieve items with:    info      full      array
    ✓ should retrieve items with:    select    full      array
    ✓ should retrieve items with:    info      tree      array
    ✓ should retrieve items with:    select    tree      array
    ✓ should retrieve items with:    info      sparse    map
    ✓ should retrieve items with:    select    sparse    map
    ✓ should retrieve items with:    info      full      map
    ✓ should retrieve items with:    select    full      map
    ✓ should retrieve items with:    info      tree      map
    ✓ should retrieve items with:    select    tree      map

  080 - Copyto Tests
    ✓ should copy a resource
    ✓ should copy child resources
    ✓ should copy root resources
    ✓ should overwrite existing resources

  090 - Moveto Tests
    ✓ should move a resource
    ✓ should move child resources
    ✓ should move root resources
    ✓ should overwrite existing resources
    ✓ should rename the delimiter


  44 passing (35ms)


```


