import React, { useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";
import { Profile } from "@/components/common/mypage/Profile";
import "./UserMyPageScreen.scss";
import { Modal } from "@/components/common/Modal";
import api from "@/apis/Instance";
import { useAuthStore } from "@/store/useAuthStore";

export const UserMyPageScreen = () => {
  const [collection, setCollection] = useState([]);
  const [logoutModal, setLogoutModal] = useState(false);
  const nav = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    console.log("로그아웃");
    try {
      const res = await api.post("auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      logout();
    }
  };

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
