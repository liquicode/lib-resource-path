
# Branch

### **Branch( Resources, Path )**

Creates a copy of `Resources` that contains only the node specified by `Path` and its children.
The specified node will appear as the root of the returned resources.

Call this function with an empty `Path` to clone the `Resources` map.

Call this function with a single delimiter for `Path` to clone a namespace within the `Resources` map.


---------------------------------------------------------------------
---------------------------------------------------------------------


### **Parameters**

| Parameter       | Type       | Description
|-----------------|------------|------------------------------------
| `Resources`     | object     | The map of resource nodes.
| `Path`          | string     | The path of the node to branch from.
| returns         | object     | A map of resource nodes.


---------------------------------------------------------------------
---------------------------------------------------------------------


### **Examples**

