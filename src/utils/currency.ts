/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Formats a given number into Indian Rupee (₹) currency format.
 * Follows the Indian numbering system (e.g., ₹1,299 instead of ₹1.29k or standard million split).
 * Returns compact integer string if there are no decimals, or standard formatted decimal if there is paise.
 */
export function formatINR(amount: number): string {
  const hasDecimals = amount % 1 !== 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount);
}
