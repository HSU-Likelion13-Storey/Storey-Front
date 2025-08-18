import { useEffect, useState } from "react";

export default function useTimerModal() {
  const [isOpenTimerModal, setIsOpenTimerModal] = useState(false);
  const [timerModalData, setTimerModalData] = useState({
    state: false,
    title: "",
    caption: "",
    img: "",
    cancelFn: () => setIsOpenTimerModal(false),
    confirmType: false,
    autoCloseSec: 2,
  });

  useEffect(() => {
    if (timerModalData.state) setIsOpenTimerModal(true);
  }, [timerModalData]);

  return { timerModalData, setTimerModalData, isOpenTimerModal, setIsOpenTimerModal };
}
