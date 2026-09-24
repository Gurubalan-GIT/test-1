export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF';

export interface Currency {
  code: CurrencyCode;
  name: string;
  /** Number of decimal places in the currency's minor unit (USD = 2, JPY = 0). */
  minorUnits: number;
}

export interface ExchangeRates {
  base: CurrencyCode;
  /** 1 unit of `base` = rates[X] units of X. Includes base itself (= 1). */
  rates: Record<CurrencyCode, number>;
  /** ISO timestamp of when the server produced these rates. */
  timestamp: string;
}

// TODO: Stage 1
// Model the async state of the rates request.
// Avoid juggling isLoading / isError booleans.
export type ExchangeState = unknown;
