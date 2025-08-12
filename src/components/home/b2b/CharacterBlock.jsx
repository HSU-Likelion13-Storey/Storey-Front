import { useNavigate } from "react-router-dom";

export default function CharacterBlock({ speech, imageSrc, name, description }) {
  const nav = useNavigate();
  return (
    <section className="block">
      <div className="block-hint">사용자에게 보여지는 멘트로, 수정이 가능해요.</div>
      <div className="block-bubble">{speech}</div>
      <div className="block-card">
        <img className="block-img" src={imageSrc} alt={name} />
        <h3 className="block-name">{name}</h3>
        <p className="block-desc">{description}</p>
      </div>
      <div className="block-edit">
        <button className="edit-inline" type="button" onClick={() => nav("/character/edit")}>
          수정하기
        </button>
      </div>
    </section>
  );
}
