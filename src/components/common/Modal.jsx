import { useEffect } from "react";
import "./Modal.scss";
export const Modal = ({
  title,
  caption,
  cancel = "",
  confirm = "",
  cancelFn = () => {},
  confirmFn = () => {},
  confirmType = true,
  img = "",
}) => {
  // 타이머 타입일 경우 3초간 띄우기
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
    <div className={`confirm-modal`} onClick={cancelFn}>
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
        ) : (
          <img src={img} className="modal-img" alt="" />
        )}
      </div>
    </div>
  );
};
