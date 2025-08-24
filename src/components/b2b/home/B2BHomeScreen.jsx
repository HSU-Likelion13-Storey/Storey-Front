import { useEffect, useState } from "react";
import Banner from "./Banner";
import CharacterBlock from "./CharacterBlock";
import SummaryBlock from "./SummaryBlock";
import Modal from "./Modal";
import logo from "../../../assets/logo-text.svg";
import "./B2BHomeScreen.scss";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getCharacter, updateCharacter } from "@/apis/character/characterApi";

export default function B2BHomeScreen() {
  const [data, setData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { characterId } = useAuthStore(); // store에서 characterId 가져오기
  const nav = useNavigate();

  // 캐릭터 조회
  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;
      try {
        const char = await getCharacter(characterId);
        if (char) {
          const initial = {
            banner: {
              title: "깜짝 이벤트 올리기!",
              subtitle: "오늘은 햄버거 추천 어때요?",
              onClick: () => nav("/home/owner/event"),
            },
            character: {
              speech: char.tagline || "",
              imageSrc: char.imageUrl,
              name: char.name,
              description: char.description,
            },
            summary: {
              title: "가게 요약 서사",
              content: char.narrativeSummary || "",
            },
          };
          setData(initial);
          setDraft(initial);
        }
      } catch (e) {
        console.error("캐릭터 조회 실패:", e);
      }
    };
    fetchCharacter();

    const hidden = localStorage.getItem("hideB2BHomeGuide") === "1";
    if (!hidden) setShowGuide(true);
  }, [characterId, nav]);

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

  // 캐릭터 수정
  const saveEdit = async () => {
    try {
      const payload = {
        name: draft.character.name,
        description: draft.character.description,
        tagline: draft.character.speech,
        narrativeSummary: draft.summary.content,
      };
      const updated = await updateCharacter(characterId, payload);

      console.log("업데이트 응답:", updated);

      if (updated) {
        const newData = {
          ...data,
          character: {
            ...data.character,
            name: updated.name,
            description: updated.description,
            speech: updated.tagline,
          },
          summary: {
            ...data.summary,
            content: updated.narrativeSummary,
          },
        };
        setData(newData);
        setDraft(newData);
        setIsEditing(false);
      }
    } catch (e) {
      console.error("캐릭터 수정 실패:", e);
    }
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
