import React from "react";
import LoginScreen from "../../components/auth/login/LoginScreen";
import { Splash } from "@/components/common/splash/Splash";
import { useSplash } from "@/hooks/useSplash";

const LoginPage = () => {
  const { isSplash, handleSplash } = useSplash();

  return (
    <div>
      {!isSplash && <Splash closeFn={handleSplash} />}
      <LoginScreen />
    </div>
  );
};

export default LoginPage;
