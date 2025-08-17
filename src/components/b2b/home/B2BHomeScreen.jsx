import { useEffect, useState } from "react";
import Banner from "./Banner";
import CharacterBlock from "./CharacterBlock";
import SummaryBlock from "./SummaryBlock";
import Modal from "./Modal";
import logo from "../../../assets/logo-text.svg";
import "./B2BHomeScreen.scss";
import { testlogo } from "@/assets";
import { useNavigate } from "react-router-dom";

export default function B2BHomeScreen() {
  const [data, setData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const initial = {
      banner: {
        title: "깜짝 이벤트 올리기!",
        subtitle: "오늘은 햄버거 추천 어때요?",
        onClick: () => nav("/home/b2b/event"),
      },
      character: {
        speech: "행복한 하루와 위로를 선물해드릴게요.",
        imageSrc: testlogo,
        name: "하루치",
        description: `하루치는 따뜻하고 말이 느린 아이에요, ‘버거는 패스트푸드가 아니다. 정성이 담긴 슬로우푸드다'가 좌우명이랍니다.`,
      },
      summary: {
        title: "가게 요약 서사",
        content: `“하루 한 끼, 진심으로 위로받는 식사"를 만들기 위해 퇴사 후 작은 가게를 연 사장님의 이야기가 담겨 있는 캐릭터로 하루 30개 한정의 수제버거, 그리고 ‘고추마요 쉬림프버거’에 담긴 정성이 이 가게의 심장이다.`,
      },
    };
    setData(initial);
    setDraft(initial);

    const hidden = localStorage.getItem("hideB2BHomeGuide") === "1";
    if (!hidden) setShowGuide(true);
  }, [nav]);

  const isChanged =
    !!data &&
    !!draft &&
    (draft.character.speech !== data.character.speech ||
      draft.character.name !== data.character.name ||
      draft.character.description !== data.character.description ||
      draft.summary.content !== data.summary.content);

  if (!data || !draft) return null;

  const handleConfirmModal = () => setShowGuide(false);
  const handleNeverShow = () => {
    localStorage.setItem("hideB2BHomeGuide", "1");
    setShowGuide(false);
  };

  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setDraft(data);
    setIsEditing(false);
  };
  const saveEdit = async () => {
    // TODO: API 연동
    setData(draft);
    setIsEditing(false);
  };

  const setDraftCharacter = (patch) => setDraft((p) => ({ ...p, character: { ...p.character, ...patch } }));
  const setDraftSummary = (patch) => setDraft((p) => ({ ...p, summary: { ...p.summary, ...patch } }));

  return (
    <>
      <header className="b2b-header">
        <img src={logo} alt="스토어리 로고" />
      </header>

      <main className={`b2b-home ${isEditing && !isChanged ? "editing-idle" : ""}`}>
        <Banner {...data.banner} />

        <CharacterBlock
          speech={isEditing ? draft.character.speech : data.character.speech}
          imageSrc={data.character.imageSrc}
          name={isEditing ? draft.character.name : data.character.name}
          description={isEditing ? draft.character.description : data.character.description}
          editMode={isEditing}
          onChangeSpeech={(v) => setDraftCharacter({ speech: v })}
          onChangeName={(v) => setDraftCharacter({ name: v })}
          onChangeDescription={(v) => setDraftCharacter({ description: v })}
        />

        <SummaryBlock
          title={data.summary.title}
          content={isEditing ? draft.summary.content : data.summary.content}
          editMode={isEditing}
          onChangeContent={(v) => setDraftSummary({ content: v })}
          onEdit={startEdit}
        />

        {isEditing && (
          <div className="page-edit-row">
            <button type="button" className="button cancel" onClick={cancelEdit}>
              취소
            </button>
            <button
              type="button"
              className="button confirm"
              onClick={saveEdit}
              disabled={!isChanged}
              aria-disabled={!isChanged}>
              수정하기
            </button>
          </div>
        )}
      </main>

      <Modal open={showGuide} onConfirm={handleConfirmModal} onNever={handleNeverShow} />
    </>
  );
}
