import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  open,
  onClose,
  children,
  autoCloseMs = 1600,
  closeOnOverlay = true, // 배경 클릭 시 닫기
}) => {
  const modalRef = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => modalRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
      prevFocus.current && prevFocus.current.focus?.();
    };
  }, [open]);

  // 자동 닫기
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const t = setTimeout(() => onClose?.(), autoCloseMs);
    return () => clearTimeout(t);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  const overlayProps = {
    className: "modal-overlay",
    role: "dialog",
    "aria-modal": "true",
    onClick: closeOnOverlay ? onClose : undefined,
  };

  return createPortal(
    <div {...overlayProps}>
      <div className="modal" onClick={(e) => e.stopPropagation()} tabIndex={-1} ref={modalRef}>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
