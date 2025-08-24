import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import CharacterBlock from "../home/CharacterBlock";
import { getUserStep, fetchBotReply } from "./chat.service";
import { regenerateOwnerCharacter } from "@/apis/chatbot/ownerCharacterApi";
import { mapBotChunksToMsgs } from "./mapper";
import profile from "@/assets/profile.svg";
import LoadingModal from "./LoadingModal.jsx";
import "./ChatbotScreen.scss";
import { useAuthStore } from "@/store/useAuthStore";

const uid = () => Math.random().toString(36).slice(2);
const MOOD_OPTIONS = ["아늑한", "고급스러운", "힙한", "활기찬", "자연친화적인", "유쾌한", "로맨틱", "모던"];

const INTRO_MSGS = () => [
  { id: uid(), role: "bot", type: "profile", name: "밍구", avatar: profile },
  { id: uid(), role: "bot", type: "text", text: "안녕하세요. 저는 밍구라고해요 😊" },
  {
    id: uid(),
    role: "bot",
    type: "text",
    text: "사장님의 가게 이야기를\n귀여운 캐릭터로 만들어 손님이 찾아와\n캐릭터를 수집하게 도와드려요.😚",
  },
  {
    id: uid(),
    role: "bot",
    type: "text",
    text: "몇 가지 질문만 답해주시면\n바로 캐릭터를 만들어드릴게요!\n그럼 시작할게요!",
  },
  { id: uid(), role: "bot", type: "text", text: "먼저 가게 분위기를 골라주세요!" },
  { id: uid(), role: "bot", type: "choices", options: MOOD_OPTIONS },
];

export function ChatbotScreen({ onDone }) {
  const nav = useNavigate();

  const [businessType] = useState(() => localStorage.getItem("business_type") || "기타");
  const [messages, setMessages] = useState(INTRO_MSGS());
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const userStep = useMemo(() => getUserStep(messages), [messages]);
  const push = (...msgs) => setMessages((prev) => [...prev, ...msgs.map((m) => ({ id: uid(), ...m }))]);

  async function handleSend(e) {
    e.preventDefault();
    if (loading || !selectedMood) return;

    const text = input.trim();
    if (!text) return;

    push({ role: "user", type: "text", text });
    setInput("");

    const isFinalStep = userStep >= 5;

    if (isFinalStep) {
      push({
        role: "bot",
        type: "text",
        text: "감사합니다!\n사장님의 이야기가 담긴\n캐릭터를 곧 만들어드릴게요~\n잠시만 기다려주세요 :)",
      });

      setTimeout(async () => {
        setLoading(true);
        try {
          const chunks = await fetchBotReply({
            step: userStep,
            userText: text,
            context: { selectedMood, businessType },
            setLoading,
          });
          push(...mapBotChunksToMsgs(chunks));
        } catch (e) {
          push({ role: "bot", type: "text", text: "캐릭터 생성 중 오류가 발생했어요." });
          console.error(e);
        } finally {
          setLoading(false);
        }
      }, 500);

      return;
    }

    setTyping(true);
    try {
      const chunks = await fetchBotReply({
        step: userStep,
        userText: text,
        context: { selectedMood, businessType },
      });
      push(...mapBotChunksToMsgs(chunks));
    } catch (e) {
      push({ role: "bot", type: "text", text: "오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
      console.error(e);
    } finally {
      setTyping(false);
    }
  }

  async function onChoiceClick(label) {
    if (loading) return;

    // 분위기 선택
    if (MOOD_OPTIONS.includes(label)) {
      setSelectedMood(label);
      push({ role: "user", type: "text", text: `분위기: ${label}` });

      setTyping(true);
      try {
        const chunks = await fetchBotReply({
          step: 0,
          userText: "",
          context: { selectedMood: label, businessType },
        });
        push(...mapBotChunksToMsgs(chunks));
      } catch (e) {
        push({ role: "bot", type: "text", text: "첫 질문을 불러오지 못했어요." });
        console.error(e);
      } finally {
        setTyping(false);
      }
      return;
    }

    // 등록 버튼 클릭 시 확정 (API 호출 X, 바로 완료 페이지 이동)
    if (/등록/.test(label)) {
      onDone ? onDone() : nav("/chatbot/complete");
      return;
    }

    const { setCharacterId } = useAuthStore.getState();

    // 다시 만들래요 버튼 클릭 시 캐릭터 재생성 API 호출
    if (/다시/.test(label)) {
      setLoading(true);
      try {
        const res = await regenerateOwnerCharacter();
        if (res?.isSuccess) {
          const char = res.data;
          setCharacterId(char.characterId);
          push(
            { role: "bot", type: "text", text: "새로운 캐릭터가 생성되었어요! 🎉" },
            {
              role: "bot",
              type: "card",
              imageSrc: char.imageUrl,
              name: char.name,
              speech: char.tagline,
              description: char.description,
            },
            { role: "bot", type: "text", text: `한줄 요약: ${char.narrativeSummary}` },
            { role: "bot", type: "choices", options: ["다시 만들래요", "등록할게요!"] },
          );
        } else {
          push({ role: "bot", type: "text", text: "캐릭터 재생성에 실패했어요. 다시 시도해주세요." });
        }
      } catch (e) {
        console.error(e);
        push({ role: "bot", type: "text", text: "에러가 발생했어요. 잠시 후 다시 시도해주세요." });
      } finally {
        setLoading(false);
      }
      return;
    }

    // 초기화
    setSelectedMood(null);
    setMessages(INTRO_MSGS());
  }

  function renderMessage(m) {
    if (m.type === "profile") {
      return (
        <div key={m.id} className="bot-profile">
          <img className="bot-avatar" src={m.avatar} alt={`${m.name} 프로필`} />
          <div className="bot-meta">
            <div className="bot-name">{m.name}</div>
          </div>
        </div>
      );
    }
    if (m.type === "text") {
      return (
        <div key={m.id} className={`bubble ${m.role}`}>
          {m.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
      );
    }
    if (m.type === "choices") {
      return (
        <div key={m.id} className="choices">
          {m.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`chip ${/등록/.test(opt) ? "primary" : ""}`}
              onClick={() => onChoiceClick(opt)}
              disabled={loading}
              aria-label={opt}>
              {opt}
            </button>
          ))}
        </div>
      );
    }
    if (m.type === "card") {
      return (
        <div key={m.id} className="card-wrapper">
          <CharacterBlock
            speech={m.speech}
            imageSrc={m.imageSrc}
            name={m.name}
            description={m.description}
            editMode={false}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="chatbot-screen">
      <div className="chatbot-header">
        <IoIosArrowBack className="icon" onClick={() => nav(-1)} />
        <span className="headerTitle">마스코트 캐릭터 생성하기</span>
      </div>

      <div className="message-list" ref={listRef} role="log" aria-busy={typing || loading}>
        {messages.map(renderMessage)}
        {typing && <div className="bubble bot typing">입력 중...</div>}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={selectedMood ? "메시지를 입력해주세요" : "먼저 분위기를 선택해 주세요"}
          disabled={loading || !selectedMood}
        />
        <button type="submit" className="send-btn" disabled={loading || !input.trim() || !selectedMood}>
          <FaArrowUpLong className="send-icon" />
        </button>
      </form>

      <LoadingModal open={loading} text="만들어지는 중..." />
    </div>
  );
}

export default ChatbotScreen;
