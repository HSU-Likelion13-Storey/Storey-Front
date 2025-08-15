import { GoHomeFill } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineQrCode } from "react-icons/md";
import { useEffect, useState } from "react";
import "./Footer.scss";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const [role, setRole] = useState("");

  // 로그인 후 저장한 사용자 정보 불러오기
  useEffect(() => {
    const role = localStorage.getItem("role"); // TODO 로컬말고 전역으로 관리?
    // setRole(role);
    setRole("user");
  }, []);

  return (
    <footer className="footer">
      {/* 홈 페이지 이동 */}
      <FooterItem path="home" role={role}>
        <GoHomeFill className="icon" />
        <span>홈</span>
      </FooterItem>

      {/* qr 페이지 이동 */}
      {role == "user" && (
        <FooterItem path="scan">
          <MdOutlineQrCode className="icon" />
          <span>QR 코드 스캔</span>
        </FooterItem>
      )}

      {/* 마이 페이지 이동 */}
      <FooterItem path="mypage" role={role}>
        <BsFillPersonFill className="icon" />
        <span>마이페이지</span>
      </FooterItem>
    </footer>
  );
};

const FooterItem = ({ path = "", children, role = "" }) => {
  const location = useLocation();

  // 현재 위치와 path가 일치할 경우 활성화(색상 변경)
  const checkPath = (path) => (location.pathname.split("/")[1] == path ? "active" : "");

  return (
    <div className={"item"}>
      <Link to={`/${path}/${role}`} className={checkPath(path)}>
        {children}
      </Link>
    </div>
  );
};
