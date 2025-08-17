import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import EmptyStateCard from "./EmptyStateCard";
import PreGuideModal from "./PreGuideModal";
import logo from "../../../assets/logo-text.svg";
import questionIcon from "../../../assets/questionIcon.svg";
import "./B2BHomePreScreen.scss";

export default function B2BHomePreScreen() {
  const nav = useNavigate();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("b2b_guide_pre_v1") === "1";
    if (!seen) setShowGuide(true);
  }, []);

  const handleCloseGuide = () => setShowGuide(false);
  const handleNeverGuide = () => localStorage.setItem("b2b_guide_pre_v1", "1");

  const bannerData = {
    title: "깜짝 이벤트 올리기!",
    subtitle: "오늘은 햄버거 추천 어때요?",
    onClick: () => nav("/home/b2b/event"),
  };

  return (
    <>
      <header className="b2b-header">
        <img src={logo} alt="스토어리 로고" />
      </header>

      <main className="b2b-home">
        <Banner {...bannerData} />

        <EmptyStateCard onBtnClick={() => nav("/home/b2b/chatbot")} />

        <section className="summary">
          <p className="summary-title">가게 요약 서사</p>
          <div className="summary-box empty">
            <img className="summary-placeholder" src={questionIcon} alt="물음표" />{" "}
          </div>
        </section>
      </main>

      <PreGuideModal open={showGuide} onClose={handleCloseGuide} onNever={handleNeverGuide} />
    </>
  );
}
