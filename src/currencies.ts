import type { Currency, CurrencyCode } from './types';

export const CURRENCIES: readonly Currency[] = [
  { code: 'USD', name: 'US Dollar', minorUnits: 2 },
  { code: 'EUR', name: 'Euro', minorUnits: 2 },
  { code: 'GBP', name: 'British Pound', minorUnits: 2 },
  { code: 'JPY', name: 'Japanese Yen', minorUnits: 0 },
  { code: 'CHF', name: 'Swiss Franc', minorUnits: 2 },
];

export const CURRENCY_CODES: readonly CurrencyCode[] = CURRENCIES.map((c) => c.code);
