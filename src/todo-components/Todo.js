import React from "react";
import { db } from "../utils/firebase";

function Todo({todo}) {

    const deleteTodo = () => {
        const todoRef = db.database().ref('Todo').child(todo.id);
        todoRef.remove();
    }

    return (
        <div>
            <h1>{todo.title}</h1>
            <button className="delete-btn" onClick={deleteTodo}>Delete</button>
        </div>
    )
}

export default Todo