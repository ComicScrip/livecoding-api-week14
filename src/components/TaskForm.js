import React, { useState } from "react";
import {mutate} from 'swr'
import API from "../API";

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const saveTask = async () => {
    try {
      setSaving(true); setSaveError(false);
      mutate('/tasks', async tasks => {
        const newTask = await API.post('/tasks', {name: taskName, done: false})
        return [...tasks, newTask]
      }, false)
    } catch(err) {
      console.error(err)
      setSaveError(true)
    } finally {
      setSaving(false)
    }
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