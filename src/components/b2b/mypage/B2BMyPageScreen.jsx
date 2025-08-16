import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import "./B2BMyPageScreen.scss";

export const B2BMyPageScreen = () => {
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
        <ListItem text={"구독 상태 확인하기"} onClick={() => nav("/mypage/b2b/subscribe")} />
        <ListItem text={"QR코드 다운 받기"} onClick={() => nav("/mypage/b2b/download")} />
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
