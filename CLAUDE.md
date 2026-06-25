# nte-token-bag

React 19 + TypeScript 5 + Vite 6 SPA — token bag simulator for *Not the End* (TTRPG).

The real-time backend (Cloudflare Workers + Durable Objects via PartySocket) is not yet implemented.
All room logic currently lives in the in-memory mock (`features/room/api/useRoom.mock.ts`).

## Architecture

The client follows a **feature-based, unidirectional** layout inspired by
[bulletproof-react](https://github.com/alan2207/bulletproof-react). Code flows in one
direction only: **shared → features → app**.

- **`app/`** — composition root: providers, router, and route components. Composes features.
- **`features/`** — self-contained modules (`room`, `join`). A feature must **not** import from another feature; cross-feature composition happens in `app/`.
- **`components/`, `stores/`, `hooks/`, `lib/`** — shared building blocks. These must **not** import from `features/` or `app/`.
- These boundaries are enforced by `eslint-plugin-import`'s `import/no-restricted-paths` rule (`eslint.config.js`). Run `npm run lint`.

> bulletproof-react normally exposes each feature through a barrel `index.ts`; this project forbids barrels (see Conventions), so use direct file imports and rely on the ESLint zones for isolation.

## Conventions

- **TypeScript strict mode** everywhere (`strict: true` in tsconfig.json).
- **Named exports only** — no default exports anywhere.
- **`src/shared/protocol.ts`** contains all wire types. Zero imports from browser APIs or React — this file will be shared verbatim with the future Cloudflare Worker server. Stays at `src/shared/` (not under `client/`).
- **`src/client/features/room/api/useRoom.ts`** is a delegation shim. Its exported interface (`UseRoomResult`) and function signature must never change. Only the import target changes when switching from mock to PartySocket.
- **Mock** lives in `src/client/features/room/api/useRoom.mock.ts`. Future PartySocket implementation will be `src/client/features/room/api/useRoom.party.ts`.
- **Feature components** live in `src/client/features/<feature>/components/`; truly shared components live in `src/client/components/`. No barrel `index.ts` files.
- **Global session state** lives in `src/client/stores/session.tsx`.
- **No barrel `index.ts` files** anywhere.
- **IDs** generated with `crypto.randomUUID()`.
- **Path aliases**: `@shared/*` → `src/shared/*`, `@client/*` → `src/client/*`.

## Project layout

```
src/
  shared/
    protocol.ts                 # wire types (ClientMsg / ServerMsg / RoomState / …) — unchanged, @shared
  client/
    main.tsx                    # entry point — renders <App/>
    app/                        # composition root
      app.tsx                   # App = AppProvider + AppRouter
      provider.tsx              # PrimeReact + Router + Session providers, theme, HexBackground
      router.tsx                # <Routes>
      routes/                   # home / create / join / room route components
    features/
      room/
        api/
          useRoom.ts            # stable shim — import here, never from .mock directly
          useRoom.mock.ts       # in-memory implementation
        components/             # RoomView, BagView, PlayerPanel, NarratorPanel, DrawLog
      join/
        components/             # ChooseScreen, CreateRoomScreen, JoinRoomScreen
        utils/                  # joinShared (shared className strings)
    components/                 # shared components (HexBackground)
    stores/
      session.tsx               # SessionProvider / useSession (global session)
    styles/
      global.css
```

## Running

```bash
npm install
npm run dev
```

## Adding the real backend

1. Create `src/client/features/room/api/useRoom.party.ts` implementing the same `UseRoomResult` interface using PartySocket.
2. Update the single import line in `src/client/features/room/api/useRoom.ts`.
3. Create `src/server/index.ts` — the Durable Object class (imports `@shared/protocol`).
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
