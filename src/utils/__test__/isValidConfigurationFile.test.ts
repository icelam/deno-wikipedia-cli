import isValidConfigurationFile from '../isValidConfigurationFile.ts';
import { assertEquals } from '../../deps.ts';

const testData = [
  { input: null, expected: false },
  { input: { language: 'zh' }, expected: true },
  { input: { language: 'xxx' }, expected: false }
];

testData.forEach(({ input, expected }) => {
  Deno.test(`should identify ${JSON.stringify(input)} as ${expected ? '' : 'in'}valid configuration file`, () => {
    assertEquals(isValidConfigurationFile(input), expected);
  });
});
