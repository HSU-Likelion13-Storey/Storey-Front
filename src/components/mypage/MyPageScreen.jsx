import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { logoText, profileImg } from "@/assets";
import "./MyPageScreen.scss";

export const MyPageScreen = ({ children }) => {
  return (
    <div className="container">
      <header className="header">
        <img src={logoText} alt="" />
        <div className="blank"></div>
      </header>
      <div className="profile-card">
        <div className="profile-content">
          <img src={profileImg} alt="" />
          <span>최사장</span>
        </div>
      </div>
      <div className="list-content">
        <div className="list-item">
          <span>구독 상태 확인하기</span>
          <IoIosArrowForward />
        </div>
        <div className="list-item">
          <span>QR코드 다운 받기</span>
          <IoIosArrowForward />
        </div>
        <div className="list-item logout">
          <span>로그아웃</span>
          <MdOutlineLogout />
        </div>
      </div>
      {children}
    </div>
  );
};
