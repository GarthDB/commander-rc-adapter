# Commander.js/rc Argv Adapter

[![Build Status](https://travis-ci.org/GarthDB/commander-rc-adapter.svg)](https://travis-ci.org/GarthDB/commander-rc-adapter) [![NPM](https://nodei.co/npm/commander-rc-adapter.svg)](https://nodei.co/npm/commander-rc-adapter)

---

[rc](https://github.com/dominictarr/rc) is a super helpful way to load cli tool configurations, but it doesn't work out of the box with [Commander.js](https://github.com/tj/commander.js)'s style of arguments and flags.

This is a parser to make it easier to just plugin the args into rc.

## Usage

```js
var program = require('commander');
var argParser = require('commander-rc-adapter');
var rc = require('rc');

program
  .version('0.0.1')
  .option('-f, --foo-doo', 'add some foo')
  .option('-b, --bar <string>', 'add some bar');
program.parse(args);

var options = rc('appname', {/* default values */}, argParser(program));
```
