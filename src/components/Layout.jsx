import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div
      style={{
        maxWidth: "430px",
        height: "100vh",
        margin: "0 auto",
        position: "relative",
      }}>
      <Outlet />
    </div>
  );
};
