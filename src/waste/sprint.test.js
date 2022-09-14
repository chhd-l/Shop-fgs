import * as s15 from './s15';

test('sprint', () => {
  const runTest = (module) => {
    for (let key of Object.keys(module)) {
      module[key]?.(true);
      module[key]?.(false);
    }
  };

  runTest(s15);
});
