[![NPM Version](http://img.shields.io/npm/v/spawnly.svg?style=flat)](https://npmjs.org/package/spawnly)
[![Build Status](http://img.shields.io/travis/royriojas/spawnly.svg?style=flat)](https://travis-ci.org/royriojas/spawnly)

# spawnly
> Wrapper around `child_process.spawn` to enable pass the command as a string directly to spawn

## Install

```bash
npm i --save spawnly
```

## Usage

```javascript
var spawnly = require('spawnly');

var cp = spawnly('./some-command --some-param=true');
```

**Other examples:**

```javascript
describe( 'spawnly', function () {
  it( 'should execute a command in the system shell', function ( done ) {
    var spawnly = require( '../' );
    var cp = spawnly( 'echo \'hello world\'' );

    cp.stdout.on( 'data', function ( data ) {
      expect( String( data ) ).to.equal( '\'hello world\'\n' );
      done();
    } );
  } );

  it( 'should execute a command in the system shell', function ( done ) {
    var spawnly = require( '../' );
    var cp = spawnly( 'echo hello world' );
    var data = '';

    cp.stdout.on( 'data', function ( received ) {
      data += received;
    } );

    cp.on( 'exit', function () {
      expect( data ).to.equal( 'hello world\n' );
      done();
    } );
  } );

} );

```
## Lincense

[MIT](./LICENSE)

## [Changelog](./changelog.md)
