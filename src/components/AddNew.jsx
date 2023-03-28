import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectListQuery } from "../features/projects/projectsApi";
import { useAddTaskMutation } from "../features/tasks/taskApi";
import { useGetTeamMembersQuery } from "../features/team/teamApi";
import "../styles/main.css";

const AddNew = () => {
  const [addTask, { isSuccess, isLoading }] = useAddTaskMutation(); //add task
  const { data: teamMembers } = useGetTeamMembersQuery(); //team member
  const { data: projects } = useGetProjectListQuery();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [teamMemberID, setTeamMemberID] = useState("");
  const [projectID, setProjectID] = useState("");
  const [deadline, setDeadline] = useState("");

  const teamMemberSelected = teamMembers.find(
    (member) => member.id === Number(teamMemberID)
  );

  const projectSelected = projects.find(
    (project) => project.id === Number(projectID)
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const resetForm = () => {
    setTaskName("");
    setTeamMemberID("");
    setProjectID("");
    setDeadline("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      taskName,
      teamMember: {
        name: teamMemberSelected.name,
        avatar: teamMemberSelected.avatar,
        id: teamMemberSelected.id,
      },
      project: {
        projectName: projectSelected.projectName,
        colorClass: projectSelected.colorClass,
        id: projectSelected.id,
      },
      deadline,
    });
    resetForm();
    navigate("/");
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label for="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required
                value={teamMemberID}
                onChange={(e) => setTeamMemberID(e.target.value)}
              >
                <option value="" hidden defaultValue>
                  Select Job
                </option>
                {teamMembers.map((teamMember) => (
                  <option key={teamMember.id} value={teamMember.id}>
                    {teamMember.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label for="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                value={projectID}
                onChange={(e) => setProjectID(e.target.value)}
              >
                <option value="" hidden defaultValue>
                  Select Project
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label for="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit" disabled={isLoading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddNew;
