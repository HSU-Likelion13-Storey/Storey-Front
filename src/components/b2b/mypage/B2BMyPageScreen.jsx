import React, { useEffect, useState } from "react";
import { logoText, profileImg } from "@/assets";
import { useNavigate } from "react-router-dom";
import styles from "./B2BMyPageScreen.module.scss";
import { MyPageListItem } from "@/components/common/mypage/MyPageListItem";
import { Profile } from "@/components/common/mypage/Profile";
import { Modal } from "@/components/common/Modal";
import api from "@/apis/Instance";
import { useAuthStore } from "@/store/useAuthStore";

export const B2BMyPageScreen = () => {
  const [isSubs, setIsSubs] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [profile, setProfile] = useState({
    nickName: "김구밍",
    loginId: "lion1234",
  });
  const nav = useNavigate();
  const { logout } = useAuthStore();

  const handleSubscribe = (isBanner) => {
    if (isBanner) nav("/mypage/owner/subscribe");
    else if (isSubs) nav("/mypage/owner/subscribe", { state: true });
    else nav("/mypage/owner/subscribe/list");
  };

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

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const res = await api.get("owner/subscription");
        if (res.data.isSuccess && res.data.data.status == "ACTIVE") setIsSubs(true);
      } catch (error) {
        console.error("실패", error);
        setIsSubs(false);
      }
    };
    const getProfile = async () => {
      try {
        const res = await api.get("owner/mypage");
        if (res.data.isSuccess) setProfile(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
    getSubscription();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <img src={logoText} alt="" />
      </header>

      {/* 프로필 카드 */}
      <Profile img={profileImg} name={profile.nickName} id={profile.loginId} />

      {/* 구독 배너 */}
      {!isSubs ? (
        <div className={styles["plan-banner"]}>
          <div className={styles["plan-banner-content"]}>
            <span className={styles["plan-banner-headline"]}>마스코트 브랜딩 패스 구독하면,</span>
            <span className={styles["plan-banner-caption"]}>캐릭터와 관련된 기능이 무제한!</span>
            <div className={styles["plan-banner-button"]} onClick={() => handleSubscribe(true)}>
              혜택 자세히 보기
            </div>
          </div>
          <div className={styles["plan-banner-bubble"]}></div>
          <div className={styles["plan-banner-bubble"]}></div>
          <div className={styles["plan-banner-bubble"]}></div>
        </div>
      ) : (
        <div className={styles["mypage-blank"]} />
      )}

      {/* 네비게이션, 로그아웃 */}
      <div className={styles["list-content"]}>
        <MyPageListItem text={"QR코드 다운 받기"} onClick={() => nav("/mypage/owner/download")} />
        <MyPageListItem text={"계정"} />
        <MyPageListItem text={"구독 목록"} onClick={() => handleSubscribe(false)} />
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
