import styles from "./CharacterDetail.module.scss";
import { logoTest, logoText, shadowChar } from "@/assets";
import { FiDownload } from "react-icons/fi";
import { HiCamera } from "react-icons/hi2";

export const CharacterDetail = () => {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.blank} />
        <img src={logoText} alt="" />
        <HiCamera className={styles.icon} />
      </div>

      {/* 메인 콘텐츠(제목, 카드, 다운로드) */}
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.headline}>참새방앗간</span>
          <span className={styles.address}>서울 성북구 삼선교로 11길 20 1층</span>
        </div>
        <div className={styles.card}>
          <div className={styles.message}>
            <span>“들어왔으면, 한 잔부터 받아요. 오늘은 어땠어요?”</span>
          </div>
          <div className={styles.character}>
            <img src={logoTest} className={styles.char} alt="" />
            <img src={shadowChar} className={styles.charShadow} alt="" />
          </div>
          <span className={styles.name}>짹이</span>
          <span className={styles.caption}>
            수다쟁이 & 다정다감하고, ‘하루쯤은 떠들고 웃고 맛있는 걸 마셔야지.’가 좌우명이다.
          </span>
        </div>
        <div className={styles.download}>
          <FiDownload className={styles.icon} />
          <span className={styles.downText}>이미지 저장</span>
        </div>
      </div>

      {/* 가게 요약 서사 */}
      <div className={styles.summary}>
        <span className={styles.summaryTitle}>가게 요약 서사</span>
        <div className={styles.summaryText}>
          “하루 한 끼, 진심으로 위로받는 식사"를 만들기 위해 퇴사 후 작은 가게를 연 사장님의 이야기가 담겨 있는 캐릭터로
          하루 30개 한정의 수제버거, 그리고 ‘고추마요 쉬림프버거’에 담긴 정성이 이 가게의 심장이다.
        </div>
      </div>
    </div>
  );
};
