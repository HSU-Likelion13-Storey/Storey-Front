import { useDownload } from "@/hooks/useDownload";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Capture.module.scss";
import { logoTest, logoText } from "@/assets";
import { IoClose } from "react-icons/io5";
export const Capture = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  const { ref, download, getPreview, preview } = useDownload("test.png");
  const videoRef = useRef(null); // 캡쳐할 비디오
  const videoBackRef = useRef(null); // 배경 비디오

  // 캐릭터 상세 페이지에서 데이터 가져오기
  useEffect(() => {
    // if (!state) nav(-1);
  }, [state, nav]);

  // 카메라 권한 + 비디오에 재생 시키기
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
        if (videoBackRef.current) videoBackRef.current.srcObject = stream;
      } catch (err) {
        console.error("카메라 접근 실패", err);
        nav(-1);
      }
    };
    startCamera();
  }, []);

  return (
    <div className={styles.container}>
      {/* 배경 비디오 */}
      <video ref={videoBackRef} className={styles.backvideo} autoPlay playsInline />

      {/* 전체 비디오 블러처리용 */}
      <div className={styles.fullScreenBlur}></div>

      {/* 오버레이 */}
      <div className={styles.overlay}>
        <div className={styles.overlayHeader}>
          <img src={logoText} alt="" style={{ width: "89px" }} />
          <IoClose className={styles.icon} onClick={() => nav(-1)} />
        </div>
        <div className={styles.contents}>
          <div className={styles.blur}></div>
          {/* 캡쳐할 영역(비디오 포함) */}
          <div className={styles.captureArea} ref={ref}>
            <div className={styles.title}>
              <span className={styles.headline}>참새방앗간</span>
              <span className={styles.address}>서울 성북구 삼선교로 11길 20 1층</span>
            </div>
            <div className={styles.card}>
              <div className={styles.message}>
                <span>“들어왔으면, 한 잔부터 받아요. 오늘은 어땠어요?”</span>
              </div>
              <img src={logoTest} className={styles.img} alt="" />
            </div>
            <video ref={videoRef} className={styles.video} autoPlay playsInline />
          </div>
          <div className={styles.blur}></div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.caption}>스토어리 캐릭터와 사진을 찍고, SNS에 공유해보세요!</span>
          <div className={styles.shutter} onClick={download}></div>
        </div>
      </div>
    </div>
  );
};
