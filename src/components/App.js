import React from "react";
import "../styles.css";
import themes from "../themes";
import ThemeSwitcherContainer from "./ThemeSwitcher";
import TasksContainer from "./Tasks";
import FiltersContainer from "./Filters";
import TaskFormContainer from "./TaskForm";

function App({ currentTheme = themes["light"] }) {
  return (
    <div className="App" style={{ backgroundColor: currentTheme.background }}>
      <ThemeSwitcherContainer />
      <h1 style={{ color: currentTheme.foreground }}>Tasks</h1>
      <TaskFormContainer />
      <FiltersContainer />
      <TasksContainer />
    </div>
  );
}

export default App;
