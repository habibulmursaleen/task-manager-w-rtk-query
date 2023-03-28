import React from "react";
import "../../styles/main.css";
import NavBar from "../NavBar";
import Sidebar from "../sidebar/Sidebar";
import TaskGrid from "../tasksGrid/TaskGrid";

const Home = () => {
  return (
    <body className="text-[#111827]">
      <NavBar />
      <div className="container relative">
        <Sidebar />
        <TaskGrid />
      </div>
    </body>
  );
};

export default Home;
