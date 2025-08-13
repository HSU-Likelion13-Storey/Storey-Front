import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export function useDownload(filename = "download.png") {
  const [downModal, setDownModal] = useState(false); // 모달 관리용. 사용할 컴포넌트에서 적절히 사용
  const ref = useRef(null); // 다운로드할 dom 연결

  // 다운로드 함수
  const download = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    link.click();
    setDownModal(true);
  };

  return { ref, download, setDownModal, downModal };
}
