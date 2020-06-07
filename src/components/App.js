import React from "react";
import "../styles.css";
import { connect } from "react-redux";
import themes from "../themes";
import ThemeSwitcherContainer from "./ThemeSwitcher";
import TasksContainer from "./Tasks";
import FiltersContainer from "./Filters";
import TaskFormContainer from "./TaskForm";

function App({ currentTheme }) {
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

const mapStateToProps = ({ UISettings: { themeName } }) => ({
  currentTheme: themes[themeName]
});
export default connect(mapStateToProps)(App);
