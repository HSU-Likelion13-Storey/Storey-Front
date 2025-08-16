import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";

export const UserMyPageScreen = () => {
  const [role, setRole] = useState("b2b"); // TODO 테스트용 사용자 상태. 추후 보관된 사용자 정보를 불러올 예정.
  const nav = useNavigate();
  return (
    <div className="container">
      {/* Header */}
      <header className={`header ${role === "user" && "header-user"}`}>
        <img src={logoText} alt="" />
        <div className="blank"></div>
      </header>

      {/* 프로필 카드 */}
      <div className={`profile-card ${role === "user" && "profile-user"}`}>
        <div className="profile-content">
          <img src={profileImg} alt="" />
          <span>최사장</span>
        </div>
      </div>

      {/* 네비게이션, 로그아웃 */}
      <div className="list-content">
        <ListItem text={"나의 캐릭터 도감"} onClick={() => nav("/mypage/user/collection")} />
        <ListItem text={"로그아웃"} />
      </div>
    </div>
  );
};

const ListItem = ({ children, logout = false, text, onClick }) => {
  return (
    <div className={`list-item ${logout && "logout"}`} onClick={onClick}>
      <span>{text}</span>
      {children ? children : <IoIosArrowForward className="icon" />}
    </div>
  );
};
