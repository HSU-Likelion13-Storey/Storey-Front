export default function Banner({ title, subtitle, onClick }) {
  return (
    <button className="banner" type="button" onClick={onClick}>
      <div>
        <div className="banner-title">{title}</div>
        <div className="banner-subtitle">{subtitle}</div>
      </div>
      <span className="banner-chevron">›</span>
    </button>
  );
}
