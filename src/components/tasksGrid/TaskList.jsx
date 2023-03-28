import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/taskApi";
import "../../styles/main.css";
import Error from "../ui/Error";
import SingleTask from "./SingleTask";

const TaskList = () => {
  const { isLoading, data: tasks, isError } = useGetTasksQuery();
  const filters = useSelector((state) => state.filter);

  const filterByActiveProjects = (task) => {
    const { activeProjects } = filters;
    const taskExist = activeProjects.find(
      (project) =>
        project.id === task.project.id &&
        project.projectName.trim().toLowerCase() ===
          task.project.projectName.trim().toLowerCase()
    );

    if (taskExist) {
      return true;
    } else {
      return false;
    }
  };

  const filterBySearchText = (task) => {
    const { search } = filters;
    if (search) {
      return task.taskName
        .trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    } else {
      return true;
    }
  };

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && tasks?.length === 0) {
    content = <Error message="No tasks found!" />;
  }

  if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      .filter(filterByActiveProjects)
      .filter(filterBySearchText)
      .map((task) => <SingleTask key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
};

export default TaskList;
