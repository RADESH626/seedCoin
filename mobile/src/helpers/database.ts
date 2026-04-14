import { log } from '../services/logger';
import { isNativeDatabaseError as checkNativeError } from '../database/types';

/**
 * HELPER: Simple Retry pattern for Native SQLite errors (like NPE or lock collisions).
 * Centralized utility for the data layer (Services and Hooks).
 */
export async function withNativeRetry<T>(
  fn: () => Promise<T>,
  label: string,
  maxRetries = 3,
  delayMs = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (maxRetries > 0 && checkNativeError(error)) {
      log.warn(`${label}: Native engine error detected. Retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return withNativeRetry(fn, label, maxRetries - 1, delayMs);
    }
    log.error(`${label}: Final error after retry`, error);
    throw error;
  }
}
