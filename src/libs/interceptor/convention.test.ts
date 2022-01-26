import { faker } from '@faker-js/faker'

import { isJSONString } from "./convention"

describe('isJSONString', () => {
  test('should return true with valid json', () => {
    let data = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    }
    const validJSON = JSON.stringify(data);
    expect(isJSONString(validJSON)).toBe(true);
  });

  test('should return false with invalid json', () => {
    const invalidJSON = '{this is invalid json string}'
    expect(isJSONString(invalidJSON)).toBe(false)
  })

  test('should return false with null', () => {
    expect(isJSONString(null)).toBe(false)
  })

  test('should return false with number', () => {
    expect(isJSONString(`${faker.datatype.number()}`)).toBe(false)
  })
});
