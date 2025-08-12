import { logoPig, logoText } from "@/assets";
import "./UserHome.scss";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import { IoIosLock } from "react-icons/io";

export const UserHome = () => {
  const [zoomable, setZoomable] = useState(true); // 확대/축소 기능 제어
  const [draggable, setDraggable] = useState(true); // 드래그 제어
  const [activeMarker, setActiveMarker] = useState(null); // 클릭된 마커 id/인덱스
  const [isClickMark, setIsClickMark] = useState(false);
  const mapRef = useRef();
  // 최신 SDK를 사용하기 위해 script방법이 아닌 방법으로 로더를 호출하는 방법으로 설정
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_APP_KEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  const blurHandle = () => {
    setZoomable(true);
    setDraggable(true);
    setActiveMarker(null); // 클릭 해제
    setIsClickMark(false);
  };

  const markerClickHandle = (index) => {
    setZoomable(false);
    setDraggable(false);
    setActiveMarker(index);
    setIsClickMark(true);
  };

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <div className="map-content">
        {/* 지도. 카카오맵 라이브러리 사용 */}
        <Map
          center={{ lat: 37.5886230594546, lng: 127.00942586233262 }}
          style={{ width: "100%", height: "100%" }}
          zoomable={zoomable}
          draggable={draggable}
          level={2}
          ref={mapRef}>
          {/* 여러 마커 생성 */}
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={2} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            onClusterclick={onClusterclick}>
            {mockData.map((data, index) => (
              <CustomMarker
                data={data}
                key={index}
                isActive={activeMarker === index}
                onMarkerClick={() => markerClickHandle(index)}
                blurHandle={blurHandle}
                isClickMark={isClickMark}
              />
            ))}
          </MarkerClusterer>
        </Map>
      </div>
    </div>
  );
};

const CustomMarker = ({ data, isActive, onMarkerClick, blurHandle, isClickMark }) => {
  const [lock, setLock] = useState(true);

  const hideMark = () => isClickMark && !isActive;

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

const mockData = [
  {
    position: { lat: 37.588877588035935, lng: 127.00944853922176 },
    name: "한성돼",
    event: "오늘만 특가 30% 할인!",
    address: "서울 종로구 혜화로 1길 10",
    image: logoPig,
  },
  {
    position: { lat: 37.58826040585965, lng: 127.00947676696018 },
    name: "팽팽닭발",
    event: "매운맛 챌린지 진행 중!",
    address: "서울 종로구 동숭길 23",
    image: logoPig,
  },
  {
    position: { lat: 37.58827850958126, lng: 127.0083671833711 },
    name: "옛고을",
    event: "2인 세트 주문 시 음료 무료",
    address: "서울 종로구 대학로 5길 15",
    image: logoPig,
  },
  {
    position: { lat: 37.588395642220384, lng: 127.00831624603093 },
    name: "비하인드",
    event: "신메뉴 출시 기념 1+1",
    address: "서울 종로구 명륜3가 45",
    image: logoPig,
  },
  {
    position: { lat: 37.58856447315827, lng: 127.0096947607156 },
    name: "뱃고동 낙지쭈꾸미",
    event: "점심 특선 20% 할인",
    address: "서울 종로구 혜화동 72-1",
    image: logoPig,
  },
  {
    position: { lat: 37.5886883431943, lng: 127.00989291820476 },
    name: "참새방앗간",
    event: "디저트 주문 시 커피 무료",
    address: "서울 종로구 동숭동 199-3",
    image: logoPig,
  },
];
