// TODO: Decide whether to maintain the list as constant or fetch it from API
import { WIKIPEDIA_LANGUAGE_CODE } from '../constants.ts';

/**
 * Checks if a provided language code is a valid Wikipedia language code.
 */
const isValidLanguageCode = (
  languageCode: string
): boolean => WIKIPEDIA_LANGUAGE_CODE.includes(languageCode);

export default isValidLanguageCode;
