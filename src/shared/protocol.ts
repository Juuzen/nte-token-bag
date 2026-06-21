export type TokenKind = "positive" | "negative" | "random";
export type Role = "narrator" | "player";

export interface Bag {
  positive: number;
  negative: number;
  random: number;
}

export interface DrawnToken {
  id: string;
  drawn: TokenKind;
  resolved: "positive" | "negative";
  by: string;
  at: number;
}

export interface RoomConfig {
  randomPositiveProbability: number;
}

export interface PendingRequest {
  id: string;
  playerId: string;
  playerName: string;
  requestedAt: number;
}

export interface Player {
  id: string;
  name: string;
  role: Role;
}

export interface RoomState {
  bag: Bag;
  contributors: Record<string, Bag>;
  history: DrawnToken[];
  pendingRequests: PendingRequest[];
  players: Player[];
  config: RoomConfig;
}

// ── Client → Server ───────────────────────────────────────────────────────────

export interface AddTokensMsg {
  type: "addTokens";
  playerId: string;
  tokens: Bag;
}

export interface RequestDrawMsg {
  type: "requestDraw";
  playerId: string;
  playerName: string;
}

export interface DrawMsg {
  type: "draw";
  narratorId: string;
  narratorName: string;
}

export interface ResolveRequestMsg {
  type: "resolveRequest";
  requestId: string;
  narratorId: string;
}

export interface RemoveTokensMsg {
  type: "removeTokens";
  tokens: Bag;
}

export interface SetBagMsg {
  type: "setBag";
  bag: Bag;
}

export interface SetConfigMsg {
  type: "setConfig";
  config: Partial<RoomConfig>;
}

export interface ResetMsg {
  type: "reset";
}

export type ClientMsg =
  | AddTokensMsg
  | RequestDrawMsg
  | DrawMsg
  | ResolveRequestMsg
  | RemoveTokensMsg
  | SetBagMsg
  | SetConfigMsg
  | ResetMsg;

// ── Server → Client ───────────────────────────────────────────────────────────

export interface StateMsg {
  type: "state";
  state: RoomState;
}

export interface DrawResultMsg {
  type: "drawResult";
  token: DrawnToken;
}

export interface ErrorMsg {
  type: "error";
  message: string;
}

export type ServerMsg = StateMsg | DrawResultMsg | ErrorMsg;
