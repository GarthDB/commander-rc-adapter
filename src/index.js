/**
 *  Public: format the long name of an option.
 *
 *  * `val` {String} the option's long name.
 *
 *  ## Examples
 *
 *  ```js
 *  formatLong('--foo-bar'); // returns 'foo-bar'
 *  ```
 *
 *  Returns formatted {String} of the long name.
 */
export function formatLong(val) {
  return val
    .replace('--', '')
    .replace('no-', '');
}

/**
 *  Public: converts hyphenated strings to camelcase.
 *
 *  * `val` hyphenated {String}
 *
 *  ## Examples
 *
 *  ```js
 *  camelcase('foo-bar'); // returns 'fooBar'
 *  ```
 *
 *  Returns camelcased {String}
 */
export function camelcase(val) {
  return val.split('-').reduce((str, word) =>
    str + word[0].toUpperCase() + word.slice(1)
  );
}

/**
 *  Public: a parser to make it use commander.js parsed arguments in rc.
 *
 *  * `program` commander.js {Command} object.
 *
 *  ## Examples
 *
 *  ```js
 *  var program = require('commander');
 *  var argParser = require('commander-rc-adapter');
 *  var rc = require('rc');
 *
 *  program
 *    .version('0.0.1')
 *    .option('-f, --foo-doo', 'add some foo')
 *    .option('-b, --bar <string>', 'add some bar');
 *  program.parse(args);
 *
 *  var defaults = {};
 *  var options = rc('appname', defaults, argParser(program));
 *  ```
 *
 *  Returns {Object} of arguments formatted for rc.
 */
export default function adapter(program) {
  const result = { _: program.args };
  program.options.forEach((option) => {
    const camelName = camelcase(formatLong(option.long));
    if ({}.hasOwnProperty.call(program, camelName)) {
      result[camelName] = program[camelName];
    }
  });
  return result;
}
