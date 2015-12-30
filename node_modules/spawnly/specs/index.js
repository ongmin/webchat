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
