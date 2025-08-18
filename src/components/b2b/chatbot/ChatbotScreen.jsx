import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import CharacterBlock from "../home/CharacterBlock";
import { getUserStep, fetchBotReply, createCharacterOnServer } from "./chat.service";
import { mapBotChunksToMsgs } from "./mapper";
import profile from "@/assets/profile.svg";
import LoadingModal from "./LoadingModal.jsx";
import "./ChatbotScreen.scss";

const uid = () => Math.random().toString(36).slice(2);

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
    text: "몇 가지 질문만 답해 주시면\n바로 캐릭터를 만들어 드릴게요!\n가게 이름의 뜻은 무엇인가요?",
  },
];

export function ChatbotScreen({ onDone }) {
  const nav = useNavigate();

  const [messages, setMessages] = useState(INTRO_MSGS());
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const userStep = useMemo(() => getUserStep(messages), [messages]);

  const push = (...msgs) => setMessages((prev) => [...prev, ...msgs.map((m) => ({ id: uid(), ...m }))]);

  async function handleSend(e) {
    e.preventDefault();
    if (loading) return;

    const text = input.trim();
    if (!text) return;

    push({ role: "user", type: "text", text });
    setInput("");

    // 챗봇 응답 처리
    setTyping(true);
    try {
      const chunks = await fetchBotReply({ step: userStep, userText: text });
      const botMsgs = mapBotChunksToMsgs(chunks);
      push(...botMsgs);
    } finally {
      setTyping(false);
    }
  }

  async function onChoiceClick(label) {
    if (loading) return;
    push({ role: "user", type: "text", text: label });

    if (/등록/.test(label)) {
      setLoading(true);
      try {
        const result = await createCharacterOnServer({ from: messages });
        if (result?.ok) {
          if (typeof onDone === "function") onDone();
          else nav("/chatbot/complete");
        } else {
          push({ role: "bot", type: "text", text: "오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setMessages(INTRO_MSGS());
    }
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
          {m.text}
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
          placeholder="메시지를 입력해주세요"
          disabled={loading}
        />
        <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
          <FaArrowUpLong className="send-icon" />
        </button>
      </form>

      <LoadingModal open={loading} text="만들어지는 중..." />
    </div>
  );
}

export default ChatbotScreen;
