import "./ConfirmModal.scss";

export const ConfirmModal = ({ title, caption, cancel, confirm, cancelFn, confirmFn }) => {
  return (
    <div className="confirm-modal">
      <div className="modal-content">
        <div className="modal-text">
          <div className="modal-title">{title}</div>
          <div className="modal-caption">{caption}</div>
        </div>
        <div className="modal-btn-wrapper">
          <button className="modal-btn cancel" onClick={cancelFn}>
            {cancel}
          </button>
          <button className="modal-btn confirm" onClick={confirmFn}>
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
