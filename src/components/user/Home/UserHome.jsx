import { logoText } from "@/assets";
import "./UserHome.scss";
import { MapContent } from "./MapContent";

export const UserHome = () => {
  return (
    <div className="user-home">
      {/* Header */}
      <header className={`header`}>
        <img src={logoText} alt="" />
      </header>
      <MapContent />
    </div>
  );
};
