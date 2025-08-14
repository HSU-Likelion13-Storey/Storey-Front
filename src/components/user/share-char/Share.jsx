import React, { useEffect } from "react";
import styles from "./Share.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { RiShare2Line } from "react-icons/ri";
import { useDownload } from "@/hooks/useDownload";

export const Share = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  const { ref, download } = useDownload("test.png");

  useEffect(() => {
    console.log(state);
  }, [state]);

  const shareHandle = async () => {
    if (navigator.share) {
      const res = await fetch(state.preview); // 또는 base64 url
      const blob = await res.blob();
      const file = new File([blob], "character.png", { type: blob.type });

      try {
        await navigator.share({
          files: [file],
          title: "내 캐릭터 공유",
          text: "내 캐릭터를 공유합니다!",
        });
        console.log("공유 성공!");
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoIosArrowBack className={styles.backIcon} onClick={() => nav(-1)} />
        <div className={styles.title}>캐릭터 공유</div>
        <div className={styles.blank} />
      </div>
      <img src={state.preview} ref={ref} alt="" />
      <div className={styles.buttonWrapper}>
        <div className={`${styles.button} ${styles.down}`} onClick={download}>
          <HiDownload className={styles.icon} />
          <span>이미지 저장</span>
        </div>
        <div className={`${styles.button} ${styles.share}`}>
          <RiShare2Line className={styles.icon} onClick={shareHandle} />
          <span>이미지 공유</span>
        </div>
      </div>
    </div>
  );
};
