import { useEffect, useRef, useState } from "react";
import { Map, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { logoPig } from "@/assets";
import { CustomMarker } from "./CustomMarker";

export const MapContent = () => {
  const [zoomable, setZoomable] = useState(true); // 확대/축소 기능 제어
  const [draggable, setDraggable] = useState(true); // 드래그 제어
  const [activeMarker, setActiveMarker] = useState(null); // 클릭된 마커 id/인덱스
  const [isClickMark, setIsClickMark] = useState(false);
  const [position, setPosition] = useState({ lat: 37.588877588035935, lng: 127.00944853922176 });
  const mapRef = useRef();

  // 최신 SDK를 사용하기 위해 script방법이 아닌 방법으로 로더를 호출하는 방법으로 설정
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_APP_KEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  // 검은 배경 클릭 시 선택된 마커 오버레이 닫기
  const blurHandle = () => {
    setZoomable(true);
    setDraggable(true);
    setActiveMarker(null); // 클릭 해제
    setIsClickMark(false);
  };

  // 마커 클릭 시
  const markerClickHandle = (index) => {
    setZoomable(false);
    setDraggable(false);
    setActiveMarker(index);
    setIsClickMark(true);
  };

  // 클러스터 지도 레벨 조절 함수
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  // TODO 현재 내 위치 가져오기. 일단 사장 등록한 곳으로 보여주기
  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     console.error("Geolocation API를 지원하지 않는 브라우저입니다.");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       setPosition({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       });
  //     },
  //     (err) => {
  //       console.error("위치 가져오기 실패:", err);
  //     },
  //     {
  //       enableHighAccuracy: true, // GPS 정확도 높임
  //       timeout: 5000, // 최대 대기 시간
  //       maximumAge: 0, // 캐시된 위치 사용 안 함
  //     },
  //   );
  // }, []);

  return (
    <div className="map-content">
      {/* 지도. 카카오맵 라이브러리 사용 */}
      <Map
        center={position}
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
