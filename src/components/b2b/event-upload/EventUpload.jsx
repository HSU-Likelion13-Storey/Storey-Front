import { useNavigate } from "react-router-dom";
import styles from "./EventUpload.module.scss";
import { CgInfo } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { bubble } from "@/assets";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import api from "@/apis/Instance";

const mockData = {
  placeholder: "ex) 00/00일 3일간 서비스 아이스크림 증정!",
  content: "",
};

export const EventUpload = () => {
  const [eventContent, setEventContent] = useState({
    content: "", // 입력한 이벤트
    placeholder: "", // 기존 이벤트 or 예제 이벤트
  });
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEvent, setIsEvent] = useState(false); // 이벤트가 있을 경우를 확인하는 상태. 없을 때에는 삭제기능을 불가능하게 해야함.
  const nav = useNavigate();

  useEffect(() => {
    // 이전 이벤트 있으면 가져오기. 없으면 예제로 설정
    const getEventFetch = async () => {
      try {
        const res = await api.get("api/owner/store/event");
        if (res.isSuccess) {
          setEventContent((prev) => ({
            ...prev,
            placeholder: res.data.content, // 기존 이벤트 내용을 placeholder로 설정
          }));
          setIsEvent(true);
        } else {
          setEventContent(mockData);
        }
      } catch (error) {
        setEventContent(mockData);
        console.error(error);
      }
    };
    getEventFetch();
  }, []);

  // 업로드 콜백
  const handleUpload = async () => {
    console.log("등록완료");
    try {
      // TODO api 연결 시 해제
      // const res = await api.post("api/owner/store/event", {
      //   content: eventContent.content,
      // });
      // if (res.isSuccess)
      setIsUploadOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 콜백
  const handleRemove = async () => {
    console.log("삭제완료");
    try {
      // TODO api 연결 시 해제
      // const res = await api.delete("api/owner/store/event", {
      //   content: eventContent.content,
      // });
      // if (res.isSuccess)
      setIsRemoveOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

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
      {isUploadOpen && (
        <Modal
          confirmType={false}
          title={
            <>
              깜짝 이벤트 등록이 <br /> 완료되었어요!
            </>
          }
          caption={`${isEvent ? "더 " : ""} 근사한 이벤트네요!`}
          cancelFn={() => {
            setIsUploadOpen(false);
            nav(-1);
          }}
          autoCloseSec={1.5}
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
          autoCloseSec={1.5}
        />
      )}
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
