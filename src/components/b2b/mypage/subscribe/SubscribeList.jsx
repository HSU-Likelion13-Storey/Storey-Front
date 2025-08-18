import { IoIosArrowBack } from "react-icons/io";
import styles from "./SubscribeList.module.scss";
import { useNavigate } from "react-router-dom";
import { logoEmpty } from "@/assets";

export const SubscribeList = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoIosArrowBack className={styles.icon} onClick={() => nav(-1)} />
        <span className={styles.headerTitle}>구독 목록</span>
        <div className={styles.blank} />
      </div>
      <div className={styles.content}>
        <div className={styles.emptyWrpper}>
          <img src={logoEmpty} alt="" />
          <span className={styles.caption}>구독 목록이 없어요.</span>
        </div>
        <div className={styles.planButton} onClick={() => nav("/mypage/owner/subscribe", { state: true })}>
          프리미엄 보기
        </div>
      </div>
    </div>
  );
};
