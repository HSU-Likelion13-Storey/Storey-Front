import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./common/Footer";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [isFooter, setIsFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const noneFooterPath =
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("event") ||
      location.pathname.includes("chat") ||
      location.pathname.includes("capture") ||
      location.pathname.includes("complate");
    setIsFooter(!noneFooterPath);
  }, [location]);

  return (
    <div
      style={{
        maxWidth: "430px",
        height: "100vh",
        margin: "0 auto",
        position: "relative",
      }}>
      <Outlet />
      {isFooter && <Footer />}
    </div>
  );
};
