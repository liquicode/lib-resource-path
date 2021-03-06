
# lib-resource-path (v0.0.5)


---------------------------------------------------------------------


## Getting Started

Install via NPM:
```bash
npm install @liquicode/lib-resource-path
```

Include the library in your source code:
```javascript
const LibResourcePath = require( '@liquicode/lib-resource-path' );
```


---------------------------------------------------------------------


## Simple Usage

```js
const LibResourcePath = require( '@liquicode/lib-resource-path' );
let resources =
{
	".hello": { label: 'hello', test: true },
	".hello.world": { label: 'world' },
};

let headers = LibResourcePath.Headers( resources );


```


---------------------------------------------------------------------


## More Links

- [Library Source Code](https://github.com/liquicode/lib-resource-path)
- [Library Docs Site](http://lib-resource-path.liquicode.com)
- [Library NPM Page](https://www.npmjs.com/package/@liquicode/lib-resource-path)

