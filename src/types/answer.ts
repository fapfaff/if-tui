export type Answer = string | string[] | boolean | number;

/**
 * Checks if the provided answer is a string.
 * @param answer - The answer to check.
 * @returns True if the answer is a string, false otherwise.
 */
export function isStringAnswer(amswer: Answer): amswer is string {
  return typeof amswer === 'string';
}
