// 테스트 데이터
import { testlogo } from "@/assets";

export function getUserStep(messages) {
  return messages.filter((m) => m.role === "user").length;
}

export async function fetchBotReply({ step, userText }) {
  await wait(450);

  if (step === 0) {
    return [
      { type: "text", text: "뜻 너무 멋진데요?" },
      { type: "text", text: "이 가게를 시작하게 된 계기가 궁금해요!" },
    ];
  }

  if (step === 1) {
    return [
      { type: "text", text: "그런 서사가 있었군요~ ㅎㅎ" },
      { type: "text", text: "가게의 인테리어 분위기는 어떻고, 왜 그런 느낌으로 연출하셨나요?" },
    ];
  }

  return [
    {
      type: "text",
      text: "감사합니다! 사장님의 이야기가 담긴 캐릭터를 곧 만들어드릴게요~ 잠시만 기다려주세요:)",
    },
    {
      type: "card",
      speech: "행복한 하루의 위로를 선물해드릴게요.",
      imageSrc: testlogo,
      name: "하루치",
      description:
        "하루치는 따뜻하고 말이 느린 아이에요, ‘버거는 패스트푸드가 아니다. 정성이 담긴 슬로우푸드다'가 좌우명이랍니다.",
    },
    {
      type: "text",
      text: "사장님 가게만의 캐릭터가 만들어졌어요!\n[이름: 하루치]\n[성격: 따뜻, 소심]\n이러한 서사를 가지고 있어요~",
    },
    { type: "choices", options: ["다시 만들래요", "등록할게요!"] },
  ];
}

export async function createCharacterOnServer(payload) {
  await wait(1000);
  return { ok: true, id: "char_mock_001" };
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
