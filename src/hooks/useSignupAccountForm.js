// 회원가입 1단계(계정/휴대전화 인증) 공통 훅
import { useForm } from './useForm';

export function useSignupAccountForm(initial = {}) {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      code: '',
      verified: false, // 휴대전화 인증 완료 여부
      ...initial,
    },
  });

  // TODO: API 연동
  const requestCode = () => {
    // 휴대전화 번호로 인증코드 요청
    console.log('휴대전화 인증: ', form.values.phone);
  };

  const verifyCode = () => {
    // 인증코드 검증
    form.setField('verified', true);
  };

  return { ...form, requestCode, verifyCode };
}
