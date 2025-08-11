import { useForm } from "./useForm";

export function useSignupAccountForm(initial = {}) {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      ...initial,
    },
  });
  return { ...form };
}
