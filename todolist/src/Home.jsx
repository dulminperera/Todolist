import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Create from "./Create";
import "./Home.css";
import "./App.css";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/` + id)
      .then((result) => {
        location.reload();
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/` + id)
      .then((result) => {
        location.reload();
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="surround">
        <h1 className="topic">Todo List</h1>

        <Create />
        <br />

        {todos.length === 0 ? (
          <div className="body-content">
            <h2 className="No_record">No Record</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon" />
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span>
                  <BsFillTrashFill
                    className="icon"
                    onClick={() => handleDelete(todo._id)}
                  />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
