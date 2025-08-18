import { FaLocationDot } from "react-icons/fa6";
import { logoShadow, mascotHappy } from "@/assets";
import { MdOutlineQrCode } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { PiWalletLight } from "react-icons/pi";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import "./Subscribe.scss";
import { Modal } from "@/components/common/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useSubscription } from "@/hooks/useSubscription";
import useTimerModal from "@/hooks/useTimerModal";

export const Subscribe = () => {
  const { isSubscribed, endDate, formattedDate, handleSubsCancel, handleOnSubs } = useSubscription();
  const { isOpenTimerModal, timerModalData, setTimerModalData } = useTimerModal();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const location = useLocation();
  const nav = useNavigate();

  // 한달 무료체험 or 구독하기 버튼 클릭 핸들러
  const HandleSubs = async () => {
    const res = await handleOnSubs(isSubscribed);

    if (res) {
      if (res !== "무료 체험 시작이 성공적으로 완료되었습니다.") {
        setTimerModalData((prev) => ({
          ...prev,
          state: true,
          title: "구독 완료!",
          caption: "더 오래 함께 할 수 있게 되어 영광이에요!",
          img: mascotHappy,
        }));
      } else {
        setTimerModalData((prev) => ({
          ...prev,
          state: true,
          title: "한 달 체험 등록 완료!",
          caption: "저희 서비스를 이용해주셔서 감사해요!",
          img: mascotHappy,
        }));
      }
    }
  };

  // 구독 해지 버튼 클릭 핸들러
  const onHandleSubsCancel = async () => {
    setIsOpenModal(false);
    const success = await handleSubsCancel();
    if (success) {
      setTimerModalData((prev) => ({
        ...prev,
        state: true,
        title: "",
        caption: <span style={{ color: "#2A2A2A" }}>구독 해지가 완료 되었습니다.</span>,
        img: "",
      }));
    }
  };

  return (
    <div className="subscribe">
      {location.state ? (
        <>
          <div className="header-top-blank" />
          <div className="header">
            <IoIosArrowBack className="header-back-icon" onClick={() => nav(-1)} />
            <div className="header-title">구독 하기</div>
            <div className="header-blank" />
          </div>
        </>
      ) : (
        <IoCloseOutline className="back-icon" onClick={() => nav("/mypage/owner", { replace: true })} />
      )}
      <div className="subs-header">
        <span className="badge">프리미엄</span>
        <span className="title">마스코트 브랜딩 패스</span>
        <div className="plan-state">
          {isSubscribed == "ACTIVE"
            ? `다음 결제 예정일은 ${new Date().getFullYear()}년 ${endDate} 입니다.`
            : `이런 혜택, 또 없어요!`}
        </div>
      </div>

      {/* 구독 혜택 정리 */}
      <div className="plan-list">
        <PlanItem headline="캐릭터를 지도에 표시할 수 있어요" caption="지도에서 해당 가게 캐릭터 표시">
          <FaLocationDot className="icon" />
        </PlanItem>
        <PlanItem headline="캐릭터를 지도에 표시할 수 있어요" caption="지도에서 해당 가게 캐릭터 표시">
          <img src={logoShadow} className="icon" alt="" />
        </PlanItem>
        <PlanItem headline="오프라인 QR 코드가 활성화돼요" caption="캐릭터 해금 및 서사 열람 가능">
          <MdOutlineQrCode className="icon" />
        </PlanItem>{" "}
        <PlanItem headline="자동으로 방문기록이 갱신" caption="사용자 도감에 방문기록 저장">
          <BsListCheck className="icon" />
        </PlanItem>
      </div>

      {/* 요금제 및 갱신 기간 출력. */}
      <div className="fee-content">
        <div className="fee-row">
          <PiWalletLight className="fee-icon" />
          <div className="fee">월 29,900원</div>
        </div>
        <div className="fee-row">
          <LuCalendar className="fee-icon" />
          <div className="fee">결제한 일수로부터 한달 주기</div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="btn-wrapper">
        <button
          className={`subs-btn ${isSubscribed == "ACTIVE" ? "unsubs" : "subs"}`}
          onClick={isSubscribed == "ACTIVE" ? () => setIsOpenModal(true) : HandleSubs}>
          {/* 한달 무료 체험 여부 */}
          {isSubscribed == "ACTIVE" ? (
            <>
              구독 해지 하기
              <IoIosArrowForward className="expried-icon" />
            </>
          ) : (
            `${isSubscribed == "TRIAL_AVAILABLE" ? "한달 무료 체험하기" : "구독 하기"}`
          )}
        </button>
        <div className="btn-caption">
          {isSubscribed == "ACTIVE"
            ? `지금 취소해도 ${endDate}까지 혜택을 계속 이용할 수 있습니다.`
            : `지금 구독하시면 ${formattedDate(new Date().setMonth(new Date().getMonth() + 1))} 갱신이에요. `}
        </div>
      </div>

      {/* 제약사항 */}
      <div className="expired-content">
        <div className="expired-headline">구독 기간 만료 시 제약 사항</div>
        <ul>
          <li>스토어리 지도 노출: 지도에서 해당 가게 캐릭터가 표시되지 않음 (탐험 불가)</li>
          <li>캐릭터 사용: 생성되 캐릭터 상업적/ 디자인적 사용 불가 (저작권은 스토어리에 있음)</li>
          <li>QR코드 작동: 오프라인코드 비활성화 → 캐릭터 해금 및 서사 열람 불가</li>
          <li>도감 연동: 사용자의 도감에 새로운 방문 기록 저장불가 (기존 기록은 유지)</li>
        </ul>
      </div>

      {/* 모달 처리 */}
      {isOpenModal && (
        <Modal
          title="정말 구독을 해지 하시겠어요?"
          caption="그동안 이용했던 혜택들이 종료돼요!"
          cancel="하지않기"
          confirm="해지하기"
          cancelFn={() => setIsOpenModal(false)}
          confirmFn={() => {
            onHandleSubsCancel();
            setIsOpenModal(false);
          }}
        />
      )}
      {isOpenTimerModal && <Modal {...timerModalData} />}
    </div>
  );
};

const PlanItem = ({ children, headline, caption }) => {
  return (
    <div className="plan-item">
      {children}
      <div className="plan-item-text">
        <span className="plan-headline">{headline}</span>
        <div className="plan-caption">{caption}</div>
      </div>
    </div>
  );
};
