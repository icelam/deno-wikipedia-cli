import { OptionsType } from './types.ts';

export const DEFAULT_WIKIPEDIA_LANGUAGE = 'en';

/**
 * Available CLI options and their descriptions.
 * `input` is used to to describe the input requried for the option displayed in help
 * `standaloneUse` is use to indicates that the flag cannot be used with any other flags
 * `conflictFlags` is an array with stores the flag name of options which cannot be used together with current option
 */
export const AVAILABLE_CLI_OPTIONS: OptionsType[] = [
  {
    flag: 'help',
    shortFlag: 'h',
    inputFormat: '',
    description: 'Show help and all available options',
    standaloneUse: true,
    conflictFlags: []
  },
  {
    flag: 'config',
    shortFlag: 'c',
    inputFormat: '',
    description: 'Modify default behavior of wiki-cli, currently support saving default language to be used in search',
    standaloneUse: true,
    conflictFlags: []
  },
  {
    flag: 'language',
    shortFlag: 'l',
    inputFormat: '[WIKI_LANGUAGE_CODE]',
    description: 'Temporary set the target language to be used in search, accepts a Wikipedia language code',
    standaloneUse: false,
    conflictFlags: []
  },
  {
    flag: 'query',
    shortFlag: 'q',
    inputFormat: '[KEYWORD]',
    description: 'Pre-define the keyword used in search',
    standaloneUse: false,
    conflictFlags: ['random']
  },
  {
    flag: 'random',
    shortFlag: 'r',
    inputFormat: '',
    description: 'Display a random Wikipedia page',
    standaloneUse: false,
    conflictFlags: ['query']
  }
];

// TODO: Decide whether to maintain the list as constant or fetch it from API
/**
 * List of available Wikipedia language codes extracted from
 * Docs: https://www.mediawiki.org/w/api.php?action=help&modules=sitematrix
 * API: https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&format=json
 */
export const WIKIPEDIA_LANGUAGE_CODE = [
  'aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'am', 'an', 'ang', 'ar', 'arc', 'arz', 'as',
  'ast', 'atj', 'av', 'awa', 'ay', 'az', 'azb', 'ba', 'ban', 'bar', 'bat-smg', 'bcl', 'be',
  'be-tarask', 'be-x-old', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug',
  'bxr', 'ca', 'cbk-zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'cr',
  'crh', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'din', 'diq', 'dsb', 'dty', 'dv', 'dz',
  'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu-vro', 'fj',
  'fo', 'fr', 'frp', 'frr', 'fur', 'fy', 'ga', 'gag', 'gan', 'gcr', 'gd', 'gl', 'glk', 'gn',
  'gom', 'gor', 'got', 'gu', 'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'ho', 'hr', 'hsb',
  'ht', 'hu', 'hy', 'hyw', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'inh', 'io', 'is',
  'it', 'iu', 'ja', 'jam', 'jbo', 'jv', 'ka', 'kaa', 'kab', 'kbd', 'kbp', 'kg', 'ki', 'kj',
  'kk', 'kl', 'km', 'kn', 'ko', 'koi', 'kr', 'krc', 'ks', 'ksh', 'ku', 'kv', 'kw', 'ky', 'la',
  'lad', 'lb', 'lbe', 'lez', 'lfn', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lrc', 'lt', 'ltg',
  'lv', 'mai', 'map-bms', 'mdf', 'mg', 'mh', 'mhr', 'mi', 'min', 'mk', 'ml', 'mn', 'mnw', 'mo',
  'mr', 'mrj', 'ms', 'mt', 'mus', 'mwl', 'my', 'myv', 'mzn', 'na', 'nah', 'nap', 'nds', 'nds-nl',
  'ne', 'new', 'ng', 'nl', 'nn', 'no', 'nov', 'nqo', 'nrm', 'nso', 'nv', 'ny', 'oc', 'olo', 'om',
  'or', 'os', 'pa', 'pag', 'pam', 'pap', 'pcd', 'pdc', 'pfl', 'pi', 'pih', 'pl', 'pms', 'pnb',
  'pnt', 'ps', 'pt', 'qu', 'rm', 'rmy', 'rn', 'ro', 'roa-rup', 'roa-tara', 'ru', 'rue', 'rw',
  'sa', 'sah', 'sat', 'sc', 'scn', 'sco', 'sd', 'se', 'sg', 'sh', 'shn', 'shy', 'si', 'simple',
  'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw', 'szl',
  'szy', 'ta', 'tcy', 'te', 'tet', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'ts',
  'tt', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vep', 'vi', 'vls',
  'vo', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'yue', 'za', 'zea', 'zh',
  'zh-classical', 'zh-min-nan', 'zh-yue', 'zu'
];

export const WIKIPEDIA_LANGUAGE_CODE_HELP = 'https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&smlangprop=code&format=json';
