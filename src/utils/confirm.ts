import convertYesNoToBoolean from './convertYesNoToBoolean.ts';
import {
  readLines, yellow, cyan, green, bold
} from '../deps.ts';

/**
 * Shows confirmation message which captures "Yes" or "No" from user.
 * Repeat the question for invalid input.
 */
const confirm = async (question: string, hint: string): Promise<boolean | undefined> => {
  const showQuestion = () => {
    const formattedQuestion: string = question ? `${question}\n` : '';
    const hintPrefix: string = yellow('? ');
    const options: string = green('[Y/N]');
    const formattedHint: string = cyan(`${hint} ${options}: `);
    const fullHint: string = bold(`${hintPrefix}${formattedHint}`);
    Deno.stdout.write(new TextEncoder().encode(`${formattedQuestion}${fullHint}`));
  };

  showQuestion();

  // Continue reading until user inputs a valid "Yes" "No" answer
  for await (const line of readLines(Deno.stdin)) {
    const answer: boolean | null = convertYesNoToBoolean(line);
    if (answer !== null) {
      return answer;
    }
    showQuestion();
  }
};

export default confirm;
