import { useEffect, useState } from "react";
import api from "@/apis/Instance";

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState("TRIAL_AVAILABLE");
  const [endDate, setEndDate] = useState("");

  // 날짜 포맷 함수
  const formattedDate = (raw) => {
    const date = new Date(raw);
    return date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  // 구독 조회 api
  const getSusbscription = async () => {
    try {
      const res = await api.get("owner/subscription");

      if (res.data.isSuccess) {
        setIsSubscribed(res.data.data.status);
        const date = formattedDate(res.data.data.endDate);
        setEndDate(date);
      }
    } catch (error) {
      console.error("실패", error);
      setIsSubscribed("CANCELED");
    }
  };

  // 구독 취소 api 호출. bool 반환
  const handleSubsCancel = async () => {
    try {
      const res = await api.put("owner/subscription/cancel");
      if (res.data.isSuccess) {
        getSusbscription();
        return true; // 성공 시 true 반환
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // 구독하기 호출. 데이터 메세지 반환
  const handleOnSubs = async (status) => {
    try {
      let res;
      if (status === "TRIAL_AVAILABLE") {
        res = await api.post("owner/subscription/trial");
      } else if (status === "CANCEL" || status === "CANCELED_REQUESTED") {
        res = await api.post("owner/subscription/renew", { orderId: "" });
      }

      if (res.data.isSuccess) {
        getSusbscription();
        return res.data.data; // API 응답 데이터 반환
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 마운트 시 한번 조회
  useEffect(() => {
    getSusbscription();
  }, []);

  return {
    isSubscribed,
    endDate,
    getSusbscription,
    handleSubsCancel,
    handleOnSubs,
    formattedDate,
  };
};
