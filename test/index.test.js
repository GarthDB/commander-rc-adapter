import test from 'ava';
import program from 'commander';
// import minimist from 'minimist';
import adapter from '../src/';

// function generateExpected(args, prog) {
//   const alias = {};
//   prog.options.forEach((opt) => {
//     alias[formatLong(opt.long)] = formatShort(opt.short);
//   });
//   return minimist(args.splice(2), { alias });
// }

test('should accept commander options', (t) => {
  const args = ['node', 'test', '.eslintrc', '--foo-doo', '-b', 'baz'];
  program
    .version('0.0.1')
    .option('-f, --foo-doo', 'add some foo')
    .option('-b, --bar <string>', 'add some bar');
  program.parse(args);
  const result = adapter(program);
  const expected = { _: ['.eslintrc'], fooDoo: true, bar: 'baz' };
  t.deepEqual(result, expected);
});
