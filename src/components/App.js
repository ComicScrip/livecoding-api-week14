import React from "react";
import "../styles.css";
import Tasks from "./Tasks";
import TaskForm from "./TaskForm";
import { defaultFetcher } from "../API";
import {SWRConfig} from 'swr'

function App() {
  return (
    <SWRConfig 
      value={{
        fetcher: defaultFetcher
      }}
    >
      <div className="App">
        <h1>Tasks</h1>
        <TaskForm />
        <Tasks />
      </div>
    </SWRConfig>
  );
}

export default App;
