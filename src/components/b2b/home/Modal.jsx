import modal from "../../../assets/qr-modal.svg";
import "./Modal.scss";

export default function Modal({ open, onConfirm, onNever, imageSrc = modal }) {
  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onConfirm?.();
  };

  return (
    <div className="qrmodal-backdrop" onClick={onBackdrop}>
      <div className="qrmodal-panel">
        <div className="qrmodal-imgwrap">
          <img className="qrmodal-img" src={imageSrc} alt="QR 모달창" />
          <button type="button" className="qrmodal-button" onClick={onConfirm}>
            네, 알겠어요!
          </button>
        </div>

        <div className="qrmodal-footer">
          <button type="button" className="qrmodal-link" onClick={onNever}>
            다시 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
