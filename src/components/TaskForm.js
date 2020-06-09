import React, { useState } from "react";
import { connect } from "react-redux";
import { saveTask } from "../redux/tasks";
import themes from "../themes";

export const TaskForm = ({ saveTask, currentTheme, saveError }) => {
  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false);

  const inputStyle = {
    backgroundColor: currentTheme.background,
    color: currentTheme.foreground
  };

  const handleSave = e => {
    e.preventDefault();
    setSaving(true);
    saveTask({ name: taskName, done: false })
      .then(() => {
        setTaskName("");
      })
      .catch(() => {})
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <form>
      <input
        required
        style={inputStyle}
        name="name"
        id="name"
        placeholder="New task name"
        value={taskName}
        onChange={event => {
          setTaskName(event.target.value);
        }}
      />
      <button
        style={inputStyle}
        disabled={saving || taskName === ""}
        onClick={handleSave}
      >
        Save
      </button>
      {saveError && (
        <p className="errorText">An error occured while saving the task</p>
      )}
    </form>
  );
};

const mapStateToProps = ({ UISettings, tasks }) => ({
  currentTheme: themes[UISettings.themeName],
  saveError: tasks.saveError
});
const mapDispatchToProps = dispatch => {
  return {
    saveTask: task => {
      return new Promise((resolve, reject) => {
        dispatch(saveTask(task, resolve, reject));
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);