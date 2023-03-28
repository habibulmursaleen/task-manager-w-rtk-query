import React from "react";
import { useGetTeamMembersQuery } from "../../../features/team/teamApi";
import "../../../styles/main.css";
import Error from "../../ui/Error";
import TeamMember from "./TeamMember";

const TeamMembers = () => {
  const { isLoading, data: teamMembers, isError } = useGetTeamMembersQuery();

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && teamMembers?.length === 0) {
    content = <Error message="No Team Members found!" />;
  }

  if (!isLoading && !isError && teamMembers?.length > 0) {
    content = teamMembers.map((teamMember) => (
      <TeamMember key={teamMember.id} teamMember={teamMember} />
    ));
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;
