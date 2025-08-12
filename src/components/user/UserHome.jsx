import { logoText } from "@/assets";
import "./UserHome.scss";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

export const UserHome = () => {
  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <div className="map-content">
        {/* 지도 */}
        <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "100%", height: "100%" }}>
          <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{ padding: "42px", backgroundColor: "#fff", color: "#000" }}>Custom Overlay!</div>
          </CustomOverlayMap>
        </Map>
      </div>
    </div>
  );
};
