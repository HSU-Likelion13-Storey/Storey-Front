import api from "@/apis/Instance";
import { useEffect, useState } from "react";
import useTimerModal from "./useTimerModal";
import { useNavigate } from "react-router-dom";

const mockData = {
  placeholder: "ex) 00/00일 3일간 서비스 아이스크림 증정!",
  content: "",
};

export function useB2BEvent() {
  const [eventContent, setEventContent] = useState({
    content: "", // 입력한 이벤트
    placeholder: "", // 기존 이벤트 or 예제 이벤트
  });
  const [isEvent, setIsEvent] = useState(false); // 이벤트가 있을 경우를 확인하는 상태. 없을 때에는 삭제기능을 불가능하게 해야함.
  const { isOpenTimerModal, setIsOpenTimerModal, timerModalData, setTimerModalData } = useTimerModal();
  const nav = useNavigate();

  // 이전 이벤트 있으면 가져오기. 없으면 예제로 설정
  const getEventFetch = async () => {
    try {
      const res = await api.get("owner/event");
      if (res.data.data && res.data.isSuccess) {
        setEventContent((prev) => ({
          ...prev,
          placeholder: res.data.data.content, // 기존 이벤트 내용을 placeholder로 설정
        }));
        setIsEvent(true);
      } else {
        setEventContent(mockData);
      }
    } catch (error) {
      setEventContent(mockData);
      if (error.response.data.code === "STORE_NOT_FOUND_404") {
        handleModalNotFoundStore();
      }
    }
  };

  // 업로드 콜백
  const handleUpload = async () => {
    console.log("등록완료");
    try {
      const res = await api.post("owner/event", {
        content: eventContent.content,
      });
      if (res.data.isSuccess) handleModalUpload();
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 콜백
  const handleRemove = async () => {
    console.log("삭제완료");
    try {
      const res = await api.delete("owner/event");
      if (res.data.isSuccess) handleModalDelete();
    } catch (error) {
      console.error(error);
    }
  };

  // 업로드 모달 호출
  const handleModalUpload = () => {
    setTimerModalData((prev) => ({
      ...prev,
      state: true,
      title: (
        <>
          깜짝 이벤트 등록이 <br /> 완료되었어요!
        </>
      ),
      caption: `${isEvent ? "더 " : ""} 근사한 이벤트네요!`,
      cancelFn: () => {
        setIsOpenTimerModal(false);
        nav("/home/owner", { replace: true });
      },
      autoCloseSec: 1.5,
    }));
  };

  // 삭제 모달 호출
  const handleModalDelete = () => {
    setTimerModalData((prev) => ({
      ...prev,
      state: true,
      title: "",
      caption: <span style={{ color: "#2A2A2A" }}>깜짝 이벤트가 삭제되었습니다.</span>,
      cancelFn: () => {
        setIsOpenTimerModal(false);
        nav("/home/owner", { replace: true });
      },
      autoCloseSec: 1.5,
    }));
  };

  // 등록되지 않은 가게 오류 모달 호출
  const handleModalNotFoundStore = () => {
    setTimerModalData((prev) => ({
      ...prev,
      state: true,
      title: "가게가 등록되지 않았어요.",
      caption: <span style={{ color: "#2A2A2A" }}>가게를 등록한 뒤 이벤트를 추가해보세요!</span>,
      cancelFn: () => {
        setIsOpenTimerModal(false);
        nav(-1);
      },
      autoCloseSec: 1.5,
    }));
  };

  // 처음 이벤트 데이터 가져오기
  useEffect(() => {
    getEventFetch();
  }, []);

  return {
    handleUpload,
    handleRemove,
    eventContent,
    setEventContent,
    isEvent,
    isOpenTimerModal,
    timerModalData,
  };
}
