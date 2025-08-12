import React from "react";
import logo from "../../../../assets/logo-text.svg";
import "./BrandHeading.scss";

export default function BrandHeading({ title }) {
  return (
    <div className="brand-heading">
      <img src={logo} alt="스토어리" className="brand-logo" />
      <p className="brand-title">{title}</p>
    </div>
  );
}
