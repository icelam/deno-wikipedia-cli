#!/usr/bin/env -S deno --unstable --allow-net --allow-run --allow-env --allow-read --allow-write --allow-read
import {
  parse,
  readLines,
  green,
  yellow,
  cyan,
  gray,
  bold,
  inverse,
  AsciiTable,
  existsSync,
  readJsonSync,
  writeJsonSync
} from './deps.ts';
import WikipediaService from './services/wikipedia.ts';
import {
  displayLogo,
  confirm,
  isRequestSuccess,
  message,
  openUrl,
  getTerminalSize,
  chunkString,
  getConfigurationFilePath,
  isValidLanguageCode,
  isValidConfigurationFile
} from './utils/mod.ts';
import {
  PermissionType, PermissionStatusType, ArgumentsType
} from './types.ts';
import { AVAILABLE_CLI_OPTIONS, WIKIPEDIA_LANGUAGE_CODE_HELP } from './constants.ts';

/**
 * Holds normalized arguments
 */
const normalizedArgs: { [key: string]: string | undefined } = {};

/**
 * Display usage and available options for this CLI.
 */
const displayHelp = async (): Promise<void> => {
  const { terminalWidth } = await getTerminalSize();
  const descriptionMaxLength = Math.floor((terminalWidth - 20) / 2);

  const cliDescription: string = bold(green('Search anything on Wikipedia from your terminal'));
  const cliPoweredBy = ' -- Powered by Wikipedia REST API';
  const cliDenoVersionNote: string = gray('An experimental project written in Deno. (Deno version 1.2.0, std version 0.61.0)');
  const cliRepository: string = yellow('Github: https://github.com/icelam/deno-wikipedia-cli');

  const helpTable = new AsciiTable().removeBorder();

  AVAILABLE_CLI_OPTIONS.forEach(({
    flag, shortFlag, inputFormat, description
  }) => {
    const flagDetails = `-${shortFlag}, --${flag}${inputFormat && ` ${inputFormat}`}`;
    const descriptionChunk = chunkString(description, descriptionMaxLength);
    descriptionChunk?.forEach((descriptionLine, index) => {
      helpTable.addRow(
        index === 0 ? flagDetails : '',
        descriptionLine.trim()
      );
    });
  });

  console.log(`${cliDescription}${cliPoweredBy}\n${cliDenoVersionNote}\n\n${cliRepository}\n\n`);
  console.log(`${bold('Usage:')} \n  wiki-cli [options]\n`);
  console.log(`${bold('Options:')} \n${helpTable.toString()}\n`);
  console.log(`${bold('Wikipedia language code:')} \n  See '${WIKIPEDIA_LANGUAGE_CODE_HELP}' for details.\n`);
};

/**
 * Display Wikipedia page summary.
 */
const displayPageSummary = (pageTitle: string, pageSummary: string, pageUrl: string): void => {
  console.log(`\n${bold(inverse(` ${pageTitle} `))}`);
  console.log(`\n${pageSummary || gray('No summary is found for this search.')}`);
  console.log(`\n${gray('Page URL:')} ${gray(pageUrl)}\n`);
};

/**
 * Prompt user to open the page in browser. Accepts input Y/N.
 * This will be shown after a search completes.
 */
const openPageInBrowser = async (url: string): Promise<void> => {
  const answer: boolean | undefined = await confirm('Do you want to open the page in browser?', 'Open URL');
  console.log('');
  answer && await openUrl(url);
};

/**
 * Capture user input and use it as the keyword to get a Wikipedia page.
 */
const captureInputAndSearch = async (): Promise<void> => {
  const questionPrefix: string = yellow('? ');
  const formattedHint: string = cyan('Keyword: ');
  const fullHint: string = bold(`${questionPrefix}${formattedHint}`);
  Deno.stdout.write(new TextEncoder().encode(`What do you want to search?\n${fullHint}`));
  const { value: line } = await readLines(Deno.stdin).next();
  getWikipediaPage('search', line);
};

/**
 * Prompt user to perform another search. Accepts input Y/N.
 * This will be shown after a search completes or on failure.
 */
const performAnotherSearch = async (): Promise<void> => {
  const answer: boolean | undefined = await confirm('Do you want to perform another search?', 'Perform another search');
  if (answer) {
    console.log(gray('\n-------------------------------------------------------------------------------------\n'));
    captureInputAndSearch();
    return;
  }

  console.log('');
  Deno.exit(0);
};

/**
 * Search a Wikipedia page with predefined keyword.
 */
const searchPageWithPredeinedQuery = async (): Promise<void> => {
  const { query } = normalizedArgs;
  console.log(`Searching for page "${query}"...\n`);
  getWikipediaPage('search', query);
};

