import { logoPig, logoText } from "@/assets";
import "./UserHome.scss";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import { IoIosLock } from "react-icons/io";

export const UserHome = () => {
  const [zoomable, setZoomable] = useState(true); // 확대/축소 기능 제어
  const [draggable, setDraggable] = useState(true); // 드래그 제어

  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <div className="map-content">
        {/* 지도. 카카오맵 라이브러리 사용 */}
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "100%" }}
          zoomable={zoomable}
          draggable={draggable}
          level={3}>
          {/* 커스텀 오버레이 추가 */}
          <CustomOverlayMap position={{ lat: 33.5563, lng: 126.79581 }}>
            <div className="marker-container">
              {/* 오버레이 */}
              <div className={`overlay ${!zoomable && "visible"}`}>
                <div className="title">한성돼</div>
                <div className="address">📍 서울 성북구 동소문로2길 63 1층</div>
                <div className="event">오늘은 물냉면 서비스!</div>
              </div>

              {/* 마커 */}
              <div
                className={`marker`}
                onClick={() => {
                  setDraggable(false);
                  setZoomable(false);
                }}>
                <img src={logoPig} className={`logo-img ${true && "dark"}`} alt="" />
                {true && <IoIosLock className="icon" />}
              </div>

              {/* 블러 처리용 */}
              <div
                className={`blur ${!zoomable && "visible"}`}
                onClick={() => {
                  // 블러 클릭 시 종료
                  setDraggable(true);
                  setZoomable(true);
                }}></div>
            </div>
          </CustomOverlayMap>
        </Map>
      </div>
    </div>
  );
};
