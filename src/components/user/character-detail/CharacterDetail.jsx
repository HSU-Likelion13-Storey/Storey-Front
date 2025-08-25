import api from "@/apis/Instance";
import styles from "./CharacterDetail.module.scss";
import { shadowChar } from "@/assets";
import { Modal } from "@/components/common/Modal";
import { useDownload } from "@/hooks/useDownload";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { HiCamera } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useTimerModal from "@/hooks/useTimerModal";

export const CharacterDetail = () => {
  const [detail, setDetail] = useState({
    characterId: null,
    imageUrl: "",
    tagline: "",
    name: "",
    description: "",
    narrativeSummary: "",
    storeName: "",
    addressMain: "",
    addressDetail: "",
  });
  const { ref, download, setDownModal, downModal } = useDownload("test.png");
  const { isOpenTimerModal, setIsOpenTimerModal, timerModalData, setTimerModalData } = useTimerModal();

  const nav = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams(); // qr 코드 데이터를 URL 쿼리 param으로 받아오기 위한 훅
  const code = searchParams.get("code");

  // 상세정보 가져오기 API
  useEffect(() => {
    const getDetailData = async () => {
      try {
        const res = await api.get(`user/characters/${id}`);
        if (res.data.isSuccess) setDetail(res.data.data);
      } catch (error) {
        console.error(error);
        setTimerModalData((prev) => ({
          ...prev,
          state: true,
          title: "캐릭터를 불러오지 못했어요.",
          caption: "다시 시도해주세요!",
          cancelFn: () => {
            setIsOpenTimerModal(false);
            nav(-1, { replace: true });
          },
        }));
      }
    };
    getDetailData();
  }, [id]);

  // 잠겨 있는 가게일 경우 code확인 후 해제한 뒤 모달 보여주기
  useEffect(() => {
    if (code) {
      const postUnlockFetch = async () => {
        try {
          const res = await api.post("/user/stores/unlock", { qrCode: code });
          if (res.data.isSuccess) {
            setTimerModalData((prev) => ({
              ...prev,
              state: true,
              title: (
                <>
                  나의 캐릭터 도감에
                  <br />
                  저장이 되었습니다!
                </>
              ),
              caption: "[마이 페이지 → 나의 캐릭터 도감에서 확인 가능]",
              autoCloseSec: 2,
            }));
          }
        } catch (error) {
          return;
        }
      };
      postUnlockFetch();
    }
  }, [code]);

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <IoIosArrowBack className={styles.icon} onClick={() => nav(-1)} />
        <span className={styles.headerTitle}>내가 모은 캐릭터</span>
        <HiCamera className={styles.iconCamera} onClick={() => nav("/capture", { state: detail })} />
      </div>

      {/* 메인 콘텐츠(제목, 카드, 다운로드) */}
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.headline}>{detail.storeName}</span>
          <span className={styles.address}>
            {detail.addressMain} {detail.addressDetail}
          </span>
        </div>
        <div className={styles.card} ref={ref}>
          <div className={styles.message}>
            <span>{detail.tagline}</span>
          </div>
          <div className={styles.character}>
            {/* TODO crossOrigin="anonymous" 추가 고려. CDN 설정 후 처리 예정 */}
            <img src={detail.imageUrl} className={styles.char} alt="" />
            <img src={shadowChar} className={styles.charShadow} alt="" />
          </div>
          <span className={styles.name}>{detail.name}</span>
          <span className={styles.caption}>{detail.description}</span>
        </div>
        <div className={styles.download} onClick={download}>
          <FiDownload className={styles.icon} />
          <span className={styles.downText}>이미지 저장</span>
        </div>
      </div>

      {/* 가게 요약 서사 */}
      <div className={styles.summary}>
        <span className={styles.summaryTitle}>가게 요약 서사</span>
        <div className={styles.summaryText}>{detail.narrativeSummary}</div>
      </div>
      {isOpenTimerModal && <Modal {...timerModalData} />}
      {downModal && (
        <Modal
          title={`이미지가 저장되었습니다!`}
          caption="저장한 이미지를 공유해보세요!"
          cancelFn={() => setDownModal(false)}
          confirmType={false}
          autoCloseSec={1.5}
        />
      )}
    </div>
  );
};
