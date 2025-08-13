import { useEffect, useState } from "react";
import Banner from "./Banner";
import CharacterBlock from "./CharacterBlock";
import SummaryBlock from "./SummaryBlock";
import logo from "../../../assets/logo-text.svg";
import "./B2BHomeScreen.scss";

export default function B2BHomeScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // (임시) TODO: API로 교체
    setData({
      banner: { title: "깜짝 이벤트 올리기!", subtitle: "오늘은 햄버거 추천 어때요?" },
      character: {
        speech: "행복한 하루와 위로를 선물해드릴게요.",
        imageSrc: "/src/assets/mascot-happy.svg",
        name: "하루치",
        description: `하루치는 따뜻하고 말이 느린 아이에요, ‘버거는 패스트푸드가 아니다. 정성이 담긴 슬로우푸드다'가 좌우명이랍니다.`,
      },
      summary: {
        title: "가게 요약 서사",
        content: `“하루 한 끼, 진심으로 위로받는 식사"를 만들기 위해 퇴사 후 작은 가게를 연 사장님의 이야기가 담겨 있는 캐릭터로 하루 30개 한정의 수제버거, 그리고 ‘고추마요 쉬림프버거’에 담긴 정성이 이 가게의 심장이다.`,
      },
    });
  }, []);

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
    </>
  );
}
