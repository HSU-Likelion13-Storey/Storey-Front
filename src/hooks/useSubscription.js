import { useEffect, useState } from "react";
import api from "@/apis/Instance";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

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

  // 토스 결제 위젯 연결
  const TossConnection = async () => {
    const tossPayments = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
    const payment = tossPayments.payment({ customerKey: ANONYMOUS });

    const result = await payment.requestPayment({
      method: "CARD", // 카드 결제
      amount: {
        currency: "KRW",
        value: 29900,
      },
      orderId: `order_${Date.now()}_${crypto.randomUUID()}`, // 고유 주문번호
      orderName: "스토어리 브랜딩 패스",
      successUrl: window.location.origin + "/mypage/owner/subscribe/success", // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/mypage/owner/subscribe/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
      customerEmail: "customer123@gmail.com",
      customerName: "테스트",
      customerMobilePhone: "01012341234",
      // 카드 결제에 필요한 정보
      card: {
        flowMode: "DEFAULT", // 통합결제창 여는 옵션
        useEscrow: false,
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
    return result;
  };

  // 구독하기 호출. 데이터 메세지 반환
  const handleOnSubs = async (status) => {
    try {
      let res;
      if (status === "TRIAL_AVAILABLE") {
        res = await api.post("owner/subscription/trial");
      } else if (status === "CANCEL" || status === "CANCELED_REQUESTED") {
        TossConnection();
        // res = await api.post("owner/subscription/renew", { orderId: "" });
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

  const handleReNewSubs = async (orderId, paymentKey, amount) => {
    try {
      const res = await api.post("owner/subscription/renew", {
        orderId: orderId,
        paymentKey: paymentKey,
        amount: amount,
      });

      if (res.data.isSuccess && res.data.data.isSuccess) {
        getSusbscription();
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
      return false;
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
    handleReNewSubs,
  };
};
