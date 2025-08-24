import { useDownload } from "@/hooks/useDownload";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Capture.module.scss";
import { logoTest, logoText } from "@/assets";
import { IoClose } from "react-icons/io5";
import { Modal } from "@/components/common/Modal";
export const Capture = () => {
  const [errorModal, setErrorModal] = useState(false);
  const { state } = useLocation();
  const nav = useNavigate();

  const { ref, getPreview, preview } = useDownload("test.png");
  const videoRef = useRef(null); // 캡쳐할 비디오
  const videoBackRef = useRef(null); // 배경 비디오

  // 캐릭터 상세 페이지에서 데이터 가져오기
  useEffect(() => {
    if (!state) nav(-1);
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
        setErrorModal(true);
      }
    };
    startCamera();
  }, []);

  const shutterHandle = async () => {
    await getPreview();
  };

  useEffect(() => {
    if (preview) nav("/capture/share", { state: { preview: preview } });
  }, [preview]);

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
              <span className={styles.headline}>{state?.storeName}</span>
              <span className={styles.address}>
                {state?.addressMain} {state?.addressDetail}
              </span>
            </div>
            <div className={styles.card}>
              <div className={styles.message}>
                <span>{state?.tagline}</span>
              </div>
              <img src={state?.imageUrl} className={styles.img} alt="" />
            </div>
            <video ref={videoRef} className={styles.video} autoPlay playsInline />
          </div>
          <div className={styles.blur}></div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.caption}>스토어리 캐릭터와 사진을 찍고, SNS에 공유해보세요!</span>
          <div className={styles.shutter} onClick={shutterHandle}></div>
        </div>
      </div>
      {errorModal && (
        <Modal
          title={"카메라를 불러오지 못했습니다"}
          caption={"3초 뒤 이전화면으로 돌아갑니다"}
          confirmType={false}
          cancelFn={() => {
            setErrorModal(false);
            nav(-1);
          }}
        />
      )}
    </div>
  );
};
