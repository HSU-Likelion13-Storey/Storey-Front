import { logoText, mascotNone } from "@/assets";
import "./UserHome.scss";
import { MapContent } from "./MapContent";
import { useState } from "react";

export const UserHome = () => {
  const [modalState, setModalState] = useState({ open: true, visible: true });

  const modalHandle = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
    setTimeout(() => setModalState((prev) => ({ ...prev, open: false })), 300);
  };

  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <MapContent />

      {/* 모달 */}
      {modalState.open && (
        <div className={`home-modal ${modalState.visible && "visible"}`}>
          <div className="modal-content">
            <div className="message-wrapper">
              <span className="caption">사장님의 스토리가 담긴 캐릭터를 모아봐요✨</span>
              <span className="message">
                <span>가게를 방문해 QR 코드를 찍어 캐릭터를 수집해보세요!</span>
              </span>
            </div>
            <img src={mascotNone} alt="" />
          </div>
          <button className="modal-btn" onClick={modalHandle}>
            네, 알겠습니다!
          </button>
        </div>
      )}
    </div>
  );
};
