import qr from "../../../assets/qr.svg";
import footerModal from "../../../assets/footer-modal.svg";
import "./Modal.scss";

export default function Modal({ open, onConfirm, onNever }) {
  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onConfirm?.();
  };

  return (
    <div className="qrmodal-backdrop" onClick={onBackdrop}>
      <div className="qrmodal-panel">
        <div className="qrmodal-content">
          {/* 1단계 안내 */}
          <div className="qrmodal-step">
            <span className="step-num">1</span>
            <p>
              마이페이지 → QR 다운받기에서
              <br />
              QR을 저장하고,
            </p>
          </div>

          {/* 홈 & 마이페이지 아이콘 + QR 다운로드 버튼 */}
          <div className="qrmodal-footerimgwrap">
            <img src={footerModal} alt="홈, 마이페이지 아이콘과 QR 다운로드 버튼" className="qrmodal-footerimg" />
          </div>

          {/* 2단계 안내 */}
          <div className="qrmodal-step">
            <span className="step-num">2</span>
            <p>
              가게 곳곳에 배치해 손님들이
              <br />
              캐릭터 도감을 수집하게 해주세요!
            </p>
          </div>

          {/* QR 이미지 */}
          <div className="qrmodal-qrwrap">
            <img src={qr} alt="가게 QR코드" className="qrmodal-qr" />
          </div>

          {/* 확인 버튼 */}
          <button type="button" className="qrmodal-button" onClick={onConfirm}>
            네, 알겠어요!
          </button>
        </div>
      </div>

      {/* 다시 보지 않기 */}
      <div className="qrmodal-footer">
        <button type="button" className="qrmodal-link" onClick={onNever}>
          다시 보지 않기
        </button>
      </div>
    </div>
  );
}
