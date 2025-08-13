import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export function useDownload(filename = "download.png") {
  const [downModal, setDownModal] = useState(false); // 모달 관리용. 사용할 컴포넌트에서 적절히 사용
  const [preview, setPreview] = useState(null); // 캡쳐한 이미지 미리 보여주기
  const ref = useRef(null); // 다운로드할 dom 연결

  // 캡쳐 저장 함수
  const showPreview = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const dataURL = canvas.toDataURL("image/png");
    setPreview(dataURL);
  };

  // 다운로드 함수
  const download = async (preview = null) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = preview == null ? dataURL : preview;
    link.download = filename;
    link.click();
    setDownModal(true);
  };

  return { ref, download, setDownModal, downModal, showPreview, preview };
}
