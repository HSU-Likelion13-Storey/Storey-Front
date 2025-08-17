import { mascotBubbleSplash } from "@/assets";
import styles from "./Splash.module.scss";
import { useState } from "react";

export const Splash = ({ closeFn }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className={`${styles.container} ${visible && styles.visible}`}>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={mascotBubbleSplash} />
        </div>
        <div className={styles.title}>
          <h1>스토어리</h1>
          <span className={styles.caption}>가게 스토리, 캐릭터가 되다.</span>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            setVisible(false);
            closeFn();
          }}>
          시작하기
        </div>
      </div>
    </div>
  );
};
