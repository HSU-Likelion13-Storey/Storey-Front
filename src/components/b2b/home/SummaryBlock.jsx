import "./SummaryBlock.scss";
import { RiPencilFill } from "react-icons/ri";

export default function SummaryBlock({ title, content, editMode = false, onChangeContent, onEdit }) {
  return (
    <section className="summary">
      <h4 className="summary-title">{title}</h4>
      <div className="summary-box">
        {editMode ? (
          <textarea
            className="summary-textarea"
            value={content}
            onChange={(e) => onChangeContent?.(e.target.value)}
            rows={5}
          />
        ) : (
          <p className="summary-content">{content}</p>
        )}
      </div>

      {/* 보기 모드에서만 우측 '수정하기' 버튼 노출 */}
      {!editMode && (
        <div className="summary-edit">
          <button type="button" className="button-edit" onClick={onEdit}>
            <RiPencilFill className="button-edit-icon" aria-hidden />
            <span className="button-edit-text">수정하기</span>
          </button>
        </div>
      )}
    </section>
  );
}
