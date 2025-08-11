import { FaLocationDot } from "react-icons/fa6";
import { logoShadow, mascotHappy } from "@/assets";
import { MdOutlineQrCode } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { PiWalletLight } from "react-icons/pi";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import "./Subscribe.scss";
import { Modal } from "@/components/common/Modal";

export const Subscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTimerModal, setIsOpenTimerModal] = useState(false);

  return (
    <div className="subscribe">
      <div className="subs-header">
        <span className="badge">프리미엄</span>
        <span className="title">마스코트 브랜딩 패스</span>
        <div className="plan-state">{isSubscribed ? `구독 이용 중` : `이런 혜택, 또 없어요!`}</div>
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
          <div className="fee">월 {`29,900`}원</div>
        </div>
        <div className="fee-row">
          <LuCalendar className="fee-icon" />
          <div className="fee">{isSubscribed ? `${`9월 20일`}에 갱신 예정` : "결제한 일수로부터 한달 주기"}</div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="btn-wrapper">
        <button
          className={`subs-btn ${isSubscribed ? "unsubs" : "subs"}`}
          onClick={
            isSubscribed
              ? () => setIsOpenModal(true)
              : () => {
                  setIsOpenTimerModal(true);
                  setIsSubscribed(true);
                }
          }>
          {isSubscribed ? (
            <>
              구독 해지 하기
              <IoIosArrowForward className="expried-icon" />
            </>
          ) : (
            "구독 하기"
          )}
        </button>
        <div className="btn-caption">
          {isSubscribed
            ? `지금 취소해도 9월 20일까지 혜택을 계속 이용할 수 있습니다.`
            : "지금 구독하시면 9월 20일 갱신이에요. "}
        </div>
      </div>

      {/* 제약사항 */}
      <div className="expired-content">
        <div className="expired-headline">구독 기간 만료 시 제약 사항</div>
        <ul>
          <li>스토어리 지도 노출: 지도에서 해당 가게 캐릭터가 표시되지 않음 (탐험 불가)</li>
          <li>캐릭터 사용:: 생성되 캐릭터 상업적/ 디자인적 사용 불가 (저작권은 스토어리에 있음)</li>
          <li>QR코드 작동: 오프라인코드 비활성화 → 캐릭터 해금 및 서사 열람 불가</li>
          <li>도감 연동: 사용자의 도감에 새로운 방문 기록 저장불가 (기존 기록은 유지)</li>
        </ul>
      </div>

      {/* 모달 처리 */}
      {isOpenModal && (
        <Modal
          title="정말 구독을 해지 하시겠어요?"
          caption="다음에 또 보는거죠?"
          cancel="하지않기"
          confirm="해지하기"
          cancelFn={() => setIsOpenModal(false)}
          confirmFn={() => {
            setIsSubscribed(false);
            setIsOpenModal(false);
          }}
        />
      )}
      {isOpenTimerModal && (
        <Modal
          title="구독 완료!"
          caption="더 오래 함께 할 수 있게 되어 영광이에요!"
          cancelFn={() => setIsOpenTimerModal(false)}
          img={mascotHappy}
          confirmType={false}
        />
      )}
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
