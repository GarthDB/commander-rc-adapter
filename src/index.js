export function formatLong(val) {
  return val
    .replace('--', '')
    .replace('no-', '');
}

export function formatShort(val) {
  return val.replace('-', '');
}

export function camelcase(flag) {
  return flag.split('-').reduce((str, word) =>
    str + word[0].toUpperCase() + word.slice(1)
  );
}

export default function adapter(program) {
  const result = { _: program.args };
  program.options.forEach((option) => {
    const name = formatLong(option.long);
    const camelName = camelcase(name);
    const short = formatShort(option.short);
    if ({}.hasOwnProperty.call(program, camelName)) {
      result[name] = program[camelName];
      result[short] = program[camelName];
    }
  });
  return result;
}
