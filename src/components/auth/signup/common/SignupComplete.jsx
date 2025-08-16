import React from "react";
import { useNavigate } from "react-router-dom";
import SignupHeader from "./SignupHeader.jsx";
import BrandHeading from "./BrandHeading.jsx";
import Button from "./Button.jsx";
import mascot from "../../../../assets/logo-mascot.svg";
import "./SignupComplete.scss";

export default function SignupComplete() {
  const nav = useNavigate();
  const goStart = () => nav("/");

  return (
    <>
      <SignupHeader rightLabel="가입완료" />
      <BrandHeading title={"환영해요 🎉\n스토어리에 가입했어요!"} />

      <div className="signup-complete">
        <img className="complete-mascot" src={mascot} alt="스토어리 캐릭터" />
        <Button type="button" onClick={goStart} className="start-btn btn-enabled">
          스토어리 시작하기
        </Button>
      </div>
    </>
  );
}