/**
 * Get a random Wikipedia page.
 */
const getRandomPage = async (): Promise<void> => {
  console.log('Displaying a random Wikipedia page...\n');
  getWikipediaPage('random');
};

/**
 * Prompt user to get another random page. Accepts input Y/N.
 * This will be shown after a display random page completes or on failure.
 */
const getAnotherRandomPage = async (): Promise<void> => {
  const answer: boolean | undefined = await confirm('Do you want to display another random page?', 'Display another search');
  if (answer) {
    console.log(gray('\n-------------------------------------------------------------------------------------\n'));
    getRandomPage();
    return;
  }

  console.log('');
  Deno.exit(0);
};

/**
 * Search or get a random Wikipedia page.
 */
const getWikipediaPage = async (mode: 'search' | 'random', query?: string) : Promise<void> => {
  if (query === undefined && mode === 'search') {
    message.warn('Cannot perform a search with undefined input. This is likely to be a bug of wiki-cli.');
    await performAnotherSearch();
    return;
  }

  const response = mode === 'search'
    ? await WikipediaService.getPage(query as string, normalizedArgs.language)
    : await WikipediaService.getRandomPage(normalizedArgs.language);

  // Request failed
  if (!isRequestSuccess(response)) {
    message.error(`\nFailed to get result from Wikipedia: ${response.detail}\n`);
    performAnotherSearch();
    return;
  }

  const { payload, responseHeaders } = response;
  if (typeof payload !== 'object' || payload === null) {
    message.error('\nFormat returned from Wikipedia is invalid.\n');
    performAnotherSearch();
    return;
  }

  // Request success, but Wikipedia API returned error
  if (responseHeaders.get('content-type') === 'application/problem+json') {
    message.error(`\nBad request: ${payload.detail || 'Unknown error'}.\n`);
    performAnotherSearch();
    return;
  }

  // Request success
  const pageType = payload?.type;
  let pageTitle = payload?.title;
  if (pageType === 'disambiguation') {
    pageTitle += ' (Disambiguation)';
  }
  const pageSummary = payload?.extract;
  const pageUrl = payload?.['content_urls']?.desktop.page;

  displayPageSummary(pageTitle, pageSummary, pageUrl);
  await openPageInBrowser(pageUrl);

  if (mode === 'search') {
    performAnotherSearch();
  } else {
    getAnotherRandomPage();
  }
};

/**
 * Set and save configurations to home directory.
 */
const setAndSaveConfigurations = async (): Promise<boolean | undefined> => {
  console.log(`Set the default language use in wiki-cli. A list of valid language code can be found at ${WIKIPEDIA_LANGUAGE_CODE_HELP}.\n`);

  const askForDefaultLanguage = () => {
    const hintPrefix: string = yellow('? ');
    const hint: string = cyan('Default language code: ');
    const fullHint: string = bold(`${hintPrefix}${hint}`);
    Deno.stdout.write(new TextEncoder().encode(fullHint));
  };

  askForDefaultLanguage();

  for await (const line of readLines(Deno.stdin)) {
    if (line) {
      if (isValidLanguageCode(line)) {
        const configurationFilePath = getConfigurationFilePath();
        !existsSync(configurationFilePath) && Deno.createSync(configurationFilePath);
        writeJsonSync(configurationFilePath, { language: line });
        message.success('\nConfiguration saved successfully.\n');
        return true;
      }

      message.error('Language code provided is invalid. Please try again.\n');
    }
    askForDefaultLanguage();
  }
};

/**
 * Checks if CLI has enough permission to run.
 */
const checkPermissions = async (): Promise<boolean> => {
  // Deno.permissions is an unstable feature which needs the `--unstable` flag work
  // FIXME: In case Deno's runtime API has change +
  const permissionKeys: PermissionType[] = ['net', 'run', 'env', 'read', 'write'];
  const hasEnoughPermission = await permissionKeys.reduce<Promise<boolean>>(
    async (accumulator, key) => {
      const previousValue = await accumulator;
      const { state } = await Deno.permissions.query({ name: key }) as PermissionStatusType;
      return state === 'granted' && previousValue;
    }, Promise.resolve(true)
  );

  const requiredPermissions = permissionKeys.map((key) => `--allow-${key}`);
  if (!hasEnoughPermission) {
    message.error(`Insufficient permissions detected. Please run run again with the '${requiredPermissions.join(' ')}' flag`);
  }
  return hasEnoughPermission;
};

/**
 * Validate if all CLI arguments (flag) are correct.
 */
