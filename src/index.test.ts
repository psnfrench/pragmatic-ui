import { Greeter } from './index';
describe('index.js', () => {
  test('My Greeter says hello', () => {
    expect(Greeter('Carl')).toBe('Hello Carl');
  });
});
