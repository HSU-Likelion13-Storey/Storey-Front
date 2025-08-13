import "./Banner.scss";
import { IoChevronForward } from "react-icons/io5";

export default function Banner({ title, subtitle, onClick }) {
  return (
    <button className="banner" type="button" onClick={onClick}>
      <div className="banner__left">
        <span className="banner__emoji">🎉</span>

        <div className="banner__texts">
          <div className="banner-title">{title}</div>
          <div className="banner-subtitle">{subtitle}</div>
        </div>
      </div>

      <IoChevronForward className="banner-chevron" />
    </button>
  );
}
