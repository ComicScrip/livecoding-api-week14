import React from "react";

export const Tasks = () => {
  const fetchError = null
  const tasksToShow = null;
  if (fetchError) {
    return (
        <p className="errorText">An error occured while fetching the tasks.</p>
    );
  }
  if (!tasksToShow) return 'Loading...'

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