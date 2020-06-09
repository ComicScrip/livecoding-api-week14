import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksToShow, fetchTasks, saveTask } from "../redux/tasks";
import themes from "../themes";

export const Tasks = ({
  tasksToShow,
  toggleTask,
  currentTheme,
  fetchTasks,
  fetchError,
  loading
}) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tdStyle = { color: currentTheme.foreground };

  if (loading) return 'Loading...'

  if (fetchError) {
    return (
      <div style={{ color: currentTheme.foreground }}>
        <p className="errorText">An error occured while fetching the tasks.</p>
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
  tasksToShow: getTasksToShow(tasks),
  loading: tasks.collectionIsLoading,
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