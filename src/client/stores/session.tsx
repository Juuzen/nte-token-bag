import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Role } from "@shared/protocol";

export interface Session {
  roomCode: string;
  playerName: string;
  role: Role;
  narratorKey?: string;
  isLocal?: boolean;
}

const STORAGE_KEY = "nte:session";

function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw === null ? null : (JSON.parse(raw) as Session);
  } catch {
    return null;
  }
}

interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(loadSession);

  const setSession = useCallback((next: Session) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSessionState(next);
  }, []);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSessionState(null);
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (ctx === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
