# Testing Output


```


  011 - Create Tests
    ✓ should create a resource from a missing object info
    ✓ should create a resource from an empty object
    ✓ should create a resource from a simple object
    ✓ should create multiple resources
    ✓ should not create missing resources
    ✓ should not create multiple missing resources
    ✓ should not remove existing children

  012 - Update Tests
    ✓ should update a single resource

  013 - Delete Tests
    ✓ should remove a single resource
    ✓ should not remove a child resource
    ✓ should do nothing for a non-existant resource

  014 - Select Tests
    ✓ should list namespaces for root path
    ✓ should list top level nodes for namespace
    ✓ should retrieve '.$'
    ✓ should retrieve '.$.test'
    ✓ should retrieve '.$.values'
    ✓ should retrieve '.$.values.1'
    ✓ should retrieve '.$.values.2'
    ✓ should retrieve '.$.values.3'

  021 - Locate Tests
    ✓ should locate a resource
    ✓ should locate a resource name accross namespaces

  022 - Header Tests
    ✓ should retrieve the header

  023 - Getall Tests
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

  031 - Branch Tests
    ✓ should clone the resources map
    ✓ should clone a namespace
    ✓ should clone a branch

  032 - Copyto Tests
    ✓ should copy a resource
    ✓ should copy child resources
    ✓ should copy root resources
    ✓ should overwrite existing resources

  033 - Moveto Tests
    ✓ should move a resource
    ✓ should move child resources
    ✓ should move root resources
    ✓ should overwrite existing resources
    ✓ should rename the delimiter


  46 passing (17ms)


```


