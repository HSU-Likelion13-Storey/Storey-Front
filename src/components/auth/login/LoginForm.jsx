import React, { useState } from 'react';
import { HiMiniEyeSlash } from 'react-icons/hi2';

const LoginForm = ({ role }) => {
  const [showPw, setShowPw] = useState(false); // 비밀번호 표시 여부
  const [values, setValues] = useState({ id: '', password: '' }); // 로그인 폼 입력 값

  const handleChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }; 

  const submit = (e) => {
    e.preventDefault();
    // TODO: 유효성 검사 로직 추가
    // TODO: API 연동 및 성공/실패 처리
    console.log(`로그인 시도 (${role})`, values);
  };

  return (
    <form className="login-form" onSubmit={submit}>
      <div className="form-row">
        <input
          className="input"
          name="id"
          placeholder="아이디 입력"
          value={values.id}
          onChange={handleChange}
          required // 입력x 임시 처리
        />
      </div>

      <div className="form-row password-row">
        <input
          className="input"
          name="password"
          type={showPw ? 'text' : 'password'}
          placeholder="비밀번호 입력 (영문, 숫자 포함 8~20자 이내)"
          value={values.password}
          onChange={handleChange}
          required // 입력x 임시 처리
        />
        <button
          type="button"
          className={`pw-toggle ${showPw ? 'active' : ''}`}
          aria-label="비밀번호 표시/숨기기"
          onClick={() => setShowPw(s => !s)}
        >
          <HiMiniEyeSlash size={20} />
        </button>
      </div>

      <button type="submit" className="btn-primary">로그인</button>
    </form>
  );
};

export default LoginForm;
