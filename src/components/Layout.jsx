import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./common/Footer";

export const Layout = () => {
  const location = useLocation();
  const noneFooterPaths = ["login", "signup", "event", "chat", "capture", "complate"];
  const showFooter = !noneFooterPaths.some((path) => location.pathname.includes(path));

  return (
    <div
      style={{
        maxWidth: "430px",
        height: "100vh",
        margin: "0 auto",
        position: "relative",
      }}>
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};
