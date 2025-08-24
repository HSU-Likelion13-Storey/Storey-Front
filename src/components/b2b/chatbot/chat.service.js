import { createInterview, submitInterview } from "@/apis/chatbot/interviewApi";
import { confirmOwnerCharacter } from "@/apis/chatbot/ownerCharacterApi";
import { useAuthStore } from "@/store/useAuthStore";

export function getUserStep(messages) {
  return messages.filter((m) => m.role === "user" && m.type === "text").length;
}

// 질문 총 개수
const MAX_QUESTIONS = 5;

export async function fetchBotReply({ step, userText, context, setLoading }) {
  // 첫 질문 (가게 분위기 선택 후 시작)
  if (step === 0 && context?.selectedMood) {
    const res = await createInterview({
      storeMood: context.selectedMood,
      businessType: context.businessType || "기타",
    });
    if (!res?.isSuccess) throw new Error("첫 질문 생성 실패");
    return [{ type: "text", text: res?.data?.nextQuestion }];
  }

  const { setCharacterId } = useAuthStore.getState();

  // 캐릭터 생성
  if (step >= MAX_QUESTIONS) {
    if (setLoading) setLoading(true);
    try {
      const res = await confirmOwnerCharacter();
      if (!res?.isSuccess) throw new Error("캐릭터 생성 실패");

      const char = res.data;
      setCharacterId(char.characterId);

      return [
        { type: "text", text: "사장님 가게만의 캐릭터가 완성되었어요! 🎉" },
        {
          type: "card",
          imageSrc: char.imageUrl,
          name: char.name,
          speech: char.tagline,
          description: char.description,
        },
        { type: "text", text: `한줄 요약: ${char.narrativeSummary}` },
        { type: "choices", options: ["다시 만들래요", "등록할게요!"] },
      ];
    } finally {
      if (setLoading) setLoading(false);
    }
  }

  // 중간 질문 (2~5번째)
  const res = await submitInterview({ answer: userText });
  if (!res?.isSuccess) throw new Error("답변 제출 실패");

  if (res?.data?.nextQuestion) {
    return [{ type: "text", text: res.data.nextQuestion }];
  }

  return [{ type: "text", text: "질문을 불러오지 못했어요. 잠시 후 다시 시도해 주세요." }];
}
