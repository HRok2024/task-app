import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

export default function TaskForm({ setTasks }) {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target; //target객체 안의 name, value값을 가져온다
    setTaskData({ ...taskData, [name]: value }); //...taskData는 이전의 데이터를 가져온다
    // 키값은 중복이 되지 않으므로 업데이트가 된다
    //[name]이라고 대괄호를 쓴 이유는 name의 값이 동적으로 바뀌기 때문이다
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      return [...prev, taskData];
    });
    //TaskData초기화
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData({ ...taskData, tags: filterTags });
      //tags에 대괄호가 없는 이유는 정해진 tags라는 속성에 값을 부여하려고 하기 때문이다
    } else {
      setTaskData({ ...taskData, tags: [...taskData.tags, tag] });
    }
  };

  const checkTag = (tag) => {
    //tag가 현재 선택한 태그들에 있으면 true 없으면 false
    return taskData.tags.some((item) => item === tag);
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          onChange={handleChange}
          value={taskData.task}
          type="text"
          className="task_input"
          placeholder="할일을 입력하세요..."
        />

        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag("JavaScript")}
            />
            <Tag
              tagName="REACT"
              selectTag={selectTag}
              selected={checkTag("REACT")}
            />
          </div>
          <div>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="task_status"
            >
              <option value="todo">할일</option>
              <option value="doing">진행중</option>
              <option value="done">완료</option>
            </select>
            <button type="submit" className="task_submit">
              + 추가
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}
