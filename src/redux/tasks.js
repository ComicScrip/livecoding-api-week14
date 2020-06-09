import axios from "axios";

// Initial state
export const initialTasksState = {
  filter: "SHOW_ALL",
  collection: [],
  collectionIsLoading: false,
  collectionFetchError: null,
  saveError: null
};

// action creators
export const changeFilter = newFilter => ({
  type: "CHANGE_FILTER",
  newFilter
});

export const toggleTaskDone = taskId => ({
  type: "TOGGLE_DONE",
  taskId
});

export const fetchRequest = () => ({
  type: "FETCH_REQUEST"
});
export const fetchSuccess = tasksFromServer => ({
  type: "FETCH_SUCCESS",
  tasksFromServer
});
export const fetchFailure = error => ({
  type: "FETCH_FAILURE",
  error
});

export const saveRequest = task => ({
  type: "SAVE_REQUEST",
  task
});
export const saveSuccess = (taskFromServer, updated) => ({
  type: "SAVE_SUCCESS",
  taskFromServer,
  updated: !!updated
});
export const saveFailure = error => ({
  type: "SAVE_FAILURE",
  error
});

// async actions
export function fetchTasks() {
  return dispatch => {
    dispatch(fetchRequest());
    return axios
      .get(`http://localhost:3000/tasks`)
      .then(response => response.data)
      .then(data => dispatch(fetchSuccess(data)))
      .catch(err => dispatch(fetchFailure(err)));
  };
}

export function saveTask(task, onSuccess = () => {}, onError = () => {}) {
  const updating = !!task.id;
  return dispatch => {
    return axios({
      method: updating ? "patch" : "post",
      url: `http://localhost:3000/tasks/${task.id || ""}`,
      data: {name: task.name, done: task.done}
    })
      .then(response => response.data)
      .then(data => {
        onSuccess(data);
        dispatch(saveSuccess(data, updating));
      })
      .catch(err => {
        onError(err);
        console.log(JSON.stringify(err));
        dispatch(saveFailure(err, updating));
      });
  };
}

// selectors
export const getTask = (state, id) => state.collection.find(t => t.id === id);
export const getTasksToShow = state => {
  const { filter } = state;
  if (filter === "SHOW_ALL") {
    return state.collection;
  } else if (filter === "SHOW_TODO") {
    return state.collection.filter(t => !t.done);
  } else if (filter === "SHOW_DONE") {
    return state.collection.filter(t => t.done);
  } else {
    return [];
  }
};

// reducers
const tasksReducer = (state = initialTasksState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return { ...state, filter: action.newFilter };
    case "TOGGLE_DONE":
      return {
        ...state,
        collection: state.collection.map(t => {
          return t.id === action.taskId ? { ...t, done: !t.done } : t;
        })
      };
    case "FETCH_REQUEST":
      return {
        ...state,
        collectionIsLoading: true,
        collectionFetchError: null
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        collectionIsLoading: false,
        collection: action.tasksFromServer
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        collectionIsLoading: false,
        collectionFetchError: action.error
      };
    case "SAVE_REQUEST":
      return {
        ...state,
        saveError: null,
        collection: state.collection.map(t => {
          return t.id === action.task.id ? { ...t, _saving: true } : t;
        })
      };
    case "SAVE_SUCCESS":
      return {
        ...state,
        collection: action.updated
          ? state.collection.map(t => {
              return t.id === action.taskFromServer.id
                ? action.taskFromServer
                : t;
            })
          : [...state.collection, action.taskFromServer]
      };
    case "SAVE_FAILURE":
      return {
        ...state,
        saveError: action.error
      };
    default:
      return state;
  }
};

export default tasksReducer;
