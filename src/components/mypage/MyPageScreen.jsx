import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { logoText, profileImg } from "@/assets";
import "./MyPageScreen.scss";

export const MyPageScreen = ({ children }) => {
  const [role, setRole] = useState("user");

  return (
    <div className="container">
      <header className={`header ${role === "user" && "header-user"}`}>
        <img src={logoText} alt="" />
        <div className="blank"></div>
      </header>
      <div className={`profile-card ${role === "user" && "profile-user"}`}>
        <div className="profile-content">
          <img src={profileImg} alt="" />
          <span>최사장</span>
        </div>
      </div>
      <div className="list-content">
        {role === "user" ? (
          <ListItem text={"나의 캐릭터 도감"} />
        ) : (
          <>
            <ListItem text={"구독 상태 확인하기"} />
            <ListItem text={"QR코드 다운 받기"} />
          </>
        )}

        <ListItem text={"로그아웃"} logout={true}>
          <MdOutlineLogout className="icon" />
        </ListItem>
      </div>
      {children}
    </div>
  );
};

const ListItem = ({ children, logout = false, text }) => {
  return (
    <div className={`list-item ${logout && "logout"}`}>
      <span>{text}</span>
      {children ? children : <IoIosArrowForward className="icon" />}
    </div>
  );
};
