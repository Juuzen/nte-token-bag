import { Navigate } from "react-router-dom";
import { useSession } from "@client/stores/session";
import { RoomView } from "@client/features/room/components/RoomView";

export function RoomRoute() {
  const { session } = useSession();
  if (session === null) {
    return <Navigate to="/join" replace />;
  }
  return <RoomView session={session} />;
}
