import { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

export const CustomMarker = ({ data, isActive, onMarkerClick, blurHandle, isClickMark }) => {
  const [lock, setLock] = useState(true);

  return (
    <CustomOverlayMap position={data.position}>
      <div className="marker-container">
        {/* 마커 */}
        <div className={`marker ${isClickMark && !isActive ? "invisible" : ""}`} onClick={onMarkerClick}>
          <img src={data.image} className={`logo-img ${lock && "dark"}`} alt="" />
          {lock && <IoIosLock className="icon" />}
          {/* 오버레이 */}
          <div className={`overlay ${isActive && "visible"}`}>
            <div className="title">{data.name}</div>
            <div className="address">{data.address}</div>
            <div className="event">{data.event}</div>
          </div>
        </div>

        {/* 블러 처리용 */}
        <div className={`blur ${isActive && "visible"}`} onClick={blurHandle}></div>
      </div>
    </CustomOverlayMap>
  );
};
