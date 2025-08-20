import { useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

export const CustomMarker = ({ data, positionMock, isActive, onMarkerClick, blurHandle }) => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    // setPosition({ lat: data.latitude, lon: data.longitude }); //TDOO 백엔 더미데이터 들어가면 주석제거
    setPosition(positionMock);
  }, [positionMock, data]);
  return (
    <CustomOverlayMap position={position} zIndex={!isActive ? 1 : 100}>
      <div className="marker-container">
        {/* 마커 */}
        <div className={`marker`} onClick={onMarkerClick}>
          <img src={data.characterImageUrl} className={`logo-img ${data.isUnlocked && "dark"}`} alt="" />
          {data.isUnlocked && <IoIosLock className="icon" />}
        </div>
        {/* 오버레이 */}
        <div className={`overlay ${isActive && "visible"}`}>
          <div className="title">{data.storeName}</div>
          <div className="address">{data.addressMain}</div>
          <div className="event">{data.eventContent ? data.eventContent : "이벤트 준비중"}</div>
        </div>
        {/* 블러 처리용 */}
        <div className={`blur ${isActive && "visible"}`} onClick={blurHandle}></div>
      </div>
    </CustomOverlayMap>
  );
};
