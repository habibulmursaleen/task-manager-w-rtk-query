import React from "react";
import "../../styles/main.css";
import AddNewButton from "./AddNewButton";
import TaskList from "./TaskList";

const TaskGrid = () => {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <AddNewButton />
        <TaskList />
      </main>
    </div>
  );
};

export default TaskGrid;
