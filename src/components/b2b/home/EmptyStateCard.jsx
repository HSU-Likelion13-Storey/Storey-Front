import React from "react";
import "./EmptyStateCard.scss";
import questionIcon from "../../../assets/questionIcon.svg";

export default function EmptyStateCard({ onBtnClick, BtnText = "캐릭터 만들러가기", visible }) {
  return (
    <section className="block">
      <div className="block-card empty">
        <div className="empty-hero">
          <img className="empty-q" src={questionIcon} alt="물음표" />
          <button type="button" className={`empty-btn ${visible && "empty-btn-visible"}`} onClick={onBtnClick}>
            {BtnText}
          </button>
        </div>
      </div>
    </section>
  );
}
