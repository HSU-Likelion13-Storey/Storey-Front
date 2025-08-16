import { useNavigate } from "react-router-dom";
import styles from "./EventUpload.module.scss";
import { CgInfo } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { bubble } from "@/assets";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";

const mockData = {
  placeholder: "ex) 00/00일 3일간 서비스 아이스크림 증정!",
  content: "",
};

export const EventUpload = () => {
  const [eventContent, setEventContent] = useState({
    content: "",
    placeholder: "",
  });
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // TODO 통신
    setEventContent(mockData);
  }, []);

  const handleUpload = () => {
    console.log("등록완료"); //TODO 통신
    setIsUploadOpen(true);
  };

  const handleRemove = () => {
    console.log("삭제완료"); //TODO 통신
    setIsRemoveOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <IoIosArrowBack className={styles.icon} onClick={() => nav(-1)} />
        <span className={styles.headerTitle}>이벤트 올리기</span>
        <CgInfo className={styles.icon} onClick={() => {}} />
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
      <div className={styles.buttonWrapper}>
        <button
          disabled={eventContent.content?.length == 0}
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
      {isUploadOpen && (
        <Modal
          confirmType={false}
          title={
            <>
              깜짝 이벤트 등록이 <br /> 완료되었어요!
            </>
          }
          caption="근사한 이벤트네요!"
          cancelFn={() => {
            setIsUploadOpen(false);
            nav(-1);
          }}
        />
      )}
      {isRemoveOpen && (
        <Modal
          confirmType={false}
          caption={<span style={{ color: "#2A2A2A" }}>깜짝 이벤트가 삭제되었습니다.</span>}
          cancelFn={() => {
            setIsRemoveOpen(false);
            nav(-1);
          }}
        />
      )}
    </div>
  );
};
