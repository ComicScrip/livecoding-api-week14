import React, { useState } from "react";
import themes from "../themes";

export const TaskForm = ({ saveTask = () => {}, currentTheme = themes["light"], saveError = null }) => {
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

export default TaskForm;
