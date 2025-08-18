import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import CharacterBlock from "../home/CharacterBlock";
import { getUserStep, fetchBotReply, createCharacterOnServer } from "./chat.service";
import { mapBotChunksToMsgs } from "./mapper";
import "./ChatbotScreen.scss";

export function ChatbotScreen({ onDone }) {
  const nav = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: uid(),
      role: "bot",
      type: "text",
      text: "안녕하세요. 저는 밍구라고해요 😊\n사장님 가게 이야기로 캐릭터를 만들어볼게요!\n먼저 가게 이름의 뜻은 무엇인가요?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const userStep = useMemo(() => getUserStep(messages), [messages]);

  const push = (...msgs) => setMessages((prev) => [...prev, ...msgs.map((m) => ({ id: uid(), ...m }))]);

  async function handleSend(e) {
    e.preventDefault();
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
    push({ role: "user", type: "text", text: label });

    if (/등록/.test(label)) {
      setTyping(true);
      const result = await createCharacterOnServer({ from: messages });
      setTyping(false);

      if (result?.ok) {
        push({ role: "bot", type: "text", text: "캐릭터 등록이 완료되었습니다! 🎉" });
        onDone?.();
      } else {
        push({ role: "bot", type: "text", text: "오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
      }
    } else {
      // 다시 만들기
      setMessages([{ id: uid(), role: "bot", type: "text", text: "가게 이름의 뜻은 무엇인가요?" }]);
    }
  }

  function renderMessage(m) {
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

      <div className="message-list" ref={listRef} role="log">
        {messages.map(renderMessage)}
        {typing && <div className="bubble bot typing">입력 중...</div>}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력해주세요" />
        <button type="submit" className="send-btn">
          <FaArrowUpLong className="send-icon" />
        </button>
      </form>
    </div>
  );
}

const uid = () => Math.random().toString(36).slice(2);
export default ChatbotScreen;
