import getConfigurationFilePath from '../getConfigurationFilePath.ts';
import { Rhum } from '../../deps.ts';

Rhum.testPlan('getConfigurationFilePath.ts', () => {
  Rhum.testSuite('getConfigurationFilePath()', () => {
    Rhum.testCase('should return configuration file path', () => {
      Rhum.asserts.assertEquals(getConfigurationFilePath(), `${Deno.env.get('HOME') ?? '.'}/.wiki-cli.json`);
    });
  });
});

Rhum.run();
