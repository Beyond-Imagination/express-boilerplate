import * as errors from './index'

describe('error code', () => {
  test('check duplicated error code', () => {
    const errorMap = new Map();

    for (const [name, error] of Object.entries(errors)) {
      let e = new error(null)
      if(errorMap.has(e.code)) {
        throw new Error(`duplicated error code. ${name} and ${errorMap.get(e.code)} has same code ${e.code}`);
      } else {
        errorMap.set(e.code, name);
      }
    }
  });
})
