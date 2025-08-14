import React from "react";
import styles from "./Share.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import test from "./test.svg";
import { IoIosArrowBack } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { RiShare2Line } from "react-icons/ri";

export const Share = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoIosArrowBack className={styles.backIcon} onClick={() => nav(-1)} />
        <div className={styles.title}>캐릭터 공유</div>
        <div className={styles.blank} />
      </div>
      <img src={test} alt="" />
      <div className={styles.buttonWrapper}>
        <div className={`${styles.button} ${styles.down}`}>
          <HiDownload className={styles.icon} />
          <span>이미지 저장</span>
        </div>
        <div className={`${styles.button} ${styles.share}`}>
          <RiShare2Line className={styles.icon} />
          <span>이미지 공유</span>
        </div>
      </div>
    </div>
  );
};
