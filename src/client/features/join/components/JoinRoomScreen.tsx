import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useSession } from "@client/stores/session";
import { screenClass, heroTitleClass, heroSubClass, labelClass, backBtnClass } from "../utils/joinShared";
import styles from "./JoinRoom.module.scss";

export function JoinRoomScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSession } = useSession();
  const [playerName, setPlayerName] = useState("");
  const [roomCodeInput, setRoomCodeInput] = useState("");

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim() || !roomCodeInput.trim()) return;
    const code = roomCodeInput.trim().toUpperCase();
    setSession({
      roomCode: code,
      playerName: playerName.trim(),
      role: "player",
    });
    navigate(`/room/${code}`);
  }

  return (
    <div className={screenClass}>
      <div className="mb-8 text-center">
        <h1 className={heroTitleClass}>{t("join.title")}</h1>
        <p className={heroSubClass}>{t("join.subtitle")}</p>
      </div>
      <Card className="w-full max-w-[480px]">
        <form onSubmit={handleJoin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-[0.4rem]">
            <label className={labelClass} htmlFor="room-code">{t("join.roomCode")}</label>
            <InputText
              id="room-code"
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value)}
              placeholder={t("join.roomCodePlaceholder")}
              autoFocus
              style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}
            />
          </div>

          <div className="flex flex-col gap-[0.4rem]">
            <label className={labelClass} htmlFor="player-name">{t("join.yourName")}</label>
            <InputText
              id="player-name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t("join.playerNamePlaceholder")}
            />
          </div>

          <div className={`${styles.formActions} flex items-center gap-3 pt-2`}>
            <button type="button" className={backBtnClass} onClick={() => navigate("/")}>
              {t("common.back")}
            </button>
            <Button
              type="submit"
              label={t("join.enter")}
              icon="pi pi-sign-in"
              disabled={!playerName.trim() || !roomCodeInput.trim()}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
