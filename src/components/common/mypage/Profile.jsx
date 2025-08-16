import "./Profile.scss";

export const Profile = ({ img, name, id }) => {
  return (
    <div className="profile-card">
      <img src={img} alt="" />
      <div className="profile-content">
        <span className="profile-name">{name}</span>
        <span className="profile-id">{id}</span>
      </div>
    </div>
  );
};
