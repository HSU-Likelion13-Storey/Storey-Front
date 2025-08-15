import { useEffect, useState } from "react";
import Banner from "./Banner";
import CharacterBlock from "./CharacterBlock";
import SummaryBlock from "./SummaryBlock";
import Modal from "./Modal";
import logo from "../../../assets/logo-text.svg";
import "./B2BHomeScreen.scss";
import { testlogo } from "@/assets";

export default function B2BHomeScreen() {
  const [data, setData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // (임시) TODO: API로 교체
    setData({
      banner: { title: "깜짝 이벤트 올리기!", subtitle: "오늘은 햄버거 추천 어때요?" },
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
    });

    // 로컬스토리지에서 가이드 표시 여부 확인
    const hidden = localStorage.getItem("hideB2BHomeGuide") === "1";
    if (!hidden) setShowGuide(true);
  }, []);

  const handleConfirmModal = () => setShowGuide(false);
  const handleNeverShow = () => {
    localStorage.setItem("hideB2BHomeGuide", "1");
    setShowGuide(false);
  };

  if (!data) return null;

  return (
    <>
      <header className="b2b-header">
        <img src={logo} alt="스토어리 로고" />
      </header>

      <main className="b2b-home">
        <Banner {...data.banner} />
        <CharacterBlock {...data.character} />
        <SummaryBlock {...data.summary} />
      </main>

      <Modal open={showGuide} onConfirm={handleConfirmModal} onNever={handleNeverShow} />
    </>
  );
}
