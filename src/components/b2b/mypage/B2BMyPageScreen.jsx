import React, { useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import "./B2BMyPageScreen.scss";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";
import { Profile } from "@/components/common/mypage/Profile";
import { Modal } from "@/components/common/Modal";

export const B2BMyPageScreen = () => {
  const [isSubs, setIsSubs] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    console.log("로그아웃");
  };

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
        <MyPageListItem text={"로그아웃"} onClick={() => setLogoutModal(true)} />
      </div>

      {logoutModal && (
        <Modal
          title="정말 로그아웃 하시겠어요?"
          caption="저희 스토어리 또 방문해주실꺼죠?"
          cancel="안 나갈래요"
          confirm="나갈래요"
          cancelFn={() => {
            setLogoutModal(false);
          }}
          confirmFn={handleLogout}
        />
      )}
    </div>
  );
};
