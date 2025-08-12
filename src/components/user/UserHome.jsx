import { logoText } from "@/assets";
import "./UserHome.scss";

export const UserHome = () => {
  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <div className="map-content">{/* 지도 */}</div>
    </div>
  );
};
