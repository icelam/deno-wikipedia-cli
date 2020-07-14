/**
 * Accepts a user input and detect if it is valid "Yes" or "No" answer.
 * Converts "yes" / "y" to true, "no" / "n" to false. Non-case sensitive.
 */
const convertYesNoToBoolean = (input: string): boolean | null => {
  const lowercaseInput: string = input.toLowerCase();
  if (!['yes', 'no', 'y', 'n'].includes(lowercaseInput)) {
    return null;
  }

  return (lowercaseInput === 'yes' || lowercaseInput === 'y');
};

export default convertYesNoToBoolean;
