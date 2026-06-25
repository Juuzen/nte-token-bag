import { Navigate, Route, Routes } from "react-router-dom";
import { HomeRoute } from "./routes/home";
import { CreateRoute } from "./routes/create";
import { JoinRoute } from "./routes/join";
import { RoomRoute } from "./routes/room";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/create" element={<CreateRoute />} />
      <Route path="/join" element={<JoinRoute />} />
      <Route path="/room/:roomCode" element={<RoomRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
