import {
  yellow, green, red, white, bgRed, bgYellow, bgGreen, bgBlue, bold, inverse
} from '../deps.ts';

/**
 * Formats and display message according to the severity levels.
 */
const displayMessage = (
  mode: 'error' | 'warn' | 'success' | 'info',
  text: string
): void => {
  // For leading line break, display it before the pessage prefix
  const leadingLineBreak = /^\n/;
  const displayLeadingLineBreak = leadingLineBreak.test(text);
  const message: string = displayLeadingLineBreak
    ? text.replace(leadingLineBreak, '')
    : text;

  let prefixBackground: (text: string) => string;
  let messageColor: ((text: string) => string) | undefined;
  switch (mode) {
    case 'error':
      prefixBackground = bgRed;
      messageColor = red;
      break;
    case 'warn':
      prefixBackground = bgYellow;
      messageColor = yellow;
      break;
    case 'success':
      prefixBackground = bgGreen;
      messageColor = green;
      break;
    case 'info':
      prefixBackground = bgBlue;
      break;
    default:
      prefixBackground = inverse;
      break;
  }

  const prefix: string = prefixBackground(white(bold(` ${mode.toUpperCase()} `)));
  const formattedMessage: string = messageColor
    ? messageColor(message)
    : message;

  console.log(`${displayLeadingLineBreak
    ? '\n'
    : ''
  }${prefix} ${formattedMessage}`);
};

/**
 * Wrapper of displayMessage function. Formats and display message according to the severity levels.
 * Available severity levels: error, warning, success, info
 */
const message = {
  error: (text: string): void => displayMessage('error', text),
  warn: (text: string): void => displayMessage('warn', text),
  success: (text: string): void => displayMessage('success', text),
  info: (text: string): void => displayMessage('info', text)
};

export default message;
