import "./CharacterBlock.scss";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";

export default function CharacterBlock({ speech, imageSrc, name, description }) {
  const nav = useNavigate();

  return (
    <section className="block">
      <div className="block-card">
        <p className="block-hint">사용자에게 보여지는 멘트로, 수정이 가능해요.</p>
        <div className="block-bubble">{`“${speech}”`}</div>

        <img className="block-img" src={imageSrc} alt={name} />
        <p className="block-name">{name}</p>
        <p className="block-desc">{description}</p>

        <div className="block-edit">
          <button type="button" className="button-edit" onClick={() => nav("/home/owner/edit")}>
            <RiPencilFill className="button-edit-icon" aria-hidden />
            <span className="button-edit-text">수정하기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
