import React, { useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import "./B2BMyPageScreen.scss";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";
import { Profile } from "@/components/common/mypage/Profile";

export const B2BMyPageScreen = () => {
  const [isSubs, setIsSubs] = useState(true);
  const nav = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img src={logoText} alt="" />
      </header>

      {/* 프로필 카드 */}
      <Profile img={profileImg} name={"김구밍"} id={"Lion1234"} />

      {/* 구독 배너 */}
      {isSubs ? (
        <div className="plan-banner">
          <div className="plan-banner-content">
            <span className="plan-banner-headline">마스코트 브랜딩 패스 구독하면,</span>
            <span className="plan-banner-caption">캐릭터와 관련된 기능이 무제한!</span>
            <div className="plan-banner-button" onClick={() => nav("/mypage/b2b/subscribe")}>
              혜택 자세히 보기
            </div>
          </div>
          <div className="plan-banner-bubble"></div>
          <div className="plan-banner-bubble"></div>
          <div className="plan-banner-bubble"></div>
        </div>
      ) : (
        <div className="mypage-blank" />
      )}

      {/* 네비게이션, 로그아웃 */}
      <div className="list-content">
        <MyPageListItem text={"QR코드 다운 받기"} onClick={() => nav("/mypage/b2b/download")} />
        <MyPageListItem text={"계정"} />
        <MyPageListItem text={"구독 목록"} onClick={() => nav("/mypage/b2b/subscribe")} />
        <MyPageListItem text={"고객센터"} />
        <MyPageListItem text={"로그아웃"} />
      </div>
    </div>
  );
};
