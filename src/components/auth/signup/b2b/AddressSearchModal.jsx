import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import DaumPostcode from "react-daum-postcode";
import "./AddressSearchModal.scss";

export default function AddressSearchModal({ open, onClose, onSelect }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName) {
        extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
      }
      if (extraAddress) fullAddress += ` (${extraAddress})`;
    }

    onSelect?.({
      zonecode: data.zonecode,
      address: fullAddress,
      sido: data.sido,
      sigungu: data.sigungu,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
    });
    onClose?.();
  };

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="address-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      aria-modal="true"
      role="dialog">
      <div className="address-modal">
        <div className="address-modal__header">
          <strong>주소 검색</strong>
          <button type="button" className="address-modal__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="address-modal__body">
          <DaumPostcode onComplete={handleComplete} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
