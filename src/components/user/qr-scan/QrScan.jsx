import QrScanner from "qr-scanner";
import { useEffect, useRef } from "react";
import { QrOverlay } from "./QrOverlay";
import "./QrScan.scss";

// 브라우저 정책 때문에 https 환경에서만 카메라 권한이 허용됨
// 배포 후에는 문제 없으나 로컬 테스트할 때 오류 발생.
export const QrScan = () => {
  const videoRef = useRef(null);

  // 스캔한 QR의 URL이 http 또는 https로 시작하는지 확인(리턴값 boolean)
  const isUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };

  const handleScan = (data) => {
    // if (data) {
    //   if (isUrl(data.data)) {
    //     window.open(data.data);
    //   }
    // }
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(videoElem, (result) => handleScan(result), QrOptions);
      qrScanner.start();
      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <div className="qr-scan">
      <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay playsInline />
      <QrOverlay />
    </div>
  );
};

const QrOptions = {
  // 핸드폰인 경우 후면카메라
  preferredCamera: "environment",
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 60번 QR 코드 감지한다.
  maxScansPerSecond: 5,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  calculateScanRegion: (video) => {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // 전체 크기의 %
    const regionWidth = 430 * 0.9;
    const regionHeight = 932 * 0.4;

    // 중앙 정렬
    const x = (videoWidth - regionWidth) / 2;
    const y = (videoHeight - regionHeight) / 2;

    return {
      x,
      y,
      width: regionWidth,
      height: regionHeight,
    };
  },
  // highlightScanRegion: true, // 스캔 영역 표시
  // highlightCodeOutline: true, // 코드 윤곽선 표시
};
