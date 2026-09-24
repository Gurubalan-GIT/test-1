# 🔒 Change request: open at the 30-minute mark

> Product has a new requirement that ships with this ticket.

1. Rates must **auto-refresh every 10 seconds** for the current "From" currency.
2. Show when rates were last updated, e.g. `Updated 4s ago`, ticking live.
3. **Pause** refreshing while the browser tab is hidden. Refresh immediately when it becomes visible again.
4. A failed background refresh must **not** wipe the displayed rate. Show a subtle
   "Couldn't refresh rates" note instead, and keep retrying on the normal interval.

Before coding, say out loud:

- Which parts of your existing code change, and which don't?
- How this interacts with your cancellation logic from Stage 3.
- How you'd test the interval (hint: Vitest fake timers).
