import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2 } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import "./Download.scss";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/common/Modal";
import { mascotHappy } from "@/assets";
import { useDownload } from "@/hooks/useDownload";

export const Download = () => {
  const { ref, download, downModal, setDownModal } = useDownload("test.png");

  const nav = useNavigate();

  const downloadHandle = () => {
    download();
    setDownModal(true);
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
        {/* <img src={} alt="qr" ref={ref} /> */}
        <MdOutlineQrCode2 className="qr-icon" ref={ref} />
        <FiDownload className="down-icon" onClick={downloadHandle} />
      </div>
      {downModal && (
        <Modal
          title="저장 완료!"
          caption="이제 가게 곳곳에 배치해보세요!"
          cancelFn={() => setDownModal(false)}
          img={mascotHappy}
          confirmType={false}
          autoCloseSec={1.5}
        />
      )}
    </div>
  );
};
