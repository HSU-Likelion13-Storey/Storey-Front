import React, { useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";
import { Profile } from "@/components/common/mypage/Profile";
import "./UserMyPageScreen.scss";

export const UserMyPageScreen = () => {
  const [collection, setCollection] = useState([]);
  const nav = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img src={logoText} alt="" />
      </header>

      {/* 프로필 카드 */}
      <Profile img={profileImg} name={"김구밍"} id={"Lion1234"} />
      <div className="collection-button" onClick={() => nav("/mypage/user/collection")}>
        내가 모은 캐릭터 {collection.length}개
      </div>

      {/* 네비게이션, 로그아웃 */}
      <div className="list-content">
        <MyPageListItem text={"계정"} />
        <MyPageListItem text={"고객센터"} />
        <MyPageListItem text={"로그아웃"} />
      </div>
    </div>
  );
};
