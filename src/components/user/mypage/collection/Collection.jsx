import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Collection.scss";
import { testlogo } from "@/assets";

export const Collection = () => {
  const nav = useNavigate();

  return (
    <div className="collection">
      <div className="header">
        <IoIosArrowBack className="back-icon" onClick={() => nav(-1)} />
        <div className="header-title">내가 모은 캐릭터</div>
        <div className="blank" />
      </div>
      <div className="collection-list">
        {mockData.map((data) => (
          <div className="collection-list-item" key={data.id}>
            <div className="collection-list-img">
              <img src={data.imgUrl} alt="test" onClick={() => nav(`/detail/${data.id}`)} />
            </div>
            <div className="collection-list-title">{data.title}</div>
          </div>
        ))}
      </div>
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
