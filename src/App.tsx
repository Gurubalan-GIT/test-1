import { CURRENCIES } from './currencies';
// import { fetchRates, ApiError } from './api';
// import type { CurrencyCode, ExchangeState } from './types';

export default function App() {
  // TODO: Stage 1
  // - Hold the selected "from" / "to" currencies and the raw amount input.
  // - Fetch rates for the "from" currency on mount and whenever it changes.
  // - Track request state using the ExchangeState type you define in types.ts.

  // TODO: Stage 2
  // - Parse and validate the amount input.
  // - Derive the converted amount (no useEffect + setState for derived values).
  // - Format output with Intl.NumberFormat for the target currency.

  // TODO: Stage 3
  // - Cancel stale requests when "from" changes quickly.
  // - Retry on error.
  // - Keep the last good rate visible while refreshing.

  return (
    <main className="fx">
      <h1 className="fx__title">Exchange</h1>

      <section className="fx__panel" aria-label="Exchange form">
        <div className="fx__row">
          <label className="fx__field">
            <span>Amount</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              // TODO: Stage 1/2: value, onChange, aria-invalid
            />
          </label>

          <label className="fx__field">
            <span>From</span>
            <select /* TODO: Stage 1: value, onChange */>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.name})
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="button" className="fx__swap" aria-label="Swap currencies">
          {/* TODO: Stage 2: swap from/to */}
          ⇅
        </button>

        <div className="fx__row">
          <label className="fx__field">
            <span>To</span>
            <select /* TODO: Stage 1: value, onChange */>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.name})
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* TODO: Stage 2: validation message for invalid amount */}
      </section>

      <section className="fx__summary" aria-label="Conversion summary">
        {/* TODO: Stage 1: loading state */}
        {/* TODO: Stage 1: rate line, e.g. "1 USD = 0.9200 EUR" */}
        {/* TODO: Stage 2: converted amount */}
        {/* TODO: Stage 3: error message + "Try again" button */}
        <p className="fx__muted">Enter an amount to see the conversion.</p>
      </section>
    </main>
  );
}
