import { IoIosArrowForward } from "react-icons/io";
import "./MyPageListItem.scss";

export const MyPageListItem = ({ children, logout = false, text, onClick }) => {
  return (
    <div className={`list-item ${logout && "logout"}`} onClick={onClick}>
      <span>{text}</span>
      {children ? children : <IoIosArrowForward className="mypage-icon" />}
    </div>
  );
};
