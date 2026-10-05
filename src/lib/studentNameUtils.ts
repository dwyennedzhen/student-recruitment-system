/**
 * Student Name formatting utilities for Sisters of Mary School - Girlstown, Inc.
 * Consolidates individual name components into official Full Name representation:
 * Format: "LAST NAME, FIRST NAME MIDDLE NAME SUFFIX"
 *
 * Handles:
 * - Missing middle names or suffixes
 * - Existing "-" or "N/A" middle name placeholders without printing trailing dashes
 * - Preserving hyphenated names (e.g. SA-AN, DELA CRUZ-SANTOS)
 * - Preserving special characters and accents (e.g. Ñ, É)
 * - Preventing double spaces, double commas, and trailing punctuation
 */

export function cleanNamePart(val?: string | null): string {
  if (!val) return '';
  return val.replace(/\s+/g, ' ').trim();
}

export function isPlaceholderMiddleName(val?: string | null): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  if (!trimmed) return true;
  // Placeholders used when a student has no middle name (e.g. "-", "--", "N/A", "None")
  return /^[-—_.\s]+$/.test(trimmed) || /^(n\/?a|none|null|undefined)$/i.test(trimmed);
}

export function formatFullName(
  lastName?: string | null,
  firstName?: string | null,
  middleName?: string | null,
  suffix?: string | null
): string {
  const cleanLast = cleanNamePart(lastName).toUpperCase();
  const cleanFirst = cleanNamePart(firstName).toUpperCase();
  const rawMiddle = cleanNamePart(middleName);
  const cleanMiddle = isPlaceholderMiddleName(rawMiddle) ? '' : rawMiddle.toUpperCase();
  const cleanSuffix = cleanNamePart(suffix).toUpperCase();

  if (!cleanLast && !cleanFirst) {
    return [cleanMiddle, cleanSuffix].filter(Boolean).join(' ');
  }

  if (!cleanLast) {
    return [cleanFirst, cleanMiddle, cleanSuffix].filter(Boolean).join(' ');
  }

  const givenParts = [cleanFirst, cleanMiddle, cleanSuffix].filter(Boolean).join(' ');

  if (!givenParts) {
    return cleanLast;
  }

  return `${cleanLast}, ${givenParts}`;
}

export function getStudentFullName(student?: {
  lastName?: string | null;
  surname?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  suffix?: string | null;
  fullName?: string | null;
} | null): string {
  if (!student) return '';
  return formatFullName(
    student.lastName || student.surname,
    student.firstName,
    student.middleName,
    student.suffix
  );
}
