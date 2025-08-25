import "./CharacterBlock.scss";

export default function CharacterBlock({
  speech,
  imageSrc,
  name,
  description,
  editMode = false,
  onChangeSpeech,
  onChangeName,
  onChangeDescription,
}) {
  return (
    <section className="block">
      <div className="block-card">
        <p className="block-hint">사용자에게 보여지는 멘트로, 수정이 가능해요.</p>

        {/* 말풍선 */}
        {editMode ? (
          <div className="block-bubble editable">
            <textarea value={speech} onChange={(e) => onChangeSpeech?.(e.target.value)} rows={2} maxLength={30} />
          </div>
        ) : (
          <div className="block-bubble">{`${speech}`}</div>
        )}

        <img className="block-img" src={imageSrc} alt={name} />

        {/* 이름 */}
        {editMode ? (
          <input
            className="block-name-input"
            value={name}
            onChange={(e) => onChangeName?.(e.target.value)}
            maxLength={12}
          />
        ) : (
          <p className="block-name">{name}</p>
        )}

        {/* 설명 */}
        {editMode ? (
          <textarea
            className="block-desc-input"
            value={description}
            onChange={(e) => onChangeDescription?.(e.target.value)}
            rows={3}
          />
        ) : (
          <p className="block-desc">{description}</p>
        )}
      </div>
    </section>
  );
}
