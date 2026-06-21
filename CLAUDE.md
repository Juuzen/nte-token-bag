# nte-token-bag

React 19 + TypeScript 5 + Vite 6 SPA — token bag simulator for *Not the End* (TTRPG).

The real-time backend (Cloudflare Workers + Durable Objects via PartySocket) is not yet implemented.
All room logic currently lives in the in-memory mock (`useRoom.mock.ts`).

## Conventions

- **TypeScript strict mode** everywhere (`strict: true` in tsconfig.json).
- **Named exports only** — no default exports anywhere.
- **`src/shared/protocol.ts`** contains all wire types. Zero imports from browser APIs or React — this file will be shared verbatim with the future Cloudflare Worker server.
- **`src/client/useRoom.ts`** is a delegation shim. Its exported interface (`UseRoomResult`) and function signature must never change. Only the import target changes when switching from mock to PartySocket.
- **Mock** lives in `src/client/useRoom.mock.ts`. Future PartySocket implementation will be `src/client/useRoom.party.ts`.
- **Components** live in `src/client/components/`. No barrel `index.ts` files.
- **No CSS frameworks** — plain global CSS (`src/client/index.css`).
- **IDs** generated with `crypto.randomUUID()`.
- **Path aliases**: `@shared/*` → `src/shared/*`, `@client/*` → `src/client/*`.

## Project layout

```
src/
  shared/
    protocol.ts        # wire types (ClientMsg / ServerMsg / RoomState / …)
  client/
    main.tsx
    App.tsx
    useRoom.ts         # stable shim — import here, never from .mock directly
    useRoom.mock.ts    # in-memory implementation
    index.css
    components/
      JoinRoom.tsx
      BagView.tsx
      PlayerPanel.tsx
      NarratorPanel.tsx
      DrawLog.tsx
```

## Running

```bash
npm install
npm run dev
```

## Adding the real backend

1. Create `src/client/useRoom.party.ts` implementing the same `UseRoomResult` interface using PartySocket.
2. Update the single import line in `src/client/useRoom.ts`.
3. Create `src/server/index.ts` — the Durable Object class.
4. Add `wrangler.toml` and deploy to Cloudflare Workers.

## Draw algorithm (mock)

Weighted pick proportional to bag counts:

```
total = positive + negative + random
roll  = Math.random() * total
kind  = roll < positive              ? "positive"
      : roll < positive + negative   ? "negative"
      : "random"
resolved = kind !== "random" ? kind
         : Math.random() < config.randomPositiveProbability ? "positive" : "negative"
```

Default `randomPositiveProbability = 0.5`.
