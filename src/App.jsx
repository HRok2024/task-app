import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import React, { useEffect, useState } from "react";

//처음 앱 시작 시 할일들을 로컬스토리지에서 가져온다
const saveTasks = localStorage.getItem("tasks");

function App() {
  const [tasks, setTasks] = useState(JSON.parse(saveTasks) || []);
  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, i) => i !== taskIndex);
    setTasks(newTasks); //선택한 할일이 삭제되어 업데이트
  };
  //할일들이 바뀔때마다 로컬스토리지에 저장한다
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="할 일"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="진행중"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="완 료"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
