import React from "react";
import "../../styles/main.css";
import ProjectList from "./projects/ProjectList";
import TeamMembers from "./teamMembers/TeamMembers";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ProjectList />
      <TeamMembers />
    </div>
  );
};

export default Sidebar;
