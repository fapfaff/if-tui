export type Answer = string | string[] | boolean | number | undefined;

/**
 * Checks if the provided answer is a string.
 * @param answer - The answer to check.
 * @returns True if the answer is a string, false otherwise.
 */
export function isStringAnswer(amswer: Answer): amswer is string {
  return typeof amswer === 'string';
}

/**
 * Checks if the provided answer is a boolean.
 * @param answer - The answer to check.
 * @returns True if the answer is a boolean, false otherwise.
 */
export function isBooleanAnswer(amswer: Answer): amswer is boolean {
  return typeof amswer === 'boolean';
}
