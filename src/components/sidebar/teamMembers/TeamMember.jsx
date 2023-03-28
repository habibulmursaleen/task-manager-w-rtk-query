import React from "react";
import "../../../styles/main.css";

const TeamMember = ({ teamMember }) => {
  const { avatar, name } = teamMember;
  return (
    <div className="checkbox-container">
      <img
        src={require(`../../../assets/avatars/${avatar}`)}
        alt=""
        className="team-avater"
      />
      <p className="label">{name}</p>
    </div>
  );
};

export default TeamMember;
