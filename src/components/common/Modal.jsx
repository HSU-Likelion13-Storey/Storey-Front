import { useEffect } from "react";
import "./Modal.scss";
export const Modal = ({
  title,
  caption,
  cancel = "",
  confirm = "",
  cancelFn = () => {},
  confirmFn = () => {},
  confirmType = false,
}) => {
  useEffect(() => {
    let timer;
    if (!confirmType) {
      timer = setTimeout(() => {
        cancelFn();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [confirmType, cancelFn]);

  return (
    <div className="confirm-modal" onClick={!confirmType && cancelFn}>
      <div className="modal-content">
        <div className="modal-text">
          <div className="modal-title">{title}</div>
          <div className="modal-caption">{caption}</div>
        </div>
        {confirmType ? (
          <div className="modal-btn-wrapper">
            <button className="modal-btn cancel" onClick={cancelFn}>
              {cancel}
            </button>
            <button className="modal-btn confirm" onClick={confirmFn}>
              {confirm}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
