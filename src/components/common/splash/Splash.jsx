import { mascotBubbleSplash } from "@/assets";
import styles from "./Splash.module.scss";
import { useEffect, useState } from "react";

export const Splash = ({ closeFn }) => {
  const [visible, setVisible] = useState(true);

  // 스플래시 화면이 열릴 때 스크롤 제어
  useEffect(() => {
    if (visible) {
      // 스크롤을 맨 위로 이동
      window.scrollTo(0, 0);
      // 스크롤 비활성화
      document.body.style.overflow = "hidden";
    } else {
      // 스크롤 활성화
      document.body.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

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
