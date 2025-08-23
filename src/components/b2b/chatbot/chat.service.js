import { createInterview, submitInterview } from "@/apis/chatbot/interviewApi";
import { confirmOwnerCharacter } from "@/apis/chatbot/ownerCharacterApi";

export function getUserStep(messages) {
  return messages.filter((m) => m.role === "user" && m.type === "text").length;
}

export async function fetchBotReply({ step, userText, context }) {
  if (step === 0 && context?.selectedMood) {
    const res = await createInterview({
      storeMood: context.selectedMood,
      businessType: context.businessType || "기타",
    });
    if (!res?.isSuccess) throw new Error("첫 질문 생성 실패");
    return [{ type: "text", text: res?.data?.nextQuestion }];
  }

  const res = await submitInterview({ answer: userText });
  if (!res?.isSuccess) throw new Error("답변 제출 실패");

  //  마지막 (캐릭터 + 인터뷰 요약)
  if (res?.data?.imageUrl || res?.data?.summary) {
    const chunks = [];
    if (res?.data?.finalMessage) {
      chunks.push({ type: "text", text: res.data.finalMessage });
    } else {
      chunks.push({ type: "text", text: "사장님 가게만의 캐릭터가 만들어졌어요! 확인해 보세요 😊" });
    }
    chunks.push({
      type: "card",
      imageSrc: res.data.imageUrl,
      name: "마스코트",
      speech: res.data.summary,
      description: res.data.summary,
    });
    chunks.push({ type: "text", text: `한줄 요약: ${res.data.summary || "요약 없음"}` });
    chunks.push({ type: "choices", options: ["다시 만들래요", "등록할게요!"] });
    return chunks;
  }

  if (res?.data?.nextQuestion) return [{ type: "text", text: res.data.nextQuestion }];

  return [{ type: "text", text: "질문을 불러오지 못했어요. 잠시 후 다시 시도해 주세요." }];
}

// 캐릭터 등록 확정
export async function confirmCharacterOnServer() {
  try {
    const res = await confirmOwnerCharacter();
    return { ok: !!res?.isSuccess };
  } catch {
    return { ok: false };
  }
}
