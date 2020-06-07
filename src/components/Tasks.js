import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksToShow, fetchTasks, saveTask } from "../redux/tasks";
import themes from "../themes";
import { orderBy } from "lodash";

export const Tasks = ({
  tasksToShow,
  toggleTask,
  currentTheme,
  fetchTasks,
  fetchError
}) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tdStyle = { color: currentTheme.foreground };

  if (fetchError) {
    return (
      <div style={{ color: currentTheme.foreground }}>
        <p className="errorText">An error occured while fetching the tasks.</p>
        <p>
          {" "}
          Maybe you forgot to change the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wild-tasks-api.herokuapp.com"
          >
            API_KEY
          </a>{" "}
          constant in redux/tasks.js ?
        </p>
        <button style={{ color: currentTheme.foreground }} onClick={fetchTasks}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <td style={tdStyle}>Name</td>
          <td style={tdStyle}>Done ?</td>
        </tr>
      </thead>
      <tbody>
        {tasksToShow.map(t => {
          return (
            <tr key={t.id}>
              <td style={tdStyle}>{t.name}</td>
              <td style={tdStyle}>
                <input
                  disabled={!!t._saving}
                  type="checkbox"
                  checked={t.done}
                  onChange={() => {
                    toggleTask(t);
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

const mapStateToProps = ({ tasks, UISettings }) => ({
  tasksToShow: orderBy(getTasksToShow(tasks), ["createdAt"], ["desc"]),
  currentTheme: themes[UISettings.themeName],
  fetchError: tasks.collectionFetchError
});
const mapDispatchToProps = dispatch => {
  return {
    toggleTask: task => {
      dispatch(saveTask({ ...task, done: !task.done }));
    },
    fetchTasks: () => dispatch(fetchTasks())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
