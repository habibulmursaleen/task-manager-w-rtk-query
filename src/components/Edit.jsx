import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectListQuery } from "../features/projects/projectsApi";
import {
  useEditTaskMutation,
  useGetTasksQuery,
} from "../features/tasks/taskApi";
import { useGetTeamMembersQuery } from "../features/team/teamApi";
import "../styles/main.css";

const Edit = () => {
  const [editTask, { isSuccess, isLoading }] = useEditTaskMutation(); //edit task
  const { data: teamMembers } = useGetTeamMembersQuery(); //team member
  const { data: projects } = useGetProjectListQuery();
  const { data: tasks } = useGetTasksQuery();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const changeTask = tasks.find((task) => task.id === Number(taskId));
  const [taskName, setTaskName] = useState(changeTask.taskName);
  const [teamMemberID, setTeamMemberID] = useState(changeTask.teamMember.id);
  const [projectID, setProjectID] = useState(changeTask.project.id);
  const [deadline, setDeadline] = useState(changeTask.deadline);

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
    editTask({
      id: taskId,
      task: {
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
      },
    });
    resetForm();
    navigate("/");
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
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
                value={teamMemberID}
                onChange={(e) => setTeamMemberID(e.target.value)}
              >
                <option value="" hidden defaultValue>
                  {teamMemberID}
                </option>
                {teamMembers.map((teamMember) => (
                  <option key={teamMember.id} value={teamMember.id}>
                    {teamMember.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                value={projectID}
                onChange={(e) => setProjectID(e.target.value)}
              >
                <option value="" hidden defaultValue>
                  {projectID}
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
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
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
