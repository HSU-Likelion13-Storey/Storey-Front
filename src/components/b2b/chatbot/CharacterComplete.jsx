import React from "react";
import { useNavigate } from "react-router-dom";
import BrandHeading from "@/components/auth/signup/common/BrandHeading.jsx";
import Button from "@/components/auth/signup/common/Button.jsx";
import { testlogo } from "@/assets";
import "./CharacterComplete.scss";

export default function CharacterComplete() {
  const nav = useNavigate();
  return (
    <div className="character-complete-container">
      <BrandHeading title={"우리 가게 마스코트\n생성 완료!"} />
      <p className="complete-subtitle">본격적으로 시작해볼까요?</p>

      <div className="character-complete">
        <div className="speech">함께하게 되어 영광이에요!</div>
        <img className="character" src={testlogo} alt="가게 마스코트" />
        <Button type="button" onClick={() => nav("/home/owner")} className="start-btn btn-enabled">
          가봅시다!
        </Button>
      </div>
    </div>
  );
}
