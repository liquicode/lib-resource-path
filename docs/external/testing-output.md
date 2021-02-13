# Testing Output


```


  lib-resource-path Tests
    Create Tests
      ✓ should create a resource from a missing object info
      ✓ should create a resource from an empty object
      ✓ should create a resource from a simple object
      ✓ should create multiple resources
      ✓ should not create missing resources
      ✓ should not create multiple missing resources

  lib-resource-path
    Update Tests
      ✓ should update a single resource

  lib-resource-path
    Delete Tests
      ✓ should remove a single resource
      ✓ should remove a child resource
      ✓ should do nothing for a non-existant resource

  lib-resource-path
    Select Tests
      ✓ should retrieve root resource info
      ✓ should retrieve '.$'
      ✓ should retrieve '.$.test'
      ✓ should retrieve '.$.values'
      ✓ should retrieve '.$.values.1'
      ✓ should retrieve '.$.values.2'
      ✓ should retrieve '.$.values.3'

  lib-resource-path
    Copyto Tests
      ✓ should copy a resource
      ✓ should copy child resources
      ✓ should copy root resources
      ✓ should overwrite existing resources

  lib-resource-path
    Moveto Tests
      ✓ should move a resource
      ✓ should move child resources
      ✓ should move root resources
      ✓ should overwrite existing resources
      ✓ should rename the delimiter


  26 passing (12ms)


```


