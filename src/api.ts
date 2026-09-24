import type { CurrencyCode, ExchangeRates } from './types';
import { CURRENCY_CODES } from './currencies';

/**
 * Mock rates API. Do not edit during the challenge; treat it like a real backend.
 *
 * Behaviour:
 * - Latency ~600ms with jitter (200ms to 1000ms), so responses CAN arrive out of order.
 * - 10% of requests fail with an ApiError (status 503).
 * - Rates drift slightly on every call, so stale data is visible.
 * - Honours AbortSignal: rejects with a DOMException named 'AbortError'.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const USD_BASED: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CHF: 0.88,
};

const FAILURE_RATE = 0.1;
const BASE_LATENCY_MS = 600;
const JITTER_MS = 400;

function drift(value: number): number {
  // +/- 0.5%
  return value * (1 + (Math.random() - 0.5) * 0.01);
}

function buildRates(base: CurrencyCode): ExchangeRates {
  const baseInUsd = USD_BASED[base];
  const rates = {} as Record<CurrencyCode, number>;
  for (const code of CURRENCY_CODES) {
    rates[code] = code === base ? 1 : drift(USD_BASED[code] / baseInUsd);
  }
  return { base, rates, timestamp: new Date().toISOString() };
}

export function fetchRates(
  base: CurrencyCode,
  options: { signal?: AbortSignal } = {},
): Promise<ExchangeRates> {
  const { signal } = options;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'));
      return;
    }

    const latency = BASE_LATENCY_MS + (Math.random() * 2 - 1) * JITTER_MS;

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Request aborted', 'AbortError'));
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      if (Math.random() < FAILURE_RATE) {
        reject(new ApiError('Rates service unavailable', 503));
        return;
      }
      resolve(buildRates(base));
    }, latency);

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
