import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2 } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import "./Download.scss";

export const Download = () => {
  return (
    <div className="download">
      <div className="down-header">
        <IoIosArrowBack className="back-icon" />
        <div className="header-title">QR코드 다운 받기</div>
        <div className="blank" />
      </div>
      <div className="down-content">
        <span className="caption">
          QR을 가게 곳곳에 배치해
          <br />
          사용자들이 캐릭터 도감을 수집하게 해주세요!
        </span>
        <MdOutlineQrCode2 className="qr-icon" />
        <FiDownload className="down-icon" />
      </div>
    </div>
  );
};
