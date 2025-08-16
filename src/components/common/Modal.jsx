import { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false); // fade-in, out을 설정할 상태
  // 타이머 타입일 경우 3초간 띄우기
  useEffect(() => {
    let timer;
    if (!confirmType) {
      timer = setTimeout(() => {
        clickHandle(cancelFn);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [confirmType, cancelFn]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const clickHandle = (callback) => {
    setIsVisible(false);
    setTimeout(callback, 300);
  };

  return (
    <div className={`confirm-modal ${isVisible ? "fade-in" : "fade-out"}`} onClick={() => clickHandle(cancelFn)}>
      <div className="modal-content">
        <div className="modal-text">
          {title && <div className="modal-title">{title}</div>}
          <div className="modal-caption">{caption}</div>
        </div>
        {confirmType ? (
          <>
            {img && <img src={img} className="side-img" alt="" />}
            <div className="modal-btn-wrapper">
              {cancel && (
                <button className="modal-btn cancel" onClick={() => clickHandle(cancelFn)}>
                  {cancel}
                </button>
              )}
              <button className="modal-btn confirm" onClick={() => clickHandle(confirmFn)}>
                {confirm}
              </button>
            </div>
          </>
        ) : img !== "" ? (
          <img src={img} className="modal-img" alt="" />
        ) : (
          <div className="blank"></div>
        )}
      </div>
    </div>
  );
};
