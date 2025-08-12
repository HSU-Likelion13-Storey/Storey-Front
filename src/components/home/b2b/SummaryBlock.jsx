import { useNavigate } from "react-router-dom";

export default function SummaryBlock({ title, content }) {
  const nav = useNavigate();
  return (
    <section className="summary">
      <h4 className="summary-title">{title}</h4>
      <div className="summary-box">
        <p className="summary-ontent">{content}</p>
      </div>
      <div className="summary-edit">
        <button className="edit-inline" type="button" onClick={() => nav("/character/edit")}>
          수정하기
        </button>
      </div>
    </section>
  );
}
