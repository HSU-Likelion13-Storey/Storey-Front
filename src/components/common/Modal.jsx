import { useEffect, useState } from "react";
import "./Modal.scss";

// 사용할 컴포넌트에서 모달 상태를 관리하고, props로 모달을 닫을 함수를 연결해줘야 함(cancelFn으로)
export const Modal = ({
  state = true,
  title, // 모달 제목
  caption, // 모달 설명
  cancel = "", // 취소 버튼 이름, 없으면 확인 버튼만 있도록 설정
  confirm = "", // 확인 버튼 이름
  cancelFn = () => {}, // 취소 버튼 콜백 함수. 닫는 로직도 여기에 담아서 보내줘야 함
  confirmFn = () => {}, // 확인 버튼 콜백 함수
  confirmType = true, // 확인 모달인지, 자동 닫힘 모달인지 구분
  img = "", // 이미지
  autoCloseSec = 3, // 자동 닫힘 시간
}) => {
  const [isVisible, setIsVisible] = useState(false); // fade-in, out을 설정할 상태

  // 타이머 타입일 경우 3초간 띄우기
  useEffect(() => {
    let timer;
    if (!confirmType) {
      timer = setTimeout(() => {
        clickHandle(cancelFn);
      }, autoCloseSec * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [confirmType, cancelFn, autoCloseSec]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 부드러운 모달을 위한 지연시간 추가(언마운트 시 바로 삭제되지 않음)
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
