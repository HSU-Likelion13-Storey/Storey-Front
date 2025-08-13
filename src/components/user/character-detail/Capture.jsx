import { useLocation, useNavigate } from "react-router-dom";

export const Capture = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  if (!state) nav(-1);

  return <div>Capture</div>;
};
