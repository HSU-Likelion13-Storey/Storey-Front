import { useState } from "react";

export function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues || {});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  // onSubmit은 컴포넌트에서 주입
  const handleSubmit = async (e, onSubmit) => {
    e?.preventDefault?.();
    if (!onSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return { values, setField, handleChange, handleSubmit, submitting };
}
