import styles from "./CharacterDetail.module.scss";
import { logoTest, shadowChar } from "@/assets";
import { Modal } from "@/components/common/Modal";
import { useDownload } from "@/hooks/useDownload";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { HiCamera } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const mock = {
  title: "참새방앗간",
  address: "서울 성북구 삼선교로 11길 20 1층",
  message: "“들어왔으면, 한 잔부터 받아요. 오늘은 어땠어요?”",
  img: logoTest,
  name: "짹이",
  caption: "수다쟁이 & 다정다감하고, ‘하루쯤은 떠들고 웃고 맛있는 걸 마셔야지.’가 좌우명이다.",
  story:
    " “하루 한 끼, 진심으로 위로받는 식사”를 만들기 위해 퇴사 후 작은 가게를 연 사장님의 이야기가 담겨 있는 캐릭터로 하루 30개 한정의 수제버거, 그리고 ‘고추마요 쉬림프버거’에 담긴 정성이 이 가게의 심장이다.",
};

export const CharacterDetail = () => {
  const [detail, setDetail] = useState({});
  const [modalOpen, setModalOpen] = useState(true);
  const { ref, download, setDownModal, downModal } = useDownload("test.png");
  const nav = useNavigate();

  useEffect(() => {
    // TODO api 통신
    setDetail(mock);
  }, []);

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <IoIosArrowBack className={styles.icon} onClick={() => nav(-1)} />
        <span className={styles.headerTitle}>내가 모은 캐릭터</span>
        <HiCamera className={styles.iconCamera} onClick={() => nav("/capture", { state: mock })} />
      </div>

      {/* 메인 콘텐츠(제목, 카드, 다운로드) */}
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.headline}>{detail.title}</span>
          <span className={styles.address}>{detail.address}</span>
        </div>
        <div className={styles.card} ref={ref}>
          <div className={styles.message}>
            <span>{detail.message}</span>
          </div>
          <div className={styles.character}>
            <img src={detail.img} className={styles.char} alt="" />
            <img src={shadowChar} className={styles.charShadow} alt="" />
          </div>
          <span className={styles.name}>{detail.name}</span>
          <span className={styles.caption}>{detail.caption}</span>
        </div>
        <div className={styles.download} onClick={download}>
          <FiDownload className={styles.icon} />
          <span className={styles.downText}>이미지 저장</span>
        </div>
      </div>

      {/* 가게 요약 서사 */}
      <div className={styles.summary}>
        <span className={styles.summaryTitle}>가게 요약 서사</span>
        <div className={styles.summaryText}>{detail.story}</div>
      </div>
      {modalOpen && (
        <Modal
          title={
            <>
              나의 캐릭터 도감에
              <br />
              저장이 되었습니다!
            </>
          }
          caption="[마이 페이지 → 나의 캐릭터 도감에서 확인 가능]"
          cancelFn={() => setModalOpen(false)}
          confirmType={false}
          autoCloseSec={2}
        />
      )}
      {downModal && (
        <Modal
          title={`이미지가 저장되었습니다!`}
          caption="저장한 이미지를 공유해보세요!"
          cancelFn={() => setDownModal(false)}
          confirmType={false}
          autoCloseSec={1.5}
        />
      )}
    </div>
  );
};
