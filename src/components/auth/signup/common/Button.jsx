import React, { forwardRef } from "react";

const Button = forwardRef(function Button(
  { children, variant = "primary", className = "", type = "button", ...rest },
  ref,
) {
  const cls = ["btn", variant, className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {children}
    </button>
  );
});

export default Button;
