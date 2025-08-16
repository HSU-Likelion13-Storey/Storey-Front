import React, { useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import "./B2BMyPageScreen.scss";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";

export const B2BMyPageScreen = () => {
  const [role, setRole] = useState("b2b"); // TODO 테스트용 사용자 상태. 추후 보관된 사용자 정보를 불러올 예정.
  const nav = useNavigate();
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img src={logoText} alt="" />
      </header>

      {/* 프로필 카드 */}
      <div className="profile-card">
        <img src={profileImg} alt="" />
        <div className="profile-content">
          <span className="profile-name">김구밍</span>
          <span className="profile-id">Lion1234</span>
        </div>
      </div>

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
