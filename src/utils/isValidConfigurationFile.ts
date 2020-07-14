import isValidLanguageCode from './isValidLanguageCode.ts';
import { IConfigurationFile } from '../types.ts';

/**
 * Detects if the configuration file is valid or not.
 * Type guards applied here.
 */
const isValidConfigurationFile = (
  fileContent: IConfigurationFile | null
): fileContent is IConfigurationFile => (
  fileContent !== null
  && Object.prototype.hasOwnProperty.call(fileContent, 'language')
  && isValidLanguageCode(fileContent.language)
);

export default isValidConfigurationFile;
