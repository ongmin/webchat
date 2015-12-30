var spawn = require( 'child_process' ).spawn;
var extend = require( 'extend' );

function normalizeArgs( command, options ) {
  var trim = require( 'jq-trim' );
  var shell, args;
  var opts = { cwd: process.cwd(), env: process.env };

  extend( opts, options );

  command = trim( command );

  if ( process.platform === 'win32' ) {
    shell = process.env.comspec || 'cmd.exe';
    args = [ '/s', '/c', '"' + command + '"' ];
    opts.windowsVerbatimArguments = true;
  } else {
    args = command.split( /\s+(?=(?:(?:[^']*'){2})*[^']*$)/ );
    shell = args.shift();
  }

  return { cmd: command, shell: shell, args: args, options: opts };
}

module.exports = function spawnly( command, options ) {
  var res = normalizeArgs( command, options );
  return spawn( res.shell, res.args, res.options );
};
