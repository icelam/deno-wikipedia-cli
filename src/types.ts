import { Args } from './deps.ts';
/* Arguments */
export type ArgumentsType = Args;

/* Deno Permission */
// FIXME: Find a way to import permission types from Deno
// https://github.com/denoland/deno/blob/cb0acfe3/cli/js/lib.deno.ns.d.ts#L1701
export type PermissionType = 'net' | 'run' | 'read' | 'write' | 'env' | 'plugin' | 'hrtime';
export type PermissionStatusType = Deno.PermissionStatus;

/* Options and Help */
export type OptionsType = {
  flag: string;
  shortFlag: string;
  inputFormat: string;
  description: string;
  standaloneUse: boolean;
  conflictFlags: string[]
};

/* getTerminalSize */
export interface ITerminalSize {
  columns: number;
  rows: number;
}

/* makeRequest */
export interface IMakeRequestSuccessResponse {
  status: 'SUCCESS';
  responseHeaders: Headers;
  payload: any; // { [key: string]: any } | Blob | string
}

export interface IMakeRequestFailureResponse {
  status: 'FAILED';
  errorCode: string;
  detail: string;
}

export interface IMakeRequestOptions {
  headers?: Headers;
  body?: string;
}

/* openUrl */
export type CommandType = 'open' | 'start' | 'xdg-open';

/* Configuration File */
export interface IConfigurationFile {
  language: string;
}
