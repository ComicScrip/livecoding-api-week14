import React from "react";
import useSWR, {mutate} from 'swr'
import API from "../API";
import produce from 'immer'
import {findIndex} from 'lodash'

export const Tasks = () => {
  const {data: tasksToShow, error: fetchError} = useSWR('/tasks');

  if (fetchError) {
    return (
        <p className="errorText">An error occured while fetching the tasks.</p>
    );
  }
  if (!tasksToShow) return 'Loading...'

  const patchTaskLocally = (id, newTaskAttributes) => {
    mutate('/tasks', async tasks => {
      return produce(tasks, draft => {
        const localTaskIndex = findIndex(draft, {id});
        draft[localTaskIndex] = {...draft[localTaskIndex], ...newTaskAttributes}
      })
    }, false)
  }

  const toggleTaskAndRefreshList = async (task) => {
    try {
      patchTaskLocally(task.id, {_saving: true})
      await API.patch('/tasks/' + task.id, {done: !task.done})
      mutate('/tasks')
    } catch (err) {
      patchTaskLocally(task.id, {_saving: false})
      console.error(err)
    }
  }

  const toggleTaskWithoutRefreshingList = async (task) => {
    try {
      patchTaskLocally(task.id, {_saving: true})
      const updatedTask = await API.patch('/tasks/' + task.id, {done: !task.done}).then(res => res.data)
      patchTaskLocally(updatedTask.id, {done: updatedTask.done, _saving: false})
    } catch (err) {
      console.error(err)
      patchTaskLocally(task.id, {_saving: false})
    }
  }

  const optimisticallyToggleTask = async task => {
    try {
      patchTaskLocally(task.id, {done: !task.done, _saving: true})
      const updatedTask = await API.patch('/tasks/' + task.id, {done: !task.done}).then(res => res.data)
      patchTaskLocally(updatedTask.id, {done: updatedTask.done, _saving: false})
    } catch (err) {
      patchTaskLocally(task.id, {done: task.done, _saving: false})
      console.error(err)
    } 
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Done ?</td>
        </tr>
      </thead>
      <tbody>
        {tasksToShow.map(t => {
          return (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>
                <input
                  disabled={!!t._saving}
                  type="checkbox"
                  checked={t.done}
                  onChange={() => {
                    optimisticallyToggleTask(t);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tasks;