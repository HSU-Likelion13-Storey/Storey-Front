import { logoText, qrOverlay } from "@/assets";
import { IoClose } from "react-icons/io5";

export const QrOverlay = () => {
  return (
    <div className="qr-overlay">
      <div className="qr-header">
        <img src={logoText} alt="" style={{ width: "89px" }} />
        <IoClose className="icon" />
      </div>
      <img src={qrOverlay} className="overlay-img" alt="" />
      <div className="qr-caption">가게에 있는 스토어리 QR 코드를 스캔해주세요.</div>
    </div>
  );
};
