import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../../features/filter/filterSlice";
import { useGetProjectListQuery } from "../../../features/projects/projectsApi";
import "../../../styles/main.css";
import Error from "../../ui/Error";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { isLoading, data: projects, isError } = useGetProjectListQuery();
  const [activeProjects, setActiveProjects] = useState(projects || []);

  useEffect(() => {
    if (projects) {
      setActiveProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    dispatch(updateFilters({ activeProjects }));
  }, [activeProjects, dispatch]);

  const handleChange = (event, project) => {
    if (event.target.checked) {
      setActiveProjects([...activeProjects, project]);
    } else {
      setActiveProjects(activeProjects.filter((p) => p.id !== project.id));
    }
  };

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && projects?.length === 0) {
    content = <Error message="No projects found!" />;
  }

  if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => {
      return (
        <div className="checkbox-container" key={project.id}>
          <input
            type="checkbox"
            className={project.colorClass}
            value={project.projectName}
            id={project.id}
            checked={
              activeProjects.find((p) => p.id === project.id) ? true : false
            }
            onChange={(event) => handleChange(event, project)}
          />

          <label htmlFor={project.id} className="label">
            {project.projectName}
          </label>
        </div>
      );
    });
  }
  return (
    <>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content} </div>
    </>
  );
};

export default ProjectList;
