export const ID_RE = /^[a-z0-9]{1,8}$/; // 영소문자/숫자, 8자 이내
export const PW_RE = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,20}$/; // 공백 금지, 영문+숫자 포함 8~20자

export const normalizeId = (v) => (v || "").trim().toLowerCase();

export const ID_MSG = "*영소문자/ 숫자로 8자 이내로 작성해주세요.";
export const PW_MSG = "*영문, 숫자를 포함한 8~20자리 이내로 입력해주세요.";
