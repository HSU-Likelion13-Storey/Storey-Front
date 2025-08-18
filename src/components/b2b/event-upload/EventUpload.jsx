import { useNavigate } from "react-router-dom";
import styles from "./EventUpload.module.scss";
import { CgInfo } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { bubble } from "@/assets";
import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { useB2BEvent } from "@/hooks/useB2BEvent";

export const EventUpload = () => {
  const { handleUpload, handleRemove, eventContent, setEventContent, isEvent, isOpenTimerModal, timerModalData } =
    useB2BEvent();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <IoIosArrowBack className={styles.icon} onClick={() => nav(-1)} />
        <span className={styles.headerTitle}>이벤트 올리기</span>
        <CgInfo
          className={styles.icon}
          onClick={() => {
            setIsInfoOpen(true);
          }}
        />
      </div>

      {/* 메인 입력창 */}
      <div className={styles.content}>
        <img src={bubble} alt="" />
        <div className={styles.inputField}>
          <span className={styles.caption}>우리 가게의 깜짝 이벤트</span>
          <textarea
            placeholder={eventContent.placeholder}
            maxLength={50}
            value={eventContent.content}
            onChange={(e) =>
              setEventContent((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }></textarea>
          <div className={styles.counter}>{eventContent.content?.length}/50자</div>
        </div>
      </div>

      {/* 버튼 */}
      <div className={styles.buttonWrapper}>
        <button
          disabled={!isEvent && eventContent.content?.length == 0}
          className={`${styles.button} ${styles.cancel}`}
          onClick={handleRemove}>
          삭제하기
        </button>
        <button
          disabled={eventContent.content?.length == 0}
          className={`${styles.button} ${styles.confirm}`}
          onClick={handleUpload}>
          등록하기
        </button>
      </div>

      {/* 모달 처리 */}
      {isOpenTimerModal && <Modal {...timerModalData} />}
      {isInfoOpen && (
        <Modal
          title="깜짝 이벤트란?"
          caption={
            <>
              깜짝 할인 메뉴 또는 서비스 메뉴등을 열어
              <br />
              손님들을 유입시키게 유도하는 기능이에요!
            </>
          }
          img={bubble}
          confirm="네, 알겠어요!"
          confirmFn={() => {
            setIsInfoOpen(false);
          }}
          cancelFn={() => {
            setIsInfoOpen(false);
          }}
        />
      )}
    </div>
  );
};
