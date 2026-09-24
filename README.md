# FX Exchange Widget: 60-minute live coding drill

A Revolut-style practice round. React 18 + TypeScript (strict) + Vitest + React Testing Library.
The template compiles and the smoke test passes. Your job is to complete the TODOs.

## Setup

**StackBlitz (recommended):** push this folder to a GitHub repo, then open
`https://stackblitz.com/github/<your-user>/<your-repo>`. It installs and runs `npm run dev` automatically.

**Or:** open https://vite.new/react-ts, delete its `src/`, drag this project's files into the file tree,
and restart the terminal (`npm install && npm run dev`).

Commands:

```bash
npm run dev        # app
npm test           # vitest watch mode
npm run typecheck  # tsc strict
```

## Rules

- 60-minute timer. No AI, no Copilot, no autocomplete extensions.
- No new dependencies. `fetch`/Promises, `Intl`, and array methods only.
- Do **not** edit `src/api.ts`. Treat it as the backend.
- Talk out loud as if an interviewer is watching.
- `CHANGE_REQUEST.md` is sealed. Open it at the **30-minute mark**, whatever stage you're on.

## Files

| File | What's there |
| --- | --- |
| `src/types.ts` | Domain types. `ExchangeState` is yours to model. |
| `src/currencies.ts` | Supported currencies and their minor units (JPY has 0). |
| `src/api.ts` | `fetchRates(base, { signal })`: ~600ms jittered latency, 10% failure, honours `AbortSignal`. |
| `src/App.tsx` | Layout with labelled inputs and staged TODOs. |
| `src/App.test.tsx` | Mocked API, `createMockRates` factory, `it.todo` placeholders. |

---

## Stage 0: Audit (≈5 min)

Read `types.ts`, `api.ts`, and `App.tsx` before writing code. Say out loud what the API does,
how it fails, and what you plan to build first.

## Stage 1: Wire the data (≈15 min)

1. Model `ExchangeState` in `types.ts` so impossible states can't be represented.
2. Make amount, "From", and "To" controlled inputs. Default: `USD` → `EUR`.
3. Fetch rates for the "From" currency on mount and whenever it changes.
4. In the summary card, show:
   - a loading indicator while fetching
   - the rate line, e.g. `1 USD = 0.9200 EUR`
   - an error message if the request fails

## Stage 2: Conversion and input (≈15 min)

1. Accept amounts like `10` and `10.5` (supporting `1,000.25` is optional). Reject:
   - empty, non-numeric, negative, or zero values
   - more decimals than the **source** currency allows (`JPY` allows none)
2. Show an inline validation message and set `aria-invalid` on the input.
3. Show the converted amount, rounded to the **target** currency's minor units and formatted with
   `Intl.NumberFormat` for that currency. No floating-point drift in the displayed value.
4. The swap button swaps "From" and "To".
5. If "From" and "To" are the same, the conversion should still make sense.

## Stage 3: Async resilience (≈15 min)

1. Changing "From" quickly (USD → GBP → JPY) must never show rates for a currency you're no longer on.
   Responses can arrive out of order.
2. On error, show a "Try again" button that refetches.
3. While refetching, keep the last good rate visible instead of blanking the card.
4. No state updates after unmount.

## Stage 4: Tests (≈10 min)

Replace the `it.todo`s in `App.test.tsx`. Query by role and label, never by class name.

1. **Happy path:** type a valid amount, see the formatted converted amount.
2. **Validation:** type an invalid amount, see the message and `aria-invalid="true"`.
3. **Error and recovery:** first call rejects, error shows; click "Try again", rates show.

Bonus: a test proving a slow, stale response doesn't overwrite a newer one.

---

## Follow-up questions to rehearse (last 10 min)

- What happens if the API takes 5 seconds? What if the user clicks swap 10 times?
- Where could floating-point errors creep in, and how did you avoid them?
- How would you structure this if three more screens needed the same rates?
- How would you make the rates live (polling vs. SSE vs. WebSocket), and what are the trade-offs?
- What would you memoize here, and what would be premature?
- How would you test the race condition deterministically?

## Self-review checklist

- [ ] No `any`, no unchecked `as` casts, `tsc` passes
- [ ] No derived values stored in state via `useEffect`
- [ ] Abort errors are not shown to the user as failures
- [ ] Amount math happens in integer minor units, or rounding is explicit and justified
- [ ] Output formatting uses the target currency's code and decimals
- [ ] Data fetching is separated from rendering, so the change request was a small diff
- [ ] Tests pass and would fail if the feature broke
