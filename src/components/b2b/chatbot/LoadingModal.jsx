import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./LoadingModal.scss";

export default function LoadingModal({ open, text = "로딩 중..." }) {
  if (!open) return null;

  // ESC/백드롭 닫기 차단
  useEffect(() => {
    const prevent = (e) => e.stopPropagation();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") e.preventDefault();
    });
    return () => {
      document.removeEventListener("keydown", prevent);
    };
  }, []);

  const modal = (
    <div className="loading-modal" role="dialog" aria-modal="true" aria-label={text}>
      <div className="loading-box">
        <div className="loading-text">{text}</div>
        <div className="loader-dots">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
