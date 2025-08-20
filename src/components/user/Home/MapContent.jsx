import { useEffect, useRef, useState } from "react";
import { Map, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { CustomMarker } from "./CustomMarker";
import api from "@/apis/Instance";

export const MapContent = () => {
  const [zoomable, setZoomable] = useState(true); // 확대/축소 기능 제어
  const [draggable, setDraggable] = useState(true); // 드래그 제어
  const [activeMarker, setActiveMarker] = useState(null); // 클릭된 마커 id/인덱스
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.588877588035935, lng: 127.00944853922176 }); // 현재 위치 설정할 포지션
  const [markerData, setMarkerData] = useState([
    {
      storeId: 0,
      storeName: "",
      addressMain: "",
      latitude: null,
      longitude: null,
      eventContent: "",
      isUnlocked: false,
      characterImageUrl: "",
      subscriptionStatus: "",
    },
  ]);
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
  };

  // 마커 클릭 시
  const markerClickHandle = (index) => {
    setZoomable(false);
    setDraggable(false);
    setActiveMarker(index);
  };

  // 클러스터 지도 레벨 조절 함수
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  // 지도 정보 가져오기
  useEffect(() => {
    const getMarkerData = async () => {
      try {
        const res = await api.get("user/stores/map");
        if (res.data.isSuccess) setMarkerData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMarkerData();
  }, []);

  // TODO 현재 내 위치 가져오기. 일단 사장 등록한 곳으로 보여주기
  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     console.error("Geolocation API를 지원하지 않는 브라우저입니다.");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       setCurrentPosition({
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
        center={currentPosition}
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
          {markerData.map((data) => {
            if (data.subscriptionStatus === "ACTIVE" || data.subscriptionStatus === "CANCELED_REQUESTED")
              return (
                <CustomMarker
                  key={data.storeId}
                  data={data}
                  positionMock={mockData[data.storeId].position} // TODO 백에서 더미데이터 들어간 후 삭제 해야함.
                  isActive={activeMarker === data.storeId}
                  onMarkerClick={() => markerClickHandle(data.storeId)}
                  blurHandle={blurHandle}
                />
              );
          })}
        </MarkerClusterer>
      </Map>
    </div>
  );
};

const mockData = [
  {
    position: { lat: 37.588877588035935, lng: 127.00944853922176 },
  },
  {
    position: { lat: 37.58826040585965, lng: 127.00947676696018 },
  },
  {
    position: { lat: 37.588877588035935, lng: 127.00944853922176 },
  },

  {
    position: { lat: 37.58827850958126, lng: 127.0083671833711 },
  },
];
