import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHeading from "@/components/auth/signup/common/BrandHeading.jsx";
import Button from "@/components/auth/signup/common/Button.jsx";
import "./CharacterComplete.scss";

import { useAuthStore } from "@/store/useAuthStore";
import { getCharacter } from "@/apis/character/characterApi";

export default function CharacterComplete() {
  const nav = useNavigate();
  const { characterId } = useAuthStore();
  const [character, setCharacter] = useState(null);

  // 캐릭터 조회
  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;
      const char = await getCharacter(characterId);
      if (char) setCharacter(char);
    };
    fetchCharacter();
  }, [characterId]);

  return (
    <div className="character-complete-container">
      <BrandHeading title={"우리 가게 마스코트\n생성 완료!"} />
      <p className="complete-subtitle">본격적으로 시작해볼까요?</p>

      <div className="character-complete">
        <div className="speech">함께하게 되어 영광이에요!</div>
        {character ? (
          <img className="character" src={character.imageUrl} alt="가게 마스코트" />
        ) : (
          <div className="character-placeholder">캐릭터 불러오는 중...</div>
        )}{" "}
        <Button type="button" onClick={() => nav("/home/owner")} className="start-btn btn-enabled">
          가봅시다!
        </Button>
      </div>
    </div>
  );
}
