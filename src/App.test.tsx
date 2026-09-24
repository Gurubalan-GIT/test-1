import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { fetchRates, ApiError } from './api';
import type { CurrencyCode, ExchangeRates } from './types';

vi.mock('./api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./api')>();
  return { ...actual, fetchRates: vi.fn() };
});

const mockedFetchRates = vi.mocked(fetchRates);

// Test data factory: override only what each test cares about.
const createMockRates = (overrides?: Partial<ExchangeRates>): ExchangeRates => ({
  base: 'USD' as CurrencyCode,
  rates: { USD: 1, EUR: 0.9, GBP: 0.8, JPY: 150, CHF: 0.88 },
  timestamp: '2026-01-01T10:00:00.000Z',
  ...overrides,
});

beforeEach(() => {
  mockedFetchRates.mockReset();
  mockedFetchRates.mockResolvedValue(createMockRates());
});

describe('App (smoke)', () => {
  it('renders the exchange form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /exchange/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });
});

// TODO: Stage 4
// Replace the todos with real tests. Query by role/label, not class names.
describe('App', () => {
  it.todo('shows the converted amount after the user enters a valid amount');
  it.todo('flags invalid input (negative / non-numeric / too many decimals)');
  it.todo('shows an error and recovers when the user clicks "Try again"');
});

// Silences unused-import warnings until you use these in Stage 4.
void userEvent;
void ApiError;
