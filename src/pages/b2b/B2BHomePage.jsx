import B2BHomeScreen from "@/components/b2b/home/B2BHomeScreen";
import { Splash } from "@/components/common/splash/Splash";
import { useSplash } from "@/hooks/useSplash";

export default function B2BHomePage() {
  const { isSplash, handleSplash } = useSplash();

  return (
    <>
      {!isSplash && <Splash closeFn={handleSplash} />}
      <B2BHomeScreen />
    </>
  );
}
