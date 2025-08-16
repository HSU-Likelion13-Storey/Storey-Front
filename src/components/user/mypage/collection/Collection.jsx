import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Collection.scss";
import { logoEmpty, mascotBubble, testlogo } from "@/assets";
import { useEffect, useState } from "react";

export const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({ open: false, visible: false });
  const nav = useNavigate();

  useEffect(() => {
    setCollectionData(mockData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && collectionData.length == 0) {
      setModalState({ open: true, visible: true });
      setTimeout(modalHandle, 2000);
    }
  }, [loading, collectionData]);

  const modalHandle = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
    setTimeout(() => setModalState((prev) => ({ ...prev, open: false })), 300);
  };

  return (
    <div className={`collection ${collectionData.length == 0 ? "none" : "list"}`}>
      <div className="header">
        <IoIosArrowBack className="back-icon" onClick={() => nav(-1)} />
        <div className="header-title">내가 모은 캐릭터</div>
        <div className="blank" />
      </div>
      {collectionData.length == 0 ? (
        <div className="collection-empty">
          <img src={logoEmpty} alt="" />
          <span className="collection-caption">모은 캐릭터가 없어요.</span>
        </div>
      ) : (
        <div className="collection-list">
          {collectionData.map((data) => (
            <div className="collection-list-item" key={data.id}>
              <div className="collection-list-img">
                <img src={data.imgUrl} alt="test" onClick={() => nav(`/detail/${data.id}`)} />
              </div>
              <div className="collection-list-title">{data.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* 모달 */}
      {modalState.open && (
        <div className={`collection-modal ${modalState.visible && "visible"}`} onClick={modalHandle}>
          <div className="collection-modal-content">
            <div className="collection-message-wrapper">
              <span className="collection-caption">주위의 식당에 어떤 캐릭터가 있는지 둘러보세요!✨</span>
              <span className="collection-message">
                <span>
                  아직 수집한 캐릭터가 없어요ㅠㅠ
                  <br />
                  얼른 가게를 방문해 캐릭터를 모아보세요!
                </span>
              </span>
            </div>
            <img src={mascotBubble} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

const mockData = [
  {
    id: 1,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 2,
    imgUrl: testlogo,
    title: "한성돼asdadsdd",
  },
  {
    id: 3,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 4,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 5,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 6,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 7,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 8,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 9,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 10,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 11,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 12,
    imgUrl: testlogo,
    title: "한성돼",
  },
  {
    id: 13,
    imgUrl: testlogo,
    title: "한성돼",
  },
];
