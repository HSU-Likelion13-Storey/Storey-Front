import { Splash } from "@/components/common/splash/Splash";
import { UserHome } from "@/components/user/Home/UserHome";
import { useSplash } from "@/hooks/useSplash";

export const UserHomePage = () => {
  const { isSplash, handleSplash } = useSplash();

  return (
    <>
      {!isSplash && <Splash closeFn={handleSplash} />}
      <UserHome />
    </>
  );
};
