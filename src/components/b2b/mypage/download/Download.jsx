import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2 } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import "./Download.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { mascotHappy } from "@/assets";

export const Download = () => {
  const [isOpenTimerModal, setIsOpenTimerModal] = useState(false);
  const nav = useNavigate();

  const downloadHandle = () => {
    // TODO 다운로드 로직 구현
    setIsOpenTimerModal(true);
  };

  return (
    <div className="download">
      <div className="down-header">
        <IoIosArrowBack className="back-icon" onClick={() => nav(-1)} />
        <div className="header-title">QR코드 다운 받기</div>
        <div className="blank" />
      </div>
      <div className="down-content">
        <span className="caption">
          QR을 가게 곳곳에 배치해
          <br />
          사용자들이 캐릭터 도감을 수집하게 해주세요!
        </span>

        {/* TODO QR 이미지 추가 로직 구현 */}
        <MdOutlineQrCode2 className="qr-icon" />
        <FiDownload className="down-icon" onClick={downloadHandle} />
      </div>
      {isOpenTimerModal && (
        <Modal
          title="저장 완료!"
          caption="이제 가게 곳곳에 배치해보세요!"
          cancelFn={() => setIsOpenTimerModal(false)}
          img={mascotHappy}
          confirmType={false}
          autoCloseSec={1.5}
        />
      )}
    </div>
  );
};
