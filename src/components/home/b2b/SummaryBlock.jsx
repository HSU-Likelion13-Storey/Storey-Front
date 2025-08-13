import "./SummaryBlock.scss";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";

export default function SummaryBlock({ title, content }) {
  const nav = useNavigate();

  return (
    <section className="summary">
      <h4 className="summary-title">{title}</h4>
      <div className="summary-box">
        <p className="summary-content">{content}</p>
      </div>
      <div className="summary-edit">
        <button type="button" className="button-edit" onClick={() => nav("/home/b2b/edit")}>
          <RiPencilFill className="button-edit-icon" aria-hidden />
          <span className="button-edit-text">수정하기</span>
        </button>
      </div>
    </section>
  );
}
