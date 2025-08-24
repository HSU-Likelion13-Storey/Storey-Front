import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2 } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import "./Download.scss";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/common/Modal";
import { mascotHappy } from "@/assets";
import { useDownload } from "@/hooks/useDownload";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import api from "@/apis/Instance";

export const Download = () => {
  const { ref, download, downModal, setDownModal } = useDownload("test.png");
  const [QrData, setQrData] = useState({
    characterId: 1,
    qrCode: "",
  });
  const nav = useNavigate();

  const downloadHandle = () => {
    download();
    setDownModal(true);
  };

  // QR 데이터 API 가져오기(캐릭터번호, 해금을 위한 식별 QR코드 데이터)
  useEffect(() => {
    const getQrData = async () => {
      const res = await api.get("owner/store/qr");
      if (res.data.isSuccess) setQrData(res.data.data);
    };
    getQrData();
  }, []);

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

        <QRCodeCanvas
          value={`https://storey-6jeon.vercel.app/detail/${QrData.characterId}?code=${QrData.qrCode}`}
          className="qr-icon"
          ref={ref}
          size={300}
        />
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