const validateFlags = (): boolean => {
  try {
    const availableFlags = [
      '_',
      ...AVAILABLE_CLI_OPTIONS.flatMap(({
        flag,
        shortFlag
      }) => [flag, shortFlag])
    ];

    const args: ArgumentsType = parse(Deno.args);

    if (args._.length) {
      message.error('Invalid command.');
      throw new Error('INVALID_COMMAND');
    }

    // Check and warn for unknown flags
    const hasUnknownFlag = !Object.keys(args).every(
      (availableFlag) => availableFlags.includes(availableFlag)
    );
    if (hasUnknownFlag) {
      message.warn('Unknown flag(s) detected.');
      // throw new Error('UNKNOWN_FLAGS');
    }

    AVAILABLE_CLI_OPTIONS.forEach(({
      flag, shortFlag, inputFormat, standaloneUse, conflictFlags
    }) => {
      const isFlagInUse = Boolean(args[flag] || args[shortFlag]);

      if (isFlagInUse) {
        // 1. Show error and exit when standalone arguments requirements does not meet
        // 2. Show warning when both flag and shortFlag is passed
        if (standaloneUse) {
          if (Object.keys(args).length !== 2) { // '_' is the default args
            if (Object.keys(args).length === 3 && args[flag] && args[shortFlag] && args._) {
              message.warn(`'-${shortFlag}' is the alias of '--${flag}' and they cannot be used together. '--${flag}' will be used.`);
            } else {
              message.error(`'--${flag}' or '-${shortFlag}' cannot be used together with other flags.`);
              throw new Error('FLAG_CONFLICT');
            }
          }
        } else if (args[flag] && args[shortFlag]) {
          message.warn(`'--${flag}' and '-${shortFlag}' cannot be used together, '--${flag}' will be used.`);
        }

        // 3. Conflict flag checking
        conflictFlags.forEach((conflictFlagName) => {
          const conflictFlagData = AVAILABLE_CLI_OPTIONS.find(({
            flag: flagName
          }) => flagName === conflictFlagName);

          if (conflictFlagData) {
            const { shortFlag: conflictShortFlag, flag: conflictFlag } = conflictFlagData;
            if (Object.prototype.hasOwnProperty.call(args, conflictFlag)
              || Object.prototype.hasOwnProperty.call(args, conflictShortFlag)) {
              message.error(`'--${flag}' or '-${shortFlag}' cannot be used together with '--${conflictFlag}' or '-${conflictShortFlag}'.`);
              throw new Error('FLAG_CONFLICT');
            }
          }
        });

        normalizedArgs[flag] = args[flag] || args[shortFlag];

        // 4. Argement value type checking
        const targetInputType: string = inputFormat ? 'string' : 'boolean';
        if (typeof normalizedArgs[flag] !== targetInputType) {
          message.error(`Invalid value for flag '--${flag}' or '-${shortFlag}'. Value must be a ${targetInputType}.`);
          throw new Error('INVALID_FLAG_VALUE');
        }
      }
    });

    // Check if language code provided is valid Wikipedia language code
    if (normalizedArgs.language && !isValidLanguageCode(normalizedArgs.language)) {
      message.error('Invalid language code provided. See \'https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&smlangprop=code&format=json\' for all available language codes.');
      throw new Error('INVALID_LANGUAGE_CODE');
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Entry point of the whole cli application.
 */
if (import.meta.main) {
  const hasEnoughPermission = await checkPermissions();
  if (!hasEnoughPermission) {
    Deno.exit(1);
  }

  // Validate arguments (flags) passed to CLI
  const isAllFlagValid = validateFlags();
  if (!isAllFlagValid) {
    message.warn('One or more error is found. Program will terminate. See \'wiki-cli --help\' for usage.\n\n');
    Deno.exit(1);
  }

  // Tries to load default language setting if --language flag is not set
  if (!normalizedArgs.language) {
    const configurationFilePath = getConfigurationFilePath();
    if (existsSync(configurationFilePath)) {
      // FIXME: Get rid of 'any' as readJsonSync returns type 'unknown'
      const configurationFileContent: any = readJsonSync(configurationFilePath);
      if (isValidConfigurationFile(configurationFileContent)) {
        normalizedArgs.language = configurationFileContent.language;
      } else if (!normalizedArgs.config) { // only exit when --config is not set
        message.error('Invalid configuration file found. Please initialize a new configuration file using \'wiki-cli --config\'.');
        Deno.exit(1);
      }
    }
  }

  // Start CLI main flow
  displayLogo();

  if (normalizedArgs.help) {
    await displayHelp();
    Deno.exit(0);
  }

  if (normalizedArgs.config) {
    await setAndSaveConfigurations();
    Deno.exit(0);
  } else if (normalizedArgs.query) {
    searchPageWithPredeinedQuery();
  } else if (normalizedArgs.random) {
    getRandomPage();
  } else {
    captureInputAndSearch();
  }
}
