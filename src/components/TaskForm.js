import React, { useState } from "react";

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const saveTask = async () => {

  }

  return (
    <form>
      <input
        required
        name="name"
        id="name"
        placeholder="New task name"
        value={taskName}
        onChange={event => {
          setTaskName(event.target.value);
        }}
      />
      <button
        onClick={() => saveTask({name: taskName, done: false})}
        disabled={saving || taskName === ""}
      >
        Save
      </button>
      {saveError && (
        <p className="errorText">An error occured while saving the task</p>
      )}
    </form>
  );
};

export default TaskForm