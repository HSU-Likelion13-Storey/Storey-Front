import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Collection.scss";

export const Collection = () => {
  const nav = useNavigate();

  return (
    <div className="collection">
      <div className="header">
        <IoIosArrowBack className="back-icon" onClick={() => nav(-1)} />
        <div className="header-title">나의 캐릭터 도감</div>
        <div className="blank" />
      </div>
      <div className="lists">
        {mockData.map((data) => (
          <div className="list-item" key={data.id}>
            <img src={data.imgUrl} alt="test" />
          </div>
        ))}
      </div>
    </div>
  );
};

const mockData = [
  {
    id: 1,
    imgUrl: "test",
  },
  {
    id: 2,
    imgUrl: "test",
  },
  {
    id: 3,
    imgUrl: "test",
  },
  {
    id: 4,
    imgUrl: "test",
  },
  {
    id: 5,
    imgUrl: "test",
  },
  {
    id: 6,
    imgUrl: "test",
  },
  {
    id: 7,
    imgUrl: "test",
  },
  {
    id: 8,
    imgUrl: "test",
  },
  {
    id: 9,
    imgUrl: "test",
  },
  {
    id: 10,
    imgUrl: "test",
  },
  {
    id: 11,
    imgUrl: "test",
  },
  {
    id: 12,
    imgUrl: "test",
  },
  {
    id: 13,
    imgUrl: "test",
  },
];
